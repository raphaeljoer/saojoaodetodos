import { Button, Text, Box, Stack, Heading } from '@chakra-ui/react';
//next resources
import { GetStaticPaths, GetStaticProps } from 'next';
//types
import { ArtistProps } from '@/@Entities/artist';
//data
import artists from '@/data/static/artists';
//core components
import Layout from '@/components/molecules/Layout';
import Container from '@/components/molecules/Container';
//resources
import React from 'react';
import SEO from '@/config/seo';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface StoriesPageProps {
  slug: string;
}

export default function StoriesPage({ slug }: StoriesPageProps) {
  const router = useRouter();
  const findById = (artist: ArtistProps) => artist.id === slug;
  const artist = artists.find(findById);
  if (!artist) throw new Error("Artist don't exist");

  const content = {
    title: 'Compartilhe',
    subTitle: `Ajude ${artist.name} a ser escolhido como o Talento São João de Todos 2021`,
  };

  const path = {
    image: `/assets/artist/share/stories/${slug}.jpg`,
    back: `/share/${slug}`,
  };

  return (
    <Layout>
      <NextSeo {...SEO.page.stories} />
      <Container minH={600} mb={24} maxW={{ base: 'xs', sm: 'sm' }}>
        <Heading textAlign="center" mt={4} fontSize="4xl">
          {content.title}
        </Heading>

        <Text textAlign="center" my={10} fontSize="xl" lineHeight="150%">
          {content.subTitle}
        </Text>

        <Box
          borderRadius="2xl"
          pos="relative"
          h={560}
          overflow="hidden"
          border="6px solid red"
        >
          <Image src={path.image} layout="fill" objectFit="cover" />
        </Box>

        <Stack spacing={4} mt={8}>
          <Button onClick={() => router.push(path.image)}>Download</Button>
          <Button onClick={() => router.push(path.back)}>Voltar</Button>
        </Stack>
      </Container>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = artists.map((artist) => ({ params: { slug: artist.id } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      slug: context.params?.slug,
    },
  };
};
