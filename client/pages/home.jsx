/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../styles/Home.module.scss'; // We can create css file like this
import Layout from '../components/layouts/Layout';
import SearchForm from '../components/search/SearchForm';
import Section1 from '../components/home/Section1';
import { fetchAllClassTypesSearch } from '../redux/reducers/classtypeReducer';
import { fetchAllSubjectsSearch } from '../redux/reducers/subjectReducer';

export default function home() {
  let isMounted = true;
  const dispatch = useDispatch();

  useEffect(()=> {
    (async () => {
      if (isMounted) {
        await Promise.all([
          dispatch(fetchAllClassTypesSearch()),
          dispatch(fetchAllSubjectsSearch()),
        ]);
      }
    })();
    isMounted = false;
  }, []);

  return (
    <Layout>
      <div className={styles.wrapper}>
        <Section1 />
        <section className="section section-2 bg-secondary text-dark">
          <div className="container">
            <SearchForm />
          </div>
        </section>
      </div>
    </Layout>
  );
}
