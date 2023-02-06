import React from 'react';
import Layout from '../../layouts/Layout';
import Chat from './Chat';

function ChatWindow() {
  return (
    <Layout title="User Messages | Ponditi">
      <Chat receiverId={null} authUserInfo={undefined} />
    </Layout>
  );
}

export default ChatWindow;
