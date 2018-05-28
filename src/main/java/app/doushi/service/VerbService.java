package app.doushi.service;

import java.util.*;

import org.slf4j.*;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import app.doushi.domain.*;
import app.doushi.domain.enumeration.KyuDan;
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

    private final UserVerbFormLevelRepository userVerbFormLevelRepository;

    private final UserRepository userRepository;

    private final UserVerbSetRepository userVerbSetRepository;
    
    public VerbService(VerbRepository verbRepository, 
            UserVerbFormLevelRepository userVerbFormLevelRepository,
            UserRepository userRepository, 
            UserVerbSetRepository userVerbSetRepository) {
        
        this.verbRepository = verbRepository;
        this.userVerbFormLevelRepository = userVerbFormLevelRepository;
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

    public Verb getVerbToStudy() {
        String login = SecurityUtils.getCurrentUserLogin().get();

        initFirstStudySet();
        User user = userRepository.findOneByLogin(login).get();
        verbRepository.findVerbsWithNoProgress(login).stream().forEach(v -> {
            UserVerbFormLevel level = new UserVerbFormLevel()
                    .verb(v)
                    .level(KyuDan.MUKYU)
                    .user(user);
            userVerbFormLevelRepository.save(level);
        });
        
        Page<Verb> page = verbRepository.getVerbToStudy(login, new PageRequest(0, 1));
        if (page.hasContent()) {
            return page.getContent().get(0);
        } else {
            return null;
        }
    }
    
    /**
     * TODO: make sure this still works well when you have more than one web server
     */
    private synchronized void initFirstStudySet() {
        log.debug(" \n\n\n initFirstStudySet \n\n\n");
        // if the user has no study sets we build the first one automatically
        String login = SecurityUtils.getCurrentUserLogin().get();
        Optional<User> match = userRepository.findOneByLogin(login);
        if (match.isPresent()) {
            log.debug(" \n\n\n found user \n\n\n");
            List<UserVerbSet> sets = userVerbSetRepository.findAllByUserLogin(login);
            if (sets.isEmpty()) {
                log.debug(" \n\n\n empty set \n\n\n");
                User user = match.get();
                final UserVerbSet set = new UserVerbSet()
                        .user(user)
                        .level(KyuDan.MUKYU);
                
                // find the first 10 verbs to study
                verbRepository.findAll(new PageRequest(0, 10)).getContent().stream().forEach(verb -> {
                    log.debug(" \n\n\n adding verb {} \n\n\n", verb);
                    set.getVerbs().add(verb);
                });
                userVerbSetRepository.saveAndFlush(set);
            } else {
                log.debug("user has sets: {}", sets);
            }
        }
    }

    public List<Verb> getVerbsAvailableToStudy() {
        initFirstStudySet();
        String login = SecurityUtils.getCurrentUserLogin().get();
        Page<Verb> page = verbRepository.getVerbToStudy(login, new PageRequest(0, 10));
        if (page.hasContent()) {
            return page.getContent();
        } else {
            return Collections.emptyList();
        }
    }
}
