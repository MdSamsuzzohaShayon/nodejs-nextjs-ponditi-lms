/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useSelector, useDispatch } from 'react-redux';
import ClassTypeContent from './ClassTypeContent';
import SubjectContent from './SubjectContent';
import UserContent from './UserContent';
import { adminSidebarList } from '../../config/keys';
import { setSelectedContent } from '../../redux/reducers/adminReducer';
import useMediaQuery from '../../hooks/useMediaQuery';
import TuitionmContent from './TuitionmContent';

const { CLASS_TYPE, SUBJECT, USERS, MEDIUM } = adminSidebarList;

function Dashboard() {
  const isMounted = false;
  const dispatch = useDispatch();
  const isMobileBr = useMediaQuery(768);
  const adminSidebarElements = useSelector((state) => state.admin.adminSidebarElements);
  const selectedContent = useSelector((state) => state.admin.selectedContent);

  const selectSidebarElement = (ssee, selectedElement) => {
    ssee.preventDefault();
    dispatch(setSelectedContent(selectedElement));
  };

  const showContent = () => {
    switch (selectedContent) {
      case MEDIUM:
        return <TuitionmContent />;
      case CLASS_TYPE:
        return <ClassTypeContent />;
      case SUBJECT:
        return <SubjectContent />;
      case USERS:
        return <UserContent />;

      default:
        return <ClassTypeContent />;
    }
  };

  return (
    <div className="Dashboard d-flex flex-column flex-md-row">
      <div className="sidebar bg-danger text-secondary">
        <ul className="d-flex list-unstyled flex-row flex-md-column">
          {adminSidebarElements.map((ase) => (
            <li className={selectedContent === ase.name ? 'px-4 py-2 menu-item bg-primary' : 'px-4 py-2 menu-item '} key={ase.id}>
              <a href="#" role="button" onClick={(e) => selectSidebarElement(e, ase.name)}>
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
