package app.doushi.repository;

import app.doushi.domain.ConjugatedVerbDefinition;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ConjugatedVerbDefinition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConjugatedVerbDefinitionRepository extends JpaRepository<ConjugatedVerbDefinition, Long> {

}
