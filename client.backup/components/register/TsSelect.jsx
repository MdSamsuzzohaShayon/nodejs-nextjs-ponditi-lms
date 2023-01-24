import { useSelector, useDispatch } from 'react-redux';
import { setRegisterableUser } from '../../redux/reducers/userReducer';
import { REGISTER, roles } from '../../config/keys';

const { TEACHER, STUDENT } = roles;

// Teacher student selection
function TsSelect() {
  const dispatch = useDispatch();
  const registerableUser = useSelector((state) => state.user.registerableUser);
  const toggleRole = (tre, role) => {
    tre.preventDefault();
    dispatch(setRegisterableUser({ role }));
  };

  return (
    <div className="row mb-3 mx-0 text-center">
      <div className="buttons my-3">
        <button
          type="button"
          onClick={(e) => toggleRole(e, TEACHER)}
          className={registerableUser.role === TEACHER ? 'btn btn-primary border  p-5 fs-3' : 'btn btn-primary-outline border  p-5 fs-3'}
        >
          Register as teacher
        </button>
        <button
          type="button"
          className={registerableUser.role === STUDENT ? 'btn btn-primary border  p-5 fs-3' : 'btn btn-primary-outline border  p-5 fs-3'}
          onClick={(e) => toggleRole(e, 'STUDENT')}
        >
          Register as student
        </button>
      </div>
    </div>
  );
}

export default TsSelect;
