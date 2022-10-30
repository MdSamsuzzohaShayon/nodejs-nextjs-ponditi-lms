/* eslint-disable react/no-array-index-key */
/* eslint-disable @next/next/no-img-element */
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { showRequest } from '../../redux/reducers/scheduledclassReducer';
import { roles, scheduledclassStatus } from '../../config/keys';
import { setUpdatePart } from '../../redux/reducers/userReducer';
import { locationSelection } from '../../utils/helper';

const { STUDENT, TEACHER } = roles;
const { PENDING } = scheduledclassStatus;

function Detail({ userDetail, update }) {
  const dispatch = useDispatch();
  const userSubjects = useSelector((state) => state.user.userSubjects);
  const authUserInfo = useSelector((state) => state.user.authUserInfo);
  const userExamList = useSelector((state) => state.user.userExamList);
  const userClassTypes = useSelector((state) => state.user.userClassTypes);

  const sendRequesthandler = (sre) => {
    sre.preventDefault();
    dispatch(showRequest(true));
  };
  // console.log(userDetail);

  const editPartToUpdateHandler = (epse, partNum) => {
    epse.preventDefault();
    // selectPart / set part
    dispatch(setUpdatePart(partNum));
    window.localStorage.setItem('updatePart', partNum);
    // redirect
    Router.push(`/user/update/${userDetail.id}`);
  };

  return (
    <div className="Detail">
      {userDetail && (
        <>
          <div className="row mx-0 mb-5">
            <div className="col-md-3">
              <img
                src={userDetail.img ? userDetail.img : '/img/default-img.jpg'}
                className="profile-img img-fluid rounded-circle"
                alt=""
              />
            </div>
            <div className="col-md-9">
              {userDetail.firstname && (
                <div className="name-edit-profile-wrapper d-flex justify-content-between align-items-center">
                  <h1 className="h1 text-uppercase">
                    {`${userDetail.firstname} ${userDetail.lastname}`}
                  </h1>

                  {userDetail?.id !== userDetail.id &&
                    userDetail?.role === STUDENT && (
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={sendRequesthandler}
                      >
                        Send Request
                      </button>
                    )}
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
                        This profile is under survullence. If your informations
                        assure that all informations is currect you will be
                        verified and available in search result
                      </div>
                    )}
                  </p>
                </>
              )}
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                earum minus et ipsam suscipit in animi consectetur cupiditate
                accusamus, corrupti, repellendus similique consequuntur eius
                vero veritatis vel id tenetur
              </p>
            </div>
          </div>
          <div className="row mx-0 mb-5">
            {userDetail?.role === TEACHER && userDetail.experience && (
              <div className="col-md-4 d-flex justify-content-start">
                <div className="icon">
                  <img
                    src="/icons/experience.svg"
                    className="img-fluid explain-icon"
                    alt=""
                  />
                </div>
                <div className="info">
                  <h2>{userDetail.experience} years</h2>
                  <p>Experience</p>
                </div>
              </div>
            )}
            {userDetail.degree && (
              <div className="col-md-4 d-flex justify-content-start">
                <div className="icon">
                  <img
                    src="/icons/experience.svg"
                    className="img-fluid explain-icon"
                    alt=""
                  />
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

          {/* Subject and class start  */}
          {(authUserInfo.id !== null || userSubjects.length > 0) && (
            <div className="row mx-0 mb-3 bg-secondary py-3">
              <div className="heading d-flex justify-content-between row align-items-center my-3">
                <h3 className="h5 w-fit">Preffered Subjects</h3>
                {update && (
                  <button
                    className="btn btn-primary w-fit"
                    type="button"
                    onClick={(epse) => editPartToUpdateHandler(epse, 1)}
                  >
                    Edit
                  </button>
                )}
              </div>
              <hr />
              <div className="body-content row">
                {userSubjects.length > 0 && (
                  <div className="col-md-6">
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
                {userClassTypes.length > 0 && (
                  <div className="col-md-6">
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
              </div>
            </div>
          )}
          {/* Subject and class end  */}

          {/* personal detail start  */}
          <div className="row mx-0 mb-3 bg-secondary py-3">
            <div className="heading d-flex justify-content-between align-items-center row py-3">
              <h3 className="h5 w-fit">Personal Detail</h3>
              {update && (
                <button
                  className="btn btn-primary w-fit"
                  type="button"
                  onClick={(epse) => editPartToUpdateHandler(epse, 2)}
                >
                  Edit
                </button>
              )}
            </div>
            <hr />
            <div className="body-content row">
              <div className="row mx-0 mb-1">
                <div className="col-md-6">Name</div>
                <div className="col-md-6">
                  <p>{`${userDetail.firstname} ${userDetail.lastname}`}</p>
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
          <div className="row mx-0 mb-3 bg-secondary py-3">
            <div className="heading d-flex justify-content-between align-items-center row py-3">
              <h3 className="h5 w-fit">Tution Detail</h3>
              {update && (
                <button
                  className="btn btn-primary w-fit"
                  type="button"
                  onClick={(epse) => editPartToUpdateHandler(epse, 3)}
                >
                  Edit
                </button>
              )}
            </div>
            <hr />
            <div className="body-content row">
              <div className="row mx-0 mb-1">
                <div className="col-md-6">Per Hour Rate</div>
                <div className="col-md-6">
                  <p>{userDetail.rate} TK</p>
                </div>
              </div>
              <div className="row mx-0 mb-1">
                <div className="col-md-6">Available Status</div>
                <div className="col-md-6">
                  <p>
                    {userDetail?.isAvailable ? 'Available' : 'Not Available'}
                  </p>
                </div>
              </div>
              <div className="row mx-0 mb-1">
                <div className="col-md-6">Tution Place</div>
                <div className="col-md-6">
                  <p>
                    {locationSelection(userDetail.tutionplace).map(
                      (loc, locI) =>
                        locI + 1 !==
                        locationSelection(userDetail.tutionplace).length
                          ? `${loc}, `
                          : loc
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* tution detail end  */}

          {/* Exam detail start  */}
          {(authUserInfo.id !== null || userExamList.length > 0) && (
            <div className="row mx-0 mb-3 bg-secondary py-3">
              <div className="heading d-flex justify-content-between align-items-center row py-3">
                <h3 className="h5 w-fit">Educational Qualification</h3>
                {update && (
                  <button
                    className="btn btn-primary w-fit"
                    type="button"
                    onClick={(epse) => editPartToUpdateHandler(epse, 4)}
                  >
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
                        <p className="card-text">Group: {uel?.group}</p>
                        <p className="card-text">
                          Institution: {uel?.institution}
                        </p>
                        <p className="card-text">Grade: {uel?.grade}</p>
                        <p className="card-text">CGPA: {uel?.cgpa}</p>
                        <p className="card-text">
                          Passing Year: {uel?.passing_year}
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
