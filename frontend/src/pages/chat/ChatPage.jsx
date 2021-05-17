// NPM Packages
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

// Project Files
import ChatApi from '../../api/ChatApi';
import ResponsiveTextArea from '../../components/ResponsiveTextArea';

function ChatPage() {
  // Local State
  const { id } = useParams();
  const { state } = useLocation();
  const thread = state.thread;
  const loggedInUser = window.sessionStorage.getItem('userEmail');
  const receiverEmail =
    loggedInUser === thread.p1Email ? thread.p2Email : thread.p1Email;
  const [messageText, setMessageText] = useState('');
  const [messageArray, setMessageArray] = useState(thread.thread);

  const onFormContentChange = (value) => {
    setMessageText(value);
  };

  // Methods
  useEffect(() => {
    const updateThread = async () => {
      const response = await ChatApi.getThreadById(id);
      setMessageArray(response.data.thread);
    };
    updateThread();
  }, []);

  const sendMessage = async () => {
    try {
      const response = await ChatApi.createMessage(id, receiverEmail, {
        messageBody: messageText,
        thread: { id: id },
        date: format(new Date(), 'dd-MMM-yyyy HH:MM'),
      });
      setMessageArray([...messageArray, response.data]);
      setMessageText('');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const poll = setInterval(() => {
      const updateThread = async () => {
        const response = await ChatApi.getThreadById(id);
        setMessageArray(response.data.thread);
      };
      updateThread();
    }, 60000);
    return () => clearInterval(poll);
  }, [id]);

  const handleClick = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const messages =
    messageArray === null
      ? null
      : messageArray.map((message) => {
          if (message.senderEmail === loggedInUser) {
            return (
              <div className="PostCard" key={message.id}>
                <span className="post-info">
                  Outgoing Message to {receiverEmail}
                </span>
                <div className="message-container">
                  <p className="time-lapse"> {message.date}</p>{' '}
                  <span className="content-text word-wrap-chatpage">
                    {message.messageBody}
                  </span>
                </div>
              </div>
            );
          } else {
            return (
              <div className="PostCard" key={message.id}>
                <span className="post-info">
                  Incoming Message from {message.senderEmail}
                </span>
                <div className="message-container">
                  <p className="time-lapse"> {message.date}</p>
                  <span className="content-text word-wrap-chatpage">
                    {message.messageBody}
                  </span>
                </div>
              </div>
            );
          }
        });

  return (
    <div className="main-container-item">
      <div>{messages}</div>

      <div className="form-container">
        <form className="form">
          <div className="form-field">
            <ResponsiveTextArea
              placeholder="Type a message."
              contentText={messageText}
              onFormContentChange={onFormContentChange}
              maxLength="1000"
            />
          </div>
          <p className="length">{messageText.length}/1000</p>
          <button
            className="button-post"
            onClick={(e) => handleClick(e)}
            type="submit"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;
