// context
import { VoteProvider } from '@/context/Vote';
import ThemeContainer from '@/context/ThemeContainer';
//resources
import React from 'react';
import SEO from "../../next-seo.config";
import NextNprogress from 'nextjs-progressbar';
import { nextNprogress } from '@/config/app';
import { DefaultSeo } from 'next-seo';

interface AppProviderProps {
  children: JSX.Element;
}

const AppProvider = ({ children }: AppProviderProps) => (
  <ThemeContainer>
    <VoteProvider>
      {children}
      <DefaultSeo {...SEO} />
      <NextNprogress {...nextNprogress} />
    </VoteProvider>
  </ThemeContainer>
);

export default AppProvider;
