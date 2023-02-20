/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */

// React/nextjs
import React, { useRef, useState } from 'react';

// Google API
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';

// Components
import Loader from '../../elements/Loader';

// Config/utils
import { GOOGLE_PLACE_API_KEY, libraries } from '../../../config/keys';

// Redux
import { setUpdateUser } from '../../../redux/reducers/userReducer';
import { setErrorList, toggleLoading } from '../../../redux/reducers/elementsSlice';
import { useAppSelector, useAppDispatch } from '../../../redux/store';

// Static Data
import districtList from '../../../data/districtList.json';

const DISTRICT = 'DISTRICT';
const PRESENTADDRESS = 'PRESENTADDRESS';

function PersonalInformationForm({ nidInputEl, inputChangeHandler }) {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);

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
      if (autocomplete) {
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
              }),
            );
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fileInputChangeHandler = async (fice: React.ChangeEvent<HTMLInputElement>) => {
    // fice.preventDefault();
    // console.log('Upload a file');
    if (!nidInputEl.current) return;
    const fileExist = nidInputEl.current.files[0];
    if (fileExist) {
      // File can be uploaded
      if (fileExist.size / 8000 > 8000) {
        // fileInputElement.current.value = 0;
        fice.target.value = '';
        dispatch(setErrorList(['You must upload a file with less than 8 mega byte in size']));
      }

      if (fileExist.type !== 'image/jpeg' && fileExist.type !== 'image/png' && fileExist.type !== 'image/jpg' && fileExist.type !== 'image/gif') {
        fice.target.value = '';
        dispatch(setErrorList(['Invalid file type, please use jpg or png file type']));
      }
    }
  };

  return (
    <div className="PersonalInformationForm">
      <div className="row mb-3 mx-0">
        <div className="col-md-6">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" name="name" id="name" defaultValue={currentUser?.name} onChange={inputChangeHandler} />
        </div>
        {/* google places api start  */}
        <div className="col-md-6">
          <label htmlFor="district">district</label>
          <select
            name="district"
            id="district"
            className="form-control"
            defaultValue={currentUser.district ? currentUser.district : 'Select a district'}
            onChange={inputChangeHandler}
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
          <input type="text" className="form-control" name="profession" id="profession" defaultValue={currentUser?.profession} onChange={inputChangeHandler} />
        </div>
        <div className="col-md-6">
          <label htmlFor="experience">Experience (years)</label>
          <input type="number" className="form-control" name="experience" id="experience" defaultValue={currentUser?.experience} onChange={inputChangeHandler} />
        </div>
      </div>
      <div className="row mb-3 mx-0">
        <div className="col-12">
          <label htmlFor="institution">Institution</label>
          <input type="text" className="form-control" name="institution" id="institution" defaultValue={currentUser?.institution} onChange={inputChangeHandler} />
        </div>
      </div>
      <div className="row mb-3 mx-0">
        <div className="col-12">
          <label htmlFor="institution">NID Card</label>
          <input type="file" className="form-control" name="id_proof" ref={nidInputEl} id="id_proof" onChange={fileInputChangeHandler} />
        </div>
      </div>

      <div className="row mb-3 mx-0">
        <div className="col-12">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" name="email" id="email" defaultValue={currentUser?.email} onChange={inputChangeHandler} />
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
