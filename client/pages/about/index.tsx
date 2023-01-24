import React from 'react';
import Layout from '../../components/layouts/Layout';
import UnderDev from '../../components/elements/UnderDev';

function about() {
  return (
    <Layout title="About Us | Ponditi">
      <section className="section section-1">
        <div className="container">
          <UnderDev />
        </div>
      </section>
    </Layout>
  );
}

export default about;
