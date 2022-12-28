import { useSelector } from 'react-redux';

function InputElement({ text, field, inputChangeHandler }) {
  const userInfo = useSelector((state) => state.user.currentUser);

  let type = 'text';
  if (field === 'password' || field === 'password2') type = 'password';
  if (field === 'email') type = 'email';
  if (field !== 'phone') {
    return (
      <div className="col-sm-12 col-md-6 mb-3">
        <label htmlFor={field}>{text}</label>
        <input type={type} required className="form-control" name={field} id={field} defaultValue={userInfo[field]} onChange={inputChangeHandler} placeholder={text} />
      </div>
    );
  }
}

export default InputElement;
