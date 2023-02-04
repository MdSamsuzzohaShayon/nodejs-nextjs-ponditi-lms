import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleLoading, setErrorList } from '../../redux/reducers/elementsSlice';
import { initialSearchParams, setSearchParams, setSearchUserList, setSearchAllUserList, setRPTotalPage } from '../../redux/reducers/searchReducer';
import { fetchAllClassTypes, fetchAllClassTypesSearch, setClasstypeList } from '../../redux/reducers/classtypeReducer';
import { fetchAllSubjects, fetchAllSubjectsSearch, setSubjectList } from '../../redux/reducers/subjectReducer';
import { fetchAllTuitionms, fetchAllTuitionmsSearch, setTuitionmList } from '../../redux/reducers/tuitionmReducer';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import {SearchParamsInterface} from '../../types/redux/searchInterface';

import Layout from '../../components/layouts/Layout';
import SearchForm from '../../components/search/SearchForm';
import SearchResult from '../../components/search/SearchResult';
import Loader from '../../components/elements/Loader';

import axios from '../../config/axios';

function Search() {
  let isMounted = false;
  const dispatch = useAppDispatch();

  const searchParams = useAppSelector((state) => state.search.searchParams);
  // rp = result pagination
  const rpStart = useAppSelector((state) => state.search.rpStart);
  const rpTotal = useAppSelector((state) => state.search.rpTotal);

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
    } catch (error: any) {
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
          const searchParsedData: SearchParamsInterface = JSON.parse(searchData);
          dispatch(setSearchParams(searchParsedData));
        }

        (async () => {
          await Promise.all([dispatch(fetchAllClassTypesSearch(null)), dispatch(fetchAllSubjectsSearch(null)), dispatch(fetchAllTuitionmsSearch(null))]);
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
    <Layout title="Search Teacher | Ponditi">
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

export default Search;
