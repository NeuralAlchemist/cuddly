package se.kth.sda.skeleton.chat.messages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.kth.sda.skeleton.auth.AuthService;
import se.kth.sda.skeleton.chat.threads.MessageThread;
import se.kth.sda.skeleton.chat.threads.MessageThreadService;
import java.util.List;

/**
 * Represents the controller layer (or the API). This exposes application functionality of Post as RESTful webservices.
 */

@RestController
@RequestMapping("/chat")
public class MessageController {

    private final MessageService messageService;
    private final MessageThreadService threadService;
    private final AuthService authService;

    /**
     * Constructs a MessageController and automatically assigns its messageService field.
     *
     * @param messageService an object that implements interface MessageService
     * @param threadService an object that implements interface ThreadService
     * @param authService an object that implements interface AuthService
     */

    @Autowired
    public MessageController(MessageService messageService, MessageThreadService threadService, AuthService authService) {
        this.messageService = messageService;
        this.threadService = threadService;
        this.authService = authService;

    }

    /**
     * Return a list of all messageThreads
     *
     * @return status 200 and list of messageThreads
     */
    @GetMapping("")
    public List<MessageThread> getAll() {
        return threadService.getAll();
    }

    /**
     * Return a specific messageThread based on ID
     *
     * @param id the id of the specific messageThread
     * @return a specific messageThread based on ID
     */
    @GetMapping("/{id}")
    public MessageThread getThread(@PathVariable Long id) {
        return threadService.getById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    /**
     * Create a new thread
     *
     * @param receiverEmail the email address of a receiver
     * @return a new thread
     */
    @PostMapping("")
    public MessageThread createThread(MessageThread newThread, @RequestParam(required = true) String receiverEmail) {
        String senderEmail = authService.getLoggedInUserEmail();
        MessageThread existing = threadService.findByEmails(senderEmail, receiverEmail);
        if (existing != null) return existing;
        newThread.setP1Email(senderEmail);
        newThread.setP2Email(receiverEmail);
        return threadService.create(newThread);
    }

    /**
     * Create a new message
     *
     * @param receiverEmail the email address of a receiver
     * @return a new message
     */
    @PostMapping("/{id}")
    public Message createMessage(@RequestBody Message newMessage, @RequestParam String receiverEmail) {
        String senderEmail = authService.getLoggedInUserEmail();
        newMessage.setReceiverEmail(receiverEmail);
        newMessage.setSenderEmail(senderEmail);
        return messageService.create(newMessage);
    }

}