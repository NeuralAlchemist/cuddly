package se.kth.sda.skeleton.posts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Represents the database of domain type Post as a JPA Repository
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
}
