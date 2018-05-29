package app.doushi.repository;

import java.time.ZonedDateTime;
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
            + " FROM UserVerbFormLevel level, Answer a "
            + " JOIN a.conjugatedVerb acv "
            + " WHERE level.user = a.user "
            + " AND level.conjugatedVerb = acv  "
            + " AND a.correct = TRUE "
            + " AND ( "
            + "     (level.level = 'KYUKYU' AND a.date >= :fourHoursAgo ) "
            + "     OR "
            + "     (level.level = 'HACHIKYU' AND a.date >= :eightHoursAgo ) "
            + "     OR "
            + "     (level.level = 'NANAKYU' AND a.date >= :oneDayAgo ) "
            + "     OR "
            + "     (level.level = 'ROKYU' AND a.date >= :twoDaysAgo ) "
            + "     OR "
            + "     (level.level = 'GOKYU' AND a.date >= :threeDaysAgo ) "
            + "     OR "
            + "     (level.level = 'YONKYU' AND a.date >= :oneWeekAgo ) "
            + "     OR "
            + "     (level.level = 'SANKYU' AND a.date >= :twoWeeksAgo ) "
            + "     OR "
            + "     (level.level = 'NIKYU' AND a.date >= :oneMonthAgo ) "
            + "     OR "
            + "     (level.level = 'IKKYU' AND a.date >= :fourMonthsAgo ) "
            + "     OR "
            + "     (level.level = 'SHODAN' AND a.date >= :fourMonthsAgo ) "
            + " ) "
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
    Page<ConjugatedVerb> getConjugatedVerbToStudy(
            @Param("login") String login,
            @Param("fourHoursAgo") ZonedDateTime fourHoursAgo, 
            @Param("eightHoursAgo") ZonedDateTime eightHoursAgo, 
            @Param("oneDayAgo") ZonedDateTime oneDayAgo,
            @Param("twoDaysAgo") ZonedDateTime twoDaysAgo, 
            @Param("threeDaysAgo") ZonedDateTime threeDaysAgo, 
            @Param("oneWeekAgo") ZonedDateTime oneWeekAgo,  
            @Param("twoWeeksAgo") ZonedDateTime twoWeeksAgo, 
            @Param("oneMonthAgo") ZonedDateTime oneMonthAgo, 
            @Param("fourMonthsAgo") ZonedDateTime fourMonthsAgo, 
            Pageable pageable);

    List<ConjugatedVerb> findAllByVerbIn(Collection<Verb> verbs);

}
