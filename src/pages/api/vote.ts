import { VercelResponse, VercelRequest } from '@vercel/node';
import { MongoClient, Db } from 'mongodb';
import axios, { AxiosResponse } from 'axios';
import Recaptcha from '@/config/recaptcha';
import DataBase from '@/config/database';
import RecaptchaProps from '@/@types/recaptcha';

interface Vote {
  id: string;
  token: string;
  action: string;
}

interface CollectionProps {
  id: string;
  votedAt: Date,
  score: number;
  ip: string | undefined;
}

let cachedDb: Db;

const connectToDataBase = async (uri: string) => {
  if (cachedDb) return cachedDb;
  const url = new URL(uri);

  const client: MongoClient = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((data) => {
    return data;
  });

  const dbName = url.pathname.substr(1);
  const db = client.db(dbName);
  cachedDb = db;
  return db;
};

export default async (request: VercelRequest, response: VercelResponse) => {
  if (!DataBase.Mongo.uri) throw new Error("MongoDB uri don't exist");
  
  const ip = request.socket.remoteAddress;

  const { id, token }: Vote = request.body;
  const { apiUrl, secretKey, minimumScore } = Recaptcha.V3;
  const url = `${apiUrl}?secret=${secretKey}&response=${token}`;

  if (!token) response.status(500).json({ message: 'You must have a valid token' });

  const { data }: AxiosResponse<RecaptchaProps.Response> = await axios({ method: 'POST', url, timeout: 10000 });
  const { score } = data;

  if (!score) {
    return response.status(500).json({ message: 'Google Api error' });
  }

  if (score < minimumScore) {
    return response.status(500).json({ message: 'Are you a robot?' });
  }

  const db = await connectToDataBase(DataBase.Mongo.uri);
  if (!db) throw new Error("Could not connect to database.");

  const collection = db.collection<CollectionProps>('votes');

  await collection
    .insertOne({
      id,
      votedAt: new Date(),
      score,
      ip
    })
    .then(_data => {
      return response.status(200).json({ success: true });
    })
    .catch(error => {
      return response.status(500).json({ error: error });
    });
};
