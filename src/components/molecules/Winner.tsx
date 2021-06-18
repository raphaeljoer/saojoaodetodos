
//resources
import React from "react";

//core-components
import Card from "./Card";

//types
import { ResultProps } from "@/@types/result";

interface WinnerProps { 
  results: ResultProps[];
};

export const Winner = ({ results }: WinnerProps) => {
  const winner = results.find(r => r.position === 1);
  if(!winner) return null;
  return <Card id={winner.id} name={winner.name} variant="share" />
};

export default Winner;
