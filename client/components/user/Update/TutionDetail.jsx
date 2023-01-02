/* eslint-disable no-lonely-if */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUpdateUser } from '../../../redux/reducers/userReducer';
import RateInput from '../../register/RateInput';
// import { setSubjectList } from '../../../redux/reducers/subjectReducer';
import { roles } from '../../../config/keys';

const { TEACHER } = roles;

function TutionDetail(props) {
  // const isMounted = true;

  const [placeItems, setPlaceItems] = useState([]);
  const [isUserAvailable, setIsUserAvailable] = useState(false);

  const dispatch = useDispatch();
  // const classtypeList = useSelector((state) => state.classtype.classtypeList);
  const currentUser = useSelector((state) => state.user.currentUser);
  const updateUser = useSelector((state) => state.user.updateUser);
  const tutionPlaces = useSelector((state) => state.search.searchTypeList);
  // const [available, setAvailable] = useState(currentUser.isAvailable);

  useEffect(() => {
    if (currentUser.isAvailable) {
      setIsUserAvailable(currentUser.isAvailable);
    }
  }, [currentUser]);

  // const classtypeInputChangeHandler = (iche) => {
  //   const val = parseInt(iche.target.value, 10);
  //   // console.log({val});
  //   // ClassTypeId
  //   dispatch(setUpdateUser({ ClassTypeId: [val] }));
  //   const newSubjectList = classtypeList.find((ctl) => ctl.id === val).Subjects;
  //   if (newSubjectList.length === 1) {
  //     dispatch(setUpdateUser({ SubjectId: [newSubjectList[0].id] }));
  //     dispatch(setSubjectList(newSubjectList));
  //   } else {
  //     dispatch(setSubjectList(newSubjectList));
  //   }
  // };
  // const subjectInputChangeHandler = (iche) => {
  //   const val = parseInt(iche.target.value, 10);
  //   // ClassTypeId
  //   dispatch(setUpdateUser({ SubjectId: [val] }));
  // };
  // Set default values with use effect
  // useEffect(() => {
  //   dispatch(
  //     setUpdateUser({
  //       firstname: currentUser?.firstname,
  //       lastname: currentUser?.lastname,
  //       email: currentUser?.email,
  //       district: currentUser?.district,
  //       presentaddress: currentUser?.presentaddress,
  //     })
  //   );
  // }, []);

  const availablityChangeHandler = (ace, isAvailable) => {
    console.log(ace.target.checked);
    dispatch(setUpdateUser({ isAvailable }));
    setIsUserAvailable(isAvailable);
    // console.log(isAvailable);
  };

  const tutionPlaceChangeHandler = (tpce, tutionPlace) => {
    // console.log(tpce.target.checked);
    if (tpce.target.checked) {
      const newPlaceItems = [...placeItems, tutionPlace];
      setPlaceItems(newPlaceItems);
      dispatch(setUpdateUser({ tutionplace: newPlaceItems }));
    } else {
      const newItems = placeItems.filter((pi) => pi !== tutionPlace);
      setPlaceItems(newItems);
      dispatch(setUpdateUser({ tutionplace: newItems }));
    }
  };

  const tuitionPlaceChangeHandler = (tpe) => {
    console.log(tpe.target.name);
    if (tpe.target.checked) {
      // add new item
      // dispatch(setRegisterableUser({ tutionplace: [...props.user.tutionplace, tpe.target.name.toUpperCase()] }));
      // props.tuitionPlaceChange(true, tpe);
    } else {
      // Remove deselected item
      // const newRegisterableUser = props.user.tutionplace.filter((ru) => ru.toUpperCase() !== tpe.target.name.toUpperCase());
      // dispatch(setRegisterableUser({ tutionplace: newRegisterableUser }));
      // props.tuitionPlaceChange(false, tpe);
      if (tpe.target.name === 'online') {
        dispatch(setUpdateUser({ ol_rate: null }));
      } else if (tpe.target.name === 'tl') {
        dispatch(setUpdateUser({ tl_rate: null }));
      } else {
        dispatch(setUpdateUser({ sl_rate: null }));
      }
    }
  };

  const inputRateChangeHandler = ({ name, rate }) => {
    let newRate = null;
    Number.isNaN(rate) ? (newRate = null) : (newRate = rate);
    // console.log({ name, rate: newRate });
    dispatch(setUpdateUser({ [name]: newRate }));
  };

  return (
    <div className="TutionDetail">
      <div className="row mb-3 mx-0">
        <div className="col-md-12">
          <label htmlFor="isAvailable">Available Status</label>
          <div className="toggle d-flex">
            <div className="form-check w-fit">
              <input
                className="form-check-input"
                type="radio"
                name="available"
                id="available"
                onChange={(ace) => availablityChangeHandler(ace, true)}
                checked={isUserAvailable === true}
              />
              <label className="form-check-label" htmlFor="available">
                Available
              </label>
            </div>
            <div className="form-check w-fit mx-4">
              <input
                className="form-check-input"
                type="radio"
                name="notavailable"
                id="notavailable"
                checked={isUserAvailable !== true}
                onChange={(ace) => availablityChangeHandler(ace, false)}
              />
              <label className="form-check-label" htmlFor="notavailable">
                N/A
              </label>
            </div>
          </div>
        </div>
      </div>
      <RateInput user={currentUser} tuitionPlaceChange={tuitionPlaceChangeHandler} inputRateChange={inputRateChangeHandler} />
    </div>
  );
}

export default TutionDetail;
