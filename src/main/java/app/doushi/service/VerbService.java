package app.doushi.service;

import app.doushi.domain.Verb;
import app.doushi.repository.VerbRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Verb.
 */
@Service
@Transactional
public class VerbService {

    private final Logger log = LoggerFactory.getLogger(VerbService.class);

    private final VerbRepository verbRepository;

    public VerbService(VerbRepository verbRepository) {
        this.verbRepository = verbRepository;
    }

    /**
     * Save a verb.
     *
     * @param verb the entity to save
     * @return the persisted entity
     */
    public Verb save(Verb verb) {
        log.debug("Request to save Verb : {}", verb);
        return verbRepository.save(verb);
    }

    /**
     * Get all the verbs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Verb> findAll(Pageable pageable) {
        log.debug("Request to get all Verbs");
        return verbRepository.findAll(pageable);
    }

    /**
     * Get one verb by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Verb findOne(Long id) {
        log.debug("Request to get Verb : {}", id);
        return verbRepository.findOne(id);
    }

    /**
     * Delete the verb by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Verb : {}", id);
        verbRepository.delete(id);
    }
}
