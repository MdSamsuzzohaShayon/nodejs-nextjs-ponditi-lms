import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, setUserFormsType } from '../../redux/reducers/userReducer';
import { REGISTER, roles } from '../../config/keys';

const { TEACHER, STUDENT } = roles;

// Teacher student selection
function TsSelect() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.currentUser);
  const toggleRole = (tre, role) => {
    tre.preventDefault();
    dispatch(setCurrentUser({ role }));
  };

  const nextStepHandler = (nse) => {
    nse.preventDefault();
    dispatch(setUserFormsType(REGISTER));
  };
  return (
    <div className="section">
      <div className="row mb-3 mx-0 text-center">
        <div className="buttons my-3">
          <button
            type="button"
            onClick={(e) => toggleRole(e, TEACHER)}
            className={userInfo.role === TEACHER ? 'btn btn-primary border  p-5 display-3' : 'btn btn-primary-outline border  p-5 display-3'}
          >
            Register as teacher
          </button>
          <button
            type="button"
            className={userInfo.role === STUDENT ? 'btn btn-primary border  p-5 display-3' : 'btn btn-primary-outline border  p-5 display-3'}
            onClick={(e) => toggleRole(e, 'STUDENT')}
          >
            Register as student
          </button>
        </div>
      </div>
      <div className="row mb-3 justify-content-center">
        <button className="btn btn-primary w-fit" type="button" onClick={nextStepHandler}>
          Next
        </button>
      </div>
    </div>
  );
}

export default TsSelect;