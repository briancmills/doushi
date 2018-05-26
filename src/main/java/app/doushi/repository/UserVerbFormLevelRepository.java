package app.doushi.repository;

import app.doushi.domain.UserVerbFormLevel;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the UserVerbFormLevel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserVerbFormLevelRepository extends JpaRepository<UserVerbFormLevel, Long> {

    @Query("select user_verb_form_level from UserVerbFormLevel user_verb_form_level where user_verb_form_level.user.login = ?#{principal.username}")
    List<UserVerbFormLevel> findByUserIsCurrentUser();

}
