package app.doushi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.doushi.domain.*;

/**
 * Spring Data JPA repository for the UserVerbSet entity.
 */
@Repository
public interface UserVerbSetRepository extends JpaRepository<UserVerbSet, Long> {

    List<UserVerbSet> findAllByUserLogin(String login);
    
    List<UserVerbSet> findAllByUser(User user);


}
