/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */

// React/next
import React from 'react';

// Components
import ClassTypeContent from './ClassTypeContent';
import SubjectContent from './SubjectContent';
import UserContent from './UserContent';
import TuitionmContent from './TuitionmContent';

// Config/utils
import { adminSidebarList } from '../../config/keys';

// Redux
import { setSelectedContent } from '../../redux/reducers/adminReducer';
import { useAppSelector, useAppDispatch } from '../../redux/store';

// Hooks
import useMediaQuery from '../../hooks/useMediaQuery';

const { CLASS_TYPE, SUBJECT, USERS, MEDIUM } = adminSidebarList;

function Dashboard() {
  const isMounted = false;

  // Hooks
  const dispatch = useAppDispatch();
  const isMobileBr = useMediaQuery(768);

  // Redux state
  const adminSidebarElements = useAppSelector((state) => state.admin.adminSidebarElements);
  const selectedContent = useAppSelector((state) => state.admin.selectedContent);

  const selectSidebarElement = (ssee: React.SyntheticEvent, selectedElement: string) => {
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
        <ul className="d-flex list-unstyled flex-row flex-md-column mb-0">
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
