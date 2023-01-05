import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleLoading, setErrorList } from '../../redux/reducers/elementsSlice';
import { initialSearchParams, setSearchParams, setSearchUserList, setSearchAllUserList, setRPTotalPage } from '../../redux/reducers/searchReducer';
import { fetchAllClassTypes, fetchAllClassTypesSearch, setClasstypeList } from '../../redux/reducers/classtypeReducer';
import { fetchAllSubjects, fetchAllSubjectsSearch, setSubjectList } from '../../redux/reducers/subjectReducer';
import { fetchAllTuitionms, fetchAllTuitionmsSearch, setTuitionmList } from '../../redux/reducers/tuitionmReducer';

import Layout from '../../components/layouts/Layout';
import SearchForm from '../../components/search/SearchForm';
import SearchResult from '../../components/search/SearchResult';
import Loader from '../../components/elements/Loader';

import axios from '../../config/axios';

function search() {
  let isMounted = false;
  const dispatch = useDispatch();

  const searchParams = useSelector((state) => state.search.searchParams);
  // rp = result pagination
  const rpStart = useSelector((state) => state.search.rpStart);
  const rpTotal = useSelector((state) => state.search.rpTotal);

  // Search on mount
  const initialSearchUsers = async () => {
    try {
      dispatch(toggleLoading(true));
      const response = await axios.get('/search/teacher', {
        params: searchParams,
      });
      // console.log(response);
      if (response.status === 200) {
        dispatch(setSearchAllUserList(response.data.teachers));
        const displayableItems = response.data.teachers.slice(rpStart, rpTotal);
        dispatch(setSearchUserList(displayableItems));
        dispatch(setRPTotalPage(Math.ceil(response.data.teachers.length / rpTotal)));
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
    } finally {
      dispatch(toggleLoading(false));
    }
  };

  // get localstorage
  useEffect(() => {
    if (isMounted === false) {
      dispatch(toggleLoading(true));
      if (JSON.stringify(initialSearchParams) === JSON.stringify(searchParams)) {
        // Set local storage from home page
        const searchData = localStorage.getItem('search');
        if (searchData) {
          dispatch(setSearchParams(JSON.parse(searchData)));
        }

        (async () => {
          if (isMounted === false) {
            await Promise.all([dispatch(fetchAllClassTypesSearch()), dispatch(fetchAllSubjectsSearch()), dispatch(fetchAllTuitionmsSearch())]);
          }
        })();
      }
      // console.log(searchData);
      // set search params if there is no params availabl

      initialSearchUsers().catch((err) => console.log(err));
      dispatch(toggleLoading(false));
    }
    isMounted = true;
  }, []);

  return (
    <Layout>
      <div className="search">
        <div className="container">
          <SearchForm />
        </div>
        <section className="section section-2 search-result">
          <div className="container">
            <SearchResult />
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default search;
