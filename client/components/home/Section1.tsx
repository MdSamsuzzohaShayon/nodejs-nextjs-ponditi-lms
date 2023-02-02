/* eslint-disable react/jsx-boolean-value */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import SearchForm from '../search/SearchForm';
import UnderDev from '../elements/UnderDev';

function Section1() {
  return (
    <section className="py-5 section-1 section">
      {/* Origial content  */}
      <div className="container d-flex justify-content-between">
        <div className="row mb-5">
          <div className="col-md-6">
            <div className="mb-3">
              <h1 className="fs-2 mb-md-3">First Ever Hourly-Paid tutoring Platform in Bangladesh</h1>
              <p>Hire your desired tutor, learn anything in your schedule & location and pay hourly</p>
            </div>
            <SearchForm fromHome={true} />
          </div>
          <div className="col-md-6 d-none d-md-block">
            <img src="/shape/learner.svg" alt="learner" className="w-full mt-md-5" />
          </div>
        </div>
      </div>

      {/* <div className="container text-center">
        <h1 className="fs-2 mb-md-3">First Ever Hourly-Paid Tutoring Platform in Bangladesh</h1>
        <p>Hire your desired tutor, learn anything in your schedule & location and pay hourly</p>
        <br />
        <br />
        <UnderDev isHome={true} />
      </div> */}
    </section>
  );
}

export default Section1;
