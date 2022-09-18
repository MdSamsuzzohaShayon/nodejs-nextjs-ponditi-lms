
import styles from '../styles/Home.module.scss'; // We can create css file like this
import Layout from '../components/layouts/Layout';

export default function Home() {
  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className="container">
          Inside container
        </div>
        Home
      </div>
    </Layout>
  );
}
