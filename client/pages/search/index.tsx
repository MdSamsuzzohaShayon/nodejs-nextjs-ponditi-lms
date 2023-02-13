// React/next
import React, { useEffect } from 'react';

// Redux
import { toggleLoading, setErrorList, resetErrorList } from '../../redux/reducers/elementsSlice';
import { initialSearchParams, setSearchParams, setSearchUserList, setSearchAllUserList, setRPTotalPage } from '../../redux/reducers/searchReducer';
import { fetchAllClassTypes, setClasstypeList } from '../../redux/reducers/classtypeReducer';
import { fetchAllSubjects, setSubjectList } from '../../redux/reducers/subjectReducer';
import { fetchAllTuitionms, setTuitionmList } from '../../redux/reducers/tuitionmReducer';
import { useAppSelector, useAppDispatch } from '../../redux/store';

// Types
import { SearchParamsInterface } from '../../types/redux/searchInterface';

// Components
import Layout from '../../components/layouts/Layout';
import SearchForm from '../../components/search/SearchForm';
import SearchResult from '../../components/search/SearchResult';
import Loader from '../../components/elements/Loader';

// Config/utils
import axios from '../../config/axios';

// Page component
function SearchIndex() {
  let isMounted = false;

  // Hooks
  const dispatch = useAppDispatch();

  // Redux state
  const searchParams = useAppSelector((state) => state.search.searchParams);
  const isLoading = useAppSelector((state) => state.elements.isLoading);
  const rpStart = useAppSelector((state) => state.search.rpStart); // rp = result pagination
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

  // Fetch class, subject, and tution medium
  useEffect(() => {
    if (isMounted === false) {
      dispatch(toggleLoading(true));
      if (JSON.stringify(initialSearchParams) === JSON.stringify(searchParams)) {
        // Set local storage from home page
        const searchData = localStorage.getItem('search');
        if (searchData) {
          const searchParsedData: SearchParamsInterface = JSON.parse(searchData);
          // Search params validation
          dispatch(resetErrorList());
          const errList = [];
          if (!searchParsedData.TuitionmId) {
            errList.push('You must need to select a tuition medium');
          }
          if (!searchParsedData.ClassTypeId) {
            errList.push('You must need to select a class');
          }
          if (!searchParsedData.SubjectId) {
            errList.push('You must need to select a subject');
          }
          if (errList.length > 0) {
            dispatch(setErrorList(errList));
          }
          dispatch(setSearchParams(searchParsedData));
        } else {
          dispatch(setErrorList(['You must need to select a tuition medium', 'You must need to select a class', 'You must need to select a subject']));
        }

        (async () => {
          await Promise.all([dispatch(fetchAllClassTypes(null)), dispatch(fetchAllSubjects(null)), dispatch(fetchAllTuitionms(null))]);
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
      {isLoading ? (
        <Loader />
      ) : (
        <div className="search">
          <div className="container">
            <SearchForm fromHome={false} />
          </div>
          <section className="section section-2 search-result">
            <div className="container">
              <SearchResult />
            </div>
          </section>
        </div>
      )}
    </Layout>
  );
}

export default SearchIndex;
