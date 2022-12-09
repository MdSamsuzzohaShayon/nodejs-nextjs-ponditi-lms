/* eslint-disable react/no-array-index-key */
import { useSelector } from 'react-redux';

function ErrorMessages() {
  const errorList = useSelector((state) => state.elements.errorList);
  if (errorList.length > 0) {
    return (
      <div className="alert alert-danger">
        <ul>
          {errorList.map((el, idx) => (
            <li key={idx} className="list-unstyled">
              <img src="/icons/exclamination.svg" alt="" width="25px" /> {el}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
}

export default ErrorMessages;
