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
            + " FROM Answer a "
            + " JOIN a.verb av "
            + " WHERE a.correct = TRUE "
            + " AND a.date >= CURRENT_DATE "
            + " AND a.user.login = :login "
            + ") "
            + "ORDER BY v.id ")
    Page<Verb> getVerbToStudy(@Param("login") String login, Pageable pageable);

}
