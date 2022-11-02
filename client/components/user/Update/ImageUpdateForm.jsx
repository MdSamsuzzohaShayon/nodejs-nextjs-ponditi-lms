/* eslint-disable no-param-reassign */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { BACKEND_URL } from '../../../config/keys';
import axios from '../../../config/axios';
import {
  resetErrorList,
  setErrorList,
  toggleLoading,
} from '../../../redux/reducers/elementsSlice';

function ImageUpdateForm(props) {
  const fileInputElement = useRef(null);
  const [uploadedImageURL, setUploadedImageURL] = useState(null);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const authUserInfo = useSelector((state) => state.user.authUserInfo);

  useEffect(() => {
    // Set current image
    if (currentUser.image) {
      setUploadedImageURL(`${BACKEND_URL}/${currentUser.image}`);
      //   URL.createObjectURL(event.target.files[0])
    }
  }, [currentUser]);

  const fileInputChangeHandler = (fice) => {
    const fileExist = fileInputElement.current.files[0];
    if (fileExist) {
      //   console.log(fileExist);
      if (fileExist.size / 1000 > 1000) {
        // fileInputElement.current.value = 0;
        fice.target.value = '';
        return dispatch(
          setErrorList([
            'You must upload a file with less than 1 mega byte in size',
          ])
        );
      }

      if (
        fileExist.type !== 'image/jpeg' &&
        fileExist.type !== 'image/png' &&
        fileExist.type !== 'image/jpg' &&
        fileExist.type !== 'image/gif'
      ) {
        fice.target.value = '';
        return dispatch(
          setErrorList(['Invalid file type, please use jpg or png file type'])
        );
      }

      dispatch(resetErrorList());
      // fice.preventDefault();
      //   console.log(fice.target.files[0]);
      //   formData.set('image', fileExist);
      // Check all conditions
      setUploadedImageURL(URL.createObjectURL(fileExist));
      // image/jpeg
    }
    return null;
  };

  const profileImageUploadHandler = async (piue) => {
    const formData = new FormData();
    piue.preventDefault();
    const fileExist = fileInputElement.current.files[0];
    console.log(fileExist);
    if (fileExist) {
      await formData.set('image', fileExist);
      try {
        dispatch(toggleLoading(true));
        const controller = new AbortController();
        const options = {
          signal: controller.signal,
        };

        const response = await axios.put(
          `/user/updateimage/${authUserInfo.id}`,
          formData,
          options
        );
        controller.abort();
        if (
          response.status === 202 ||
          response.status === 201 ||
          response.status === 200
        ) {
          // console.log(response);
          window.localStorage.removeItem('updatePart');
          dispatch(resetErrorList());
          Router.push('/user/dashboard');
        }
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.msg) {
          dispatch(setErrorList([error.response.data.msg]));
        }
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 405
        ) {
          window.localStorage.removeItem('user');
          Router.push('/user/login');
        }
      } finally {
        dispatch(toggleLoading(false));
      }
    }
  };

  return (
    <div className="ImageUpdateForm">
      <form onSubmit={profileImageUploadHandler}>
        <div className="row mb-3 mx-0">
          <div className="col-md-6">
            <img
              src={uploadedImageURL || '/img/default-img.jpg'}
              className="img img-fluid"
              alt=""
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              className="form-control"
              name="image"
              id="image"
              ref={fileInputElement}
              onChange={fileInputChangeHandler}
            />
          </div>
        </div>
        <div className="row mx-0 mb-3">
          <div className="col-md-12 d-flex">
            <button className="btn btn-primary w-fit" type="submit">
              Update
            </button>
            <button
              className="btn btn-danger w-fit"
              onClick={props.cancelBtnHandler}
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ImageUpdateForm;
