//chakra-ui
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
//core components
import Layout from "@/components/molecules/Layout";
import Container from "@/components/molecules/Container";
import CardResult from "@/components/molecules/CardResult";
//resources
import React from "react";
import SEO from "@/config/seo";
import { NextSeo } from "next-seo";
import { GetStaticProps } from "next";
import { useRouter } from 'next/router'
import { next } from "@/config/app";
import Database from "@/config/database";
//data
import artists from "@/data/static/artists";
//types
import { ArtistProps } from "@/@types/artist";
import { ResultProps } from "@/@types/result";

interface ResultPageProps {
  totalAllVotes?: number;
  results: ResultProps[];
}

export default function ResultPage({ results }: ResultPageProps) {
  const router = useRouter();

  return (
    <Layout>
      <NextSeo {...SEO.page.home} />
      <Container mb={24} mt={4} minH={400} maxW="lg">
        <Flex flexDir="column">

          <Heading mb={8}>Resultado Parcial</Heading>

          <Stack spacing={8} mb={8}>
            {results.map(r => <CardResult key={r.id} value={r} />)}
          </Stack>

          <Button onClick={() => router.back()}>
            VOLTAR
          </Button>

        </Flex>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
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

  return {
    props: {
      results,
    },
    revalidate: next.revalidate.fiveMinutes,
  };
};
