//core components
import Container from '@/components/molecules/Container';
import Layout from '@/components/molecules/Layout';
import PollSwitch from '@/components/molecules/PollSwitch';
//resources
import React from 'react';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { time } from '@/utils/time';
//config
import SEO from '@/config/seo';
//data
import { getResults } from '@/data/request/results';
//types
import { ResultProps } from '@/@types/result';

interface HomePageProps {
  results: ResultProps[];
}

export default function HomePage({ results }: HomePageProps) {
  return (
    <Layout>
      <NextSeo {...SEO.page.home} />
      <Container mt={16} mb={24}>
        <PollSwitch results={results} />
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      results: await getResults(),
    },
    revalidate: time.inSeconds.minute.five,
  };
};
