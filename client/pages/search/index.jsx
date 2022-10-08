import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  toggleLoading,
  setErrorList,
} from '../../redux/reducers/elementsSlice';
import {
  initialSearchParams,
  setSearchParams,
  setSearchUserList,
  setSearchAllUserList,
  setRPTotalPage,
  resetSearchUserList,
  setAllSubjectList
} from '../../redux/reducers/searchReducer';
import { fetchAllClassTypesSearch } from '../../redux/reducers/classtypeReducer';
import { fetchAllSubjectsSearch } from '../../redux/reducers/subjectReducer';

import Layout from '../../components/layouts/Layout';
import SearchForm from '../../components/search/SearchForm';
import SearchResult from '../../components/search/SearchResult';

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
      const response = await axios.get('/search/teacher', {
        params: searchParams,
      });
      // console.log(response);
      if (response.status === 200) {
        dispatch(setSearchAllUserList(response.data.teachers));
        const displayableItems = response.data.teachers.slice(rpStart, rpTotal);
        dispatch(setSearchUserList(displayableItems));
        dispatch(
          setRPTotalPage(Math.ceil(response.data.teachers.length / rpTotal))
        );
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
      if (error?.response?.status === 404) {
        dispatch(resetSearchUserList());
      }
    }
  };

  // get localstorage
  useEffect(() => {
    if (isMounted === false) {
      dispatch(toggleLoading(true));
      if (
        JSON.stringify(initialSearchParams) === JSON.stringify(searchParams)
      ) {
        // Set local storage from home page
        const searchData = localStorage.getItem('search');
        if (searchData) {
          dispatch(setSearchParams(JSON.parse(searchData)));
        }

        (async () => {
          if (isMounted === false) {
            await Promise.all([
              dispatch(fetchAllClassTypesSearch()),
              dispatch(fetchAllSubjectsSearch()),
            ]);

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
        <section className="section section-1 bg-secondary search-form">
          <div className="container">
            <SearchForm />
          </div>
        </section>
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
