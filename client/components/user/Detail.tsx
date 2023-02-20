/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @next/next/no-img-element */

// React and next import
import Router from 'next/router';
import Link from 'next/link';
import React, { useRef } from 'react';

// config and utils
import { roles, scheduledclassStatus, AWS_S3_URL } from '../../config/keys';
import { locationSelection } from '../../utils/helper';
import axios from '../../config/axios';

// redux
import { setUpdatePart, setCurrentUser, setUpdateUser, resetUpdateUser } from '../../redux/reducers/userReducer';
import { setErrorList, toggleLoading, resetErrorList } from '../../redux/reducers/elementsSlice';
import { setSelectedTuitionm } from '../../redux/reducers/tuitionmReducer';
import { setSelectedClasstype, setDisplayClassType } from '../../redux/reducers/classtypeReducer';
import { setSelectedSubject, setDisplaySubject } from '../../redux/reducers/subjectReducer';
import { setInitializeSchedule } from '../../redux/reducers/scheduledclassReducer';
import { useAppSelector, useAppDispatch } from '../../redux/store';

// types
import { DetailPropsInterface } from '../../types/pages/userPageInterface';
import { ClassAndSubjectInterface } from '../../types/pages/searchPageInterface';
import { TuitionStyleEnum, UserRoleEnum } from '../../types/enums';

// Components
import MakeStar from '../elements/MakeStar';

// destructure
const { STUDENT, TEACHER } = roles;
const { PENDING } = scheduledclassStatus;

