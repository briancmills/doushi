package app.doushi.web.rest;

import app.doushi.DoushiApp;

import app.doushi.domain.ConjugatedVerbDefinition;
import app.doushi.domain.ConjugatedVerb;
import app.doushi.repository.ConjugatedVerbDefinitionRepository;
import app.doushi.service.ConjugatedVerbDefinitionService;
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
 * Test class for the ConjugatedVerbDefinitionResource REST controller.
 *
 * @see ConjugatedVerbDefinitionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DoushiApp.class)
public class ConjugatedVerbDefinitionResourceIntTest {

    private static final String DEFAULT_DEFINITION = "AAAAAAAAAA";
    private static final String UPDATED_DEFINITION = "BBBBBBBBBB";

    @Autowired
    private ConjugatedVerbDefinitionRepository conjugatedVerbDefinitionRepository;

    @Autowired
    private ConjugatedVerbDefinitionService conjugatedVerbDefinitionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restConjugatedVerbDefinitionMockMvc;

    private ConjugatedVerbDefinition conjugatedVerbDefinition;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ConjugatedVerbDefinitionResource conjugatedVerbDefinitionResource = new ConjugatedVerbDefinitionResource(conjugatedVerbDefinitionService);
        this.restConjugatedVerbDefinitionMockMvc = MockMvcBuilders.standaloneSetup(conjugatedVerbDefinitionResource)
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
    public static ConjugatedVerbDefinition createEntity(EntityManager em) {
        ConjugatedVerbDefinition conjugatedVerbDefinition = new ConjugatedVerbDefinition()
            .definition(DEFAULT_DEFINITION);
        // Add required entity
        ConjugatedVerb conjugatedVerb = ConjugatedVerbResourceIntTest.createEntity(em);
        em.persist(conjugatedVerb);
        em.flush();
        conjugatedVerbDefinition.setConjugatedVerb(conjugatedVerb);
        return conjugatedVerbDefinition;
    }

    @Before
    public void initTest() {
        conjugatedVerbDefinition = createEntity(em);
    }

