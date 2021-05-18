package se.kth.sda.skeleton.chat.messages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
     * Return a specific post based on ID
     *
     * @param id the id of the specific post
     * @return a post
     */

    public Message create(Message newMessage) {
        return repository.save(newMessage);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
