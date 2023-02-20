// React/next
import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react';

// Components
import TutionDetail from '../../../components/user/Update/TutionDetail';
import ClassSubjectStudentForm from '../../../components/register/ClassSubjectStudentForm';
import Layout from '../../../components/layouts/Layout';
import Loader from '../../../components/elements/Loader';
import ClassSubjectForm from '../../../components/user/Update/ClassSubjectForm';
import PersonalInformationForm from '../../../components/user/Update/PersonalInformationForm';
import ExamDetailForm from '../../../components/user/Update/ExamDetailForm';
import MessageList from '../../../components/elements/MessageList';

// Redux
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { resetUpdateUser, setUpdatePart, setUpdateUser, setCurrentUser } from '../../../redux/reducers/userReducer';
import { fetchAllTuitionms } from '../../../redux/reducers/tuitionmReducer';
import { fetchAllClassTypes } from '../../../redux/reducers/classtypeReducer';
import { fetchAllSubjects } from '../../../redux/reducers/subjectReducer';
import { toggleLoading, setErrorList, resetErrorList } from '../../../redux/reducers/elementsSlice';

// Config/utils
import axios from '../../../config/axios';
import { roles } from '../../../config/keys';

const { TEACHER } = roles;

function UpdateIndex() {
  // Variables
  let isMounted = true;

  // Hooks
  const router = useRouter();
  const dispatch = useAppDispatch();
  const nidInputEl = useRef<HTMLInputElement | null>(null);

  // Local state
  const [userId, setUserId] = useState<number | null>(null);

  // Redux state
  const updatePart = useAppSelector((state) => state.user.updatePart);
  const updateUser = useAppSelector((state) => state.user.updateUser);
  const authUserInfo = useAppSelector((state) => state.user.authUserInfo);
  const isLoading = useAppSelector((state) => state.elements.isLoading);
  const educationUpdateList = useAppSelector((state) => state.education.educationUpdateList);
  const userTuitionmList = useAppSelector((state) => state.user.userTuitionmList);
  const userClassTypes = useAppSelector((state) => state.user.userClassTypes);

  // const { userId } = router.query;


  /**
   * ===============================================================
   * CHANGE INPUT VALUES
   */
  const inputChangeHandler = (ice: React.ChangeEvent<HTMLInputElement>) => {
    ice.preventDefault();
    dispatch(setUpdateUser({ [ice.target.name]: ice.target.value }));
  };

  const tuitionmChangeHandler = (tce: React.ChangeEvent<HTMLSelectElement>) => {
    const tuitionmId = parseInt(tce.target.value, 10);
    dispatch(setUpdateUser({ TuitionmId: [tuitionmId] }));
  };
  const classtypeChangeHandler = (tce: React.ChangeEvent<HTMLSelectElement>) => {
    const classtypeId = parseInt(tce.target.value, 10);
    dispatch(setUpdateUser({ ClassTypeId: [classtypeId] }));
  };


  /**
   * ===============================================================
   * FETCH ON MOUNT
   */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newUserId = params.get('userId');
    // console.log({ newUserId });
    if (newUserId !== null) {
      const userIdInt = parseInt(newUserId, 10);
      setUserId(userIdInt);
      if (userIdInt !== authUserInfo.id) {
        router.push('/user/dashboard');
      } else {
        const getUpdatePart = window.localStorage.getItem('updatePart');
        if (getUpdatePart) {
          dispatch(setUpdatePart(parseInt(getUpdatePart, 10)));
        }
        (async () => {
          //   console.log(authUserInfo);
          //   console.log({ userId, updatePart });
          // get subjects  / class types / user
          dispatch(resetErrorList());
          await Promise.all([dispatch(fetchAllTuitionms(null)), dispatch(fetchAllClassTypes(null)), dispatch(fetchAllSubjects(null))]);
        })();
      }
      isMounted = false;
    } else {
      // console.log({ newUserId });
      // router.push('/user/dashboard');
    }
  }, []);


    /**
   * ===============================================================
   * UPDATE USER INFO
   */
  const userChangeHandler = async (uce: React.ChangeEvent<HTMLFormElement>) => {
    uce.preventDefault();
    try {
      dispatch(toggleLoading(true));
      const options = {
        headers: { 'Content-Type': 'application/json' },
      };

      const userObj = structuredClone(updateUser);
      if (userObj.district === 'Select a district') {
        delete userObj.district;
      }

      //   console.log(currentUser);
      const response = await axios.put(`/user/update/${userId}`, userObj, options);
      if (response.status === 202 || response.status === 201 || response.status === 200) {
        // console.log(response);
        window.localStorage.removeItem('updatePart');
        dispatch(resetUpdateUser());
        dispatch(resetErrorList());
        router.push('/user/dashboard');
      }
    } catch (error: any) {
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

    /**
   * ===============================================================
   * CHANGE USER EXAM DETAILS
   */
  const userExamSubmitHandler = async (uce: React.FormEvent<HTMLFormElement>) => {
    uce.preventDefault();
    try {
      dispatch(toggleLoading(true));
      const controller = new AbortController();
      const options = {
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
      };
      const response = await axios.put(`/user/updateexam/${authUserInfo.id}`, { examlist: educationUpdateList }, options);
      controller.abort();
      if (response.status === 202 || response.status === 201 || response.status === 200) {
        // console.log(response);
        window.localStorage.removeItem('updatePart');
        dispatch(resetErrorList());
        router.push('/user/dashboard');
      }
    } catch (error: any) {
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


    /**
   * ===============================================================
   * UPDATE USER'S PERSONAL DETAILS
   */
  const personalInformationSubmitHandler = async (piue: React.FormEvent<HTMLFormElement>) => {
    // UPDATE FILE START
    // File validation succeed. now upload the file
    const formData = new FormData();
    piue.preventDefault();
    const fileExist = nidInputEl.current.files[0];
    // console.log(fileExist);
    console.log(nidInputEl.current.files[0], updateUser);
    for (const [key, value] of Object.entries(updateUser)) {
      console.log(`${key}: ${value}`);
      if(value !== '' || value !== null){
        formData.set(key, value)
      }
    }
    
    if (fileExist) {
      await formData.set('nid_proof', fileExist);
    }
    try {
      dispatch(toggleLoading(true));
      const controller = new AbortController();
      const options = {
        signal: controller.signal,
      };

      const response = await axios.put(`/user/updatepersonalinfo/${authUserInfo.id}`, formData, options);
      controller.abort();
      if (response.status === 202 || response.status === 201 || response.status === 200) {
        // console.log(response);
        // window.localStorage.removeItem('updatePart');
        dispatch(setCurrentUser({ image: response.data.image }));
        dispatch(resetErrorList());
        router.push('/user/dashboard');
      }
    } catch (error: any) {
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
    // UPDATE FILE ENDS
  };

  const cancelBtnHandler = (cbe: React.SyntheticEvent) => {
    cbe.preventDefault();
    window.localStorage.removeItem('updatePart');
    router.push('/user/dashboard'); // Solve this later
    // dispatch(setUpdatePart(1));
  };

  // Inside the form
  const displayContentPartwise = () => {
    // updatePart
    switch (updatePart) {
      case 1:
        return authUserInfo.role === TEACHER ? (
          <ClassSubjectForm cancelBtnHandler={cancelBtnHandler} />
        ) : (
          <ClassSubjectStudentForm
            selectedMedium={userTuitionmList[0] ? userTuitionmList[0].id : 0}
            selectedClassType={userClassTypes[0] ? userClassTypes[0].id : 0}
            tuitionmChangeHandler={tuitionmChangeHandler}
            classtypeChangeHandler={classtypeChangeHandler}
          />
        );

      case 3:
        return <TutionDetail inputChangeHandler={inputChangeHandler} />;

      default:
        return <ClassSubjectForm cancelBtnHandler={cancelBtnHandler} />;
    }
  };

  // Outside the form
  const changeWholeForm = () => {
    switch (updatePart) {
      case 2:
        return (
          <form onSubmit={personalInformationSubmitHandler}>
            <PersonalInformationForm inputChangeHandler={inputChangeHandler} nidInputEl={nidInputEl} />
            <div className="row mx-0 mb-3">
              <div className="col-md-12 d-flex">
                <button className="btn btn-primary w-fit" type="submit">
                  Update
                </button>
                <button className="btn btn-danger w-fit" onClick={cancelBtnHandler} type="button">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        );
      case 4:
        return (
          <form onSubmit={userExamSubmitHandler}>
            <ExamDetailForm inputChangeHandler={inputChangeHandler} nidInputEl={nidInputEl} />
            <div className="row mx-0 mb-3">
              <div className="col-md-12 d-flex">
                <button className="btn btn-primary w-fit" type="submit">
                  Update
                </button>
                <button className="btn btn-danger w-fit" onClick={cancelBtnHandler} type="button">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        );
      default:
        return (
          <form onSubmit={userChangeHandler}>
            {/* // Update - classtype and subject  */}
            {displayContentPartwise()}
            <div className="row mx-0 mb-3">
              <div className="col-md-12 d-flex">
                <button className="btn btn-primary w-fit" type="submit">
                  Update
                </button>
                <button className="btn btn-danger w-fit" onClick={cancelBtnHandler} type="button">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        );
    }
  };

  return (
    <Layout title="Update User | Ponditi">
      <div className="user-update">
        {isLoading ? (
          <Loader />
        ) : (
          <section className="section section-1">
            <MessageList />
            <div className="container">
              <div className="row mx-0 mb-3">
                <div className="col">
                  <h1 className="h1">Update user</h1>
                </div>
              </div>
              {changeWholeForm()}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}

export default UpdateIndex;
