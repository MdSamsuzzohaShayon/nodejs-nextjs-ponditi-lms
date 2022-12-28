/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-array-index-key */
import { useSelector } from 'react-redux';

function MessageList() {
  const errorList = useSelector((state) => state.elements.errorList);
  const successMessageList = useSelector((state) => state.elements.successMessageList);
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

  if (successMessageList.length > 0) {
    return (
      <div className="alert alert-success">
        <ul>
          {successMessageList.map((sm, idx) => (
            <li key={idx} className="list-unstyled">
              <img src="/icons/tick.svg" alt="" width="25px" /> {sm}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
}

export default MessageList;
