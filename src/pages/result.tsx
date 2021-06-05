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
//types
import { ResultProps } from "@/@types/result";
import { getResults } from "@/data/request/results";

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
  return {
    props: {
      results: await getResults(),
    },
    revalidate: next.revalidate.fiveMinutes,
  };
};
