import { Grid } from '@chakra-ui/react';
//next resources
import { GetStaticPaths, GetStaticProps } from 'next';
//types
import { ArtistProps } from '@/@types/artist';
//data
import artists from '@/data/static/artists';
//core components
import Card from '@/components/molecules/Card';
import Layout from '@/components/molecules/Layout';
import Button from '@/components/atoms/buttons/Button';
import Heading from '@/components/atoms/Heading';
import Container from '@/components/molecules/Container';
import ShareButton from '@/components/atoms/ShareButton';
//resources
import React from 'react';
import SEO from '@/config/seo';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { FiInstagram, FiMessageCircle } from 'react-icons/fi';

const content = {
  title: "Eu votei em",
  share: "Compartilhe"
}

interface SharePageProps {
  slug: string;
}

export default function SharePage({ slug }: SharePageProps) {
  const router = useRouter();
  const findById = (artist: ArtistProps) => artist.id === slug;
  const artist = artists.find(findById);
  if (!artist) throw new Error("Artist don't exist");
  return (
    <Layout>
      <NextSeo {...SEO.page.share} />
      <Container minH={600} mb={12} maxW={{ base: "xs", sm: "sm" }}>
        <Heading textAlign="center" mt={12} fontSize="4xl">
          {content.title}
        </Heading>

        <Card id={artist.id} name={artist.name} variant="share">
          <Button onClick={() => router.push("/")}>Vota novamente</Button>
        </Card>

        <Heading textAlign="center" mt={12} fontSize="2xl" mb={8}>
          {content.share}
        </Heading>

        <Grid templateColumns="repeat(3, 1fr)" w="full" maxW="sm">
          <ShareButton title="Stories" icon={FiInstagram} onClick={() => router.push("/result")}/>
          <ShareButton title="Feed" icon={FiInstagram} onClick={() => router.push("/result")}/>
          <ShareButton title="Whatsapp" icon={FiMessageCircle} onClick={() => router.push("/result")}/>
        </Grid>
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
