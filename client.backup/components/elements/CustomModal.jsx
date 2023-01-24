/* eslint-disable jsx-a11y/control-has-associated-label */
import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/reducers/elementsSlice';
// import useStyles from '../../styles/Home.style.js';

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

function CustomModal() {
  // const classes = useStyles();
  const dispatch = useDispatch();
  // const [open, setOpen] = React.useState(false);
  const open = useSelector((state) => state.elements.modal.open);
  const text = useSelector((state) => state.elements.modal.text);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // onClose={() => dispatch(closeModal())}
  return (
    <div className="modal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button type="button" className="btn-close" />
          </div>
          <div className="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
