package app.doushi.repository;

import java.util.List;

import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import app.doushi.domain.Verb;


/**
 * Spring Data JPA repository for the Verb entity.
 */
@Repository
public interface VerbRepository extends JpaRepository<Verb, Long> {
    
    @Query("SELECT v "
            + "FROM Verb v "
            + "WHERE v NOT IN ( "
            + " SELECT uv "
            + " FROM UserVerbFormLevel uvfl "
            + " JOIN uvfl.verb uv "
            + " WHERE uvfl.user.login = :login "
            + ") "
            + "ORDER BY v.id ")
    List<Verb> findVerbsWithNoProgress(@Param("login") String login);

    @Query("SELECT v "
            + "FROM Verb v "
            + "WHERE v NOT IN ( "
            + " SELECT av "
            + " FROM UserVerbFormLevel level, Answer a "
            + " JOIN a.verb av "
            + " WHERE level.user = a.user "
            + " AND level.verb = av  "
            + " AND a.correct = TRUE "
            + " AND level.level = 'KYUKYU' "
            
            // for now I am turning off the spaced repetition model for verbs
            // this is because I am using them more as a "lesson" feature
            // eventually I want to re-implement an actual lesson feature which will quiz on the meaning of verbs
            /*
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
            */
            + " AND a.user.login = :login "
            + ") AND v IN ( "
            + " SELECT v "
            + " FROM UserVerbSet uvs "
            + " JOIN uvs.verbs v"
            + " WHERE uvs.user.login = :login "
            + ") "
            + "ORDER BY RANDOM() ")
    Page<Verb> getVerbToStudy(
            @Param("login") String login, 
            /*
            @Param("fourHoursAgo") ZonedDateTime fourHoursAgo, 
            @Param("eightHoursAgo") ZonedDateTime eightHoursAgo, 
            @Param("oneDayAgo") ZonedDateTime oneDayAgo,
            @Param("twoDaysAgo") ZonedDateTime twoDaysAgo, 
            @Param("threeDaysAgo") ZonedDateTime threeDaysAgo, 
            @Param("oneWeekAgo") ZonedDateTime oneWeekAgo,  
            @Param("twoWeeksAgo") ZonedDateTime twoWeeksAgo, 
            @Param("oneMonthAgo") ZonedDateTime oneMonthAgo, 
            @Param("fourMonthsAgo") ZonedDateTime fourMonthsAgo, 
            */
            Pageable pageable);

}
