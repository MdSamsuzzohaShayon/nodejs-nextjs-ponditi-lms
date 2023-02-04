/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */

// React/next
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

// Redux
import { setRPCurrentPage, setRPStart, setSearchUserList } from '../../redux/reducers/searchReducer';
import { setInitializeSchedule } from '../../redux/reducers/scheduledclassReducer';
import { useAppDispatch, useAppSelector } from '../../redux/store';

// Config/utils
import { roles, types, BACKEND_URL } from '../../config/keys';

// Components
import MakeStar from '../elements/MakeStar';

// Types
import { ClassAndSubjectInterface } from '../../types/pages/searchPageInterface';
import { TuitionStyleEnum } from '../../types/enums';
import { TuitionRateInterface } from '../../types/redux/userInterface';

const { STUDENT } = roles;
const { ANY } = TuitionStyleEnum;
const { ONLINE } = types;

function SearchResult() {
  const dispatch = useAppDispatch();

  // state
  const authUserInfo = useAppSelector((state) => state.user.authUserInfo);
  const searchUserList = useAppSelector((state) => state.search.searchUserList);
  const searchParams = useAppSelector((state) => state.search.searchParams);
  const classtypeList = useAppSelector((state) => state.classtype.classtypeList);
  const subjectList = useAppSelector((state) => state.subject.subjectList);
  const searchAllUserList = useAppSelector((state) => state.search.searchAllUserList);
  const rpStart = useAppSelector((state) => state.search.rpStart);
  const rpTotal = useAppSelector((state) => state.search.rpTotal);
  const rpTotalPage = useAppSelector((state) => state.search.rpTotalPage);
  const rpCurrentPage = useAppSelector((state) => state.search.rpCurrentPage);

  const changePageHandler = (cpe: React.ChangeEvent<HTMLBodyElement>, selectedPage: number) => {
    cpe.preventDefault();
    dispatch(setRPStart((selectedPage - 1) * rpTotal));
    dispatch(setRPCurrentPage(selectedPage));
    const newSearchUserList = searchAllUserList.slice((selectedPage - 1) * rpTotal, selectedPage * rpTotal);
    dispatch(setSearchUserList(newSearchUserList));
  };

  const changePrevPageHandler = (cppe: React.SyntheticEvent) => {
    cppe.preventDefault();
    if (rpCurrentPage !== 1) {
      const newCurrentPage = rpCurrentPage - 1;
      const newRPStart = rpStart / rpTotal;
      dispatch(setRPStart(newRPStart));
      dispatch(setRPCurrentPage(newCurrentPage));
      const start = (newCurrentPage - 1) * rpTotal;
      const end = (newCurrentPage - 1) * rpTotal + rpTotal;
      const newSearchUserList = searchAllUserList.slice(start, end);
      dispatch(setSearchUserList(newSearchUserList));
    }
  };
  const changeNextPageHandler = (cnpe: React.SyntheticEvent) => {
    cnpe.preventDefault();
    if (rpCurrentPage !== rpTotalPage) {
      const newCurrentPage = rpCurrentPage + 1;
      const newRPStart = rpStart / rpTotal;
      dispatch(setRPStart(newRPStart));
      dispatch(setRPCurrentPage(newCurrentPage));
      const start = (newCurrentPage - 1) * rpTotal;
      const end = (newCurrentPage - 1) * rpTotal + rpTotal;
      // console.log({start, end});
      const newSearchUserList = searchAllUserList.slice(start, end);
      dispatch(setSearchUserList(newSearchUserList));
    }
  };

  const headToSendRequestHandler = (htsre: React.SyntheticEvent, receiverId: number) => {
    htsre.preventDefault();
    const classAndSubject: ClassAndSubjectInterface = { receiverId };
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
    let tutionplace: string | null = ONLINE;
    if (searchParams.tutionplace !== '' && searchParams.tutionplace !== ANY) {
      tutionplace = searchParams.tutionplace;
    }
    dispatch(setInitializeSchedule({ ...classAndSubject, tutionplace }));
    const search: string | null = window.localStorage.getItem('search');
    if (search) {
      const searchData = JSON.parse(search);
      const newSearch = { ...searchData, ...classAndSubject };
      window.localStorage.setItem('search', JSON.stringify(newSearch));
      return Router.push(`/search/request/?receiverId=${receiverId}`);
    }
    return null;
  };

  const findStarLimit = (sul) => {
    // console.log(sul);
    const totalReviewtaker = sul.Reviewtaker.length;
    let totalMarks = 0;
    for (let i = 0; i < totalReviewtaker; i += 1) {
      totalMarks += sul.Reviewtaker[i].stars;
    }
    const limit = totalMarks / totalReviewtaker;
    return limit;
  };

  const makeTheUrl = (userImage: string) => `${BACKEND_URL}/${userImage}`;

  const displayRates = (sul: TuitionRateInterface) => (
    <div className="hstack gap-3">
      {sul.ol_rate && (
        <p className="mb-0 w-fit">
          Online - <b>{sul.ol_rate} tk</b>
        </p>
      )}
      {sul.tl_rate && (
        <p className="mb-0 w-fit">
          Teacher&apos;s Location - <b>{sul.tl_rate} tk</b>
        </p>
      )}
      {sul.sl_rate && (
        <p className="mb-0 w-fit">
          Student&apos;s Location - <b>{sul.sl_rate} tk</b>
        </p>
      )}
    </div>
  );

  return (
    <div className="SearchResult">
      {searchUserList && (
        <div className="container search-result">
          {searchUserList.length > 0 ? (
            <>
              {searchUserList.map((sul) => (
                <div className="card my-3" key={sul.id}>
                  <div className="search-card-row row g-0">
                    <div className="col-md-3">
                      {/* <div className="img-circle">

                      </div> */}
                      <Link href={`/search/detail/?userId=${sul.id}`}>
                        <div className="img-wrapper d-flex w-full h-full justify-content-center align-items-center">
                          {sul.image ? (
                            <img src={makeTheUrl(sul.image)} className="rounded-circle" alt={sul?.name} />
                          ) : (
                            <img src="/img/default-img.jpg" className="rounded-circle" alt={sul?.name} />
                          )}
                        </div>
                      </Link>
                    </div>
                    <div className="col-md-6">
                      <div className="card-body">
                        <Link href={`/search/detail/?userId=${sul.id}`}>
                          <div className="d-flex justify-content-between">
                            <h5 className="card-title text-capitalize m-0">{sul?.name}</h5>
                            <h5 className="card-title text-capitalize m-0">
                              <MakeStar limit={findStarLimit(sul)} />
                            </h5>
                          </div>
                          <p className="card-text mb-0 mb-md-2">Experience: {sul?.experience} years</p>
                          {/* <p className="card-text">Fees: {sul?.rate} tk per hour</p> */}
                          {displayRates(sul)}
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-3 vertical-center ">
                      <button
                        type="button"
                        className="btn btn-primary my-2 request-details"
                        // onClick={(vde) => viewDetailHandler(vde, sul.id)}
                      >
                        <Link href={`/search/detail/?userId=${sul.id}`}>View Details</Link>
                      </button>
                      {authUserInfo?.role === STUDENT && (
                        <div className="btn-group request-details" role="group" aria-label="Basic example">
                          <button type="button" className="btn btn-primary" onClick={(htsre) => headToSendRequestHandler(htsre, sul.id)}>
                            Send Request
                          </button>
                          <button type="button" className="btn btn-danger">
                            <Link href={`/user/chat/?receiverId=${sul.id}`}>Chat</Link>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <nav className="w-full">
                <ul className="pagination justify-content-center">
                  <li className={rpCurrentPage === 1 ? 'page-item disabled' : 'page-item'} onClick={changePrevPageHandler} role="presentation">
                    <a className="page-link">Previous</a>
                  </li>
                  {rpTotalPage &&
                    Array(rpTotalPage)
                      .fill()
                      .map((rpt, idx) => (
                        <li
                          className={idx + 1 === rpCurrentPage ? 'page-item active' : 'page-item'}
                          key={idx}
                          onClick={(cpe) => changePageHandler(cpe, idx + 1)}
                          role="presentation"
                        >
                          <a className="page-link" href="#">
                            {idx + 1}
                          </a>
                        </li>
                      ))}
                  <li className={rpCurrentPage === rpTotalPage ? 'page-item disable' : 'page-item'} onClick={changeNextPageHandler} role="presentation">
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </>
          ) : (
            <div className="alert alert-danger">No result found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResult;
