import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { REGISTER, roles } from '../../../../config/keys';
import { resetErrorList, setErrorList, toggleLoading, setNoValidate, setSuccessMessageList, resetSuccessMessageList } from '../../../../redux/reducers/elementsSlice';
import { fetchAllClassTypes } from '../../../../redux/reducers/classtypeReducer';
import { fetchAllSubjects } from '../../../../redux/reducers/subjectReducer';
import { fetchAllTuitionms } from '../../../../redux/reducers/tuitionmReducer';
import { resetRegisterableUser, setSelectedStep, setUserSendVerifyStep } from '../../../../redux/reducers/userReducer';
import Layout from '../../../../components/layouts/Layout';
import RegistrationForm from '../../../../components/register/RegistrationForm';
import ClassSubjectForm from '../../../../components/user/Update/ClassSubjectForm';
import TsSelect from '../../../../components/register/TsSelect';
import Loader from '../../../../components/elements/Loader';
import MessageList from '../../../../components/elements/MessageList';
import axios from '../../../../config/axios';

const { STUDENT } = roles;

// tutionplace
function Registration() {
  let isMounted = true;
  let validationPassed = true;
  const router = useRouter();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState(null);

  const selectedStep = useSelector((state) => state.user.selectedStep);
  const isLoading = useSelector((state) => state.elements.isLoading);

  // const registerableUser = useSelector((state) => state.user.currentUser);
  const registerableUser = useSelector((state) => state.user.registerableUser);
  const selectedTuitionmList = useSelector((state) => state.tuitionm.selectedTuitionmList);
  const selectedClasstypeList = useSelector((state) => state.classtype.selectedClasstypeList);
  const selectedSubjectList = useSelector((state) => state.subject.selectedSubjectList);

  const noValidate = useSelector((state) => state.elements.noValidate);

  // const { userId } = router.query;

  const registerHandler = async (rhe) => {
    rhe.preventDefault();

    dispatch(setNoValidate(false));
    if (validationPassed === false) return null;

    // if (selectedClasstypeList.length === 0 || selectedSubjectList.length === 0) {
    //   return dispatch(setErrorList(['Please select a preffered class and a preffered subject']));
    // }
    const userObj = { ...registerableUser };
    if (selectedTuitionmList.length === 0) {
      return dispatch(setErrorList(['Please select a tuition medium']));
    }
    if (selectedClasstypeList.length === 0) {
      return dispatch(setErrorList(['Please select a class']));
    }

    try {
      dispatch(toggleLoading(true));

      userObj.SubjectId = selectedSubjectList;
      userObj.ClassTypeId = selectedClasstypeList;
      userObj.TuitionmId = selectedTuitionmList;
      console.log(registerableUser);
      console.log(userObj);
      const response = await axios.put(`/user/register/${userId}`, userObj, {
        headers: { 'Content-Type': 'application/json' },
      });
      // console.log(response);
      if (response.status === 202 || response.status === 201 || response.status === 200) {
        dispatch(resetErrorList());
        // dispatch(setUserFormsType(SEND_CODE));
        dispatch(setSuccessMessageList(['Registered user successfully, now you can login']));
        dispatch(resetRegisterableUser());
        router.push('/user/login');
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      } else {
        dispatch(setErrorList([JSON.stringify(error.response.data)]));
      }
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
    if (selectedStep === 2 && registerableUser.role === STUDENT) {
      // Submit register page and return
    }
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
      return <ClassSubjectForm registerableUser={registerableUser} />;
    }
    return <TsSelect />;
  };

  useEffect(() => {
    dispatch(resetErrorList());
    dispatch(resetRegisterableUser());
    dispatch(resetSuccessMessageList());
    if (isMounted) {
      const params = new URLSearchParams(window.location.search);
      const newUserId = params.get('userId');
      // console.log({ newUserId });
      if (newUserId) {
        setUserId(newUserId);
        (async () => {
          dispatch(resetErrorList());
          await Promise.all([dispatch(fetchAllClassTypes(null)), dispatch(fetchAllSubjects(null)), dispatch(fetchAllTuitionms(null))]);
        })();
      } else {
        dispatch(setUserSendVerifyStep(REGISTER));
        // Redirect from here
        router.push('/user/register');
      }
    }
    isMounted = false;
  }, []);

  return (
    <Layout title="Register Your Account | Ponditi">
      <div className="Registration container">
        {isLoading ? (
          <Loader />
        ) : (
          <section className="section">
            <MessageList />
            <h1 className="Register text-capitalize">Register ({registerableUser.role && registerableUser.role})</h1>
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
                  <div className={selectedStep === 1 ? `d-flex w-full justify-content-center` : 'd-flex'}>
                    {selectedStep !== 1 && (
                      <button className="btn btn-secondary w-fit" type="button" onClick={prevStepHandler}>
                        Previous
                      </button>
                    )}

                    {selectedStep === 2 && registerableUser.role === STUDENT ? (
                      <button className="btn btn-primary w-fit mx-3" type="submit">
                        Register
                      </button>
                    ) : (
                      <button className="btn btn-primary w-fit mx-3" type="button" onClick={nextStepHandler}>
                        Next
                      </button>
                    )}
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
