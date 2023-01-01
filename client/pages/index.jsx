/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/layouts/Layout';
import Section1 from '../components/home/Section1';
import { fetchAllClassTypes, fetchAllClassTypesSearch } from '../redux/reducers/classtypeReducer';
import { fetchAllSubjects, fetchAllSubjectsSearch } from '../redux/reducers/subjectReducer';
import { fetchAllTuitionms, fetchAllTuitionmsSearch } from '../redux/reducers/tuitionmReducer';

export default function home() {
  let isMounted = true;


  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.elements.isLoading);

  useEffect(() => {
    window.localStorage.removeItem('search');
    (async () => {
      if (isMounted) {
        await Promise.all([dispatch(fetchAllClassTypesSearch()), dispatch(fetchAllSubjectsSearch()), dispatch(fetchAllTuitionmsSearch())]);
      }
    })();
    isMounted = false;
  }, []);

  return (
    <Layout>
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
