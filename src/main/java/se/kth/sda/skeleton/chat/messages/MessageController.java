package se.kth.sda.skeleton.chat.messages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.kth.sda.skeleton.auth.AuthService;
import se.kth.sda.skeleton.chat.threads.MessageThread;
import se.kth.sda.skeleton.chat.threads.MessageThreadService;
import java.util.List;



@RestController
@RequestMapping("/chat")
public class MessageController {

    private final MessageService messageService;
    private final MessageThreadService threadService;
    private final AuthService authService;

    @Autowired
    public MessageController(MessageService messageService, MessageThreadService threadService, AuthService authService) {
        this.messageService = messageService;
        this.threadService = threadService;
        this.authService = authService;

    }

    @GetMapping("")
    public List<MessageThread> getAll() {
        return threadService.getAll();
    }

    @GetMapping("/{id}")
    public MessageThread getThread(@PathVariable Long id) {
        return threadService.getById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    // Refer to comment in MessageThreadRepository
    @PostMapping("")
    public MessageThread createThread(MessageThread newThread, @RequestParam(required = true) String receiverEmail) {
        String senderEmail = authService.getLoggedInUserEmail();
        MessageThread existing = threadService.findByEmails(senderEmail, receiverEmail);
        if (existing != null) return existing;
        newThread.setP1Email(senderEmail);
        newThread.setP2Email(receiverEmail);
        return threadService.create(newThread);
    }

    @PostMapping("/{id}")
    public Message createMessage(@RequestBody Message newMessage, @RequestParam String receiverEmail) {
        String senderEmail = authService.getLoggedInUserEmail();
        newMessage.setReceiverEmail(receiverEmail);
        newMessage.setSenderEmail(senderEmail);
        return messageService.create(newMessage);
    }

}