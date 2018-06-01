package app.doushi.service;

import java.util.*;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import app.doushi.domain.*;
import app.doushi.domain.enumeration.KyuDan;
import app.doushi.repository.*;
import app.doushi.security.SecurityUtils;

@Component
public class UserLevelInitializationHelper {

    private final VerbRepository verbRepository;

    private final UserRepository userRepository;

    private final ConjugatedVerbRepository conjugatedVerbRepository;

    private final UserVerbFormLevelRepository userVerbFormLevelRepository;
    
    private final UserVerbSetRepository userVerbSetRepository;
    
    public UserLevelInitializationHelper(VerbRepository verbRepository, 
            UserRepository userRepository, 
            ConjugatedVerbRepository conjugatedVerbRepository,
            UserVerbFormLevelRepository userVerbFormLevelRepository,
            UserVerbSetRepository userVerbSetRepository) {
        
        this.verbRepository = verbRepository;
        this.userRepository = userRepository;
        this.conjugatedVerbRepository = conjugatedVerbRepository;
        this.userVerbFormLevelRepository = userVerbFormLevelRepository;
        this.userVerbSetRepository = userVerbSetRepository;
    }
    
    /**
     * before getting the next verb to study lets make sure we have an initialized level for each verb in the database
     * for this user. This way if we add a new verb the user gets a starting point automatically
     * this might perform better if done in bulk via SQL but I think since it will limited operation it should be OK
     * 
     * TODO: make sure this still works well when you have more than one web server
     * 
     * @param login
     */
    public synchronized void initializeUserVerbProgress(String login) {
        User user = userRepository.findOneByLogin(login).get();
        
        initStudySet(false);
        
        verbRepository.findVerbsWithNoProgress(login).stream().forEach(v -> {
            UserVerbFormLevel level = new UserVerbFormLevel()
                    .verb(v)
                    .level(KyuDan.MUKYU)
                    .user(user);
            userVerbFormLevelRepository.save(level);
        });
        
        conjugatedVerbRepository.findVerbsWithNoProgress(login).stream().forEach(cv -> {
            UserVerbFormLevel level = new UserVerbFormLevel()
                    .conjugatedVerb(cv)
                    .level(KyuDan.MUKYU)
                    .user(user);
            userVerbFormLevelRepository.save(level);
        });
    }
    
    
    /**
     * TODO: make sure this still works well when you have more than one web server
     */
    public synchronized void initStudySet(boolean levelUp) {
        // if the user has no study sets we build the first one automatically
        String login = SecurityUtils.getCurrentUserLogin().get();
        Optional<User> match = userRepository.findOneByLogin(login);
        if (match.isPresent()) {
            List<UserVerbSet> sets = userVerbSetRepository.findAllByUserLogin(login);
            if (sets.isEmpty() || levelUp) {
                User user = match.get();
                final UserVerbSet set = new UserVerbSet()
                        .user(user)
                        .level(KyuDan.MUKYU);
                
                // find the first 5 verbs not in a set to study
                verbRepository.findVerbsNotInSet(login, new PageRequest(0, 5)).getContent().stream().forEach(verb -> {
                    set.getVerbs().add(verb);
                });
                userVerbSetRepository.saveAndFlush(set);
            }
        }
    }
}
