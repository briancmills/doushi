package app.doushi.service;

import java.time.ZonedDateTime;
import java.util.*;

import org.slf4j.*;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import app.doushi.domain.Verb;
import app.doushi.repository.*;
import app.doushi.security.SecurityUtils;


/**
 * Service Implementation for managing Verb.
 */
@Service
@Transactional
public class VerbService {

    private final Logger log = LoggerFactory.getLogger(VerbService.class);

    private final VerbRepository verbRepository;

    private final UserRepository userRepository;

    private final UserVerbSetRepository userVerbSetRepository;
    
    private final UserLevelInitializationHelper userLevelInitializationHelper;
    
    public VerbService(VerbRepository verbRepository, 
            UserLevelInitializationHelper userLevelInitializationHelper,
            UserRepository userRepository, 
            UserVerbSetRepository userVerbSetRepository) {
        
        this.verbRepository = verbRepository;
        this.userLevelInitializationHelper = userLevelInitializationHelper;
        this.userRepository = userRepository;
        this.userVerbSetRepository = userVerbSetRepository;
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

    public Verb getVerbToStudy(boolean lesson) {
        String login = SecurityUtils.getCurrentUserLogin().get();
        userLevelInitializationHelper.initializeUserVerbProgress(login);
        
        Page<Verb> page;
        
        if (lesson) {
            page = verbRepository.getVerbToStudyForLesson(
                    login, 
                    new PageRequest(0, 1));
        } else {
            page = verbRepository.getVerbToStudy(
                    login, 
                    ZonedDateTime.now().minusHours(4), 
                    ZonedDateTime.now().minusHours(8),
                    ZonedDateTime.now().minusDays(1),
                    ZonedDateTime.now().minusDays(2),
                    ZonedDateTime.now().minusDays(3),
                    ZonedDateTime.now().minusWeeks(1),
                    ZonedDateTime.now().minusWeeks(2),
                    ZonedDateTime.now().minusMonths(1),
                    ZonedDateTime.now().minusMonths(4),
                    new PageRequest(0, 1));
        }
        
        if (page.hasContent()) {
            return page.getContent().get(0);
        } else {
            return null;
        }
    }

    
    public List<Verb> getVerbsAvailableToStudy(boolean lesson) {
        String login = SecurityUtils.getCurrentUserLogin().get();
        userLevelInitializationHelper.initializeUserVerbProgress(login);
        Page<Verb> page;
        if (lesson) {
            page = verbRepository.getVerbToStudyForLesson(login, new PageRequest(0, 10));
        } else {
            page = verbRepository.getVerbToStudy(
                    login, 
                    ZonedDateTime.now().minusHours(4), 
                    ZonedDateTime.now().minusHours(8),
                    ZonedDateTime.now().minusDays(1),
                    ZonedDateTime.now().minusDays(2),
                    ZonedDateTime.now().minusDays(3),
                    ZonedDateTime.now().minusWeeks(1),
                    ZonedDateTime.now().minusWeeks(2),
                    ZonedDateTime.now().minusMonths(1),
                    ZonedDateTime.now().minusMonths(4),
                    new PageRequest(0, 10));
        }

        if (page.hasContent()) {
            return page.getContent();
        } else {
            return Collections.emptyList();
        }
    }
}
