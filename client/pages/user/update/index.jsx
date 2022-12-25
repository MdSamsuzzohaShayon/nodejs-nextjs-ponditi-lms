import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../../components/layouts/Layout';
import ErrorMessages from '../../../components/elements/ErrorMessages';
import Loader from '../../../components/elements/Loader';
import ClassSubjectForm from '../../../components/user/Update/ClassSubjectForm';
import PersonalInformationForm from '../../../components/user/Update/PersonalInformationForm';
import ExamDetailForm from '../../../components/user/Update/ExamDetailForm';
import ImageUpdateForm from '../../../components/user/Update/ImageUpdateForm';
import { fetchCurrentSingleUser, resetUpdateUser, setUpdatePart, setUpdateUser } from '../../../redux/reducers/userReducer';
import { fetchAllTuitionms } from '../../../redux/reducers/tuitionmReducer';
import { fetchAllClassTypes } from '../../../redux/reducers/classtypeReducer';
import { fetchAllSubjects } from '../../../redux/reducers/subjectReducer';
import { toggleLoading, setErrorList, resetErrorList } from '../../../redux/reducers/elementsSlice';
import axios from '../../../config/axios';
import TutionDetail from '../../../components/user/Update/TutionDetail';

function index() {
  let isMounted = true;
  const router = useRouter();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState(null);

  const updatePart = useSelector((state) => state.user.updatePart);
  const updateUser = useSelector((state) => state.user.updateUser);
  const authUserInfo = useSelector((state) => state.user.authUserInfo);
  const isLoading = useSelector((state) => state.elements.isLoading);
  const educationUpdateList = useSelector((state) => state.education.educationUpdateList);

  // const { userId } = router.query;

  const inputChangeHandler = (ice) => {
    ice.preventDefault();
    dispatch(setUpdateUser({ [ice.target.name]: ice.target.value }));
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newUserId = params.get('userId');
    // console.log({ newUserId });
    if (newUserId !== null) {
      const userIdInt = parseInt(newUserId, 10);
      setUserId(newUserId);
      if (userIdInt !== authUserInfo.id) {
        router.push('/user/dashboard');
      } else {
        const getUpdatePart = window.localStorage.getItem('updatePart');
        dispatch(setUpdatePart(parseInt(getUpdatePart, 10)));
        (async () => {
          //   console.log(authUserInfo);
          //   console.log({ userId, updatePart });
          // get subjects  / class types / user
          dispatch(resetErrorList());
          await Promise.all([
            dispatch(fetchCurrentSingleUser(newUserId)),
            dispatch(fetchAllTuitionms(null)),
            dispatch(fetchAllClassTypes(null)),
            dispatch(fetchAllSubjects(null)),
          ]);
        })();
      }
      isMounted = false;
    } else {
      // console.log({ newUserId });
      // router.push('/user/dashboard');
    }
  }, []);

  const userChangeHandler = async (uce) => {
    uce.preventDefault();
    try {
      dispatch(toggleLoading(true));
      const options = {
        headers: { 'Content-Type': 'application/json' },
      };

      //   console.log(currentUser);
      const response = await axios.put(`/user/update/${authUserInfo.id}`, updateUser, options);
      if (response.status === 202 || response.status === 201 || response.status === 200) {
        // console.log(response);
        window.localStorage.removeItem('updatePart');
        dispatch(resetUpdateUser());
        dispatch(resetErrorList());
        router.push('/user/dashboard');
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

  const userExamSubmitHandler = async (uce) => {
    uce.preventDefault();
    try {
      dispatch(toggleLoading(true));
      const controller = new AbortController();
      const options = {
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
      };
      // Remove updateUserExam
      const newObj = educationUpdateList.filter((uel) => {
        if (uel.level && uel.level !== '' && uel.cgpa && uel.cgpa !== '' && uel.passing_year && uel.passing_year !== '') {
          // console.log(uel);
          return uel;
        }
        return null;
      });

      if (newObj.length > 0) {
        // console.log(newObj);
        //   console.log(currentUser);
        const response = await axios.put(`/user/updateexam/${authUserInfo.id}`, { examlist: newObj }, options);
        controller.abort();
        if (response.status === 202 || response.status === 201 || response.status === 200) {
          // console.log(response);
          window.localStorage.removeItem('updatePart');
          dispatch(resetErrorList());
          router.push('/user/dashboard');
        }
      } else {
        dispatch(setErrorList(['Make sure to put result and passing year in order to update']));
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

  const cancelBtnHandler = (cbe) => {
    cbe.preventDefault();
    // router.push('/user/dashboard'); // Solve this later
  };

  const displayContentPartwise = () => {
    // updatePart
    switch (updatePart) {
      case 1:
        return <ClassSubjectForm />;
      case 2:
        return <PersonalInformationForm inputChangeHandler={inputChangeHandler} />;
      case 3:
        return <TutionDetail inputChangeHandler={inputChangeHandler} />;
      // case 4: // Direct from return because it is using diffrent form element
      //   return <ExamDetailForm inputChangeHandler={inputChangeHandler} />;

      default:
        return <ClassSubjectForm cancelBtnHandler={cancelBtnHandler} />;
    }
  };

  const changeWholeForm = () => {
    switch (updatePart) {
      case 4:
        return (
          <form onSubmit={userExamSubmitHandler}>
            <ExamDetailForm inputChangeHandler={inputChangeHandler} />
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
      case 5:
        return <ImageUpdateForm />;
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
    <Layout>
      <div className="user-update">
        <ErrorMessages />
        {isLoading ? (
          <Loader />
        ) : (
          <section className="section section-1">
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

export default index;
