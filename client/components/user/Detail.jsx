/* eslint-disable react/no-array-index-key */
/* eslint-disable @next/next/no-img-element */
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { roles, scheduledclassStatus, BACKEND_URL } from '../../config/keys';
import { setUpdatePart } from '../../redux/reducers/userReducer';
import { locationSelection } from '../../utils/helper';

const { STUDENT, TEACHER } = roles;
const { PENDING } = scheduledclassStatus;

function Detail({ userDetail, update }) {
  const dispatch = useDispatch();
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
    window.localStorage.setItem('updatePart', partNum);
    // redirect
    // /?userId=${userDetail.id}`
    Router.push({ pathname: '/user/update', query: { userId: userDetail.id } });
  };

  return (
    <div className="Detail my-4">
      {userDetail && (
        <>
          <div className="row mx-0 mb-5">
            <div className="col-md-3">
              <div className="image-wrapper p-2 shadow mb-5 bg-body rounded">
                <img src={userDetail.image ? `${BACKEND_URL}/${userDetail.image}` : '/img/default-img.jpg'} className="profile-img mb-2" alt="" />
              </div>
              {update && userDetail.id === authUserInfo.id && (
                <button className="btn btn-primary" type="button" onClick={(epse) => editPartToUpdateHandler(epse, 5)}>
                  Upload
                </button>
              )}
            </div>
            <div className="col-md-9">
              {userDetail.name && (
                <div className="name-edit-profile-wrapper d-flex justify-content-between align-items-center">
                  <h1 className="h1 text-uppercase">{userDetail.name}</h1>

                  {/* {authUserInfo.id && userDetail?.role === STUDENT && (
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={sendRequesthandler}
                    >
                      Send Request
                    </button>
                  )} */}
                </div>
              )}
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
              {userDetail?.role === TEACHER && userDetail.experience && (
                <div className="col-md-12 d-flex justify-content-start align-items-center">
                  <div className="icon">
                    <img src="/icons/experience.svg" className="img-fluid explain-icon" alt="" />
                  </div>
                  <div className="info">
                    <p className="p-0 m-0">{userDetail.experience} years Experience</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="row mx-0 mb-5">
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

            {/* {userDetail.degree && (
              <div className="col-md-4 d-flex justify-content-start">
                <div className="icon">
                  <img
                    src="/icons/experience.svg"
                    className="img-fluid explain-icon"
                    alt=""
                  />
                </div>
                <div className="info">
                  <h2>No(tutions)</h2>
                  <p>Completed</p>
                </div>
              </div>
            )} */}
          </div>
          <hr />

          {/* personal detail start  */}
          <div className="row mx-0 mb-3 bg-secondary py-3">
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
              <div className="row mx-0 mb-1">
                <div className="col-md-6">Name</div>
                <div className="col-md-6">
                  <p>{userDetail.name}</p>
                </div>
              </div>
              <div className="row mx-0 mb-1">
                <div className="col-md-6">Email</div>
                <div className="col-md-6">
                  <p>{userDetail?.email}</p>
                </div>
              </div>
              <div className="row mx-0 mb-1">
                <div className="col-md-6">District</div>
                <div className="col-md-6">
                  <p>{userDetail?.district}</p>
                </div>
              </div>
              <div className="row mx-0 mb-1">
                <div className="col-md-6">Present address</div>
                <div className="col-md-6">
                  <p>{userDetail?.presentaddress}</p>
                </div>
              </div>
            </div>
          </div>
          {/* personal detail end  */}

          {/* tution detail start  */}
          {userDetail?.role === TEACHER && (
            <div className="row mx-0 mb-3 bg-secondary py-3">
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
                  <div className="row mx-0 mb-1">
                    <div className="col-md-6">Per Hour Rate</div>
                    <div className="col-md-6">
                      <p>{userDetail.rate} TK</p>
                    </div>
                  </div>
                )}
                <div className="row mx-0 mb-1">
                  <div className="col-md-6">Available Status</div>
                  <div className="col-md-6">
                    <p>{userDetail?.isAvailable ? 'Available' : 'Not Available'}</p>
                  </div>
                </div>
                <div className="row mx-0 mb-1">
                  <div className="col-md-6">Tution Place</div>
                  <div className="col-md-6">
                    <p>
                      {locationSelection(userDetail.tutionplace).map((loc, locI) => (locI + 1 !== locationSelection(userDetail.tutionplace).length ? `${loc}, ` : loc))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* tution detail end  */}

          {/* Subject and class start  */}
          {(authUserInfo.id !== null || userSubjects.length > 0) && (
            <div className="row mx-0 mb-3 bg-secondary py-3">
              <div className="heading d-flex justify-content-between row align-items-center my-3">
                <h3 className="h5 w-fit">Preffered Mediums, Subjects, & Classes</h3>
                {update && (
                  <button className="btn btn-primary w-fit" type="button" onClick={(epse) => editPartToUpdateHandler(epse, 1)}>
                    Edit
                  </button>
                )}
              </div>
              <hr />
              <div className="body-content row">
                {userTuitionmList.length > 0 && (
                  <div className="col-md-4">
                    <h5>Tuition Medium</h5>
                    <ul className="list-group">
                      {userTuitionmList.map((us) => (
                        <li className="list-group-item rounded-1" key={us.id}>
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
                        <li className="list-group-item rounded-1" key={us.id}>
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
                        <li className="list-group-item rounded-1" key={us.id}>
                          {us.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Subject and class end  */}

          {/* Exam detail start  */}
          {authUserInfo.id !== null && userDetail.role === TEACHER && (
            <div className="row mx-0 mb-3 bg-secondary py-3">
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
                      <div className="card-body d-flex justify-content-between">
                        <div className="body-left">
                          <p className="card-text">Major</p>
                          <p className="card-text">Institution</p>
                          <p className="card-text">Board</p>
                          <p className="card-text">Passing Year</p>
                          <p className="card-text">Running Study</p>
                        </div>
                        <div className="body-right">
                          <p className="card-text">: {uel?.major}</p>
                          <p className="card-text">: {uel?.institution}</p>
                          <p className="card-text">: {uel?.board}</p>
                          <p className="card-text">: {uel?.cgpa}</p>
                          <p className="card-text">: {uel.running_study ? 'Yes' : 'No'}</p>
                        </div>
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
