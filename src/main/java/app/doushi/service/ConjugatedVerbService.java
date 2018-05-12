package app.doushi.service;

import app.doushi.domain.ConjugatedVerb;
import app.doushi.repository.ConjugatedVerbRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ConjugatedVerb.
 */
@Service
@Transactional
public class ConjugatedVerbService {

    private final Logger log = LoggerFactory.getLogger(ConjugatedVerbService.class);

    private final ConjugatedVerbRepository conjugatedVerbRepository;

    public ConjugatedVerbService(ConjugatedVerbRepository conjugatedVerbRepository) {
        this.conjugatedVerbRepository = conjugatedVerbRepository;
    }

    /**
     * Save a conjugatedVerb.
     *
     * @param conjugatedVerb the entity to save
     * @return the persisted entity
     */
    public ConjugatedVerb save(ConjugatedVerb conjugatedVerb) {
        log.debug("Request to save ConjugatedVerb : {}", conjugatedVerb);
        return conjugatedVerbRepository.save(conjugatedVerb);
    }

    /**
     * Get all the conjugatedVerbs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ConjugatedVerb> findAll(Pageable pageable) {
        log.debug("Request to get all ConjugatedVerbs");
        return conjugatedVerbRepository.findAll(pageable);
    }

    /**
     * Get one conjugatedVerb by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ConjugatedVerb findOne(Long id) {
        log.debug("Request to get ConjugatedVerb : {}", id);
        return conjugatedVerbRepository.findOne(id);
    }

    /**
     * Delete the conjugatedVerb by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ConjugatedVerb : {}", id);
        conjugatedVerbRepository.delete(id);
    }
}
