/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @next/next/no-img-element */
import Router from 'next/router';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { roles, scheduledclassStatus, BACKEND_URL, AWS_S3_URL } from '../../config/keys';
import { setUpdatePart, setCurrentUser, setUpdateUser } from '../../redux/reducers/userReducer';
import { locationSelection } from '../../utils/helper';
import { toCapSentence } from '../../utils/extendPrototypes';
import { setErrorList, toggleLoading, resetErrorList } from '../../redux/reducers/elementsSlice';
import axios from '../../config/axios';
import { setSelectedTuitionm } from '../../redux/reducers/tuitionmReducer';
import { setSelectedClasstype, setDisplayClassType } from '../../redux/reducers/classtypeReducer';
import { setSelectedSubject, setDisplaySubject } from '../../redux/reducers/subjectReducer';

const { STUDENT, TEACHER } = roles;
const { PENDING } = scheduledclassStatus;

function Detail({ userDetail, update }) {
  const dispatch = useDispatch();
  const imageInputEl = useRef(null);
  let fileSelector = null;

  const userSubjects = useSelector((state) => state.user.userSubjects);
  const authUserInfo = useSelector((state) => state.user.authUserInfo);
  const userExamList = useSelector((state) => state.user.userExamList);
  const userTuitionmList = useSelector((state) => state.user.userTuitionmList);
  const userClassTypes = useSelector((state) => state.user.userClassTypes);

  // const sendRequesthandler = (sre) => {
  //   sre.preventDefault();
  //   dispatch(showRequest(true));
  // };
  // console.log(userDetail);

  const editPartToUpdateHandler = (epse, partNum) => {
    epse.preventDefault();
    // selectPart / set part
    dispatch(setUpdatePart(partNum));

    if (partNum === 1) {
      dispatch(setDisplayClassType(true));
      dispatch(setDisplaySubject(true));
      dispatch(setSelectedTuitionm(userTuitionmList.map((ut) => ut.id)));
      dispatch(setSelectedClasstype(userClassTypes.map((ct) => ct.id)));
      dispatch(setSelectedSubject(userSubjects.map((us) => us.id)));
      dispatch(
        setUpdateUser({
          TuitionmId: userTuitionmList.map((ut) => ut.id),
          ClassTypeId: userClassTypes.map((ct) => ct.id),
          SubjectId: userSubjects.map((us) => us.id),
        })
      );
    }
    window.localStorage.setItem('updatePart', partNum);
    // redirect
    // /?userId=${userDetail.id}`
    Router.push({ pathname: '/user/update', query: { userId: userDetail.id } });
  };

  // handleFileSelect = (e) => {
  //   e.preventDefault();
  //   fileSelector.click();
  // }

  const uploadImageHandler = (uie) => {
    // uie.preventDefault();
    // console.log(uie);
    imageInputEl.current.click();
    // imageInputEl.current.dispatchEvent(new Event('click'));
    // fileSelector.click();
    // imageInputEl.current = fileSelector;
  };

  const fileInputChangeHandler = async (fice) => {
    // fice.preventDefault();
    // console.log('Upload a file');
    const fileExist = imageInputEl.current.files[0];
    if (fileExist) {
      //   console.log(fileExist);
      if (fileExist.size / 1000 > 1000) {
        // fileInputElement.current.value = 0;
        fice.target.value = '';
        return dispatch(setErrorList(['You must upload a file with less than 1 mega byte in size']));
      }

      if (fileExist.type !== 'image/jpeg' && fileExist.type !== 'image/png' && fileExist.type !== 'image/jpg' && fileExist.type !== 'image/gif') {
        fice.target.value = '';
        return dispatch(setErrorList(['Invalid file type, please use jpg or png file type']));
      }

      // File validation succeed. now upload the file
      const formData = new FormData();
      fice.preventDefault();
      // const fileExist = fileInputElement.current.files[0];
      // console.log(fileExist);
      if (fileExist) {
        await formData.set('image', fileExist);
        try {
          dispatch(toggleLoading(true));
          const controller = new AbortController();
          const options = {
            signal: controller.signal,
          };

          const response = await axios.put(`/user/updateimage/${authUserInfo.id}`, formData, options);
          controller.abort();
          if (response.status === 202 || response.status === 201 || response.status === 200) {
            // console.log(response);
            // window.localStorage.removeItem('updatePart');
            dispatch(setCurrentUser({ image: response.data.image }));
            dispatch(resetErrorList());
            Router.push('/user/dashboard');
          }
        } catch (error) {
          console.log(error);
          if (error?.response?.data?.msg) {
            dispatch(setErrorList([error.response.data.msg]));
          }
          if (error?.response?.status === 401 || error?.response?.status === 405) {
            window.localStorage.removeItem('user');
            Router.push('/user/login');
          }
        } finally {
          dispatch(toggleLoading(false));
        }
      }
    }
    return null;
  };

  return (
    <div className="Detail my-4">
      {userDetail && (
        <>
          <div className="row">
            <div className="col-12 d-flex justify-content-center align-items-center flex-column">
              {userDetail.name && (
                <div className="text-center">
                  <h1 className="h1 text-uppercase mb-0">{userDetail.name}</h1>
                  {userDetail?.role === TEACHER && userDetail.experience && <p className="p-0 mb-3">{userDetail.experience} years Experience</p>}
                </div>
              )}
              <div className="shadow rounded-circle profile-image-wrapper position-relative">
                {/* https://ponditistorage.s3.ap-southeast-1.amazonaws.com/ramos.jpg-42-image.jpg */}
                <img
                  src={userDetail.image ? `${AWS_S3_URL}/${userDetail.image}` : '/img/default-img.jpg'}
                  className="profile-img rounded-circle position-absolute"
                  alt=""
                />
                {(authUserInfo.role === STUDENT || authUserInfo.role === TEACHER) && (
                  <div className="btn btn-dark rounded-circle upload-btn position-absolute" onClick={uploadImageHandler}>
                    <img src="/icons/camera.svg" className="upload-img position-absolute" alt="" />
                    <input type="file" className="d-none" ref={imageInputEl} onChange={fileInputChangeHandler} />
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-9">
              {userDetail.location && (
                <>
                  <div className="d-flex">
                    <span className="location-icon mx-2">
                      <img src="/icons/location.svg" alt="" />
                    </span>
                    <p>{userDetail.location}</p>
                  </div>
                  <p>{userDetail?.role}</p>
                  <p>
                    {userDetail?.role && userDetail.isActive === PENDING && (
                      <div className="alert alert-danger">
                        This profile is under survullence. If your informations assure that all informations is currect you will be verified and available in search
                        result
                      </div>
                    )}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="row  mb-5">
            {userDetail.degree && (
              <div className="col-md-4 d-flex justify-content-start">
                <div className="icon">
                  <img src="/icons/experience.svg" className="img-fluid explain-icon" alt="" />
                </div>
                <div className="info">
                  <h2>
                    {userDetail.degree} - {userDetail.major}
                  </h2>
                  <p>Education</p>
                </div>
              </div>
            )}
          </div>
          <hr />

          {/* personal detail start  */}
          <div className="row  mb-3 py-3">
            <div className="heading d-flex justify-content-between align-items-center row py-3">
              <h3 className="h5 w-fit">Personal Detail</h3>
              {update && (
                <button className="btn btn-primary w-fit" type="button" onClick={(epse) => editPartToUpdateHandler(epse, 2)}>
                  Edit
                </button>
              )}
            </div>
            <hr />
            <div className="body-content row">
              <div className="row  mb-1">
                <div className="col-md-6">Name</div>
                <div className="col-md-6">
                  <p className="text-capitalize fw-semibold">{userDetail.name}</p>
                </div>
              </div>
              <div className="row  mb-1">
                <div className="col-md-6">Email</div>
                <div className="col-md-6">
                  <p className="fw-semibold">{userDetail?.email}</p>
                </div>
              </div>
              <div className="row  mb-1">
                <div className="col-md-6">District</div>
                <div className="col-md-6">
                  <p className="fw-semibold">{userDetail.district && userDetail.district[0].toUpperCase() + userDetail.district.slice(1)}</p>
                </div>
              </div>
              <div className="row  mb-1">
                <div className="col-md-6">Present address</div>
                <div className="col-md-6">
                  <p className="fw-semibold">{userDetail.presentaddress && userDetail.presentaddress.split('(')[0]}</p>
                </div>
              </div>
            </div>
          </div>
          {/* personal detail end  */}

          {/* tution detail start  */}
          {userDetail?.role === TEACHER && (
            <div className="row  mb-3 py-3">
              <div className="heading d-flex justify-content-between align-items-center row py-3">
                <h3 className="h5 w-fit">Tution Detail</h3>
                {update && (
                  <button className="btn btn-primary w-fit" type="button" onClick={(epse) => editPartToUpdateHandler(epse, 3)}>
                    Edit
                  </button>
                )}
              </div>
              <hr />
              <div className="body-content row">
                {userDetail?.role === TEACHER && (
                  <div className="row  mb-1">
                    <div className="col-md-6">Per Hour Rate</div>
                    <div className="col-md-6 d-flex flex-row align-items-center flex-wrap">
                      {userDetail.ol_rate && <p className="me-2 fw-semibold"> Online - {userDetail.ol_rate}Tk, </p>}
                      {userDetail.tl_rate && <p className="me-2 fw-semibold"> Teacher&apos;s Location - {userDetail.tl_rate}Tk, </p>}
                      {userDetail.sl_rate && <p className="me-2 fw-semibold"> Student&apos;s Location - {userDetail.sl_rate}Tk, </p>}
                    </div>
                  </div>
                )}
                <div className="row  mb-1">
                  <div className="col-md-6">Available Status</div>
                  <div className="col-md-6">
                    <p className="fw-semibold">{userDetail?.isAvailable ? 'Available' : 'Not Available'}</p>
                  </div>
                </div>
                <div className="row  mb-1">
                  <div className="col-md-6">Tution Place</div>
                  <div className="col-md-6">
                    <p className="fw-semibold">
                      {locationSelection(userDetail.tutionplace).map((loc, locI) => (locI + 1 !== locationSelection(userDetail.tutionplace).length ? `${loc}, ` : loc))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* tution detail end  */}

          {/* Subject and class start  */}
          {(userDetail?.role === TEACHER || userDetail?.role === STUDENT) && (
            <div className="row  mb-3 py-3">
              <div className="col-12 d-flex justify-content-between row align-items-center my-3">
                <h3 className="h5 w-fit">{userDetail.role === TEACHER ? 'Preffered Mediums, Subjects, & Classes' : 'Preffered Mediums, & Classes'}</h3>
                {update && (
                  <button className="btn btn-primary w-fit" type="button" onClick={(epse) => editPartToUpdateHandler(epse, 1)}>
                    Edit
                  </button>
                )}
              </div>
              <hr />
              <div className="body-content row">
                {userDetail.role === TEACHER ? (
                  <div className="teacher-med-cls-sub">
                    {userTuitionmList.length > 0 && (
                      <div className="col-md-4">
                        <h5>Tuition Medium</h5>
                        <ul className="list-group">
                          {userTuitionmList.map((us) => (
                            <li className="list-group-item rounded-1 fw-semibold" key={us.id}>
                              {us.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {userClassTypes.length > 0 && (
                      <div className="col-md-4">
                        <h5>Classes</h5>
                        <ul className="list-group">
                          {userClassTypes.map((us) => (
                            <li className="list-group-item rounded-1 fw-semibold" key={us.id}>
                              {us.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {userSubjects.length > 0 && (
                      <div className="col-md-4">
                        <h5>Subjects</h5>
                        <ul className="list-group">
                          {userSubjects.map((us) => (
                            <li className="list-group-item rounded-1 fw-semibold" key={us.id}>
                              {us.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="col-md-4">
                    {userTuitionmList[0] && <p className="text-capitalize">Medium: {userTuitionmList[0].name}</p>}
                    {userClassTypes[0] && <p className="text-capitalize">Class: {userClassTypes[0].name}</p>}
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Subject and class end  */}

          {/* Exam detail start  */}
          {authUserInfo.id !== null && userDetail.role === TEACHER && (
            <div className="row  mb-3 py-3">
              <div className="heading d-flex justify-content-between align-items-center row py-3">
                <h3 className="h5 w-fit">Educational Qualification</h3>
                {update && (
                  <button className="btn btn-primary w-fit" type="button" onClick={(epse) => editPartToUpdateHandler(epse, 4)}>
                    Edit
                  </button>
                )}
              </div>
              <hr />
              <div className="body-content row">
                {userExamList.map((uel, idx) => (
                  <div key={idx} className="col-md-4 mb-3">
                    <div className="card rounded-1">
                      <div className="card-header">{uel.level}</div>
                      <div className="card-body">
                        <p className="card-text">
                          Major : <span className="fw-semibold">{uel?.major}</span>{' '}
                        </p>
                        <p className="card-text">
                          Institution: <span className="fw-semibold">{uel?.institution}</span>
                        </p>
                        <p className="card-text">
                          Passing Year: <span className="fw-semibold">{uel.running_study ? 'Running' : uel?.passing_year}</span>{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Exam detail end  */}
        </>
      )}
    </div>
  );
}

export default Detail;
