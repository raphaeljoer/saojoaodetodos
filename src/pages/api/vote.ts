import { VercelResponse, VercelRequest } from '@vercel/node';
import axios, { AxiosResponse } from 'axios';
import Recaptcha from '@/config/recaptcha';
import Database from '@/config/database';
import RecaptchaProps from '@/@types/recaptcha';

interface Vote {
  id: string;
  token: string;
  action: string;
}

interface CollectionRequestProps {
  id: string;
  votedAt: Date,
  score: number;
  ip: string | string[] | undefined;
}

interface RecaptchaResponse {
  recaptchaReponse: AxiosResponse<RecaptchaProps.Response> | null;
  err: any;
}

export default async (request: VercelRequest, response: VercelResponse) => {
  if (!Database.Mongo.uri) throw new Error("MongoDB uri don't exist");
  const { apiUrl, secretKey, minimumScore } = Recaptcha.V3;
  const { id, token }: Vote = request.body;

  const ip = request.headers['x-forwarded-for'];

  const url = `${apiUrl}?secret=${secretKey}&response=${token}`;

  if (!token) response.status(500).json({ message: 'You must have a valid token' });

  const { recaptchaReponse, err }: RecaptchaResponse = await
    axios({ method: 'POST', url, timeout: 10000 })
      .then(recaptchaReponse => ({ recaptchaReponse, err: null }))
      .catch(err => ({ recaptchaReponse: null, err }));

  if (err) {
    return response.status(500).json({ message: 'Google Api error', err });
  }

  if (!recaptchaReponse) {
    return response.status(500).json({ message: 'Google Api error' });
  }

  const { score } = recaptchaReponse.data;

  if (score < minimumScore) {
    return response.status(500).json({ message: 'Are you a robot?' });
  }

  const db = await Database.Mongo.connectToDataBase(Database.Mongo.uri);
  if (!db) throw new Error("Could not connect to database.");

  const collection = db.collection('votes');

  const collectionRequest: CollectionRequestProps = {
    id,
    votedAt: new Date(),
    score,
    ip
  };

  await collection.insertOne(collectionRequest)
    .then(_data => {
      return response.status(200).json({ success: true });
    })
    .catch(error => {
      return response.status(500).json({ error: error });
    });
};
