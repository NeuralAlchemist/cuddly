import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ChatApi from '../../api/ChatApi';
import ChatPage from './ChatPage';
import Thread from '../../components/chat/Thread';

function ThreadPage() {
  const [threads, setThreads] = useState([]);
  const { id } = useParams();
  const { state } = useLocation();
  const locationState =
    state === null || state === undefined ? '' : state.thread;
  const [messageBox, setMessageBox] = useState({
    threadId: id,
    thread: locationState,
  });

  useEffect(() => {
    const getThreads = async () => {
      const response = await ChatApi.getAllThread();
      setThreads(response.data);
    };
    getThreads();
  }, []);

  const listOfThreads = threads.map((thread) => (
    <Thread key={thread.id} setMessageBox={setMessageBox} thread={thread} />
  ));
  return (
    <div className="main-container-item">
      <div className="post-info">
        <h2>Recent chats</h2>
      </div>

      <div className="inbox_chat scroll">
        {threads === [] ? 'loading...' : listOfThreads}
      </div>
    </div>
  );
}

export default ThreadPage;
