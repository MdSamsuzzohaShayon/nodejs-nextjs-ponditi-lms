import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layouts/Layout';
import UnderDev from '../../components/elements/UnderDev';

import { useSocket } from '../../context/ThemeProvider';
import Chat from '../../components/user/Chat/Chat';

function contact() {
  const socket = useSocket();

  // Just an example - working properly
  const sendMessageHandler = (sme) => {
    sme.preventDefault();
    socket.emit('message-from-client', { message: 'roomId: params.roomId' });
  };

  return (
    <Layout title="Contact Us | Ponditi">
      <section className="section section-1">
        <div className="container">
          {/* Contact */}
          <UnderDev />
          <Chat />
          <button className="btn btn-primary" onClick={sendMessageHandler} type="button">
            Send
          </button>
        </div>
      </section>
    </Layout>
  );
}

export default contact;
