import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../../components/layouts/Layout';
import ErrorMessages from '../../../components/elements/ErrorMessages';
import Loader from '../../../components/elements/Loader';
import ClassSubjectForm from '../../../components/user/Update/ClassSubjectForm';
import PersonalInformationForm from '../../../components/user/Update/PersonalInformationForm';
import ExamDetailForm from '../../../components/user/Update/ExamDetailForm';
import {
  fetchCurrentSingleUser,
  resetUpdateUser,
  setUpdatePart,
  setUpdateUser,
} from '../../../redux/reducers/userReducer';
import { fetchAllClassTypes } from '../../../redux/reducers/classtypeReducer';
import { fetchAllSubjects } from '../../../redux/reducers/subjectReducer';
import {
  toggleLoading,
  setErrorList,
  resetErrorList,
} from '../../../redux/reducers/elementsSlice';
import axios from '../../../config/axios';
import TutionDetail from '../../../components/user/Update/TutionDetail';

function index() {
  let isMounted = true;
  const router = useRouter();
  const dispatch = useDispatch();

  const updatePart = useSelector((state) => state.user.updatePart);
  const updateUser = useSelector((state) => state.user.updateUser);
  const authUserInfo = useSelector((state) => state.user.authUserInfo);
  const isLoading = useSelector((state) => state.elements.isLoading);

  const { userId } = router.query;

  const inputChangeHandler = (ice) => {
    ice.preventDefault();
    dispatch(setUpdateUser({ [ice.target.name]: ice.target.value }));
  };

  const displayContentPartwise = () => {
    // updatePart
    switch (updatePart) {
      case 1:
        return <ClassSubjectForm />;
      case 2:
        return (
          <PersonalInformationForm inputChangeHandler={inputChangeHandler} />
        );
      case 3:
        return <TutionDetail inputChangeHandler={inputChangeHandler} />;
      case 4:
        return <ExamDetailForm inputChangeHandler={inputChangeHandler} />;

      default:
        return <ClassSubjectForm />;
    }
  };
  useEffect(() => {
    if (userId) {
      const userIdInt = parseInt(userId, 10);
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
            dispatch(fetchCurrentSingleUser(userId)),
            dispatch(fetchAllClassTypes(null)),
            dispatch(fetchAllSubjects(null)),
          ]);
        })();
      }
      isMounted = false;
    }
  }, [router.isReady]);

  const userChangeHandler = async (uce) => {
    uce.preventDefault();
    try {
      dispatch(toggleLoading(true));
      const options = {
        headers: { 'Content-Type': 'application/json' },
      };

      //   console.log(currentUser);
      const response = await axios.put(
        `/user/update/${authUserInfo.id}`,
        updateUser,
        options
      );
      if (
        response.status === 202 ||
        response.status === 201 ||
        response.status === 200
      ) {
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

  const cancelBtnHandler = (cbe) => {
    cbe.preventDefault();
    router.push('user/dashboard');
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
                {/* // Update - classtype and subject  */}
                {displayContentPartwise()}
                <div className="row mx-0 mb-3">
                  <div className="col-md-12 d-flex">
                    <button className="btn btn-primary w-fit" type="submit">
                      Update
                    </button>
                    <button
                      className="btn btn-danger w-fit"
                      onClick={cancelBtnHandler}
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}

export default index;
