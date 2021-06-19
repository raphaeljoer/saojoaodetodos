
//chakra-ui
import { Text, Heading } from "@chakra-ui/react";
//resources
import React from "react";
//core-components
import Card from "./Card";
//types
import { ResultProps } from "@/@types/result";
import * as Format from "@/utils/format/number";
interface WinnerProps {
  results: ResultProps[];
};

export const Winner = ({ results }: WinnerProps) => {
  const winner = results.find(r => r.position === 1);
  if (!winner) return null;
  return (
    <>
      <Heading>🏆</Heading>
      <Heading>Vencedor</Heading>
      <Card id={winner.id} name={winner.name} variant="share">
        <Text textAlign="center" color="white" fontSize="xl">
          {`com ${Format.intl(winner.votes)} votos ${winner.name} é o vencedora do Talento São João de Todos 2021`}
        </Text>
      </Card>
    </>
  )
};

export default Winner;
