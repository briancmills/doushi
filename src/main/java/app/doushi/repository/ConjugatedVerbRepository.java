package app.doushi.repository;

import java.util.*;

import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import app.doushi.domain.*;


/**
 * Spring Data JPA repository for the ConjugatedVerb entity.
 */
@Repository
public interface ConjugatedVerbRepository extends JpaRepository<ConjugatedVerb, Long> {

    List<ConjugatedVerb> findAllByVerbId(Long id);

    /**
     * For a ConjugatedVerb to be studied it must be part of a set that has made it to HACHIKYU (8th level)
     * @param login
     * @param pageable
     * @return
     */
    @Query("SELECT cv "
            + "FROM ConjugatedVerb cv "
            + "WHERE cv NOT IN ( "
            + " SELECT acv "
            + " FROM Answer a "
            + " JOIN a.conjugatedVerb acv "
            + " WHERE a.correct = TRUE "
            + " AND a.date >= CURRENT_DATE "
            + " AND a.user.login = :login "
            + ") AND cv.verb IN ( "
            + " SELECT v "
            + " FROM UserVerbSet uvs "
            + " JOIN uvs.verbs v "
            + " WHERE uvs.user.login = :login "
            + ") "
            + "AND EXISTS ( "
            + " SELECT 1 "
            + " FROM UserVerbFormLevel uvfl "
            + " JOIN uvfl.verb v "
            + " WHERE uvfl.user.login = :login "
            + " AND cv.verb = v "
            + " AND uvfl.level <> 'MUKYU' "
            + ") "
            + "ORDER BY RANDOM() ")
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

    List<ConjugatedVerb> findAllByVerbIn(Collection<Verb> verbs);

}
