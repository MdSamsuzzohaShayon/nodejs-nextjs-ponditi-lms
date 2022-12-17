import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { REGISTER, CLASS_SUB } from '../../../../config/keys';
import { resetErrorList, setErrorList, toggleLoading, setNoValidate } from '../../../../redux/reducers/elementsSlice';
import { fetchAllClassTypes } from '../../../../redux/reducers/classtypeReducer';
import { fetchAllSubjects } from '../../../../redux/reducers/subjectReducer';
import { fetchAllTuitionms } from '../../../../redux/reducers/tuitionmReducer';
import { resetUser, setSelectedStep } from '../../../../redux/reducers/userReducer';
import Layout from '../../../../components/layouts/Layout';
import RegistrationForm from '../../../../components/register/RegistrationForm';
import ClassSubjectForm from '../../../../components/user/Update/ClassSubjectForm';
import TsSelect from '../../../../components/register/TsSelect';
import Loader from '../../../../components/elements/Loader';
import ErrorMessages from '../../../../components/elements/ErrorMessages';
import axios from '../../../../config/axios';

function Registration() {
  let isMounted = true;
  let validationPassed = true;
  const router = useRouter();
  const dispatch = useDispatch();

  const selectedStep = useSelector((state) => state.user.selectedStep);
  const isLoading = useSelector((state) => state.elements.isLoading);

  const userInfo = useSelector((state) => state.user.currentUser);
  const selectedTuitionmList = useSelector((state) => state.tuitionm.selectedTuitionmList);
  const selectedClasstypeList = useSelector((state) => state.classtype.selectedClasstypeList);
  const selectedSubjectList = useSelector((state) => state.subject.selectedSubjectList);

  const noValidate = useSelector((state) => state.elements.noValidate);

  const { userId } = router.query;

  const registerHandler = async (rhe) => {
    rhe.preventDefault();

    dispatch(setNoValidate(false));
    console.log({ validationPassed });
    if (validationPassed === false) return null;

    // if (selectedClasstypeList.length === 0 || selectedSubjectList.length === 0) {
    //   return dispatch(setErrorList(['Please select a preffered class and a preffered subject']));
    // }

    try {
      dispatch(toggleLoading(true));
      const userObj = { ...userInfo };
      userObj.SubjectId = selectedSubjectList;
      userObj.ClassTypeId = selectedClasstypeList;
      userObj.TuitionmId = selectedTuitionmList;
      // console.log(userObj);
      const response = await axios.put(`/user/register/${userId}`, userObj, {
        headers: { 'Content-Type': 'application/json' },
      });
      // console.log(response);
      if (response.status === 202 || response.status === 201 || response.status === 200) {
        dispatch(resetErrorList());
        // dispatch(setUserFormsType(SEND_CODE));
        dispatch(resetUser());
        router.push('/user/login');
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      } else {
        dispatch(setErrorList([JSON.stringify(error.response.data)]));
      }
    } finally {
      dispatch(toggleLoading(false));
    }
    return null;
  };

  const stepBtnHandler = (sbhe, stepNo) => {
    sbhe.preventDefault();
    // validate previous state
    /**
     * @validate
     */
    if (stepNo === 2) {
      dispatch(setNoValidate(false));
      console.log({ validationPassed });
      if (validationPassed === false) return null;
    }
    /**     
    if (stepNo === 2) {
      if (
        userInfo.firstname === '' ||
        userInfo.phone === '' ||
        userInfo.lastname === '' ||
        userInfo.password === '' ||
        userInfo.password2 === '' ||
        userInfo.email === ''
      ) {
        return dispatch(setErrorList(['Fill all fields to go to the next step']));
      }
      if (userInfo.password !== userInfo.password2) {
        return dispatch(setErrorList(['Password did not patch']));
      }
      dispatch(resetErrorList());

      // const filter =
      //   /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      // if (filter.test(userInfo.email)) {
      //   // Yay! valid
      //   return dispatch(setErrorList(['Invalid email address']));
      // }
    }

    if (stepNo === 3) {
      if (userInfo.age === '' || userInfo.profession === '' || userInfo.institution === '' || userInfo.experience === '' || userInfo.location === '') {
        return dispatch(setErrorList(['Fill all fields to go to the next step']));
      }
    }
     */
    dispatch(resetErrorList());
    return dispatch(setSelectedStep(stepNo));
  };

  const changeValidationPassed = (valPass) => {
    validationPassed = valPass;
    // console.log({ validationPassed, valPass });
  };

  const prevStepHandler = (pscse) => {
    pscse.preventDefault();
    dispatch(resetErrorList());
    return dispatch(setSelectedStep(selectedStep - 1));
  };

  const nextStepHandler = (nscse) => {
    const valPass = stepBtnHandler(nscse, selectedStep);
    if (valPass === null) return null;
    // nscse.preventDefault();
    // dispatch(resetErrorList());
    return dispatch(setSelectedStep(selectedStep + 1));
  };

  const showSelectedForm = () => {
    if (selectedStep === 2) {
      return <RegistrationForm changeValidationPassed={changeValidationPassed} noValidate={noValidate} userId={userId} />;
    }
    if (selectedStep === 3) {
      return <ClassSubjectForm userInfo={userInfo} />;
    }
    return <TsSelect />;
  };

  useEffect(() => {
    dispatch(resetErrorList());
    if (isMounted) {
      (async () => {
        dispatch(resetErrorList());
        await Promise.all([dispatch(fetchAllClassTypes(null)), dispatch(fetchAllSubjects(null)), dispatch(fetchAllTuitionms(null))]);
      })();
    }
    isMounted = false;
  }, []);

  return (
    <Layout>
      <div className="Registration container">
        {isLoading ? (
          <Loader />
        ) : (
          <section className="section">
            <ErrorMessages />
            <h1 className="Register">Register</h1>
            <form onSubmit={registerHandler} noValidate={noValidate}>
              {showSelectedForm()}
              <div className="row mb-3">
                {selectedStep === 3 ? (
                  <div className="d-flex">
                    {selectedStep !== 1 && (
                      <button className="btn btn-secondary w-fit" type="button" onClick={prevStepHandler}>
                        Previous
                      </button>
                    )}

                    <button className="btn btn-primary w-fit mx-3" type="submit">
                      Register
                    </button>
                  </div>
                ) : (
                  <div className="d-flex">
                    {selectedStep !== 1 && (
                      <button className="btn btn-secondary w-fit" type="button" onClick={prevStepHandler}>
                        Previous
                      </button>
                    )}

                    <button className="btn btn-primary w-fit mx-3" type="button" onClick={nextStepHandler}>
                      Next
                    </button>
                  </div>
                )}
              </div>
            </form>
          </section>
        )}
      </div>
    </Layout>
  );
}

export default Registration;
