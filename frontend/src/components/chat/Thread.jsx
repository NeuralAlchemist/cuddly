// NPM Packages
import React from 'react';
import { Link } from 'react-router-dom';

function Thread({ thread, setMessageBox }) {
  // Local state
  const senderMail = window.sessionStorage.getItem('userEmail');
  const receiverEmail =
    senderMail === thread.p1Email ? thread.p2Email : thread.p1Email;
  const clickHandler = () => {
    setMessageBox({ threadId: thread.id, thread: thread });
  };

  return (
    <div className="form-container">
      <div className="main-container-item">
        <h4 className="thread-title">Chat with</h4>
      </div>
      <div className="chat_ib">
        <h5>
          <Link
            className="post-userinfo"
            to={{ pathname: `/chat/${thread.id}`, state: { thread } }}
            onClick={clickHandler}
          >
            {receiverEmail}
          </Link>
        </h5>
      </div>
    </div>
  );
}

export default Thread;
