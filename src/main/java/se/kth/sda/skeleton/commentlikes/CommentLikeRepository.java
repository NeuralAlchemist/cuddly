package se.kth.sda.skeleton.commentlikes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Represents the database of domain type CommentLike as a JPA Repository
 */
@Repository
public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
}

