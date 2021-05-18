package se.kth.sda.skeleton.chat.threads;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.kth.sda.skeleton.exception.ResourceNotFoundException;
import se.kth.sda.skeleton.user.User;
import se.kth.sda.skeleton.user.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MessageThreadService {

    private final MessageThreadRepository repository;
    private final UserRepository userRepository;

    @Autowired
    public MessageThreadService(MessageThreadRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
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

    public MessageThread getMyThreads(Long userId){
        User user = userRepository.findById(userId).orElseThrow(ResourceNotFoundException::new);


    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}