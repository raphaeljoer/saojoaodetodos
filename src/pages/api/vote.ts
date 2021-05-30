import { VercelResponse, VercelRequest } from '@vercel/node';
import { MongoClient, Db } from 'mongodb';
import axios, { AxiosResponse } from 'axios';
import Recaptcha from '@/config/recaptcha';
import DataBase from '@/config/database';
import RecaptchaProps from '@/@types/recaptcha';

type CachedDbProps = Db | null;
let cachedDb: CachedDbProps = null;

const connectToDataBase = async (uri: string) => {
  if (cachedDb) return cachedDb;
  const url = new URL(uri);

  const client = await MongoClient.connect(uri, {
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
  const { id, token, action: newAction } = request.body;
  const { apiUrl, secretKey, minimumScore } = Recaptcha.V3;

  if (!token) response.status(500).json({ message: 'You must have a valid token' });

  let googleScore = null;

  try {
    axios({
      method: 'POST',
      url: `${apiUrl}?secret=${secretKey}&response=${token}`,
      timeout: 5000,
    })
      .then(({ data }: AxiosResponse<RecaptchaProps.Response>) => {
        const { score, action } = data;
        if (score < minimumScore) {
          googleScore = score;
          throw new Error(`Are you a robot? Your score: ${score}`);
        }

        //FIXME - Check this logic
        if (action !== newAction) {
          throw new Error('Are you a robot? You got to know the action name');
        }
      })
      .catch((error) => {
        return response.status(500).json(error);
      });
  } catch (error) {
    return response.status(500).json({ error });
  }

  if (!DataBase.Mongo.uri) throw new Error("MongoDB uri don't exist");
  const db = await connectToDataBase(DataBase.Mongo.uri);

  if (!db) response.status(500).json({ 
    message: 'Could not connect to database.', 
    data: db 
  });

  const collection = db.collection('votes');

  const result = await collection
    .insertOne({
      id,
      votedAt: new Date(),
      googleScore,
    })
    .then((data: any) => {
      return { success: id, data, statusCode: 200 };
    })
    .catch((error: any) => {
      return { error, statusCode: 500 };
    });

  return response.status(result.statusCode).json(result);
};
