package app.doushi.service;

import java.time.ZonedDateTime;
import java.util.*;

import org.slf4j.*;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import app.doushi.domain.ConjugatedVerb;
import app.doushi.repository.ConjugatedVerbRepository;
import app.doushi.security.SecurityUtils;


/**
 * Service Implementation for managing ConjugatedVerb.
 */
@Service
@Transactional
public class ConjugatedVerbService {

    private final Logger log = LoggerFactory.getLogger(ConjugatedVerbService.class);

    private final ConjugatedVerbRepository conjugatedVerbRepository;
    
    private final UserLevelInitializationHelper userLevelInitializationHelper;
    
    
    public ConjugatedVerbService(ConjugatedVerbRepository conjugatedVerbRepository, 
            UserLevelInitializationHelper userLevelInitializationHelper) {
        this.conjugatedVerbRepository = conjugatedVerbRepository;
        this.userLevelInitializationHelper = userLevelInitializationHelper;
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

    public List<ConjugatedVerb> findAllByVerb(Long id) {
        log.debug("Request to findAllByVerb : {}", id);
        return conjugatedVerbRepository.findAllByVerbId(id);
    }

    public ConjugatedVerb getConjugatedVerbToStudy() {
        String login = SecurityUtils.getCurrentUserLogin().get();
        userLevelInitializationHelper.initializeUserVerbProgress(login);
        
        Page<ConjugatedVerb> page = conjugatedVerbRepository.getConjugatedVerbToStudy(
                login, 
                ZonedDateTime.now().minusHours(8), 
                ZonedDateTime.now().minusDays(1),
                ZonedDateTime.now().minusDays(2),
                ZonedDateTime.now().minusDays(3),
                ZonedDateTime.now().minusWeeks(1),
                ZonedDateTime.now().minusWeeks(2),
                ZonedDateTime.now().minusWeeks(3),
                ZonedDateTime.now().minusMonths(1),
                ZonedDateTime.now().minusMonths(4),
                new PageRequest(0, 1));
        if (page.hasContent()) {
            return page.getContent().get(0);
        } else {
            return null;
        }
    }

    public List<ConjugatedVerb> getConjugatedVerbAvailableToStudy() {
        String login = SecurityUtils.getCurrentUserLogin().get();
        userLevelInitializationHelper.initializeUserVerbProgress(login);
        Page<ConjugatedVerb> page = conjugatedVerbRepository.getConjugatedVerbToStudy(
                login, 
                ZonedDateTime.now().minusHours(8), 
                ZonedDateTime.now().minusDays(1),
                ZonedDateTime.now().minusDays(2),
                ZonedDateTime.now().minusDays(3),
                ZonedDateTime.now().minusWeeks(1),
                ZonedDateTime.now().minusWeeks(2),
                ZonedDateTime.now().minusWeeks(3),
                ZonedDateTime.now().minusMonths(1),
                ZonedDateTime.now().minusMonths(4),
                new PageRequest(0, 10000));
        if (page.hasContent()) {
            return page.getContent();
        } else {
            return Collections.emptyList();
        }
    }
}
