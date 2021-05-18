package se.kth.sda.skeleton.chat.threads;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import se.kth.sda.skeleton.chat.messages.Message;

import javax.persistence.*;
import java.util.List;

/* To get around the issue of a thread being deleted, and both parties losing the messages,
   we could explore creating a thread for each user with references to the same messages  */

@Entity
@Table(name = "message_thread")
public class MessageThread {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "thread_generator")
    @SequenceGenerator(name = "thread_generator", sequenceName = "thread_seq")
    private Long id;

    @OneToMany(mappedBy = "thread")
    private List<Message> thread;

    @Column(name = "p1_email")
    private String p1Email;

    @Column(name = "p2_email")
    private String p2Email;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @JsonManagedReference
    public List<Message> getThread() {
        return thread;
    }

    public String getP1Email() {
        return p1Email;
    }

    public void setP1Email(String p1Email) {
        this.p1Email = p1Email;
    }

    public String getP2Email() {
        return p2Email;
    }

    public void setP2Email(String p2Email) {
        this.p2Email = p2Email;
    }
}
