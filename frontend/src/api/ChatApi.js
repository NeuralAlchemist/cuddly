import Api from './Api';

class ChatApi {
  getAllThread() {
    return Api.get('/chat');
  }

  getThreadById(threadId) {
    return Api.get(`/chat/${threadId}`);
  }

  createThread(receiverEmail, thread) {
    return Api.post(`/chat?receiverEmail=${receiverEmail}`);
  }

  createMessage(threadId, receiverEmail, message) {
    return Api.post(
      `/chat/${threadId}?receiverEmail=${receiverEmail}`,
      message
    );
  }
}

export default new ChatApi();
