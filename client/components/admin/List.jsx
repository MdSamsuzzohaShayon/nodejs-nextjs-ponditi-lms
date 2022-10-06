/* eslint-disable react/destructuring-assignment */
import React from 'react';

function List(props) {
  return (
    <div className="List">
      <h1>{props.title}</h1>
      {props.list.length > 0 && (
        <ul className="list-group">
          {props.list.map((ctl) => (
            <li
              className="list-group-item rounded-1 d-flex justify-content-between"
              key={ctl.id}
            >
              <span className="text-capitalize props prop-1">{ctl.name}</span>
              <p className="props prop-2 text-center">
                {ctl?.Subjects && ctl?.Subjects?.length}
                {ctl?.ClassTypes && ctl?.ClassTypes?.length}
              </p>
              <div className="props prop-3 text-end">
                <button
                  className="btn btn-danger w-fit "
                  type="button"
                  onClick={(e) => props.deleteHandler(e, ctl.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <style jsx>{`
        .props {
          width: 33%;
        }
      `}</style>
    </div>
  );
}

export default List;
