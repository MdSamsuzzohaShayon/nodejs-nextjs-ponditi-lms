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
          <select
            name="district"
            id="district"
            className="form-control"
            defaultValue={currentUser.district ? currentUser.district : 'Select a district'}
            onChange={props.inputChangeHandler}
          >
            {['Select a district', ...districtList.districtList].map((dl, dli) => (
              <option value={dl.toLowerCase()} key={dli}>
                {dl}
              </option>
            ))}
          </select>
        </div>
        {/* google places api end  */}
      </div>
      <div className="row mb-3 mx-0">
        <div className="col-md-6">
          <label htmlFor="profession">Profession</label>
          <input type="text" className="form-control" name="profession" id="profession" defaultValue={currentUser?.profession} onChange={props.inputChangeHandler} />
        </div>
        <div className="col-md-6">
          <label htmlFor="experience">Experience (years)</label>
          <input type="number" className="form-control" name="experience" id="experience" defaultValue={currentUser?.experience} onChange={props.inputChangeHandler} />
        </div>
      </div>
      <div className="row mb-3 mx-0">
        <div className="col-12">
          <label htmlFor="institution">Institution</label>
          <input type="text" className="form-control" name="institution" id="institution" defaultValue={currentUser?.institution} onChange={props.inputChangeHandler} />
        </div>
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
              onChange={props.inputChangeHandler}
              placeholder="E.G. 27-2, Dhanmondi, Dhaka, Bangladesh"
            />
          </Autocomplete>
        </div>
      </div>
    </div>
  );
}

export default PersonalInformationForm;
