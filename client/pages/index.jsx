/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../config/axios';
import styles from '../styles/Home.module.scss'; // We can create css file like this
import Layout from '../components/layouts/Layout';
import { setErrorList } from '../redux/reducers/elementsSlice';
import { setClasstypeList } from '../redux/reducers/classtypeReducer';
import { setSubjectList } from '../redux/reducers/subjectReducer';
import {
  setNewClasstypeList,
  setNewSubjectList,
} from '../redux/reducers/searchReducer';

export default function Home() {
  let isMounted = false;
  const dispatch = useDispatch();

  const newClasstypeList = useSelector(
    (state) => state.search.newClasstypeList
  );
  const newSubjectList = useSelector((state) => state.search.newSubjectList);
  const searchParams = useSelector((state) => state.search.searchParams);
  const searchTypes = useSelector((state) => state.search.searchTypes);

  const fetchAllClassType = async () => {
    try {
      const response = await axios.get('/classtype/all');
      if (response.status === 200) {
        // dispatch(setClasstypeList(response.data.classTypes));
        const defaultItem = { id: 0, name: 'Any Class' };
        dispatch(
          setNewClasstypeList([defaultItem, ...response.data.classTypes])
        );
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
    }
  };

  // Initial subject list
  const fetchAllSubject = async () => {
    try {
      const response = await axios.get('/subject/all');
      if (response.status === 200) {
        // console.log(response);
        // dispatch(setSubjectList(response.data.subjects));
        const defaultItem = { id: 0, name: 'Any Subject' };
        dispatch(setNewSubjectList([defaultItem, ...response.data.subjects]));
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (isMounted === false) {
        await Promise.all([fetchAllClassType(), fetchAllSubject()]);
      }
    })();
    isMounted = true;
  }, []);

  const classtypeChangeHandler = () => {};
  const subectChangeHandler = () => {};

  return (
    <Layout>
      <div className={styles.wrapper}>
        <section className="section section-1 py-5" id="home-section">
          <div className="container d-flex justify-content-between">
            <div className="caption">
              <h1>Deliver Better Learning Through Better Teacher</h1>
              <p>
                Offer engaging learning experiences that go beyond traditional
                Learning Management Systems. packed with advanced features to
                find teachers, educate yourself,{' '}
              </p>
            </div>
            <div className="learner text-end">
              <img
                src="/shape/learner.svg"
                alt="learner"
                className="learner-img"
              />
            </div>
          </div>
        </section>
        <section className="section section-2 bg-secondary text-dark">
          <div className="container">
            <form className="py-4">
              <div className="row mx-0 mb-3">
                <div className="col-md-6">
                  <label htmlFor="location">Location</label>
                  <div className="input-group mb-3">
                    <span
                      className="input-group-text bg-white"
                      id="basic-addon1"
                    >
                      <img src="/icons/location.svg" alt="" />
                    </span>
                    <input
                      type="text"
                      className="form-control border-0 shadow-none"
                      name="location"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="classtype">Class</label>
                  <div className="input-group mb-3">
                    <span
                      className="input-group-text bg-white"
                      id="basic-addon1"
                    >
                      <img src="/icons/classtype.svg" alt="" />
                    </span>
                    <select
                      name="classtype"
                      id="classtype"
                      className="form-control border-0 shadow-none"
                      onChange={classtypeChangeHandler}
                      defaultValue={searchParams.classtype}
                    >
                      {newClasstypeList.length > 0 ? (
                        newClasstypeList.map((ctl) => (
                          <option key={ctl.id} value={ctl.id}>
                            {ctl.name}
                          </option>
                        ))
                      ) : (
                        <option value="">Any Class</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row mx-0 mb-3">
                <div className="col-md-6">
                  <label htmlFor="subject">Subject</label>
                  <div className="input-group mb-3">
                    <span
                      className="input-group-text bg-white"
                      id="subject-addon"
                    >
                      <img src="/icons/subject.svg" alt="" />
                    </span>
                    <select
                      name="subject"
                      id="subject"
                      className="form-control border-0 shadow-none"
                      onChange={subectChangeHandler}
                      defaultValue={searchParams.subject}
                    >
                      {newSubjectList.length > 0 ? (
                        newSubjectList.map((ctl) => (
                          <option key={ctl.id} value={ctl.id}>
                            {ctl.name}
                          </option>
                        ))
                      ) : (
                        <option value="">Any Subject</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="classtype">Types</label>
                  <div className="input-group mb-3">
                    <span
                      className="input-group-text bg-white"
                      id="subject-addon"
                    >
                      <img src="/icons/classtype.svg" alt="" />
                    </span>
                    <select
                      name="types"
                      id="classtype"
                      className="form-control border-0 shadow-none"
                      defaultValue={searchParams.types}
                    >
                      {searchTypes.length > 0 ? (
                        searchTypes.map((ctl, idx) => (
                          <option key={idx} value={ctl}>
                            {ctl}
                          </option>
                        ))
                      ) : (
                        <option value="">Any Types</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row mx-0 mb-3">
                <button
                  className="btn btn-primary w-fit text-uppercase mx-3s"
                  role="button"
                >
                  Search Teacher
                </button>
              </div>
              <div className="row mx-0 mb-3">
                <a href="#" className="text-danger">
                  Advanced search
                </a>
              </div>
            </form>
          </div>
        </section>
      </div>
    </Layout>
  );
}
