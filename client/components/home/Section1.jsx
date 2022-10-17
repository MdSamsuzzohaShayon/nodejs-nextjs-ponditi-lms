/* eslint-disable @next/next/no-img-element */
function Section1() {
  return (
    <section className="py-5" id="home-section">
      <div className="container d-flex justify-content-between">
        <div className="caption">
          <h1>Deliver Better Learning Through Better Teacher</h1>
          <p>
            Offer engaging learning experiences that go beyond traditional
            Learning Management Systems. packed with advanced features to find
            teachers, educate yourself,
          </p>
        </div>
        <div className="learner text-end">
          <img src="/shape/learner.svg" alt="learner" className="learner-img" />
        </div>
      </div>
    </section>
  );
}

export default Section1;
