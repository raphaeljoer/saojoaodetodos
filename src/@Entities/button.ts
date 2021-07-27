import { ButtonProps } from '@chakra-ui/react';
import { UrlObject } from 'url';

type Url = string | UrlObject;

export interface IButtonProps extends ButtonProps {
  label: string;
  link?: Url;
  onClick?: () => void;
}

export default IButtonProps;
