/* eslint-disable react/jsx-boolean-value */
/* eslint-disable @next/next/no-img-element */

import SearchForm from '../search/SearchForm';

function Section1() {
  return (
    <section className="py-5 section-1 section">
      <div className="container d-flex justify-content-between">
        <div className="row mb-5">
          <div className="col-md-6">
            <div className="mb-3">
              <h1 className="fs-2 mb-md-3">First Ever Hourly-Paid tutoring Platform in Bangladesh</h1>
              <p>Hire your desired tutor, Learn anything offline or online on your schedule & location, and Pay hourly</p>
            </div>
            <SearchForm fromHome={true} />
          </div>
          <div className="col-md-6 d-none d-md-block">
            <img src="/shape/learner.svg" alt="learner" className="w-full mt-md-5" />
          </div>
        </div>

        {/* <div className="caption"></div>
        <div className="learner text-end"></div> */}
      </div>
    </section>
  );
}

export default Section1;
