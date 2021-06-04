//chakra-ui
import { Avatar, Flex, Progress, Stack } from "@chakra-ui/react";
//core components
import Layout from "@/components/molecules/Layout";
import Container from "@/components/molecules/Container";
//resources
import React from "react";
import { NextSeo } from "next-seo";
import SEO from "@/config/seo";
import { ArtistProps } from "@/@types/artist";
import { GetStaticProps } from "next";
import Database from "@/config/database";
import artists from "@/data/static/artists";
import { next } from "@/config/app";
import Heading from "@/components/atoms/Heading";
import Text from "@/components/atoms/Text";
import { ResultProps } from "@/@types/result";
import CardResult from "@/components/molecules/CardResult";
import { Utils } from "@/utils/math";
import Button from "@/components/atoms/buttons/Button";
import Link from "@/components/atoms/Link";
import { Props } from "@/config/props";
import { useRouter } from 'next/router'

interface ResultPageProps {
  totalAllVotes: number;
  results: ResultProps[];
}

export default function ResultPage({ results }: ResultPageProps) {
  const router = useRouter();
  const mostVoted = results[0].votes;

  return (
    <Layout>
      <NextSeo {...SEO.page.home} />
      <Container my={24} minH={400}>
        <Flex align="center" justify="center" flexDir="column">

          <Heading fontSize="4xl" mb={8}>Resultado Parcial</Heading>

          <Stack spacing={4}>
            {results.map(r => <CardResult key={r.id} {...r} mostVoted={mostVoted} />)}
          </Stack>

          <Button
            onClick={() => router.back()}
            {...Props.Button.share}
            w={{ base: "xs", sm: "sm", md: "md" }}
            mt={8}
          >
            VOLTAR
          </Button>

        </Flex>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const db = await Database.Mongo.connectToDataBase(Database.Mongo.uri);
  const collection = db.collection('votes');
  const totalVotes = await collection.estimatedDocumentCount();

  const ordenate = (results: any) => results.sort((a: any, b: any) => b.votes - a.votes);
  
  const mesureProgress = (results: ResultProps[]) =>
    results.map(r => ({ ...r, progress: (r.votes * 100) / results[0].votes }));

  const results = await
    Promise.all(
      artists.map(async ({ id, name }: ArtistProps) => {
        const votes = await collection.countDocuments({ id })
        const percentage = (votes / totalVotes) * 100
        return ({ id, name, votes, percentage });
      }))
      .then(ordenate)
      .then(mesureProgress);

  return {
    props: {
      totalVotes,
      results,
    },
    revalidate: next.revalidate.fiveMinutes,
  };
};
