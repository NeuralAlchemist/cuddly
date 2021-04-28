package se.kth.sda.skeleton.postlikes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Represents the database of domain type Comment as a JPA Repository
 */
@Repository
public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
}
