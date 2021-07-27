import { ResultProps } from '@/@Entities/result';
import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';
import CardStatus from './CardStatus';

interface ToastSuccessProps extends BoxProps {
  value: ResultProps;
}

const boxProps: BoxProps = {
  h: 'auto',
  rounded: 'lg',
  w: 'xs',
  bgColor: 'green.600',
  p: 6,
};

export const ToastSuccess = ({ value: v, ...props }: ToastSuccessProps) => {
  return (
    <Box {...boxProps} {...props}>
      <CardStatus value={v} />
    </Box>
  );
};

export default ToastSuccess;
