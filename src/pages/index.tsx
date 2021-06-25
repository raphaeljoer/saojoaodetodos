//core components
import Layout from '@/components/molecules/Layout';
import Container from '@/components/molecules/Container';
//resources
import React from 'react';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
//config
import SEO from '@/config/seo';
import { next } from '@/config/app';
//data
import { getResults } from '@/data/request/results';
//types
import { ResultProps } from '@/@types/result';
import { SwitchPollStatus } from '@/components/molecules/SwitchPollStatus';

interface HomePageProps {
  results: ResultProps[];
}

export default function HomePage({ results }: HomePageProps) {
  return (
    <Layout>
      <NextSeo {...SEO.page.home} />
      <Container mt={16} mb={24}>
        <SwitchPollStatus results={results} />
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      results: await getResults(),
    },
    revalidate: next.revalidate.fiveMinutes,
  };
};
