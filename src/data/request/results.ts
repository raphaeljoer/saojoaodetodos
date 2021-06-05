import { Database } from '@/config/database';
import { ResultProps } from "@/@types/result";
import { ArtistProps } from '@/@types/artist';
import artists from '../static/artists';

export const getResults = async () => {
  type Votes = Pick<ResultProps, "votes">;
  type PartialResult = Omit<ResultProps, "progress" | "position">;

  const db = await Database.Mongo.connectToDataBase(Database.Mongo.uri);
  const collection = db.collection('votes');
  const totalVotes = await collection.estimatedDocumentCount();

  const ordenate = (results: PartialResult[]) =>
    results.sort((a: Votes, b: Votes) => b.votes - a.votes);

  const addProgress = (results: PartialResult[]) =>
    results.map(r => ({ ...r, progress: (r.votes * 100) / results[0].votes }));

  const addPosition = (results: Omit<ResultProps, "position">[]) =>
    results.map((r, idx) => ({ ...r, position: idx + 1 }));

  const results: ResultProps[] = await Promise
    .all(
      artists.map(async ({ id, name }: ArtistProps) => {
        const votes = await collection.countDocuments({ id });
        const percentage = (votes / totalVotes) * 100;
        return ({ id, name, votes, percentage });
      }))
    .then(ordenate)
    .then(addProgress)
    .then(addPosition);

  return results;
};

export const getTotalVotes = async () => {
  const db = await Database.Mongo.connectToDataBase(Database.Mongo.uri);
  const collection = db.collection('votes');
  return await collection.estimatedDocumentCount();
}