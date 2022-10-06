/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { showRequest } from '../../redux/reducers/scheduledclassReducer';
import { roles } from '../../config/keys';

const { TEACHER } = roles;

function Detail({ userDetail, update }) {
  const dispatch = useDispatch();
  const authUserInfo = useSelector((state) => state.user.authUserInfo);

  const sendRequesthandler = (sre) => {
    sre.preventDefault();
    dispatch(showRequest(true));
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
                  <h1 className="h1">
                    {`${userDetail.firstname} ${userDetail.lastname}`}
                  </h1>
                  {update && (
                    <button className="btn btn-primary" type="button">
                      <Link href="/user/update">Edit</Link>
                    </button>
                  )}

                  {update === false && authUserInfo.role !== TEACHER && (
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
                    {userDetail?.role === TEACHER &&
                      userDetail.isActive === false && (
                        <div className="alert alert-danger">
                          This profile is under survullence. If your
                          informations assure that all informations is currect
                          you will be verified and available in search result
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
            {userDetail.experience && (
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
                  <h2>No(tutions)</h2>
                  <p>Completed</p>
                </div>
              </div>
            )}
            <br />
            <br />
            <br />
            Class type subject review
          </div>
        </>
      )}
    </div>
  );
}

export default Detail;
