/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleLoading,
  setErrorList,
} from '../../redux/reducers/elementsSlice';
import {
  toggleAuthUser,
  setCurrentUser,
} from '../../redux/reducers/userReducer';
import { setSubjectList, fetchAllSubjects} from '../../redux/reducers/subjectReducer';
import { setClasstypeList, fetchAllClassTypes} from '../../redux/reducers/classtypeReducer';
import Layout from '../../components/layouts/Layout';
import Step1 from '../../components/register/Step1';
import Step2 from '../../components/register/Step2';
import Step3 from '../../components/register/Step3';
import { roles } from '../../config/keys';
import axios from '../../config/axios';
import Loader from '../../components/elements/Loader';
import ErrorMessages from '../../components/elements/ErrorMessages';

const { ADMIN } = roles;

function update() {
  let isMounted = false;
  let isFetched = false;
  const router = useRouter();
  const dispatch = useDispatch();

  const authUserInfo = useSelector((state) => state.user.authUserInfo);
  const currentUser = useSelector((state) => state.user.currentUser);
  const isLoading = useSelector((state) => state.elements.isLoading);
  const classtypeList = useSelector((state) => state.classtype.classtypeList);
  const subjectList = useSelector((state) => state.subject.subjectList);

  /*
  const fetchAllSubject = async () => {
    try {
      // dispatch(toggleLoading(true));
      // console.log('try');
      const response = await axios.get('/subject/all');
      if (response.status === 200) {
        // console.log(response);
        dispatch(setSubjectList(response.data.subjects));
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
    } finally {
      // console.log('finally');
      // dispatch(toggleLoading(false));
    }
  };
  const fetchAllClassType = async () => {
    try {
      // dispatch(toggleLoading(true));
      // console.log('try');
      const response = await axios.get('/classtype/all');
      if (response.status === 200) {
        // console.log(response);
        dispatch(setClasstypeList(response.data.classTypes));
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
    } finally {
      // console.log('finally');
      // dispatch(toggleLoading(false));
    }
  };
  */


  useEffect(() => {
    if (isMounted === false) {
      dispatch(toggleLoading(true));
      const user = localStorage.getItem('user');
      // console.log(user);
      if (user === null) {
        dispatch(toggleAuthUser(false));
        router.push('/user/login');
      } else {
        dispatch(toggleAuthUser(true));
        const userData = JSON.stringify(user);
        if (userData.role === ADMIN) {
          router.push('/admin');
        }
        // fetchAllClassType().catch((err) => console.log(err));
        dispatch(fetchAllClassTypes(null));
        // fetchAllSubject().catch((err) => console.log(err));
        dispatch(fetchAllSubjects(null));
      }
      dispatch(toggleLoading(false));
    }
    isMounted = true;
  }, []);

  const fetchSingleUser = async (userId) => {
    try {
      dispatch(toggleLoading(true));
      // console.log('try');
      const response = await axios.get(`/user/single/${userId}`);
      if (response.status === 200) {
        // console.log(response);
        // const newUser = Object.assign(currentUser, response.data.user);
        dispatch(setCurrentUser({ ...response.data.user }));
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

  useEffect(() => {
    if (authUserInfo.id) {
      // console.log(authUserInfo);
      fetchSingleUser(authUserInfo.id).catch((err) => console.log(err));
      isFetched = true;
    }
  }, [authUserInfo]);

  const inputChangeHandler = (iche) => {
    dispatch(setCurrentUser({ [iche.target.name]: iche.target.value }));
  };

  const classtypeInputChangeHandler = (iche) => {
    const val = parseInt(iche.target.value, 10);
    // ClassTypeId
    dispatch(setCurrentUser({ ClassTypeId: [val] }));
    const newSubjectList = classtypeList.find((ctl) => ctl.id === val).Subjects;
    if (newSubjectList.length === 1) {
      dispatch(setCurrentUser({ SubjectId: [newSubjectList[0].id] }));
      dispatch(setSubjectList(newSubjectList));
    } else {
      dispatch(setSubjectList(newSubjectList));
    }
  };
  const subjectInputChangeHandler = (iche) => {
    const val = parseInt(iche.target.value, 10);
    console.log(iche);
    // ClassTypeId
    dispatch(setCurrentUser({ SubjectId: [val] }));
  };


  const userChangeHandler = async (uche) => {
    uche.preventDefault();
    try {
      dispatch(toggleLoading(true));
      if (authUserInfo.id) {
        const options = {
          headers: { 'Content-Type': 'application/json' },
        };
        const response = await axios.put(
          `/user/update/${authUserInfo.id}`,
          currentUser,
          options
        );
        if (
          response.status === 202 ||
          response.status === 201 ||
          response.status === 200
        ) {
          console.log(response);
          // const newUser = Object.assign(currentUser, response.data.user);
          dispatch(setCurrentUser({ ...response.data.user }));
        }
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
      if (error?.response?.status === 401 || error?.response?.status === 405) {
        window.localStorage.removeItem('user');
        router.push('/user/login');
      }
    } finally {
      dispatch(toggleLoading(false));
    }
  };

  return (
    <Layout>
      <div className="user-update">
        <ErrorMessages />
        {isLoading ? (
          <Loader />
        ) : (
          <section className="section section-1">
            <div className="container">
              <h1>Update user</h1>
              <form onSubmit={userChangeHandler}>
                <Step1
                  inputChangeHandler={inputChangeHandler}
                  nextStepHandler={null}
                  update
                />
                <Step2
                  inputChangeHandler={inputChangeHandler}
                  nextStepHandler={null}
                  update
                />

                {/* // Update - classtype and subject  */}
                <div className="row mx-0 mb-3">
                  <div className="col-md-6">
                    <label htmlFor="name">Preferred Classes</label>
                    <select
                      name="ClassTypeId"
                      id="ClassTypeId"
                      className="form-control"
                      onChange={classtypeInputChangeHandler}
                    >
                      {/* <option value=""></option> */}
                      {classtypeList.map((ctl) => (
                        <option value={ctl.id} key={ctl.id}>
                          {ctl.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="name">Preferred Subjects</label>
                    <select
                      name="SubjectId"
                      id="SubjectId"
                      className="form-control"
                      onChange={subjectInputChangeHandler}
                    >
                      {/* <option value=""></option> */}
                      {subjectList.map((sl) => (
                        <option value={sl.id} key={sl.id}>
                          {sl.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Hourly rate  */}

                <Step3 inputChangeHandler={inputChangeHandler} update />
              </form>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}

export default update;
