import { useSelector, useDispatch } from 'react-redux';
import UserList from './UserList';
import { scheduledclassStatus } from '../../config/keys';
import { setSelectedTabElement } from '../../redux/reducers/adminReducer';

const { APPROVED, REJECTED, PENDING } = scheduledclassStatus;

function UserContent() {
  const dispatch = useDispatch();
  const allUserList = useSelector((state) => state.user.allUserList);
  const allPendingUserList = useSelector(
    (state) => state.user.allPendingUserList
  );
  const allRejectedUserList = useSelector(
    (state) => state.user.allRejectedUserList
  );
  const allApprovedUserList = useSelector(
    (state) => state.user.allApprovedUserList
  );
  const selectedTabElement = useSelector(
    (state) => state.admin.selectedTabElement
  );

  const showConetent = () => {
    switch (selectedTabElement) {
      case APPROVED: {
        return (
          <UserList
            allUserList={allApprovedUserList}
            selectedTabElement={selectedTabElement}
          />
        );
      }
      case PENDING: {
        return (
          <UserList
            allUserList={allPendingUserList}
            selectedTabElement={selectedTabElement}
          />
        );
      }
      case REJECTED: {
        return (
          <UserList
            allUserList={allRejectedUserList}
            selectedTabElement={selectedTabElement}
          />
        );
      }

      default: {
        return (
          <UserList
            allUserList={allUserList}
            selectedTabElement={selectedTabElement}
          />
        );
      }
    }
  };
  return <div className="UserContent">{showConetent()}</div>;
}

export default UserContent;
