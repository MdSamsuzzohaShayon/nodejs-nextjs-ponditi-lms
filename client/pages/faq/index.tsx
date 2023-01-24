import React from 'react';
import Layout from '../../components/layouts/Layout';
import UnderDev from '../../components/elements/UnderDev';

function faq() {
  return (
    <Layout title="Frequently Asked Questions | Ponditi">
      <section className="section section-1">
        <div className="container">
          {/* FAQ */}
          <UnderDev />
        </div>
      </section>
    </Layout>
  );
}

export default faq;
