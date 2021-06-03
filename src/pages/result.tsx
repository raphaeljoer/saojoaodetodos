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
  result: ResultProps[];
}

export default function ResultPage({ result }: ResultPageProps) {
  const router = useRouter();
  return (
    <Layout>
      <NextSeo {...SEO.page.home} />
      <Container my={24} minH={400}>
        <Flex align="center" justify="center" flexDir="column">

          <Heading fontSize="4xl" mb={8}>Resultado Parcial</Heading>

          <Stack spacing={4}>
            {result.map(r => <CardResult key={r.id} {...r} />)}
          </Stack>

          <Button onClick={() => router.back()} {...Props.Button.share} mt={8} w={{ base: "xs", sm: "sm", md: "md" }}>
            VOLTAR
          </Button>

        </Flex>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const db = await Database.Mongo.connectToDataBase(Database.Mongo.uri);
  const votes = db.collection('votes');

  const getCountVotes = (artist: ArtistProps) =>
    votes.countDocuments({ id: artist.id });

  const totalAllVotes = await Promise
    .all(artists.map(getCountVotes))
    .then(response => response.reduce(Utils.Math.Reduce.sum));

  const getPercentualVotes = async (artist: ArtistProps) =>
    (await getCountVotes(artist) / totalAllVotes) * 100;

  const resultList = await Promise.all(
    artists.map(async (artist: ArtistProps): Promise<ResultProps> => ({
      id: artist.id,
      artist: artist.name,
      votes: await getCountVotes(artist),
      percentual: await getPercentualVotes(artist),
    })),
  );

  const result = resultList.sort((a, b) => b.percentual - a.percentual);

  return {
    props: {
      totalAllVotes,
      result,
    },
    revalidate: next.revalidate.fiveMinutes,
  };
};
