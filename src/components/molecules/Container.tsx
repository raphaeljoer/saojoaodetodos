import { Container as CkContainer, ContainerProps as CkContainerProps } from '@chakra-ui/react'

export interface ContainerProps extends CkContainerProps {
  children: any;
  subContainerProps?: CkContainerProps;
}

export const Container = ({ children, subContainerProps,...props }: ContainerProps) => {
  return (
    <CkContainer maxW="full" {...props}>
      <CkContainer maxW="container.xl" p={0} {...subContainerProps}>
        {children}
      </CkContainer >
    </CkContainer>
  )
};

export default Container;
