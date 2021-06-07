import { Grid, Stack } from '@chakra-ui/react';
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
import Link from '@/components/atoms/Link';


interface SharePageProps {
  slug: string;
}

export default function SharePage({ slug }: SharePageProps) {
  const router = useRouter();
  const findById = (artist: ArtistProps) => artist.id === slug;
  const artist = artists.find(findById);
  if (!artist) throw new Error("Artist don't exist");

  const content = {
    title: "Eu votei em",
    share: "Compartilhe",
    whatsapp: `whatsapp://send?text=Vem com a gente votar e torcer para ${artist.name} como Talento São João de Todos 2021. Vote agora no site: https://talento.saojoaodetodos.com.br`
  }

  return (
    <Layout>
      <NextSeo {...SEO.page.share} />
      <Container minH={600} mb={24} maxW="lg">
        
        <Heading textAlign="center" mt={2}>
          {content.title}
        </Heading>

        <Card id={artist.id} name={artist.name} variant="share">
          <Stack spacing={4} w="full">
            <Link href="/result">
              <Button>Ver resultado parcial</Button>
            </Link>
            <Link href="/">
              <Button>Votar novamente</Button>
            </Link>
          </Stack>
        </Card>

        <Heading textAlign="center" mt={12} fontSize="2xl" mb={8}>
          {content.share}
        </Heading>

        <Grid templateColumns="repeat(3, 1fr)" w="full">
          <Link href={`/share/stories/${slug}`}>
            <ShareButton title="Stories" icon={FiInstagram} />
          </Link>
          <Link href={`/share/feed/${slug}`}>
            <ShareButton title="Feed" icon={FiInstagram} />
          </Link>
          <Link href={content.whatsapp} replace data-action="share/whatsapp/share">
            <ShareButton title="Whatsapp" icon={FiMessageCircle} />
          </Link>
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
