/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import Loader from '../../elements/Loader';
import { GOOGLE_PLACE_API_KEY, libraries } from '../../../config/keys';
import { setUpdateUser } from '../../../redux/reducers/userReducer';
import districtList from '../../../data/districtList.json';

const DISTRICT = 'DISTRICT';
const PRESENTADDRESS = 'PRESENTADDRESS';

function PersonalInformationForm(props) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  /**
   * @api for google places
   */
  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY,
    googleMapsApiKey: GOOGLE_PLACE_API_KEY,
    libraries,
  });
  const [autocomplete, setAutocomplete] = useState(null);

  if (!isLoaded) {
    return <Loader />;
  }
  const onLoadHandler = (ace) => {
    setAutocomplete(ace);
    // console.log("On Load", ace);
  };
  const placeChangedHandler = (placeFor) => {
    // console.log(autocomplete.getPlace());
    try {
      // console.log(placeFor);
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();
      // console.log({ lat, lng });
      // console.log({ name: autocomplete.getPlace().name });
      // console.log(autocomplete.getPlace().formatted_address);
      switch (placeFor) {
        case DISTRICT:
          // set district
          dispatch(setUpdateUser({ district: autocomplete.getPlace().name }));
          break;
        case PRESENTADDRESS:
          dispatch(
            setUpdateUser({
              presentaddress: `${autocomplete.getPlace().name}, ${autocomplete.getPlace().formatted_address}, (${lng}, ${lat})`,
            })
          );
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const placeInputEmptyHandler = (piee, placeFor) => {
  //   console.log("Get place from input change handler");
  //   if (piee.target.value === '' || piee.target.value === null) {
  //     // set empty
  //     switch (placeFor) {
  //       case DISTRICT:
  //         // set district
  //         dispatch(setUpdateUser({ district: '' }));
  //         break;
  //       case PRESENTADDRESS:
  //         dispatch(
  //           setUpdateUser({
  //             presentaddress: '',
  //           })
  //         );
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // };

  const inputChangeHandler = (ice) => {
    dispatch(setUpdateUser({ [ice.target.name]: ice.target.value }));
  };

  return (
    <div className="PersonalInformationForm">
      <div className="row mb-3 mx-0">
        <div className="col-md-6">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" name="name" id="name" defaultValue={currentUser?.name} onChange={props.inputChangeHandler} />
        </div>
        {/* google places api start  */}
        <div className="col-md-6">
          <label htmlFor="district">district</label>
          <select name="district" id="district" className="form-control" defaultValue={currentUser?.district} onChange={inputChangeHandler}>
            <option value="" selected>
              Select a district
            </option>
            {districtList.districtList.map((dl, dli) => (
              <option value={dl.toLowerCase()} key={dli}>
                {dl}
              </option>
            ))}
          </select>
          {/* <input
            type="text"
            className="form-control"
            name="district"
            id="district"
            defaultValue={currentUser?.district}
            // onChange={(piee) => placeInputEmptyHandler(piee, DISTRICT)}
            onChange={inputChangeHandler}
            placeholder="E.G. Dhaka"
          /> */}
        </div>
        {/* google places api end  */}
      </div>
      <div className="row mb-3 mx-0">
        <div className="col-12">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" name="email" id="email" defaultValue={currentUser?.email} onChange={props.inputChangeHandler} />
        </div>
      </div>
      <div className="row mb-3 mx-0">
        <div className="col-12">
          <label htmlFor="presentaddress">Present Address</label>
          <Autocomplete onLoad={onLoadHandler} onPlaceChanged={() => placeChangedHandler(PRESENTADDRESS)} className="form-control p-0">
            <input
              type="text"
              className="form-control"
              name="presentaddress"
              id="presentaddress"
              defaultValue={currentUser?.presentaddress}
              // onChange={(piee) => placeInputEmptyHandler(piee, PRESENTADDRESS)}
              onChange={inputChangeHandler}
              placeholder="E.G. 27-2, Dhanmondi, Dhaka, Bangladesh"
            />
          </Autocomplete>
        </div>
      </div>
    </div>
  );
}

export default PersonalInformationForm;