function Detail({ userDetail, update, search, userId }: DetailPropsInterface) {
  // initialize hooks
  const dispatch = useAppDispatch();
  const imageInputEl = useRef<HTMLInputElement>(null);

  // get state from redux
  const userSubjects = useAppSelector((state) => state.user.userSubjects);
  const authUserInfo = useAppSelector((state) => state.user.authUserInfo);
  const userExamList = useAppSelector((state) => state.user.userExamList);
  const userReviews = useAppSelector((state) => state.user.userReviews);
  const userTuitionmList = useAppSelector((state) => state.user.userTuitionmList);
  const userClassTypes = useAppSelector((state) => state.user.userClassTypes);
  const searchParams = useAppSelector((state) => state.search.searchParams);
  const classtypeList = useAppSelector((state) => state.classtype.classtypeList);
  const subjectList = useAppSelector((state) => state.subject.subjectList);

  const editPartToUpdateHandler = (epse: React.SyntheticEvent, partNum: number) => {
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
        }),
      );
    }
    window.localStorage.setItem('updatePart', partNum.toString());
    // redirect
    // /?userId=${userDetail.id}`
    Router.push({ pathname: '/user/update', query: { userId } });
  };

  const setStars = (see: React.SyntheticEvent, selectedStar: number) => {
    see.preventDefault();
    console.log('not able to set star', selectedStar);
  };

  // handleFileSelect = (e) => {
  //   e.preventDefault();
  //   fileSelector.click();
  // }

  const uploadImageHandler = () => {
    if (imageInputEl.current) {
      imageInputEl.current.click();
    }
  };

  const fileInputChangeHandler = async (fice: React.ChangeEvent<HTMLInputElement>) => {
    // fice.preventDefault();
    // console.log('Upload a file');
    const fileExist = imageInputEl.current.files[0];
    if (fileExist) {
      // File can be uploaded
      if (fileExist.size / 8000 > 8000) {
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
        } catch (error: any) {
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

  const headToSendRequestHandler = (htsre: React.SyntheticEvent) => {
    htsre.preventDefault();
    // Under dev

    if (!authUserInfo.id) {
      return Router.push(`/user/register`);
    }

    const receiverId = userId;
    // return Router.push('/development');
    // eslint-disable-next-line no-unreachable
    const classAndSubject: ClassAndSubjectInterface = { receiverId };
    // console.log(classtypeList);
    if (searchParams.ClassTypeId === 0 || searchParams.ClassTypeId === null) {
      classAndSubject.ClassTypeId = classtypeList[1].id;
    } else {
      classAndSubject.ClassTypeId = searchParams.ClassTypeId;
    }
    if (searchParams.SubjectId === 0 || searchParams.SubjectId === null) {
      classAndSubject.SubjectId = subjectList[1].id;
    } else {
      classAndSubject.SubjectId = searchParams.SubjectId;
    }
    let tutionplace: string | null = TuitionStyleEnum.ONLINE;
    if (searchParams.tutionplace !== '' && searchParams.tutionplace !== TuitionStyleEnum.ANY) {
      tutionplace = searchParams.tutionplace;
    }
    // console.log(classAndSubject);
    dispatch(setInitializeSchedule({ ...classAndSubject, tutionplace }));
    const searchData: string | null = window.localStorage.getItem('search');
    if (searchData) {
      const searchParsedData = JSON.parse(searchData);
      const newSearch = { ...searchParsedData, ...classAndSubject };
      // console.log(newSearch);
      window.localStorage.setItem('search', JSON.stringify(newSearch));
      Router.push(`/search/request/?receiverId=${receiverId}`);
    }
    return null;
  };

  const toggleUserAvailableHandler = async (tuae: React.SyntheticEvent, isAvailable: boolean) => {
    tuae.preventDefault();
    try {
      dispatch(toggleLoading(true));
      const options = {
        headers: { 'Content-Type': 'application/json' },
      };

      const userObj = { isAvailable };

      //   console.log(currentUser);
      const response = await axios.put(`/user/update/${userId}`, userObj, options);
      if (response.status === 202 || response.status === 201 || response.status === 200) {
        // console.log(response);
        window.localStorage.removeItem('updatePart');
        dispatch(setCurrentUser(userObj));
        dispatch(resetUpdateUser());
        dispatch(resetErrorList());
        Router.push('/user/dashboard');
      }
    } catch (error: any) {
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
  };

  return (
    <div className="Detail">
      {userDetail && (
        <>
          <div className="row">
            <div className="col-12 d-flex justify-content-center align-items-center flex-column mt-4">
              {userDetail.name && (
                <div className="text-center">
                  <h1 className="h1 text-uppercase mb-0">{userDetail.name}</h1>
                  {userDetail?.role === TEACHER && userDetail.experience && <p className="p-0 mb-3">{userDetail.experience} years Experience</p>}
                </div>
              )}
              <div className="shadow rounded-circle profile-image-wrapper position-relative mb-3">
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
            {/* UPDATE ACTIVE STATUS START  */}
            {update && userDetail?.role === TEACHER && (
              <div className="col-12 d-flex justify-content-center align-items-center flex-column">
                <div className="btn-group border border-primary" role="group" aria-label="Basic example">
                  <button type="button" onClick={(e) => toggleUserAvailableHandler(e, true)} className={userDetail.isAvailable ? 'btn btn-primary' : 'btn btn-light'}>
                    On
                  </button>
                  <button
                    type="button"
                    onClick={(e) => toggleUserAvailableHandler(e, false)}
                    className={userDetail.isAvailable === false ? 'btn btn-primary' : 'btn btn-light'}
                  >
                    Off
                  </button>
                </div>
              </div>
            )}
            {/* UPDATE ACTIVE STATUS END  */}
          </div>
          {/* SEND REQUEST & CHAT START  */}
          {search && authUserInfo.role !== UserRoleEnum.TEACHER && (
            <div className="row position-sticky top-0 mb-3">
              <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-primary" onClick={(htsre) => headToSendRequestHandler(htsre)}>
                  Send Request
                </button>
                <button className="btn btn-danger" type="button">
                  <Link href={!authUserInfo.id ? `/user/register` : `/user/chat/?receiverId=${userId}`}>Chat</Link>
                </button>
              </div>
            </div>
          )}
          {/* SEND REQUEST & CHAT END  */}

          {/* PRESENT ADDRESS START  */}
          <div className="row">
            <div className="col">
              {userDetail.presentaddress && (
                <>
                  <div className="d-flex">
                    <span className="location-icon mx-2">
                      <img src="/icons/location.svg" alt="" />
                    </span>
                    <p>{userDetail.presentaddress}</p>
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
          {/* PRESENT ADDRESS END  */}

          {/* personal detail start  */}
          <div className="row  mb-3 pb-3">
            <div className="heading d-flex justify-content-between align-items-center row pb-3">
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
              <div className="row  mb-1">
                <div className="col-md-6">Gender</div>
                <div className="col-md-6">
                  <p className="fw-semibold">{userDetail.gender}</p>
                </div>
              </div>
              {authUserInfo.role === UserRoleEnum.ADMIN && (
                <div className="row  mb-1">
                  <div className="col-md-6">NID</div>
                  <div className="col-md-6">{userDetail.id_proof && <img src={`${AWS_S3_URL}/${userDetail.id_proof}`} />}</div>
                </div>
              )}
              <div className="row  mb-1">
                <div className="col-md-6">NID</div>
                <div className="col-md-6">
                  {userDetail.id_proof && userDetail.id_proof !== '' ? <p className="fw-semibold">Uploaded</p> : <p className="fw-semibold">Not Uploaded</p>}
                </div>
              </div>
            </div>
          </div>
          {/* personal detail end  */}

          {/* tution detail start  */}
          {userDetail?.role === TEACHER && (
            <div className="row  mb-3 pb-3">
              <div className="heading d-flex justify-content-between align-items-center row pb-3">
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
                    <div className="table-responsive">
                      <table className="table border">
                        <thead>
                          <tr>
                            {userDetail.ol_rate && <th> Online (Tk)</th>}
                            {userDetail.sl_rate && <th> Student&apos;s Location (Tk)</th>}
                            {userDetail.tl_rate && <th> Teacher&apos;s Location (Tk)</th>}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {userDetail.ol_rate && <td> {userDetail.ol_rate}</td>}
                            {userDetail.sl_rate && <td> {userDetail.sl_rate}</td>}
                            {userDetail.tl_rate && <td> {userDetail.tl_rate}</td>}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* <div className="col-md-6 d-flex flex-row align-items-center flex-wrap">
                     {userDetail.ol_rate && <p className="me-2 fw-semibold"> Online - {userDetail.ol_rate}Tk </p>}
                      {userDetail.tl_rate && <p className="me-2 fw-semibold"> Teacher&apos;s Location - {userDetail.tl_rate}Tk </p>}
                      {userDetail.sl_rate && <p className="me-2 fw-semibold"> Student&apos;s Location - {userDetail.sl_rate}Tk </p>}
                    </div> */}
                  </div>
                )}
                {!search && (
                  <div className="row  mb-1">
                    <div className="col-md-6">Available Status</div>
                    <div className="col-md-6">
                      <p className="fw-semibold">{userDetail?.isAvailable ? 'Available' : 'Not Available'}</p>
                    </div>
                  </div>
                )}

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
            <div className="row  mb-3 pb-3">
              <div className="col-12 d-flex justify-content-between row align-items-center my-3">
                <h3 className="h5 w-fit">{userDetail.role === TEACHER ? 'Preffered Subjects' : 'Mediums & Class'}</h3>
                {update && (
                  <button className="btn btn-primary w-fit" type="button" onClick={(epse) => editPartToUpdateHandler(epse, 1)}>
                    Edit
                  </button>
                )}
              </div>
              <hr />
              <div className="body-content">
                {userDetail.role === TEACHER ? (
                  <div className="teacher-med-cls-sub row">
                    {userTuitionmList.length > 0 && (
                      <div className="col-md-4">
                        <div>Tuition Medium</div>
                        <div className="d-flex flex-wrap pe-3">
                          {userTuitionmList.map((us, usi) => (
                            <p className="fw-semibold" key={us.id}>
                              {usi === userTuitionmList.length - 1 ? us.name : `${us.name}, `} &nbsp;
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                    {userClassTypes.length > 0 && (
                      <div className="col-md-4">
                        <div>Classes</div>
                        <div className="d-flex flex-wrap pe-3">
                          {userClassTypes.map((uct, ucti) => (
                            <p className="fw-semibold" key={uct.id}>
                              {ucti === userClassTypes.length - 1 ? uct.name : `${uct.name}, `} &nbsp;
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                    {userSubjects.length > 0 && (
                      <div className="col-md-4">
                        <div>Subjects</div>
                        <div className="d-flex flex-wrap pe-3">
                          {userSubjects.map((us, usi) => (
                            <p className="fw-semibold" key={us.id}>
                              {usi === userSubjects.length - 1 ? us.name : `${us.name}, `} &nbsp;
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="student-med-cls row">
                    <div className="col-md-4">
                      {userTuitionmList[0] && <p className="text-capitalize">Medium: {userTuitionmList[0].name}</p>}
                      {userClassTypes[0] && <p className="text-capitalize">Class: {userClassTypes[0].name}</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Subject and class end  */}

          {/* Exam detail start  */}
          {authUserInfo.id !== null && userDetail.role === TEACHER && (
            <div className="row  mb-3 pb-3">
              <div className="heading d-flex justify-content-between align-items-center row pb-3">
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

          {/* Feedback start  */}
          {userDetail.role === TEACHER && userReviews.length > 0 && (
            <div className="row  mb-3 pb-3">
              <div className="heading d-flex justify-content-between align-items-center row pb-3">
                <h3 className="h5 w-fit">Feedback</h3>
              </div>
              <hr />
              <div className="body-content">
                <ul className="list-group">
                  {userReviews.map((ur) => (
                    <li className="list-group-item" key={ur.id}><div className="row"><div className="col-md-3"><MakeStar limit={ur.stars} setStars={setStars} /></div><div className="col-md-9">{ur.comment}</div></div></li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {/* Feedback end  */}
        </>
      )}
    </div>
  );
}

export default Detail;
