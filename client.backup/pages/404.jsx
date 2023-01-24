import Link from 'next/link';
import Layout from '../components/layouts/Layout';

export default function Page404() {
  return (
    <Layout title="Page not found | Ponditi">
      <section className="section container">
        <div className="alert alert-danger">
          <h1>Page not found</h1>
          <Link href="/">
            <p className="text-danger text-underline">Return to home</p>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
