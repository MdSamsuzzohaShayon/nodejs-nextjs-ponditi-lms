/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import {
  setRPCurrentPage,
  setRPStart,
  setSearchUserList,
} from '../../redux/reducers/searchReducer';
import {
  setSelectedSearchUser,
  showRequest,
  setInitializeSchedule,
} from '../../redux/reducers/scheduledclassReducer';
import { roles } from '../../config/keys';

const { STUDENT } = roles;

function SearchResult() {
  const dispatch = useDispatch();

  const authUserInfo = useSelector((state) => state.user.authUserInfo);
  const searchUserList = useSelector((state) => state.search.searchUserList);
  const searchParams = useSelector((state) => state.search.searchParams);
  const classtypeList = useSelector((state) => state.classtype.classtypeList);
  const subjectList = useSelector((state) => state.subject.subjectList);
  const searchAllUserList = useSelector(
    (state) => state.search.searchAllUserList
  );
  const rpStart = useSelector((state) => state.search.rpStart);
  const rpTotal = useSelector((state) => state.search.rpTotal);
  const rpTotalPage = useSelector((state) => state.search.rpTotalPage);
  const rpCurrentPage = useSelector((state) => state.search.rpCurrentPage);

  const changePageHandler = (cpe, selectedPage) => {
    cpe.preventDefault();
    dispatch(setRPStart((selectedPage - 1) * rpTotal));
    dispatch(setRPCurrentPage(selectedPage));
    const newSearchUserList = searchAllUserList.slice(
      (selectedPage - 1) * rpTotal,
      selectedPage * rpTotal
    );
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

  const viewDetailHandler = (vde, userId) => {
    vde.preventDefault();
    const newSelectedUser = searchUserList.find((sul) => sul.id === userId);
    console.log(newSelectedUser);
    dispatch(showRequest(true));
    // dispatch(setSelectedSearchUser(newSelectedUser));
    Router.push(`/search/selected/?userId=${userId}`);
  };

  const headToSendRequestHandler = (htsre, teacherId) => {
    htsre.preventDefault();
    const classAndSubject = {};
    if (searchParams.ClassTypeId === '0') {
      classAndSubject.ClassTypeId = classtypeList[1].id;
    } else {
      classAndSubject.ClassTypeId = parseInt(searchParams.ClassTypeId, 10);
    }
    if (searchParams.SubjectId === '0') {
      classAndSubject.SubjectId = subjectList[1].id;
    } else {
      classAndSubject.SubjectId = parseInt(searchParams.SubjectId, 10);
    }
    dispatch(setInitializeSchedule(classAndSubject));
    // console.log(classAndSubject);
    // console.log(subjectList);
    // Set localstorage
    // css = Class Scheduled and Subject
    // window.localStorage.setItem('css', JSON.stringify(classAndSubject));
    // redirect to `/search/request/${sul.id}`
    Router.push(`/search/request/${teacherId}`);
  };

  return (
    <div className="SearchResult">
      {searchUserList && (
        <div className="container search-result">
          {searchUserList.length > 0 ? (
            <>
              {searchUserList.map((sul) => (
                <div className="card my-3" key={sul.id}>
                  <div className="row g-0">
                    <div className="col-md-3">
                      <img
                        src="/img/default-img.jpg"
                        className="img-fluid rounded-start"
                        alt={`${sul?.firstname} ${sul?.lastname}`}
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <h5 className="card-title text-capitalize">
                            {`${sul?.firstname} ${sul?.lastname}`}
                          </h5>
                          <h5 className="card-title text-capitalize">
                            Reviews
                          </h5>
                        </div>
                        <p className="card-text">
                          Experience: {sul?.experience} years
                        </p>
                        <p className="card-text">
                          Fees: {sul?.rate} tk per hour
                        </p>
                      </div>
                    </div>
                    <div className="col-md-3 vertical-center ">
                      {authUserInfo?.role === STUDENT && (
                        <button
                          type="button"
                          className="btn btn-primary my-2 request-details"
                          onClick={(htsre) =>
                            headToSendRequestHandler(htsre, sul.id)
                          }
                        >
                          Send Request
                        </button>
                      )}
                      <button
                        type="button"
                        className="btn btn-primary my-2 request-details"
                        // onClick={(vde) => viewDetailHandler(vde, sul.id)}
                      >
                        <Link href={`/search/detail/${sul.id}`}>
                          View Details
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <nav className="w-full">
                <ul className="pagination justify-content-center">
                  <li
                    className={
                      rpCurrentPage === 1 ? 'page-item disabled' : 'page-item'
                    }
                    onClick={changePrevPageHandler}
                    role="presentation"
                  >
                    <a className="page-link">Previous</a>
                  </li>
                  {rpTotalPage &&
                    Array(rpTotalPage)
                      .fill()
                      .map((rpt, idx) => (
                        <li
                          className={
                            idx + 1 === rpCurrentPage
                              ? 'page-item active'
                              : 'page-item'
                          }
                          key={idx}
                          onClick={(cpe) => changePageHandler(cpe, idx + 1)}
                          role="presentation"
                        >
                          <a className="page-link" href="#">
                            {idx + 1}
                          </a>
                        </li>
                      ))}
                  <li
                    className={
                      rpCurrentPage === rpTotalPage
                        ? 'page-item disable'
                        : 'page-item'
                    }
                    onClick={changeNextPageHandler}
                    role="presentation"
                  >
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
