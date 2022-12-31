/* eslint-disable react/jsx-boolean-value */
/* eslint-disable @next/next/no-img-element */

import SearchForm from '../search/SearchForm';

function Section1() {
  return (
    <section className="py-5" id="home-section">
      <div className="container d-flex justify-content-between">
        <div className="row mb-5">
          <div className="col-md-6">
            <h1>First ever Hourly-paid tutoring platform in Bangladesh</h1>
            <p>
              Offer engaging learning experiences that go beyond traditional Learning Management Systems. packed with advanced features to find teachers, educate
              yourself,
            </p>
            <SearchForm fromHome={true} />
          </div>
          <div className="col-md-6">
            <img src="/shape/learner.svg" alt="learner" className="w-full" />
          </div>
        </div>

        {/* <div className="caption"></div>
        <div className="learner text-end"></div> */}
      </div>
    </section>
  );
}

export default Section1;
