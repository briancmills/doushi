package app.doushi.repository;

import java.util.List;

import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import app.doushi.domain.Answer;

/**
 * Spring Data JPA repository for the Answer entity.
 */
@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {

    @Query("select answer from Answer answer where answer.user.login = ?#{principal.username}")
    List<Answer> findByUserIsCurrentUser();

    @Query(" SELECT MAX(a) "
            + " FROM Answer a "
            + " WHERE a.user.login = ?#{principal.username} "
            + " AND a.correct = FALSE "
            + " GROUP BY a.verb, a.conjugatedVerb "
            + " ORDER BY COUNT(a.id) DESC ")
    Page<Answer> findTopIncorrectAndUserIsCurrentUser(Pageable pageable);

}
