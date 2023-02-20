/* eslint-disable jsx-a11y/control-has-associated-label */
import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/reducers/elementsSlice';
// import useStyles from '../../styles/Home.style.js';

import { useAppSelector, useAppDispatch } from '../../redux/store';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '80%', md: 450 },
  minHeight: 200,
  color: 'white',
  bgcolor: '#24242a',
  boxShadow: 24,
  p: 4,
};

function ModalQuestion() {
  // const classes = useStyles();
  const dispatch = useAppDispatch();
  // const [open, setOpen] = React.useState(false);
  const open = useAppSelector((state) => state.elements.modal.open);
  const text = useAppSelector((state) => state.elements.modal.text);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // onClose={() => dispatch(closeModal())}
  const modalCloseHandler = (mce: React.SyntheticEvent) => {
    mce.preventDefault();
    dispatch(closeModal());
  };
  return (
    <div className={open ? 'modal d-block' : 'modal d-none'}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{text.heading}</h5>
            <button type="button" className="btn-close" onClick={modalCloseHandler} />
          </div>
          <div className="modal-body">
            <p>{text.body}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">
              Yes
            </button>
            <button type="button" className="btn btn-danger">
              No
            </button>
            <button type="button" className="btn btn-danger">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalQuestion;
