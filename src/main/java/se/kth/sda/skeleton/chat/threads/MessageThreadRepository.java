package se.kth.sda.skeleton.chat.threads;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageThreadRepository extends JpaRepository<MessageThread, Long> {

    // Either this or the controller/service call to this is not behaving as expected.
    // A new thread is sometimes created instead of returning the existing one.
    // We'll figure it out later.
    MessageThread findByP1EmailAndP2Email(String p1Email, String p2Email);
}
