import { ButtonProps } from "@chakra-ui/react";
import { Urlobject } from "url";

type Url = string | Urlobject;
export interface IButtonProps extends ButtonProps {
  label: string;
  link?: Url;
  onClick?: () => void;
}

export default IButtonProps;
