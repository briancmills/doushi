package app.doushi.service;

import app.doushi.domain.ConjugatedVerbDefinition;
import app.doushi.repository.ConjugatedVerbDefinitionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ConjugatedVerbDefinition.
 */
@Service
@Transactional
public class ConjugatedVerbDefinitionService {

    private final Logger log = LoggerFactory.getLogger(ConjugatedVerbDefinitionService.class);

    private final ConjugatedVerbDefinitionRepository conjugatedVerbDefinitionRepository;

    public ConjugatedVerbDefinitionService(ConjugatedVerbDefinitionRepository conjugatedVerbDefinitionRepository) {
        this.conjugatedVerbDefinitionRepository = conjugatedVerbDefinitionRepository;
    }

    /**
     * Save a conjugatedVerbDefinition.
     *
     * @param conjugatedVerbDefinition the entity to save
     * @return the persisted entity
     */
    public ConjugatedVerbDefinition save(ConjugatedVerbDefinition conjugatedVerbDefinition) {
        log.debug("Request to save ConjugatedVerbDefinition : {}", conjugatedVerbDefinition);
        return conjugatedVerbDefinitionRepository.save(conjugatedVerbDefinition);
    }

    /**
     * Get all the conjugatedVerbDefinitions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ConjugatedVerbDefinition> findAll(Pageable pageable) {
        log.debug("Request to get all ConjugatedVerbDefinitions");
        return conjugatedVerbDefinitionRepository.findAll(pageable);
    }

    /**
     * Get one conjugatedVerbDefinition by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ConjugatedVerbDefinition findOne(Long id) {
        log.debug("Request to get ConjugatedVerbDefinition : {}", id);
        return conjugatedVerbDefinitionRepository.findOne(id);
    }

    /**
     * Delete the conjugatedVerbDefinition by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ConjugatedVerbDefinition : {}", id);
        conjugatedVerbDefinitionRepository.delete(id);
    }
}
