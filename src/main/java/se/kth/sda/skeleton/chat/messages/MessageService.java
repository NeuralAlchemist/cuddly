package se.kth.sda.skeleton.chat.messages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Represents the service layer. It contains defined functionalities according to business logic for Messages.
 */
@Service
public class

MessageService {

    private final MessageRepository repository;

    /**
     * Constructs a MessageService and automatically assigns its messageRepository field
     *
     * @param repository an object that implements interface MessageRepository
     */

    @Autowired
    public MessageService(MessageRepository repository) {
        this.repository = repository;
    }

    /**
     * Return a list of all messages
     *
     * @return list of messages in reverse order from repository
     */
    public List<Message> getAll() {
        return repository.findAll();
    }

    /**
     * Create a message
     *
     * @param newMessage newly created message
     * @return newly created message
     */
    public Message create(Message newMessage) {
        return repository.save(newMessage);
    }

    /**
     * Delete a message based on ID
     *
     * @param id ID of the message to delete
     */
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
