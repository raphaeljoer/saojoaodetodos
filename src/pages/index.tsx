//chakra-ui
import { Alert, AlertIcon, Button, Grid, GridProps, useBreakpointValue, useToast } from "@chakra-ui/react";
//next resources
import { useRouter } from "next/router";
//core components
import Layout from "@/components/molecules/Layout";
import Container from "@/components/molecules/Container";
//resources
import React, { useContext } from "react";
import { load } from 'recaptcha-v3';
import { NextSeo } from "next-seo";
import { VoteContext } from '@/context/Vote';
import SEO from "@/config/seo";
import axios from 'axios';
import artists from "@/data/static/artists";
import Recaptcha from "@/config/recaptcha";
import Card from "@/components/molecules/Card";
import { ArtistProps } from "@/@types/artist";
import { Props } from "@/config/props";
import CardStatus from "@/components/molecules/CardStatus";
import { GetStaticProps } from "next";
import { getResults } from "@/data/request/results";
import { next } from "@/config/app";
import { ResultProps } from "@/@types/result";
import ToastSucess from "@/components/molecules/ToastResult";
import { CardResult } from "@/components/molecules/CardResult";

const gridProps: GridProps = {
  templateColumns: { base: "repeat(1, 1fr)", lg: "repeat(2 ,1fr)", xl: "repeat(3 ,1fr)" },
  gap: 8,
  gridRowGap: 32,
  justifyItems: "center",
  mt: 8,
};

const error = {
  vote: "Você ultrapassou o limite de voto ao mesmo tempo. Por favor aguarde para votar novamente.",
  token: "Precisamos validar o seu voto!",
  recaptcha: "Precisamos validar o seu voto!"
}

interface Vote {
  artist: ArtistProps;
  token: string;
}

interface HomePageProps {
  results: ResultProps[];
}

const displayCardStatus = (result: ResultProps) => {
  return (
    <CardStatus
      value={result}
      rounded="lg"
      color="oilblue.500"
      avatarProps={{ w: 16, h: 16, border: "none" }}
      nameProps={{ mb: 2 }}
      my={4}
      mr={2}
    />
  )
}

export default function HomePage({ results }: HomePageProps) {
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const toastPosition = isDesktop ? 'top-right' : 'top';
  const { siteKey } = Recaptcha.V3;
  const {
    isAvailable,
    setIsAvailable,

    isVoting,
    setIsVoting,

    setChoice,

    handleAvailability,
    setLastVoteDateToStorage,

    CountDown,
  } = useContext(VoteContext);

  const router = useRouter();
  const toast = useToast()

  const handleSuccess = ({ id, name }: ArtistProps) => {
    toast.closeAll();
    const result = results.find(r => r.id === id);

    toast({
      status: 'success',
      title: `Você votou em:`,
      description: result && displayCardStatus(result),
      variant: 'left-accent',
      position: toastPosition,
      isClosable: true,
    });

    setIsVoting(false);
    setChoice('');
    setLastVoteDateToStorage();
    setIsAvailable(false);
    handleAvailability();

    router.push(`/share/${id}`);
  };

  const handleError = (error: string, reason?: any) => {
    toast.closeAll();

    toast({
      status: 'error',
      title: 'Ops! Algo deu errado',
      description: error,
      variant: 'left-accent',
      position: toastPosition,
      isClosable: true
    });

    setIsVoting(false);
    setChoice('');

    throw new Error(reason);
  };

  const handleVote = ({ artist, token }: Vote) => {
    const { id } = artist;
    axios({
      method: 'POST',
      url: '/api/vote',
      timeout: 10000,
      data: { id, token },
    })
      .then(() => handleSuccess(artist))
      .catch(err => handleError(error.vote, err));
  }

  const validateVote = async (artist: ArtistProps) => {
    const action = `vote_${artist.id.replaceAll('-', '_')}`;

    if (!siteKey) {
      handleError(error.recaptcha);
      throw new Error("siteKey don't exist")
    };

    toast({
      status: 'info',
      title: 'Aguarde!',
      description: 'Estamos analisando o seu voto.',
      variant: 'left-accent',
      position: toastPosition,
      isClosable: true,
      duration: 10000,
    });

    setIsVoting(true);
    setChoice(artist.id);

    load(siteKey)
      .then(recaptcha => {
        recaptcha
          .execute(action)
          .then(token => handleVote({ artist, token }))
          .catch(err => handleError(error.token, err));
      })
      .catch(err => handleError(error.recaptcha, err));
  };

  return (
    <Layout>
      <NextSeo {...SEO.page.home} />
      <Container mt={16} mb={24}>
        <Grid {...gridProps}>
          {artists.map(a => (
            <Card key={a.id} {...a} variant="vote" isAvailable={isAvailable}>
              <Button
                onClick={() => validateVote(a)}
                isDisabled={!isAvailable}
                isLoading={isVoting}
                loadingText="Votando"
                _disabled={{ opacity: 0.7, cursor: "not-allowed" }}
              >
                {!isVoting && !isAvailable && <CountDown />}
                {!isVoting && isAvailable && 'Votar'}
              </Button>
            </Card>
          ))}
        </Grid>
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