    @Test
    @Transactional
    public void createConjugatedVerbDefinition() throws Exception {
        int databaseSizeBeforeCreate = conjugatedVerbDefinitionRepository.findAll().size();

        // Create the ConjugatedVerbDefinition
        restConjugatedVerbDefinitionMockMvc.perform(post("/api/conjugated-verb-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conjugatedVerbDefinition)))
            .andExpect(status().isCreated());

        // Validate the ConjugatedVerbDefinition in the database
        List<ConjugatedVerbDefinition> conjugatedVerbDefinitionList = conjugatedVerbDefinitionRepository.findAll();
        assertThat(conjugatedVerbDefinitionList).hasSize(databaseSizeBeforeCreate + 1);
        ConjugatedVerbDefinition testConjugatedVerbDefinition = conjugatedVerbDefinitionList.get(conjugatedVerbDefinitionList.size() - 1);
        assertThat(testConjugatedVerbDefinition.getDefinition()).isEqualTo(DEFAULT_DEFINITION);
    }

    @Test
    @Transactional
    public void createConjugatedVerbDefinitionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = conjugatedVerbDefinitionRepository.findAll().size();

        // Create the ConjugatedVerbDefinition with an existing ID
        conjugatedVerbDefinition.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConjugatedVerbDefinitionMockMvc.perform(post("/api/conjugated-verb-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conjugatedVerbDefinition)))
            .andExpect(status().isBadRequest());

        // Validate the ConjugatedVerbDefinition in the database
        List<ConjugatedVerbDefinition> conjugatedVerbDefinitionList = conjugatedVerbDefinitionRepository.findAll();
        assertThat(conjugatedVerbDefinitionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDefinitionIsRequired() throws Exception {
        int databaseSizeBeforeTest = conjugatedVerbDefinitionRepository.findAll().size();
        // set the field null
        conjugatedVerbDefinition.setDefinition(null);

        // Create the ConjugatedVerbDefinition, which fails.

        restConjugatedVerbDefinitionMockMvc.perform(post("/api/conjugated-verb-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conjugatedVerbDefinition)))
            .andExpect(status().isBadRequest());

        List<ConjugatedVerbDefinition> conjugatedVerbDefinitionList = conjugatedVerbDefinitionRepository.findAll();
        assertThat(conjugatedVerbDefinitionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllConjugatedVerbDefinitions() throws Exception {
        // Initialize the database
        conjugatedVerbDefinitionRepository.saveAndFlush(conjugatedVerbDefinition);

        // Get all the conjugatedVerbDefinitionList
        restConjugatedVerbDefinitionMockMvc.perform(get("/api/conjugated-verb-definitions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(conjugatedVerbDefinition.getId().intValue())))
            .andExpect(jsonPath("$.[*].definition").value(hasItem(DEFAULT_DEFINITION.toString())));
    }

    @Test
    @Transactional
    public void getConjugatedVerbDefinition() throws Exception {
        // Initialize the database
        conjugatedVerbDefinitionRepository.saveAndFlush(conjugatedVerbDefinition);

        // Get the conjugatedVerbDefinition
        restConjugatedVerbDefinitionMockMvc.perform(get("/api/conjugated-verb-definitions/{id}", conjugatedVerbDefinition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(conjugatedVerbDefinition.getId().intValue()))
            .andExpect(jsonPath("$.definition").value(DEFAULT_DEFINITION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingConjugatedVerbDefinition() throws Exception {
        // Get the conjugatedVerbDefinition
        restConjugatedVerbDefinitionMockMvc.perform(get("/api/conjugated-verb-definitions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConjugatedVerbDefinition() throws Exception {
        // Initialize the database
        conjugatedVerbDefinitionService.save(conjugatedVerbDefinition);

        int databaseSizeBeforeUpdate = conjugatedVerbDefinitionRepository.findAll().size();

        // Update the conjugatedVerbDefinition
        ConjugatedVerbDefinition updatedConjugatedVerbDefinition = conjugatedVerbDefinitionRepository.findOne(conjugatedVerbDefinition.getId());
        // Disconnect from session so that the updates on updatedConjugatedVerbDefinition are not directly saved in db
        em.detach(updatedConjugatedVerbDefinition);
        updatedConjugatedVerbDefinition
            .definition(UPDATED_DEFINITION);

        restConjugatedVerbDefinitionMockMvc.perform(put("/api/conjugated-verb-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedConjugatedVerbDefinition)))
            .andExpect(status().isOk());

        // Validate the ConjugatedVerbDefinition in the database
        List<ConjugatedVerbDefinition> conjugatedVerbDefinitionList = conjugatedVerbDefinitionRepository.findAll();
        assertThat(conjugatedVerbDefinitionList).hasSize(databaseSizeBeforeUpdate);
        ConjugatedVerbDefinition testConjugatedVerbDefinition = conjugatedVerbDefinitionList.get(conjugatedVerbDefinitionList.size() - 1);
        assertThat(testConjugatedVerbDefinition.getDefinition()).isEqualTo(UPDATED_DEFINITION);
    }

    @Test
    @Transactional
    public void updateNonExistingConjugatedVerbDefinition() throws Exception {
        int databaseSizeBeforeUpdate = conjugatedVerbDefinitionRepository.findAll().size();

        // Create the ConjugatedVerbDefinition

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restConjugatedVerbDefinitionMockMvc.perform(put("/api/conjugated-verb-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conjugatedVerbDefinition)))
            .andExpect(status().isCreated());

        // Validate the ConjugatedVerbDefinition in the database
        List<ConjugatedVerbDefinition> conjugatedVerbDefinitionList = conjugatedVerbDefinitionRepository.findAll();
        assertThat(conjugatedVerbDefinitionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteConjugatedVerbDefinition() throws Exception {
        // Initialize the database
        conjugatedVerbDefinitionService.save(conjugatedVerbDefinition);

        int databaseSizeBeforeDelete = conjugatedVerbDefinitionRepository.findAll().size();

        // Get the conjugatedVerbDefinition
        restConjugatedVerbDefinitionMockMvc.perform(delete("/api/conjugated-verb-definitions/{id}", conjugatedVerbDefinition.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ConjugatedVerbDefinition> conjugatedVerbDefinitionList = conjugatedVerbDefinitionRepository.findAll();
        assertThat(conjugatedVerbDefinitionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ConjugatedVerbDefinition.class);
        ConjugatedVerbDefinition conjugatedVerbDefinition1 = new ConjugatedVerbDefinition();
        conjugatedVerbDefinition1.setId(1L);
        ConjugatedVerbDefinition conjugatedVerbDefinition2 = new ConjugatedVerbDefinition();
        conjugatedVerbDefinition2.setId(conjugatedVerbDefinition1.getId());
        assertThat(conjugatedVerbDefinition1).isEqualTo(conjugatedVerbDefinition2);
        conjugatedVerbDefinition2.setId(2L);
        assertThat(conjugatedVerbDefinition1).isNotEqualTo(conjugatedVerbDefinition2);
        conjugatedVerbDefinition1.setId(null);
        assertThat(conjugatedVerbDefinition1).isNotEqualTo(conjugatedVerbDefinition2);
    }
}
