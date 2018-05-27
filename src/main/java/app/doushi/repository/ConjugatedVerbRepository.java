package app.doushi.repository;

import java.util.List;

import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import app.doushi.domain.ConjugatedVerb;


/**
 * Spring Data JPA repository for the ConjugatedVerb entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConjugatedVerbRepository extends JpaRepository<ConjugatedVerb, Long> {

    List<ConjugatedVerb> findAllByVerbId(Long id);

    @Query("SELECT cv "
            + "FROM ConjugatedVerb cv "
            + "WHERE cv NOT IN ( "
            + " SELECT acv "
            + " FROM Answer a "
            + " JOIN a.conjugatedVerb acv "
            + " WHERE a.correct = TRUE "
            + " AND a.date >= CURRENT_DATE "
            + " AND a.user.login = :login "
            + ") "
            + "ORDER BY cv.id ")
    Page<ConjugatedVerb> getConjugatedVerbToStudy(@Param("login") String login, Pageable pageable);

    @Query("SELECT cv "
            + "FROM ConjugatedVerb cv "
            + "WHERE cv NOT IN ( "
            + " SELECT ucv "
            + " FROM UserVerbFormLevel uvfl "
            + " JOIN uvfl.conjugatedVerb ucv "
            + " WHERE uvfl.user.login = :login "
            + ") "
            + "ORDER BY cv.id ")
    List<ConjugatedVerb> findVerbsWithNoProgress(@Param("login") String login);

}
