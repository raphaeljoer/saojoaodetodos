import { ArtistProps } from '@/@types/artist';
import { ResultProps } from '@/@types/result';
import { load } from 'recaptcha-v3';
import * as Recaptcha from '@/config/recaptcha/v3';
import { VoteContext } from '@/context/Vote';
import {
  Button,
  Grid,
  GridProps,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Card from './Card/Card';
import CardStatus from './CardStatus';

const gridProps: GridProps = {
  templateColumns: {
    base: 'repeat(1, 1fr)',
    lg: 'repeat(2 ,1fr)',
    xl: 'repeat(3 ,1fr)',
  },
  gap: 8,
  gridRowGap: 32,
  justifyItems: 'center',
  mt: 8,
};

const error = {
  vote: 'Você ultrapassou o limite de voto ao mesmo tempo. Por favor aguarde para votar novamente.',
  token: 'Precisamos validar o seu voto!',
  recaptcha: 'Precisamos validar o seu voto!',
};

const displayCardStatus = (result: ResultProps) => {
  return (
    <CardStatus
      value={result}
      rounded="lg"
      color="oilblue.500"
      avatarProps={{ w: 16, h: 16, border: 'none' }}
      nameProps={{ mb: 2 }}
      my={4}
      mr={2}
    />
  );
};

interface Vote {
  artist: ArtistProps;
  token: string;
}

interface PollProps {
  artists: ArtistProps[];
  results: ResultProps[];
}

export const Poll = ({ artists, results }: PollProps) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const toastPosition = isDesktop ? 'top-right' : 'top';
  const { siteKey } = Recaptcha;
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
  const toast = useToast();

  const handleSuccess = ({ id }: ArtistProps) => {
    toast.closeAll();
    const result = results.find((r) => r.id === id);

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
      isClosable: true,
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
      .catch((err) => handleError(error.vote, err));
  };

  const validateVote = async (artist: ArtistProps) => {
    const action = `vote_${artist.id.split('-').join('_')}`;

    if (!siteKey) {
      handleError(error.recaptcha);
      throw new Error("siteKey don't exist");
    }

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
      .then((recaptcha) => {
        recaptcha
          .execute(action)
          .then((token) => handleVote({ artist, token }))
          .catch((err) => handleError(error.token, err));
      })
      .catch((err) => handleError(error.recaptcha, err));
  };

  return (
    <Grid {...gridProps}>
      {artists.map((a) => (
        <Card key={a.id} {...a} isAvailable={isAvailable}>
          <Button
            onMouseUp={() => validateVote(a)}
            isDisabled={!isAvailable}
            isLoading={isVoting}
            loadingText="Votando"
            _disabled={{ opacity: 0.7, cursor: 'not-allowed' }}
          >
            {!isVoting && !isAvailable && <CountDown />}
            {!isVoting && isAvailable && 'Votar'}
          </Button>
        </Card>
      ))}
    </Grid>
  );
};

export default Poll;
