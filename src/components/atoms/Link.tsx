import * as NextLink from "next/link";
import * as ChakraLink from "@chakra-ui/react";
import React, { cloneElement } from "react";
import { useRouter } from "next/router";

type LinkProps = NextLink.LinkProps & ChakraLink.LinkProps;
interface IProps extends LinkProps {
  children: any;
  wait?: number;
  target?: "_blank" | "_self";
  onClick?: () => void;
  ckLinkProps?: ChakraLink.LinkProps;
}

export const Link = ({ href, children, wait, target, ckLinkProps, onClick, ...props }: IProps) => {
  const router = useRouter()
  const isAnchor = href.includes("#");

  const goTo = () => router.push(href);

  const handleClick = (e: Event) => {
    e.preventDefault();
    if (onClick) onClick();
    if (wait) setTimeout(goTo, wait);
    else goTo();
  };

  if (isAnchor) return cloneElement(children, { onClick: handleClick });

  return (
    <NextLink.default href={href} passHref {...props}>
      <ChakraLink.Link {...ckLinkProps} style={{ textDecoration: "none" }} target={target}>
        {cloneElement(children, { onClick })}
      </ChakraLink.Link>
    </NextLink.default>
  );
};

export default Link;
