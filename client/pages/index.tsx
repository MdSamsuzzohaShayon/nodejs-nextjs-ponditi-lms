// Typescript
/*
import React from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.scss';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import { GetStaticProps } from 'next';

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
*/

// JavaScript
/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/layouts/Layout';
import Section1 from '../components/home/Section1';
import { fetchAllClassTypesSearch } from '../redux/reducers/classtypeReducer';
import { fetchAllSubjectsSearch } from '../redux/reducers/subjectReducer';
import { fetchAllTuitionmsSearch } from '../redux/reducers/tuitionmReducer';
import { AppDispatch } from '../redux/store';

function Home() {
  let isMounted = true;

  const dispatch: AppDispatch = useDispatch();

  const isLoading = useSelector((state: any) => state.elements.isLoading);

  useEffect(() => {
    window.localStorage.removeItem('search');
    (async () => {
      if (isMounted) {
        await Promise.all([dispatch(fetchAllClassTypesSearch(null)), dispatch(fetchAllSubjectsSearch(null)), dispatch(fetchAllTuitionmsSearch(null))]);
      }
    })();
    isMounted = false;
  }, []);

  return (
    <Layout title="Home | Ponditi">
      <div className="Home">
        <Section1 />
        {/* <section className="section section-2 bg-secondary text-dark">
          <div className="container">
            <SearchForm />
          </div>
        </section> */}
      </div>
    </Layout>
  );
}

export default Home;
