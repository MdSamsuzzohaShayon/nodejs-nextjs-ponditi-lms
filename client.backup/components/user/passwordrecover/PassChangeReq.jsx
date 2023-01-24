/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch } from 'react-redux';
import { resetChangeResetPassReq } from '../../../redux/reducers/userReducer';
import { resetErrorList, setErrorList, toggleLoading } from '../../../redux/reducers/elementsSlice';
import axios from '../../../config/axios';

function PassChangeReq(props) {
  const dispatch = useDispatch();

  // const resetPassReq = useSelector((state) => state.user.resetPassReq);



  const passChangeReqHandler = async (pcre) => {
    pcre.preventDefault();
    dispatch(resetErrorList());
    if (props.resetPassReq.phoneoremail === '') {
      dispatch(setErrorList(['both field must be filled']));
    }

    const newObj = {};
    if (props.resetPassReq.phoneoremail.toString().includes('@')) {
      newObj.email = props.resetPassReq.phoneoremail;
    } else {
      newObj.phone = props.resetPassReq.phoneoremail;
    }

    try {
      dispatch(toggleLoading(true));
      const response = await axios.post('/user/forgetpassword', newObj, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        dispatch(resetErrorList());
        // navigate to next step
        props.toNextStep();
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
    } finally {
      dispatch(toggleLoading(false));
    }
  };

  return (
    <div>
      <form onSubmit={passChangeReqHandler} >
        <div className="row mb-3">
          <div className="col-md-12">
            <label htmlFor="phoneoremail">Phone or Email (an OTP will be sent to your phone)</label>
            <input type="text" className="form-control" name="phoneoremail" defaultValue={props.resetPassReq.phoneoremail} onChange={props.inputChangeHandler} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <button type="submit" className="btn btn-primary w-fit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PassChangeReq;
