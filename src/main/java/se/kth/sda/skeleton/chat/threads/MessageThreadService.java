package se.kth.sda.skeleton.chat.threads;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageThreadService {

    private final MessageThreadRepository repository;

    @Autowired
    public MessageThreadService(MessageThreadRepository repository) {
        this.repository = repository;
    }

    public List<MessageThread> getAll() {
        return repository.findAll();
    }

    public Optional<MessageThread> getById(Long id) {
        return repository.findById(id);
    }

    // Refer to comment in MessageThreadRepository
    public MessageThread findByEmails(String p1Mail, String p2Mail) {
        return repository.findByP1EmailAndP2Email(p1Mail, p2Mail);
    }

    public MessageThread create(MessageThread newThread) {
        return repository.save(newThread);
    }

    public MessageThread update(MessageThread updatedThread) {
        return repository.save(updatedThread);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}