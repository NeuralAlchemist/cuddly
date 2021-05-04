package se.kth.sda.skeleton.profile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Represents the database of domain type Profile as a JPA Repository
 */
@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
}
