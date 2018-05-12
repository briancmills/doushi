package app.doushi.repository;

import app.doushi.domain.ConjugatedVerb;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ConjugatedVerb entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConjugatedVerbRepository extends JpaRepository<ConjugatedVerb, Long> {

}
