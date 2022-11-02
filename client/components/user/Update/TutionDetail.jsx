/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUpdateUser } from '../../../redux/reducers/userReducer';
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

  return (
    <div className="TutionDetail">
      <div className="row mb-3 mx-0">
        {currentUser.role === TEACHER && (
          <div className="col-sm-12 col-md-6">
            <label htmlFor="rate">Per Hour Rate (TK)</label>
            <input
              type="number"
              className="form-control"
              name="rate"
              id="rate"
              defaultValue={currentUser?.rate}
              onChange={props.inputChangeHandler}
              placeholder="E.G. 300"
            />
          </div>
        )}
        <div className="col-sm-12 col-md-6">
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
      <div className="row mb-3 mx-0">
        <div className="col-sm-12 col-md-6">
          <label htmlFor="tutionplace">Tution Places</label>
          <div className="input-checkbox d-flex align-items-center">
            {tutionPlaces
              .filter((tp) => tp.id !== 0)
              .map((tpm, tmpI) => (
                <div
                  className="input-checkbox-item d-flex align-items-center"
                  key={tmpI}
                >
                  {/* <option value={tpm.type}>{tpm.text}</option> */}
                  <input
                    type="checkbox"
                    className="tution-place-checkbox"
                    name={tpm.type}
                    onChange={(tpce) =>
                      tutionPlaceChangeHandler(tpce, tpm.type)
                    }
                  />
                  <label htmlFor={tpm.type} className="m-2">
                    {tpm.text}
                  </label>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutionDetail;
