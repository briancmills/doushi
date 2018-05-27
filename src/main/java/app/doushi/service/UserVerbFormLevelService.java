package app.doushi.service;

import java.util.List;

import org.slf4j.*;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import app.doushi.domain.UserVerbFormLevel;
import app.doushi.repository.UserVerbFormLevelRepository;
import app.doushi.security.SecurityUtils;


/**
 * Service Implementation for managing UserVerbFormLevel.
 */
@Service
@Transactional
public class UserVerbFormLevelService {

    private final Logger log = LoggerFactory.getLogger(UserVerbFormLevelService.class);

    private final UserVerbFormLevelRepository userVerbFormLevelRepository;
    
    public UserVerbFormLevelService(UserVerbFormLevelRepository userVerbFormLevelRepository) {
        this.userVerbFormLevelRepository = userVerbFormLevelRepository;
    }

    /**
     * Save a userVerbFormLevel.
     *
     * @param userVerbFormLevel the entity to save
     * @return the persisted entity
     */
    public UserVerbFormLevel save(UserVerbFormLevel userVerbFormLevel) {
        log.debug("Request to save UserVerbFormLevel : {}", userVerbFormLevel);
        return userVerbFormLevelRepository.save(userVerbFormLevel);
    }

    /**
     * Get all the userVerbFormLevels.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<UserVerbFormLevel> findAll(Pageable pageable) {
        log.debug("Request to get all UserVerbFormLevels");
        return userVerbFormLevelRepository.findAll(pageable);
    }

    /**
     * Get one userVerbFormLevel by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public UserVerbFormLevel findOne(Long id) {
        log.debug("Request to get UserVerbFormLevel : {}", id);
        return userVerbFormLevelRepository.findOne(id);
    }

    /**
     * Delete the userVerbFormLevel by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete UserVerbFormLevel : {}", id);
        userVerbFormLevelRepository.delete(id);
    }

    public List<UserVerbFormLevel> findAllMine() {
        String login = SecurityUtils.getCurrentUserLogin().get();        
        return userVerbFormLevelRepository.findAllByUserLogin(login);
    }
}
