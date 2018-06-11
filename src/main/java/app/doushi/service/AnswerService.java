package app.doushi.service;

import java.time.ZonedDateTime;
import java.util.*;

import org.apache.commons.lang3.BooleanUtils;
import org.slf4j.*;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import app.doushi.domain.*;
import app.doushi.domain.enumeration.KyuDan;
import app.doushi.repository.*;


/**
 * Service Implementation for managing Answer.
 */
@Service
@Transactional
public class AnswerService {

    private final Logger log = LoggerFactory.getLogger(AnswerService.class);

    private final AnswerRepository answerRepository;

    private final UserVerbFormLevelRepository userVerbFormLevelRepository;

    private final UserLevelInitializationHelper userLevelInitializationHelper;
    
    private final UserVerbSetRepository userVerbSetRepository;
    
    private final ConjugatedVerbRepository conjugatedVerbRepository;
    
    public AnswerService(AnswerRepository answerRepository, 
            UserVerbFormLevelRepository userVerbFormLevelRepository, 
            UserVerbSetRepository userVerbSetRepository,
            ConjugatedVerbRepository conjugatedVerbRepository,
            UserLevelInitializationHelper userLevelInitializationHelper) {
        
        this.answerRepository = answerRepository;
        this.userVerbFormLevelRepository = userVerbFormLevelRepository;
        this.userVerbSetRepository = userVerbSetRepository;
        this.conjugatedVerbRepository = conjugatedVerbRepository;
        this.userLevelInitializationHelper = userLevelInitializationHelper;
    }

    /**
     * Save a answer.
     *
     * @param answer the entity to save
     * @return the persisted entity
     */
    public Answer save(Answer answer) {
        log.debug("Request to save Answer : {}", answer);
        // when an answer is saved we also calculate the users level
        UserVerbFormLevel level = null;
        User user = answer.getUser();
        Verb verb = answer.getVerb() != null ? answer.getVerb() : answer.getConjugatedVerb().getVerb();
        if (answer.getDate() == null) {
            answer.setDate(ZonedDateTime.now());
        }
        
        if (answer.getVerb() != null) {
            level = userVerbFormLevelRepository.findOneByUserAndVerb(user, answer.getVerb());
        } else {
            level = userVerbFormLevelRepository.findOneByUserAndConjugatedVerb(user, answer.getConjugatedVerb());
        }
        
        if (level != null) {

            int currentLevel = level.getLevel().ordinal();
                    
            // are we leveling up or down?
            if (BooleanUtils.isTrue(answer.isCorrect())) {
                currentLevel++;
            } else {
                // when you make a mistake you lose two levels
                currentLevel--;
                currentLevel--;
            }
            
            // we never set something back to MuKyu after it has gone above it
            if (currentLevel == KyuDan.MUKYU.ordinal() && currentLevel < level.getLevel().ordinal()) {
                currentLevel++;
            }
            
            level.setLevel(KyuDan.valueOf(currentLevel));
            userVerbFormLevelRepository.saveAndFlush(level);
            
            // now determine if the set needs to be leveled up
            Optional<UserVerbSet> verbSet = userVerbSetRepository.findAllByUser(answer.getUser())
                    .stream().filter(set -> { return set.getVerbs().contains(verb); }).findFirst();
            
            if (verbSet.isPresent()) {
                UserVerbSet userVerbSet = verbSet.get();
                // the level of a Verb increases when all of the ConjugationForms are above its current level
                boolean increaseLevel = true;
                List<ConjugatedVerb> conjugatedVerbs = conjugatedVerbRepository.findAllByVerbIn(userVerbSet.getVerbs());
                
                for (ConjugatedVerb conjugatedVerb : conjugatedVerbs) {
                    UserVerbFormLevel cvLevel = userVerbFormLevelRepository.findOneByUserAndConjugatedVerb(user, conjugatedVerb);
                    log.debug("conjugatedVerb: {}", conjugatedVerb);
                    log.debug("cvLevel: {}", cvLevel);
                    if (cvLevel.getLevel().ordinal() <= userVerbSet.getLevel().ordinal()) {
                        log.debug("not going to increase level of set {} because of {} ", userVerbSet.getId(), conjugatedVerb);
                        increaseLevel = false;
                        break;
                    }
                }
                
                if (increaseLevel) {
                    userVerbSet.setLevel(KyuDan.valueOf(userVerbSet.getLevel().ordinal()+1));
                    userVerbSetRepository.saveAndFlush(userVerbSet);
                    log.debug("set level {}", userVerbSet.getLevel());
                    // any time a new set of verbs goes to 8th kyu we should unlock the next set
                    if (userVerbSet.getLevel() == KyuDan.HACHIKYU) {
                        log.debug("init new set of verbs");
                        userLevelInitializationHelper.initStudySet(true);
                    }
                }
            }
            
        }
        
        return answerRepository.save(answer);
    }

    /**
     * Get all the answers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Answer> findAll(Pageable pageable) {
        log.debug("Request to get all Answers");
        return answerRepository.findAll(pageable);
    }

    /**
     * Get one answer by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Answer findOne(Long id) {
        log.debug("Request to get Answer : {}", id);
        return answerRepository.findOne(id);
    }

    /**
     * Delete the answer by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Answer : {}", id);
        answerRepository.delete(id);
    }

    public List<Answer> getIncorrectAnswers() {
        
        // load recent incorrect answers for the last week
        // and return one representation of each according to the top 5
        
        Page<Answer> incorrectAnswers = answerRepository.findTopIncorrectAndUserIsCurrentUser(
                new PageRequest(0, 5));

        return incorrectAnswers.getContent();
    }
}
