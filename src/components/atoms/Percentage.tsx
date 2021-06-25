//chakra-ui
import { Text, TextProps } from '@chakra-ui/react';
//resources
import React from 'react';

interface PercentageProps extends TextProps {
  value: number;
}

export const Percentage = ({ value, ...props }: PercentageProps) => {
  const limit = value < 10 ? 4 : 5;
  return (
    <Text fontWeight="700" {...props}>
      {value ? `${String(value).slice(0, limit)}%` : '0%'}
    </Text>
  );
};

export default Percentage;
