//vercel
import { VercelRequest, VercelResponse } from '@vercel/node';
//resources
import isAfter from 'date-fns/isAfter/index';
import axios, { AxiosResponse } from 'axios';
//config
import { date } from '@/config/poll';
import * as Recaptcha from '@/config/services/recaptcha/v3';
import * as Mongo from '@/config/database/mongo';
//types
import * as RecaptchaProps from '@/@Entities/recaptcha';
import { timeout } from '@/config/app';

interface BodyRequest {
  id: string;
  token: string;
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
  const currentDate = new Date();
  const { id, token }: BodyRequest = request.body;

  if (isAfter(currentDate, date.closed.start)) {
    response.status(500).json({ message: 'Poll closed' });
  }

  if (!token) {
    response.status(500).json({ message: 'You must have a valid token' });
  }

  if (!id) response.status(500).json({ message: 'You must have a valid id' });

  const { getUrl, minimumScore } = Recaptcha;

  const ip = request.headers['x-forwarded-for'];
  const url = getUrl(token);

  const { recaptchaResponse, err }: RecaptchaResponse = await axios({
    method: 'POST',
    url,
    timeout: timeout.request,
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
    votedAt: currentDate,
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
