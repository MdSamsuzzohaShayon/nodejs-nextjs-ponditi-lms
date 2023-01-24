import React from "react";
function Loader() {
  return (
    <div className="Loader d-flex justify-content-center spinner-wrapper vertical-center" >
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
