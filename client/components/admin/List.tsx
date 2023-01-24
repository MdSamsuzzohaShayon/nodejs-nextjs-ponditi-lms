/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

function List(props) {
  return (
    <div className="List">
      <h1>{props.title}</h1>
      {props.list.length > 0 &&
        props.list.map((ctl, idx) => (
          <div className="row mx-0 border-bottom" key={idx}>
            <div className="col-md-4">{ctl.name}</div>
            <div className="col-md-4">
              {ctl?.Subjects && ctl?.Subjects?.length}
              {ctl?.ClassTypes && ctl?.ClassTypes?.length}
            </div>
            <div className="col-md-4">
              <div className="props prop-3 text-end">
                <button className="btn btn-danger w-fit " type="button" onClick={(e) => props.deleteHandler(e, ctl.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      <style jsx>{`
        .props {
          width: 33%;
        }
      `}</style>
    </div>
  );
}

export default List;
