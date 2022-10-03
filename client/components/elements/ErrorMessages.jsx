/* eslint-disable react/no-array-index-key */
import { useSelector } from 'react-redux';

function ErrorMessages() {
  const errorList = useSelector((state) => state.elements.errorList);
  if (errorList.length > 0) {
    return (
      <div className="alert alert-danger">
        <ul>
          {errorList.map((el, idx) => (
            <li key={idx}>{el}</li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
}

export default ErrorMessages;