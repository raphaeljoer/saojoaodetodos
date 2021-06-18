//core components
import Layout from "@/components/molecules/Layout";
import Container from "@/components/molecules/Container";
import Closed from "@/components/molecules/Closed";
import Poll from "@/components/molecules/Poll";
//resources
import React, {useEffect, useState} from "react";
import {isAfter} from "date-fns";
import {NextSeo} from "next-seo";
//config
import SEO from "@/config/seo";
import {next} from "@/config/app";
//next
import {GetStaticProps} from "next";
//data
import artists from "@/data/static/artists";
import {getResults} from "@/data/request/results";
//types
import {ResultProps} from "@/@types/result";

interface HomePageProps {
    results: ResultProps[];
}

export default function HomePage({results}: HomePageProps) {
    const [open, setOpen] = useState(true);
    const limitDate = new Date(2021, 5, 18, 23, 59, 59);
    const checkLimitDate = () => isAfter(new Date(), limitDate);

    useEffect(() => {
        checkLimitDate() ? setOpen(false) : setOpen(true);
        setInterval(() => checkLimitDate() && setOpen(false), 1000);
    });

    return (
        <Layout>
            <NextSeo {...SEO.page.home} />
            <Container mt={16} mb={24}>
                {open ? <Poll artists={artists} results={results}/> : <Closed/>}
            </Container>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            results: await getResults(),
        },
        revalidate: next.revalidate.fiveMinutes,
    };
};
