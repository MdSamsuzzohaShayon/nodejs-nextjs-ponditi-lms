/* eslint-disable @next/next/no-img-element */
import styles from '../styles/Home.module.scss'; // We can create css file like this
import Layout from '../components/layouts/Layout';
import SearchForm from '../components/search/SearchForm';
import Section1 from '../components/home/Section1';

export default function home() {

  return (
    <Layout>
      <div className={styles.wrapper}>
        <Section1 />
        <section className="section section-2 bg-secondary text-dark">
          <div className="container">
            <SearchForm />
          </div>
        </section>
      </div>
    </Layout>
  );
}
