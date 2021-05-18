package se.kth.sda.skeleton.chat.messages;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Represents the database of domain type Message as a JPA Repository
 */
@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
}

