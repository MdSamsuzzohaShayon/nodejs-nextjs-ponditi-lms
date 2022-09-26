/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ClassTypeContent from './ClassTypeContent';
import SubjectContent from './SubjectContent';
import { adminSidebarList } from '../../config/keys';
import { setSelectedContent } from '../../redux/reducers/adminReducer';
import axios from '../../config/axios';
import { setErrorList, resetErrorList} from '../../redux/reducers/elementsSlice';
import { setClasstypeList } from '../../redux/reducers/classtypeReducer';
import { setSubjectList } from '../../redux/reducers/subjectReducer';

const { CLASS_TYPE, SUBJECT } = adminSidebarList;

function Dashboard() {
  let isMounted = false;
  const dispatch = useDispatch();
  const adminSidebarElements = useSelector(
    (state) => state.admin.adminSidebarElements
  );
  const selectedContent = useSelector((state) => state.admin.selectedContent);

  const selectSidebarElement = (ssee, selectedElement) => {
    ssee.preventDefault();
    dispatch(setSelectedContent(selectedElement));
  };

  const fetchAllClassType = async () => {
    try {
      // dispatch(toggleLoading(true));
      // console.log('try');
      const response = await axios.get('/classtype/all');
      if (response.status === 200) {
        // console.log(response);
        dispatch(setClasstypeList(response.data.classTypes));
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
    } finally {
      // console.log('finally');
      // dispatch(toggleLoading(false));
    }
  };
  const fetchAllSubject = async () => {
    try {
      // dispatch(toggleLoading(true));
      // console.log('try');
      const response = await axios.get('/subject/all');
      if (response.status === 200) {
        // console.log(response);
        dispatch(setSubjectList(response.data.subjects));
        dispatch(resetErrorList());
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
    } finally {
      // console.log('finally');
      // dispatch(toggleLoading(false));
    }
  };

  const showContent = () => {
    switch (selectedContent) {
      case CLASS_TYPE:
        return <ClassTypeContent />;
      case SUBJECT:
        return <SubjectContent />;

      default:
        return <ClassTypeContent />;
    }
  };

  useEffect(() => {
    if (isMounted === false) {
      fetchAllClassType().catch((err) => console.log(err));
      fetchAllSubject().catch((err) => console.log(err));
    }
    isMounted = true;
  }, []);

  return (
    <div className="Dashboard d-flex">
      <div className="sidebar bg-danger text-secondary">
        <ul className="d-flex flex-column list-unstyled">
          {adminSidebarElements.map((ase) => (
            <li
              className={
                selectedContent === ase.name
                  ? 'px-4 py-2 menu-item bg-primary'
                  : 'px-4 py-2 menu-item '
              }
              key={ase.id}
            >
              <a
                href="#"
                role="button"
                onClick={(e) => selectSidebarElement(e, ase.name)}
              >
                {ase.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
        <div className="w-full">
          <div className="p-4">{showContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
