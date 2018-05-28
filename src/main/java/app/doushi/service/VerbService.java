package app.doushi.service;

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

    public VerbService(VerbRepository verbRepository, 
            UserVerbFormLevelRepository userVerbFormLevelRepository,
            UserRepository userRepository) {
        this.verbRepository = verbRepository;
        this.userVerbFormLevelRepository = userVerbFormLevelRepository;
        this.userRepository = userRepository;
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

    public Verb getConjugatedVerbToStudy() {
        String login = SecurityUtils.getCurrentUserLogin().get();
        
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
}
