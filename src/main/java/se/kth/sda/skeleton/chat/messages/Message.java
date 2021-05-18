package se.kth.sda.skeleton.chat.messages;

import com.fasterxml.jackson.annotation.JsonBackReference;
import se.kth.sda.skeleton.chat.threads.MessageThread;

import javax.persistence.*;

/**
 * Represents a message in a cuddly app as a JPA entity. This implementation of message will autogenerate a primary key of type
 * {@link Long} to indicate the current Message entity. A Message has a {@link String} sender_email, receiver_email, message_body,
 * and date.
 */

@Table(name = "messages")
@Entity
public class Message {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "message_generator")
    @SequenceGenerator(name = "message_generator", sequenceName = "message_seq")
    private Long id;

    @Column(name = "sender_email")
    private String senderEmail;

    @Column(name = "receiver_email")
    private String receiverEmail;

    @ManyToOne
    private MessageThread thread;

    @Column(name = "message_body", columnDefinition = "TEXT")
    private String messageBody;

    @Column(name = "date")
    private String date;
    doc
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Message(Long id, String senderEmail, String receiverEmail, MessageThread thread, String messageBody, String date) {
        this.id = id;
        this.senderEmail = senderEmail;
        this.receiverEmail = receiverEmail;
        this.thread = thread;
        this.messageBody = messageBody;
        this.date = date;
    }

    public Message() {
    }

    public String getMessageBody() {
        return messageBody;
    }

    public void setMessageBody(String messageBody) {
        this.messageBody = messageBody;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @JsonBackReference
    public MessageThread getThread() {
        return thread;
    }

    public void setThread(MessageThread thread) {
        this.thread = thread;
    }

    public String getSenderEmail() {
        return senderEmail;
    }

    public void setSenderEmail(String senderEmail) {
        this.senderEmail = senderEmail;
    }

    public String getReceiverEmail() {
        return receiverEmail;
    }

    public void setReceiverEmail(String receiverEmail) {
        this.receiverEmail = receiverEmail;
    }
}