/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Link from 'next/link';

function UnderDev(props) {
  return (
    <div className="UnderDev">
      <div className="card border-danger mt-5 bg-light">
        {!props.isHome && <div className="card-header text-center">First ever Hourly-paid tutoring platform in Bangladesh</div>}

        <div className="card-body text-danger text-center">
          <h2 className="card-title fs-2">Launching in February 4, 2023</h2>
          {/* <button className="btn btn-primary card-link" type="button">
            <Link href="/user/register">Register</Link>
          </button>
          <button className="btn btn-primary card-link" type="button">
            <Link href="/user/login">Login</Link>
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default UnderDev;
