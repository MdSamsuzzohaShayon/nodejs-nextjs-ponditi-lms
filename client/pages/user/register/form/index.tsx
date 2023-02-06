// React/next
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// Config/utils
import { REGISTER, roles } from '../../../../config/keys';
import axios from '../../../../config/axios';

// Redux
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { resetErrorList, setErrorList, toggleLoading, setNoValidate, setSuccessMessageList, resetSuccessMessageList } from '../../../../redux/reducers/elementsSlice';
import { fetchAllClassTypes } from '../../../../redux/reducers/classtypeReducer';
import { fetchAllSubjects } from '../../../../redux/reducers/subjectReducer';
import { fetchAllTuitionms } from '../../../../redux/reducers/tuitionmReducer';
import { resetRegisterableUser, setSelectedStep, setUserSendVerifyStep } from '../../../../redux/reducers/userReducer';

// Components
import Layout from '../../../../components/layouts/Layout';
import RegistrationForm from '../../../../components/register/RegistrationForm';
import ClassSubjectForm from '../../../../components/user/Update/ClassSubjectForm';
import TsSelect from '../../../../components/register/TsSelect';
import Loader from '../../../../components/elements/Loader';
import MessageList from '../../../../components/elements/MessageList';

const { STUDENT } = roles;

// REGISTRATION PAGE COMPONENT
function RegistrationIndex() {
  // VARIABLES
  let isMounted = true;
  let validationPassed = true;

  // HOOKS
  const router = useRouter();
  const dispatch = useAppDispatch();

  // LOCAL STATE
  const [userId, setUserId] = useState<number | null>(null);

  // REDUX STATE
  const selectedStep = useAppSelector((state) => state.user.selectedStep);
  const isLoading = useAppSelector((state) => state.elements.isLoading);
  const registerableUser = useAppSelector((state) => state.user.registerableUser);
  const selectedTuitionmList = useAppSelector((state) => state.tuitionm.selectedTuitionmList);
  const selectedClasstypeList = useAppSelector((state) => state.classtype.selectedClasstypeList);
  const selectedSubjectList = useAppSelector((state) => state.subject.selectedSubjectList);

  const noValidate = useAppSelector((state) => state.elements.noValidate);

  /**
   * =========================================================================
   * REGISTRATION FORM SUBMISSION
   */
  const registerHandler = async (rhe: React.FormEvent<HTMLFormElement>) => {
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
    } catch (error: any) {
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

  /**
   * =========================================================================
   * STEP HANDLER
   */
  const stepBtnHandler = (sbhe: React.SyntheticEvent, stepNo: number) => {
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

  const prevStepHandler = (pscse: React.SyntheticEvent) => {
    pscse.preventDefault();
    dispatch(resetErrorList());
    return dispatch(setSelectedStep(selectedStep - 1));
  };

  const nextStepHandler = (nscse: React.SyntheticEvent) => {
    if (selectedStep === 2 && registerableUser.role === STUDENT) {
      // Submit register page and return
    }
    const valPass = stepBtnHandler(nscse, selectedStep);
    if (valPass === null) return null;
    // nscse.preventDefault();
    // dispatch(resetErrorList());
    return dispatch(setSelectedStep(selectedStep + 1));
  };

  /**
   * =========================================================================
   * VALIDATION
   */
  const changeValidationPassed = (valPass: boolean) => {
    validationPassed = valPass;
    // console.log({ validationPassed, valPass });
  };

  /**
   * =========================================================================
   * CONDITIONAL COMPONENT DISPLAY
   */
  const showSelectedForm = () => {
    if (selectedStep === 2) {
      return <RegistrationForm changeValidationPassed={changeValidationPassed} noValidate={noValidate} userId={userId} />;
    }
    if (selectedStep === 3) {
      return <ClassSubjectForm registerableUser={registerableUser} />;
    }
    return <TsSelect />;
  };

  /**
   * =========================================================================
   * FETCH DATA ON COMPONENT MOUNT
   */
  useEffect(() => {
    dispatch(resetErrorList());
    dispatch(resetRegisterableUser());
    dispatch(resetSuccessMessageList());
    if (isMounted) {
      const params = new URLSearchParams(window.location.search);
      const newUserId = params.get('userId');
      // console.log({ newUserId });
      if (newUserId) {
        const userIdInt = parseInt(newUserId, 10);
        setUserId(userIdInt);
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
                    <button className="btn btn-secondary w-fit" type="button" onClick={prevStepHandler}>
                      Previous
                    </button>

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

export default RegistrationIndex;
