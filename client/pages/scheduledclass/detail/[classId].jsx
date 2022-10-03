import { useRouter } from 'next/router';
import Layout from '../../../components/layouts/Layout';

function detail() {
  const router = useRouter();
  const { classId } = router.query;
  return (
    <Layout>
      <section className="section section-1">
        <div className="container">
          <p>detail scheduled class{classId}</p>
          <p>Teacher or student detail</p>
          <p>class</p>
          <p>subject</p>
          <p>desc</p>
          <p>start time</p>
          <p>Deration</p>
          <p>total payable</p>
          <p>total bill</p>
          <p>Resolution Center</p>
          <p>Review</p>
          <p>Is paid or completed(button)?</p>
          </div>
      </section>
    </Layout>
  );
}

export default detail;
