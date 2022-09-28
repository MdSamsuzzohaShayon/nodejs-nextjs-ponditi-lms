/* eslint-disable @next/next/no-img-element */
import styles from '../styles/Home.module.scss'; // We can create css file like this
import Layout from '../components/layouts/Layout';
import SearchForm from '../components/search/SearchForm';

export default function Home() {

  return (
    <Layout>
      <div className={styles.wrapper}>
        <section className="section section-1 py-5" id="home-section">
          <div className="container d-flex justify-content-between">
            <div className="caption">
              <h1>Deliver Better Learning Through Better Teacher</h1>
              <p>
                Offer engaging learning experiences that go beyond traditional
                Learning Management Systems. packed with advanced features to
                find teachers, educate yourself,
              </p>
            </div>
            <div className="learner text-end">
              <img
                src="/shape/learner.svg"
                alt="learner"
                className="learner-img"
              />
            </div>
          </div>
        </section>
        <section className="section section-2 bg-secondary text-dark">
          <div className="container">
            <SearchForm />
          </div>
        </section>
      </div>
    </Layout>
  );
}
