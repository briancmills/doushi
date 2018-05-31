package app.doushi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import app.doushi.domain.*;
import app.doushi.domain.enumeration.KyuDan;

/**
 * Spring Data JPA repository for the UserVerbFormLevel entity.
 */
@Repository
public interface UserVerbFormLevelRepository extends JpaRepository<UserVerbFormLevel, Long> {

    @Query("select user_verb_form_level from UserVerbFormLevel user_verb_form_level where user_verb_form_level.user.login = ?#{principal.username}")
    List<UserVerbFormLevel> findByUserIsCurrentUser();

    List<UserVerbFormLevel> findAllByUserLogin(String login);
    
    Long countAllByUserLoginAndLevel(String login, KyuDan level);

    UserVerbFormLevel findOneByUserAndVerb(User user, Verb verb);
    
    UserVerbFormLevel findOneByUserAndConjugatedVerb(User user, ConjugatedVerb conjugatedVerb);
}
