/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import Image from 'next/image';
import { setRPCurrentPage, setRPStart, setSearchUserList } from '../../redux/reducers/searchReducer';
import { setSelectedSearchUser, showRequest, setInitializeSchedule } from '../../redux/reducers/scheduledclassReducer';
import { roles, scheduledclassStatus, types, BACKEND_URL } from '../../config/keys';
import MakeStar from '../elements/MakeStar';

const { STUDENT } = roles;
const { ANY } = scheduledclassStatus;
const { ONLINE } = types;

function SearchResult() {
  const dispatch = useDispatch();

  const authUserInfo = useSelector((state) => state.user.authUserInfo);
  const searchUserList = useSelector((state) => state.search.searchUserList);
  const searchParams = useSelector((state) => state.search.searchParams);
  const classtypeList = useSelector((state) => state.classtype.classtypeList);
  const subjectList = useSelector((state) => state.subject.subjectList);
  const searchAllUserList = useSelector((state) => state.search.searchAllUserList);
  const rpStart = useSelector((state) => state.search.rpStart);
  const rpTotal = useSelector((state) => state.search.rpTotal);
  const rpTotalPage = useSelector((state) => state.search.rpTotalPage);
  const rpCurrentPage = useSelector((state) => state.search.rpCurrentPage);

  const changePageHandler = (cpe, selectedPage) => {
    cpe.preventDefault();
    dispatch(setRPStart((selectedPage - 1) * rpTotal));
    dispatch(setRPCurrentPage(selectedPage));
    const newSearchUserList = searchAllUserList.slice((selectedPage - 1) * rpTotal, selectedPage * rpTotal);
    dispatch(setSearchUserList(newSearchUserList));
  };

  const changePrevPageHandler = (cppe) => {
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
  const changeNextPageHandler = (cnpe) => {
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

  const headToSendRequestHandler = (htsre, receverId) => {
    htsre.preventDefault();
    const classAndSubject = { receverId };
    // console.log(searchParams);
    if (searchParams.ClassTypeId === '0' || searchParams.ClassTypeId === '' || searchParams.ClassTypeId === ANY) {
      classAndSubject.ClassTypeId = classtypeList[1].id;
    } else {
      classAndSubject.ClassTypeId = parseInt(searchParams.ClassTypeId, 10);
    }
    if (searchParams.SubjectId === '0' || searchParams.SubjectId === '' || searchParams.SubjectId === ANY) {
      classAndSubject.SubjectId = subjectList[1].id;
    } else {
      classAndSubject.SubjectId = parseInt(searchParams.SubjectId, 10);
    }
    let tutionplace = ONLINE;
    if (searchParams.tutionplace !== '' && searchParams.tutionplace !== ANY) {
      tutionplace = searchParams.tutionplace;
    }
    // console.log(classAndSubject);
    dispatch(setInitializeSchedule({ ...classAndSubject, tutionplace }));
    // console.log(classAndSubject);
    // console.log(subjectList);
    // Set localstorage
    // css = Class Scheduled and Subject
    // window.localStorage.setItem('css', JSON.stringify(classAndSubject));
    // redirect to `/search/request/${sul.id}`
    const search = window.localStorage.getItem('search');
    const searchData = JSON.parse(search);
    const newSearch = { ...searchData, ...classAndSubject };
    // console.log(newSearch);
    window.localStorage.setItem('search', JSON.stringify(newSearch));
    Router.push(`/search/request/${receverId}`);
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

  const makeTheUrl = (userImage) => `${BACKEND_URL}/${userImage}`;

  const displayRates = (sul) => (
    <div className="hstack gap-3">
      {sul.ol_rate && <p className="alert alert-primary w-fit">Online - {sul.ol_rate} tk</p>}
      {sul.tl_rate && <p className="alert alert-primary w-fit">Teacher&apos;s Location - {sul.tl_rate} tk</p>}
      {sul.sl_rate && <p className="alert alert-primary w-fit">Student&apos;s Location - {sul.sl_rate} tk </p>}
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
                      {sul?.image ? (
                        <img src={makeTheUrl(sul.image)} className="rounded-start" alt={sul?.name} />
                      ) : (
                        <img src="/img/default-img.jpg" className="rounded-start" alt={sul?.name} />
                      )}
                    </div>
                    <div className="col-md-6">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <h5 className="card-title text-capitalize">{sul?.name}</h5>
                          <h5 className="card-title text-capitalize">
                            <MakeStar limit={findStarLimit(sul)} />
                          </h5>
                        </div>
                        <p className="card-text">Experience: {sul?.experience} years</p>
                        {/* <p className="card-text">Fees: {sul?.rate} tk per hour</p> */}
                        {displayRates(sul)}
                      </div>
                    </div>
                    <div className="col-md-3 vertical-center ">
                      {authUserInfo?.role === STUDENT && (
                        <button type="button" className="btn btn-primary my-2 request-details" onClick={(htsre) => headToSendRequestHandler(htsre, sul.id)}>
                          Send Request
                        </button>
                      )}
                      <button
                        type="button"
                        className="btn btn-primary my-2 request-details"
                        // onClick={(vde) => viewDetailHandler(vde, sul.id)}
                      >
                        <Link href={`/search/detail/?userId=${sul.id}`}>View Details</Link>
                      </button>
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
