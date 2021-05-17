import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ChatApi from '../../api/ChatApi';
import ChatPage from './ChatPage';
import Thread from '../../components/chat/Thread';

// Todo: We should still filter out message threads based on user.
// Also, sometimes a second thread is generated even though one between the participants exist.
// We should revisit the backend to sort this issue.

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
    <div>
      <div className="messaging">
        <div className="inbox_msg">
          <div className="inbox_people">
            <div className="headind_srch">
              <div className="recent_heading">
                <h4>Recent</h4>
              </div>
              <div className="srch_bar">
                <div className="stylish-input-group">
                  <input
                    type="text"
                    className="search-bar"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
            <div className="inbox_chat scroll">
              <div className="chat_list active_chat">
                {threads === [] ? 'loading...' : listOfThreads}
              </div>
            </div>
          </div>
          <div className="mesgs">
            {messageBox.thread === '' ? null : (
              <ChatPage id={messageBox.threadId} thread={messageBox.thread} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThreadPage;
