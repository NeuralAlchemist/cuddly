package se.kth.sda.skeleton.chat.messages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    private final MessageRepository repository;

    @Autowired
    public MessageService(MessageRepository repository) {
        this.repository = repository;
    }

    public List<Message> getAll() {
        return repository.findAll();
    }

    public Optional<Message> getById(Long id) {
        return repository.findById(id);
    }

    public Message create(Message newMessage) {
        return repository.save(newMessage);
    }

    public Message update(Message updatedMessage) {
        return repository.save(updatedMessage);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
