package app.doushi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.doushi.domain.ConjugatedVerb;


/**
 * Spring Data JPA repository for the ConjugatedVerb entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConjugatedVerbRepository extends JpaRepository<ConjugatedVerb, Long> {

    List<ConjugatedVerb> findAllByVerbId(Long id);

}
