package se.kth.sda.skeleton.chat.threads;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Represents the service layer. It contains defined functionalities according to business logic for MessageThreads.
 */
@Service
public class MessageThreadService {

    private final MessageThreadRepository repository;

    /**
     * Constructs a MessageThreadService and automatically assigns its messageThreadRepository field
     *
     * @param repository an object that implements interface MessageThreadRepository
     */
    @Autowired
    public MessageThreadService(MessageThreadRepository repository) {
        this.repository = repository;
    }

    /**
     * Return a list of all message threads
     *
     * @return list of message threads from repository
     */
    public List<MessageThread> getAll() {
        return repository.findAll();
    }

    /**
     * Return a selected message thread by its ID
     *
     * @return a selected message thread from repository
     */
    public Optional<MessageThread> getById(Long id) {
        return repository.findById(id);
    }

    /**
     * Return a selected message thread by p1Email and p2Email
     *
     * @return a selected message thread from repository
     */
    public MessageThread findByEmails(String p1Email, String p2Email) {
        return repository.findByP1EmailAndP2Email(p1Email, p2Email);
    }

    /**
     * Create a message thread
     *
     * @param newThread newly created message thread
     * @return newly created message thread
     */
    public MessageThread create(MessageThread newThread) {
        return repository.save(newThread);
    }

    /**
     * Delete a message thread based on ID
     *
     * @param id ID of the message thread to delete
     */
    public void delete(Long id) {
        repository.deleteById(id);
    }
}