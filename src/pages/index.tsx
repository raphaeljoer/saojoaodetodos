//chakra-ui
import { Box, ButtonProps, Flex, FlexProps, Grid, GridProps, useToast } from "@chakra-ui/react";
//next resources
import { useRouter } from "next/router";
//core components
import Layout from "@/components/molecules/Layout";
import Heading from "@/components/atoms/Heading";
import Button from "@/components/atoms/buttons/Button";
import Container from "@/components/molecules/Container";
import Avatar from "@/components/atoms/Avatar";
//resources
import React, { useContext } from "react";
import { ui } from "@/config/app";
import { load } from 'recaptcha-v3';
import { NextSeo } from "next-seo";
import { VoteContext } from '@/context/Vote';
import SEO from "@/config/seo";
import axios from 'axios';
import artists from "@/data/static/artists";
import Recaptcha from "@/config/recaptcha";
import { Props } from "@/config/props";
import Card from "@/components/molecules/Card";

const gridProps: GridProps = {
  templateColumns: { base: "repeat(1, 1fr)", lg: "repeat(2 ,1fr)", xl: "repeat(3 ,1fr)" },
  gap: 8,
  gridRowGap: 32,
  justifyItems: "center",
  mt: 8,
  mb: 24,
};

const errorContent = {
  vote: {
    error: `Você ultrapassou o limite de voto ao mesmo tempo.
      Por favor aguarde para votar novamente.`,
  },
  token: {
    error: 'Precisamos validar o seu voto!',
  },
  recaptcha: {
    error: 'Precisamos validar o seu voto!',
  },
};

export default function Home() {
  const { siteKey, action } = Recaptcha.V3;
  const {
    isAvailable,
    setIsAvailable,

    isVoting,
    setIsVoting,

    choice,
    setChoice,

    handleAvailability,
    setLastVoteDateToStorage,

    CountDown,
  } = useContext(VoteContext);

  const router = useRouter();
  const toast = useToast()

  const handleSuccess = (id: string, name: string) => {
    toast({
      status: 'success',
      title: `Você votou em ${name}`,
      description: 'Você pode votar quantas vezes quiser!',
      variant: 'left-accent',
      position: 'top-right',
      isClosable: true,
    });

    setIsVoting(false);
    setChoice('');
    setLastVoteDateToStorage();
    setIsAvailable(false);
    handleAvailability();

    router.push(`/share/${id}`);
  };

  const handleError = (error: string) => {
    toast({
      status: 'error',
      title: 'Ops! Algo deu errado',
      description: error,
      variant: 'left-accent',
      position: 'top-right',
      isClosable: true,
    });

    setIsVoting(false);
    setChoice('');
  };

  const handleVote = async (id: string, name: string) => {
    toast({
      status: 'info',
      title: 'Aguarde!',
      description: 'Estamos processando o seu voto.',
      variant: 'left-accent',
      position: 'top-right',
      isClosable: true,
    });

    if (!siteKey) throw new Error("siteKey don't exist");

    setIsVoting(true);
    setChoice(id);

    const recaptcha = await load(siteKey);
    if (!recaptcha) handleError(errorContent.recaptcha.error);

    const token = await recaptcha.execute(action);
    if (!token) handleError(errorContent.token.error);

    const response = await axios({
      method: 'POST',
      url: '/api/vote',
      timeout: 60000,
      data: { id, token, action },
    });

    if (!response) handleError(errorContent.vote.error);

    handleSuccess(id, name);
  };

  return (
    <Layout>
      <NextSeo {...SEO.page.home} />
      <Container mt={32}>
        <Grid {...gridProps}>
          {artists.map(({ id, name }) => (
            <Card key={id} id={id} name={name} variant="vote">
              <Button
                onClick={() => handleVote(id, name)}
                isDisabled={!isAvailable}
                isLoading={isVoting}
                loadingText="Votando"
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
