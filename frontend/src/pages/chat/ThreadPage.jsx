// NPM Packages
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

// Project Files
import ChatApi from '../../api/ChatApi';
import UserApi from '../../api/UserApi';
import ChatPage from './ChatPage';
import Thread from '../../components/chat/Thread';

function ThreadPage() {
  // Local State
  const [threads, setThreads] = useState([]);
  const { id } = useParams();
  const { state } = useLocation();
  const locationState =
    state === null || state === undefined ? '' : state.thread;
  const [messageBox, setMessageBox] = useState({
    threadId: id,
    thread: locationState,
  });
  const [currentUser, setCurrentUser] = useState({});

  // Methods
  useEffect(() => {
    const getThreads = async () => {
      const response = await ChatApi.getAllThread();
      setThreads(response.data);
    };
    getThreads();
  }, []);
 
  useEffect(() => {
    UserApi.getUser()
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch((err) => console.error(err));
  }, [setCurrentUser]);

  const userThreads = threads.filter(
    (thread) =>
      currentUser.email === thread.p1Email ||
      currentUser.email === thread.p2Email
  );
  const listOfThreads = userThreads.map((thread) => (
    <Thread key={thread.id} setMessageBox={setMessageBox} thread={thread} />
  ));

  return (
    <div className="main-container-item">
      <div className="post-info">
        <h2 className="chat-header">Recent chats</h2>
      </div>

      <div className="inbox_chat scroll">
        {threads === [] ? 'loading...' : listOfThreads}
      </div>

      <div className="mesgs">
        {messageBox.thread === '' ? null : (
          <ChatPage id={messageBox.threadId} thread={messageBox.thread} />
        )}
      </div>
    </div>
  );
}

export default ThreadPage;