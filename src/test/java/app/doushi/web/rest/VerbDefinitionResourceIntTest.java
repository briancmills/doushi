package app.doushi.web.rest;

import app.doushi.DoushiApp;

import app.doushi.domain.VerbDefinition;
import app.doushi.domain.Verb;
import app.doushi.repository.VerbDefinitionRepository;
import app.doushi.service.VerbDefinitionService;
import app.doushi.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static app.doushi.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the VerbDefinitionResource REST controller.
 *
 * @see VerbDefinitionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DoushiApp.class)
public class VerbDefinitionResourceIntTest {

    private static final String DEFAULT_DEFINITION = "AAAAAAAAAA";
    private static final String UPDATED_DEFINITION = "BBBBBBBBBB";

    @Autowired
    private VerbDefinitionRepository verbDefinitionRepository;

    @Autowired
    private VerbDefinitionService verbDefinitionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restVerbDefinitionMockMvc;

    private VerbDefinition verbDefinition;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VerbDefinitionResource verbDefinitionResource = new VerbDefinitionResource(verbDefinitionService);
        this.restVerbDefinitionMockMvc = MockMvcBuilders.standaloneSetup(verbDefinitionResource)
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
    public static VerbDefinition createEntity(EntityManager em) {
        VerbDefinition verbDefinition = new VerbDefinition()
            .definition(DEFAULT_DEFINITION);
        // Add required entity
        Verb verb = VerbResourceIntTest.createEntity(em);
        em.persist(verb);
        em.flush();
        verbDefinition.setVerb(verb);
        return verbDefinition;
    }

    @Before
    public void initTest() {
        verbDefinition = createEntity(em);
    }

    @Test
    @Transactional
    public void createVerbDefinition() throws Exception {
        int databaseSizeBeforeCreate = verbDefinitionRepository.findAll().size();

        // Create the VerbDefinition
        restVerbDefinitionMockMvc.perform(post("/api/verb-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(verbDefinition)))
            .andExpect(status().isCreated());

        // Validate the VerbDefinition in the database
        List<VerbDefinition> verbDefinitionList = verbDefinitionRepository.findAll();
        assertThat(verbDefinitionList).hasSize(databaseSizeBeforeCreate + 1);
        VerbDefinition testVerbDefinition = verbDefinitionList.get(verbDefinitionList.size() - 1);
        assertThat(testVerbDefinition.getDefinition()).isEqualTo(DEFAULT_DEFINITION);
    }

    @Test
    @Transactional
    public void createVerbDefinitionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = verbDefinitionRepository.findAll().size();

        // Create the VerbDefinition with an existing ID
        verbDefinition.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVerbDefinitionMockMvc.perform(post("/api/verb-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(verbDefinition)))
            .andExpect(status().isBadRequest());

        // Validate the VerbDefinition in the database
        List<VerbDefinition> verbDefinitionList = verbDefinitionRepository.findAll();
        assertThat(verbDefinitionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDefinitionIsRequired() throws Exception {
        int databaseSizeBeforeTest = verbDefinitionRepository.findAll().size();
        // set the field null
        verbDefinition.setDefinition(null);

        // Create the VerbDefinition, which fails.

        restVerbDefinitionMockMvc.perform(post("/api/verb-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(verbDefinition)))
            .andExpect(status().isBadRequest());

        List<VerbDefinition> verbDefinitionList = verbDefinitionRepository.findAll();
        assertThat(verbDefinitionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVerbDefinitions() throws Exception {
        // Initialize the database
        verbDefinitionRepository.saveAndFlush(verbDefinition);

        // Get all the verbDefinitionList
        restVerbDefinitionMockMvc.perform(get("/api/verb-definitions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(verbDefinition.getId().intValue())))
            .andExpect(jsonPath("$.[*].definition").value(hasItem(DEFAULT_DEFINITION.toString())));
    }

    @Test
    @Transactional
    public void getVerbDefinition() throws Exception {
        // Initialize the database
        verbDefinitionRepository.saveAndFlush(verbDefinition);

        // Get the verbDefinition
        restVerbDefinitionMockMvc.perform(get("/api/verb-definitions/{id}", verbDefinition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(verbDefinition.getId().intValue()))
            .andExpect(jsonPath("$.definition").value(DEFAULT_DEFINITION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVerbDefinition() throws Exception {
        // Get the verbDefinition
        restVerbDefinitionMockMvc.perform(get("/api/verb-definitions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVerbDefinition() throws Exception {
        // Initialize the database
        verbDefinitionService.save(verbDefinition);

        int databaseSizeBeforeUpdate = verbDefinitionRepository.findAll().size();

        // Update the verbDefinition
        VerbDefinition updatedVerbDefinition = verbDefinitionRepository.findOne(verbDefinition.getId());
        // Disconnect from session so that the updates on updatedVerbDefinition are not directly saved in db
        em.detach(updatedVerbDefinition);
        updatedVerbDefinition
            .definition(UPDATED_DEFINITION);

        restVerbDefinitionMockMvc.perform(put("/api/verb-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVerbDefinition)))
            .andExpect(status().isOk());

        // Validate the VerbDefinition in the database
        List<VerbDefinition> verbDefinitionList = verbDefinitionRepository.findAll();
        assertThat(verbDefinitionList).hasSize(databaseSizeBeforeUpdate);
        VerbDefinition testVerbDefinition = verbDefinitionList.get(verbDefinitionList.size() - 1);
        assertThat(testVerbDefinition.getDefinition()).isEqualTo(UPDATED_DEFINITION);
    }

    @Test
    @Transactional
    public void updateNonExistingVerbDefinition() throws Exception {
        int databaseSizeBeforeUpdate = verbDefinitionRepository.findAll().size();

        // Create the VerbDefinition

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restVerbDefinitionMockMvc.perform(put("/api/verb-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(verbDefinition)))
            .andExpect(status().isCreated());

        // Validate the VerbDefinition in the database
        List<VerbDefinition> verbDefinitionList = verbDefinitionRepository.findAll();
        assertThat(verbDefinitionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteVerbDefinition() throws Exception {
        // Initialize the database
        verbDefinitionService.save(verbDefinition);

        int databaseSizeBeforeDelete = verbDefinitionRepository.findAll().size();

        // Get the verbDefinition
        restVerbDefinitionMockMvc.perform(delete("/api/verb-definitions/{id}", verbDefinition.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<VerbDefinition> verbDefinitionList = verbDefinitionRepository.findAll();
        assertThat(verbDefinitionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VerbDefinition.class);
        VerbDefinition verbDefinition1 = new VerbDefinition();
        verbDefinition1.setId(1L);
        VerbDefinition verbDefinition2 = new VerbDefinition();
        verbDefinition2.setId(verbDefinition1.getId());
        assertThat(verbDefinition1).isEqualTo(verbDefinition2);
        verbDefinition2.setId(2L);
        assertThat(verbDefinition1).isNotEqualTo(verbDefinition2);
        verbDefinition1.setId(null);
        assertThat(verbDefinition1).isNotEqualTo(verbDefinition2);
    }
}
