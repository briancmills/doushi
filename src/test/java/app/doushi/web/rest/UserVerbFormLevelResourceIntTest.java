package app.doushi.web.rest;

import static app.doushi.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;

import javax.persistence.EntityManager;

import org.junit.*;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import app.doushi.DoushiApp;
import app.doushi.domain.*;
import app.doushi.domain.enumeration.KyuDan;
import app.doushi.repository.*;
import app.doushi.service.UserVerbFormLevelService;
import app.doushi.web.rest.errors.ExceptionTranslator;
/**
 * Test class for the UserVerbFormLevelResource REST controller.
 *
 * @see UserVerbFormLevelResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DoushiApp.class)
public class UserVerbFormLevelResourceIntTest {

    private static final KyuDan DEFAULT_LEVEL = KyuDan.KYUKYU;
    private static final KyuDan UPDATED_LEVEL = KyuDan.HACHIKYU;

    @Autowired
    private UserVerbFormLevelRepository userVerbFormLevelRepository;

    @Autowired
    private UserVerbFormLevelService userVerbFormLevelService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserVerbFormLevelMockMvc;

    private UserVerbFormLevel userVerbFormLevel;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserVerbFormLevelResource userVerbFormLevelResource = new UserVerbFormLevelResource(userVerbFormLevelService);
        this.restUserVerbFormLevelMockMvc = MockMvcBuilders.standaloneSetup(userVerbFormLevelResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserVerbFormLevel createEntity(EntityManager em) {
        UserVerbFormLevel userVerbFormLevel = new UserVerbFormLevel()
            .level(DEFAULT_LEVEL);
        // Add required entity
        User user = UserResourceIntTest.createEntity(em);
        userVerbFormLevel.setUser(user);
        return userVerbFormLevel;
    }

    @Before
    public void initTest() {
        userVerbFormLevel = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserVerbFormLevel() throws Exception {
        int databaseSizeBeforeCreate = userVerbFormLevelRepository.findAll().size();

        // Create the UserVerbFormLevel
        restUserVerbFormLevelMockMvc.perform(post("/api/user-verb-form-levels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userVerbFormLevel)))
            .andExpect(status().isCreated());

        // Validate the UserVerbFormLevel in the database
        List<UserVerbFormLevel> userVerbFormLevelList = userVerbFormLevelRepository.findAll();
        assertThat(userVerbFormLevelList).hasSize(databaseSizeBeforeCreate + 1);
        UserVerbFormLevel testUserVerbFormLevel = userVerbFormLevelList.get(userVerbFormLevelList.size() - 1);
        assertThat(testUserVerbFormLevel.getLevel()).isEqualTo(DEFAULT_LEVEL);
    }

    @Test
    @Transactional
    public void createUserVerbFormLevelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userVerbFormLevelRepository.findAll().size();

        // Create the UserVerbFormLevel with an existing ID
        userVerbFormLevel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserVerbFormLevelMockMvc.perform(post("/api/user-verb-form-levels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userVerbFormLevel)))
            .andExpect(status().isBadRequest());

        // Validate the UserVerbFormLevel in the database
        List<UserVerbFormLevel> userVerbFormLevelList = userVerbFormLevelRepository.findAll();
        assertThat(userVerbFormLevelList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkLevelIsRequired() throws Exception {
        int databaseSizeBeforeTest = userVerbFormLevelRepository.findAll().size();
        // set the field null
        userVerbFormLevel.setLevel(null);

        // Create the UserVerbFormLevel, which fails.

        restUserVerbFormLevelMockMvc.perform(post("/api/user-verb-form-levels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userVerbFormLevel)))
            .andExpect(status().isBadRequest());

        List<UserVerbFormLevel> userVerbFormLevelList = userVerbFormLevelRepository.findAll();
        assertThat(userVerbFormLevelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUserVerbFormLevels() throws Exception {
        // Initialize the database
        userVerbFormLevelRepository.saveAndFlush(userVerbFormLevel);

        // Get all the userVerbFormLevelList
        restUserVerbFormLevelMockMvc.perform(get("/api/user-verb-form-levels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userVerbFormLevel.getId().intValue())))
            .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL.toString())));
    }

    @Test
    @Transactional
    @WithMockUser(username="user",authorities={"ROLE_USER"}, password = "user")
    public void getAllMyUserVerbFormLevels() throws Exception {
        // Initialize the database
        userVerbFormLevel.setUser(userRepository.findOneByLogin("user").get());
        userVerbFormLevelRepository.saveAndFlush(userVerbFormLevel);

        // Get all the userVerbFormLevelList
        restUserVerbFormLevelMockMvc.perform(get("/api/user-verb-form-levels/mine"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$[0].id").exists());
    }

    @Test
    @Transactional
    public void getUserVerbFormLevel() throws Exception {
        // Initialize the database
        userVerbFormLevelRepository.saveAndFlush(userVerbFormLevel);

        // Get the userVerbFormLevel
        restUserVerbFormLevelMockMvc.perform(get("/api/user-verb-form-levels/{id}", userVerbFormLevel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userVerbFormLevel.getId().intValue()))
            .andExpect(jsonPath("$.level").value(DEFAULT_LEVEL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserVerbFormLevel() throws Exception {
        // Get the userVerbFormLevel
        restUserVerbFormLevelMockMvc.perform(get("/api/user-verb-form-levels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserVerbFormLevel() throws Exception {
        // Initialize the database
        userVerbFormLevelService.save(userVerbFormLevel);

        int databaseSizeBeforeUpdate = userVerbFormLevelRepository.findAll().size();

        // Update the userVerbFormLevel
        UserVerbFormLevel updatedUserVerbFormLevel = userVerbFormLevelRepository.findOne(userVerbFormLevel.getId());
        // Disconnect from session so that the updates on updatedUserVerbFormLevel are not directly saved in db
        em.detach(updatedUserVerbFormLevel);
        updatedUserVerbFormLevel
            .level(UPDATED_LEVEL);

        restUserVerbFormLevelMockMvc.perform(put("/api/user-verb-form-levels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserVerbFormLevel)))
            .andExpect(status().isOk());

        // Validate the UserVerbFormLevel in the database
        List<UserVerbFormLevel> userVerbFormLevelList = userVerbFormLevelRepository.findAll();
        assertThat(userVerbFormLevelList).hasSize(databaseSizeBeforeUpdate);
        UserVerbFormLevel testUserVerbFormLevel = userVerbFormLevelList.get(userVerbFormLevelList.size() - 1);
        assertThat(testUserVerbFormLevel.getLevel()).isEqualTo(UPDATED_LEVEL);
    }

    @Test
    @Transactional
    public void updateNonExistingUserVerbFormLevel() throws Exception {
        int databaseSizeBeforeUpdate = userVerbFormLevelRepository.findAll().size();

        // Create the UserVerbFormLevel

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUserVerbFormLevelMockMvc.perform(put("/api/user-verb-form-levels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userVerbFormLevel)))
            .andExpect(status().isCreated());

        // Validate the UserVerbFormLevel in the database
        List<UserVerbFormLevel> userVerbFormLevelList = userVerbFormLevelRepository.findAll();
        assertThat(userVerbFormLevelList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUserVerbFormLevel() throws Exception {
        // Initialize the database
        userVerbFormLevelService.save(userVerbFormLevel);

        int databaseSizeBeforeDelete = userVerbFormLevelRepository.findAll().size();

        // Get the userVerbFormLevel
        restUserVerbFormLevelMockMvc.perform(delete("/api/user-verb-form-levels/{id}", userVerbFormLevel.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserVerbFormLevel> userVerbFormLevelList = userVerbFormLevelRepository.findAll();
        assertThat(userVerbFormLevelList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserVerbFormLevel.class);
        UserVerbFormLevel userVerbFormLevel1 = new UserVerbFormLevel();
        userVerbFormLevel1.setId(1L);
        UserVerbFormLevel userVerbFormLevel2 = new UserVerbFormLevel();
        userVerbFormLevel2.setId(userVerbFormLevel1.getId());
        assertThat(userVerbFormLevel1).isEqualTo(userVerbFormLevel2);
        userVerbFormLevel2.setId(2L);
        assertThat(userVerbFormLevel1).isNotEqualTo(userVerbFormLevel2);
        userVerbFormLevel1.setId(null);
        assertThat(userVerbFormLevel1).isNotEqualTo(userVerbFormLevel2);
    }
}
