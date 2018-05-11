package app.doushi.service;

import app.doushi.domain.VerbDefinition;
import app.doushi.repository.VerbDefinitionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing VerbDefinition.
 */
@Service
@Transactional
public class VerbDefinitionService {

    private final Logger log = LoggerFactory.getLogger(VerbDefinitionService.class);

    private final VerbDefinitionRepository verbDefinitionRepository;

    public VerbDefinitionService(VerbDefinitionRepository verbDefinitionRepository) {
        this.verbDefinitionRepository = verbDefinitionRepository;
    }

    /**
     * Save a verbDefinition.
     *
     * @param verbDefinition the entity to save
     * @return the persisted entity
     */
    public VerbDefinition save(VerbDefinition verbDefinition) {
        log.debug("Request to save VerbDefinition : {}", verbDefinition);
        return verbDefinitionRepository.save(verbDefinition);
    }

    /**
     * Get all the verbDefinitions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<VerbDefinition> findAll(Pageable pageable) {
        log.debug("Request to get all VerbDefinitions");
        return verbDefinitionRepository.findAll(pageable);
    }

    /**
     * Get one verbDefinition by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public VerbDefinition findOne(Long id) {
        log.debug("Request to get VerbDefinition : {}", id);
        return verbDefinitionRepository.findOne(id);
    }

    /**
     * Delete the verbDefinition by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete VerbDefinition : {}", id);
        verbDefinitionRepository.delete(id);
    }
}
