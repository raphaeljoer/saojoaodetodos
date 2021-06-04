//chakra-ui
import { Grid, GridProps, useBreakpointValue, useToast } from "@chakra-ui/react";
//next resources
import { useRouter } from "next/router";
//core components
import Layout from "@/components/molecules/Layout";
import Button from "@/components/atoms/buttons/Button";
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

export default function HomePage() {
  const isDesktop = useBreakpointValue({base: false, lg: true})
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
    toast({
      status: 'success',
      title: `Você votou em ${name}`,
      description: 'Você pode votar quantas vezes quiser!',
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
      <Container my={16}>
        <Grid {...gridProps}>
          {artists.map(a => (
            <Card key={a.id} {...a} variant="vote">
              <Button
                onClick={() => validateVote(a)}
                isDisabled={!isAvailable}
                isLoading={isVoting}
                loadingText="Votando"
                {...Props.Button.card}
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
