package app.doushi.repository;

import app.doushi.domain.VerbDefinition;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the VerbDefinition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VerbDefinitionRepository extends JpaRepository<VerbDefinition, Long> {

}
