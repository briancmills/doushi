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
import app.doushi.domain.enumeration.ConjugationType;
import app.doushi.repository.*;
import app.doushi.service.ConjugatedVerbService;
import app.doushi.web.rest.errors.ExceptionTranslator;
/**
 * Test class for the ConjugatedVerbResource REST controller.
 *
 * @see ConjugatedVerbResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DoushiApp.class)
public class ConjugatedVerbResourceIntTest {

    private static final ConjugationType DEFAULT_CONJUGATION_TYPE = ConjugationType.dictionary;
    private static final ConjugationType UPDATED_CONJUGATION_TYPE = ConjugationType.masu;

    private static final String DEFAULT_ROMANJI = "AAAAAAAAAA";
    private static final String UPDATED_ROMANJI = "BBBBBBBBBB";

    private static final String DEFAULT_KANJI = "AAAAAAAAAA";
    private static final String UPDATED_KANJI = "BBBBBBBBBB";

    @Autowired
    private ConjugatedVerbRepository conjugatedVerbRepository;
    
    @Autowired
    private VerbRepository verbRepository;

    @Autowired
    private ConjugatedVerbService conjugatedVerbService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restConjugatedVerbMockMvc;

    private ConjugatedVerb conjugatedVerb;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ConjugatedVerbResource conjugatedVerbResource = new ConjugatedVerbResource(conjugatedVerbService);
        this.restConjugatedVerbMockMvc = MockMvcBuilders.standaloneSetup(conjugatedVerbResource)
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
    public static ConjugatedVerb createEntity(EntityManager em) {
        ConjugatedVerb conjugatedVerb = new ConjugatedVerb()
            .conjugationType(DEFAULT_CONJUGATION_TYPE)
            .romanjiText(DEFAULT_ROMANJI)
            .kanjiText(DEFAULT_KANJI);
        // Add required entity
        Verb verb = VerbResourceIntTest.createEntity(em);
        em.persist(verb);
        em.flush();
        conjugatedVerb.setVerb(verb);
        return conjugatedVerb;
    }

    @Before
    public void initTest() {
        conjugatedVerb = createEntity(em);
    }

    @Test
    @Transactional
    public void createConjugatedVerb() throws Exception {
        int databaseSizeBeforeCreate = conjugatedVerbRepository.findAll().size();

        // Create the ConjugatedVerb
        restConjugatedVerbMockMvc.perform(post("/api/conjugated-verbs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conjugatedVerb)))
            .andExpect(status().isCreated());

        // Validate the ConjugatedVerb in the database
        List<ConjugatedVerb> conjugatedVerbList = conjugatedVerbRepository.findAll();
        assertThat(conjugatedVerbList).hasSize(databaseSizeBeforeCreate + 1);
        ConjugatedVerb testConjugatedVerb = conjugatedVerbList.get(conjugatedVerbList.size() - 1);
        assertThat(testConjugatedVerb.getConjugationType()).isEqualTo(DEFAULT_CONJUGATION_TYPE);
        assertThat(testConjugatedVerb.getRomanjiText()).isEqualTo(DEFAULT_ROMANJI);
        assertThat(testConjugatedVerb.getKanjiText()).isEqualTo(DEFAULT_KANJI);
    }

    @Test
    @Transactional
    public void createConjugatedVerbWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = conjugatedVerbRepository.findAll().size();

        // Create the ConjugatedVerb with an existing ID
        conjugatedVerb.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConjugatedVerbMockMvc.perform(post("/api/conjugated-verbs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conjugatedVerb)))
            .andExpect(status().isBadRequest());

        // Validate the ConjugatedVerb in the database
        List<ConjugatedVerb> conjugatedVerbList = conjugatedVerbRepository.findAll();
        assertThat(conjugatedVerbList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkConjugationTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = conjugatedVerbRepository.findAll().size();
        // set the field null
        conjugatedVerb.setConjugationType(null);

        // Create the ConjugatedVerb, which fails.

        restConjugatedVerbMockMvc.perform(post("/api/conjugated-verbs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conjugatedVerb)))
            .andExpect(status().isBadRequest());

        List<ConjugatedVerb> conjugatedVerbList = conjugatedVerbRepository.findAll();
        assertThat(conjugatedVerbList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkJapaneseIsRequired() throws Exception {
        int databaseSizeBeforeTest = conjugatedVerbRepository.findAll().size();
        // set the field null
        conjugatedVerb.setKanjiText(null);

        // Create the ConjugatedVerb, which fails.

        restConjugatedVerbMockMvc.perform(post("/api/conjugated-verbs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conjugatedVerb)))
            .andExpect(status().isBadRequest());

        List<ConjugatedVerb> conjugatedVerbList = conjugatedVerbRepository.findAll();
        assertThat(conjugatedVerbList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllConjugatedVerbs() throws Exception {
        // Initialize the database
        conjugatedVerbRepository.saveAndFlush(conjugatedVerb);

        // Get all the conjugatedVerbList
        restConjugatedVerbMockMvc.perform(get("/api/conjugated-verbs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(conjugatedVerb.getId().intValue())))
            .andExpect(jsonPath("$.[*].conjugationType").value(hasItem(DEFAULT_CONJUGATION_TYPE.toString())))
            .andExpect(jsonPath("$.[*].romanjiText").value(hasItem(DEFAULT_ROMANJI.toString())))
            .andExpect(jsonPath("$.[*].kanjiText").value(hasItem(DEFAULT_KANJI.toString())));
    }
    

    @Test
    @Transactional
    public void getAllConjugatedVerbsByVerbId() throws Exception {
        // Initialize the database
        conjugatedVerbRepository.saveAndFlush(conjugatedVerb);

        Verb verb = verbRepository.findAll().stream().findFirst().get();
        // Get all the conjugatedVerbList
        restConjugatedVerbMockMvc.perform(get("/api/conjugated-verbs/verb/{id}", verb.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray());
    }

    @Test
    @Transactional
    public void getConjugatedVerb() throws Exception {
        // Initialize the database
        conjugatedVerbRepository.saveAndFlush(conjugatedVerb);

        // Get the conjugatedVerb
        restConjugatedVerbMockMvc.perform(get("/api/conjugated-verbs/{id}", conjugatedVerb.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(conjugatedVerb.getId().intValue()))
            .andExpect(jsonPath("$.conjugationType").value(DEFAULT_CONJUGATION_TYPE.toString()))
            .andExpect(jsonPath("$.romanjiText").value(DEFAULT_ROMANJI.toString()))
            .andExpect(jsonPath("$.kanjiText").value(DEFAULT_KANJI.toString()));
    }

    @Test
    @Transactional
    @WithMockUser(username="user",authorities={"ROLE_USER"}, password = "user")
    public void getConjugatedVerbToStudy_nothingToStudy() throws Exception {
        // Get the conjugatedVerb to study 
        restConjugatedVerbMockMvc.perform(get("/api/conjugated-verbs/study"))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    @WithMockUser(username="user",authorities={"ROLE_USER"}, password = "user")
    @Ignore
    public void getConjugatedVerbToStudy() throws Exception {
        // Get the conjugatedVerb to study 
        
        // TODO set up the data needed to get this API to return results
        restConjugatedVerbMockMvc.perform(get("/api/conjugated-verbs/study"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").isNotEmpty());
    }


    @Test
    @Transactional
    public void getNonExistingConjugatedVerb() throws Exception {
        // Get the conjugatedVerb
        restConjugatedVerbMockMvc.perform(get("/api/conjugated-verbs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConjugatedVerb() throws Exception {
        // Initialize the database
        conjugatedVerbService.save(conjugatedVerb);

        int databaseSizeBeforeUpdate = conjugatedVerbRepository.findAll().size();

        // Update the conjugatedVerb
        ConjugatedVerb updatedConjugatedVerb = conjugatedVerbRepository.findOne(conjugatedVerb.getId());
        // Disconnect from session so that the updates on updatedConjugatedVerb are not directly saved in db
        em.detach(updatedConjugatedVerb);
        updatedConjugatedVerb
            .conjugationType(UPDATED_CONJUGATION_TYPE)
            .romanjiText(UPDATED_ROMANJI)
            .kanjiText(UPDATED_KANJI);

        restConjugatedVerbMockMvc.perform(put("/api/conjugated-verbs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedConjugatedVerb)))
            .andExpect(status().isOk());

        // Validate the ConjugatedVerb in the database
        List<ConjugatedVerb> conjugatedVerbList = conjugatedVerbRepository.findAll();
        assertThat(conjugatedVerbList).hasSize(databaseSizeBeforeUpdate);
        ConjugatedVerb testConjugatedVerb = conjugatedVerbList.get(conjugatedVerbList.size() - 1);
        assertThat(testConjugatedVerb.getConjugationType()).isEqualTo(UPDATED_CONJUGATION_TYPE);
        assertThat(testConjugatedVerb.getRomanjiText()).isEqualTo(UPDATED_ROMANJI);
        assertThat(testConjugatedVerb.getKanjiText()).isEqualTo(UPDATED_KANJI);
    }

    @Test
    @Transactional
    public void updateNonExistingConjugatedVerb() throws Exception {
        int databaseSizeBeforeUpdate = conjugatedVerbRepository.findAll().size();

        // Create the ConjugatedVerb

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restConjugatedVerbMockMvc.perform(put("/api/conjugated-verbs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conjugatedVerb)))
            .andExpect(status().isCreated());

        // Validate the ConjugatedVerb in the database
        List<ConjugatedVerb> conjugatedVerbList = conjugatedVerbRepository.findAll();
        assertThat(conjugatedVerbList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteConjugatedVerb() throws Exception {
        // Initialize the database
        conjugatedVerbService.save(conjugatedVerb);

        int databaseSizeBeforeDelete = conjugatedVerbRepository.findAll().size();

        // Get the conjugatedVerb
        restConjugatedVerbMockMvc.perform(delete("/api/conjugated-verbs/{id}", conjugatedVerb.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ConjugatedVerb> conjugatedVerbList = conjugatedVerbRepository.findAll();
        assertThat(conjugatedVerbList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ConjugatedVerb.class);
        ConjugatedVerb conjugatedVerb1 = new ConjugatedVerb();
        conjugatedVerb1.setId(1L);
        ConjugatedVerb conjugatedVerb2 = new ConjugatedVerb();
        conjugatedVerb2.setId(conjugatedVerb1.getId());
        assertThat(conjugatedVerb1).isEqualTo(conjugatedVerb2);
        conjugatedVerb2.setId(2L);
        assertThat(conjugatedVerb1).isNotEqualTo(conjugatedVerb2);
        conjugatedVerb1.setId(null);
        assertThat(conjugatedVerb1).isNotEqualTo(conjugatedVerb2);
    }
}
