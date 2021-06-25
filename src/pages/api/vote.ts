import { VercelRequest, VercelResponse } from '@vercel/node';
import axios, { AxiosResponse } from 'axios';
import * as Recaptcha from '@/config/recaptcha/v3';
import * as RecaptchaProps from '@/@types/recaptcha';
import * as Mongo from '@/config/database/mongo';

interface Vote {
  id: string;
  token: string;
  action: string;
}

interface CollectionRequestProps {
  id: string;
  votedAt: Date;
  score: number;
  ip: string | string[] | undefined;
}

interface RecaptchaResponse {
  recaptchaResponse: AxiosResponse<RecaptchaProps.Response> | null;
  err: any;
}

export default async (request: VercelRequest, response: VercelResponse) => {
  const { id, token }: Vote = request.body;

  if (!token)
    response.status(500).json({ message: 'You must have a valid token' });
  if (!id) response.status(500).json({ message: 'You must have a valid id' });

  const { getUrl, minimumScore } = Recaptcha;

  const ip = request.headers['x-forwarded-for'];
  const url = getUrl(token);

  const { recaptchaResponse, err }: RecaptchaResponse = await axios({
    method: 'POST',
    url,
    timeout: 10000,
  })
    .then((recaptchaResponse) => ({
      recaptchaResponse,
      err: null,
    }))
    .catch((err) => ({ recaptchaResponse: null, err }));

  if (err) {
    return response.status(500).json({ message: 'Google Api error', err });
  }

  if (!recaptchaResponse) {
    return response.status(500).json({ message: 'Google Api error' });
  }

  if (!recaptchaResponse.data.success) {
    return response
      .status(500)
      .json({ message: 'Google Api error', info: recaptchaResponse.data });
  }

  const { score } = recaptchaResponse.data;

  if (score < minimumScore) {
    return response.status(500).json({ message: 'Are you a robot?' });
  }

  const db = await Mongo.connectToDataBase(Mongo.uri);
  if (!db) throw new Error('Could not connect to database.');

  const collection = db.collection('votes');

  const collectionRequest: CollectionRequestProps = {
    id,
    votedAt: new Date(),
    score,
    ip,
  };

  await collection
    .insertOne(collectionRequest)
    .then((_) => {
      return response.status(200).json({ success: true });
    })
    .catch((error) => {
      return response.status(500).json({ error: error });
    });
};
