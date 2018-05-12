package app.doushi.web.rest;

import app.doushi.DoushiApp;

import app.doushi.domain.Verb;
import app.doushi.repository.VerbRepository;
import app.doushi.service.VerbService;
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

import app.doushi.domain.enumeration.VerbType;
import app.doushi.domain.enumeration.JlptLevel;
import app.doushi.domain.enumeration.VerbEnding;
/**
 * Test class for the VerbResource REST controller.
 *
 * @see VerbResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DoushiApp.class)
public class VerbResourceIntTest {

    private static final VerbType DEFAULT_TYPE = VerbType.GODAN;
    private static final VerbType UPDATED_TYPE = VerbType.ICHIDAN;

    private static final String DEFAULT_DEFINITION = "AAAAAAAAAA";
    private static final String UPDATED_DEFINITION = "BBBBBBBBBB";

    private static final JlptLevel DEFAULT_JLPT_LEVEL = JlptLevel.N5;
    private static final JlptLevel UPDATED_JLPT_LEVEL = JlptLevel.N4;

    private static final Integer DEFAULT_GRADE_LEVEL = 1;
    private static final Integer UPDATED_GRADE_LEVEL = 2;

    private static final VerbEnding DEFAULT_ENDING = VerbEnding.u;
    private static final VerbEnding UPDATED_ENDING = VerbEnding.tsu;

    private static final String DEFAULT_VERB_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_VERB_TEXT = "BBBBBBBBBB";

    private static final String DEFAULT_KANJI_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_KANJI_TEXT = "BBBBBBBBBB";

    private static final String DEFAULT_ROMANJI_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_ROMANJI_TEXT = "BBBBBBBBBB";

    @Autowired
    private VerbRepository verbRepository;

    @Autowired
    private VerbService verbService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restVerbMockMvc;

    private Verb verb;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VerbResource verbResource = new VerbResource(verbService);
        this.restVerbMockMvc = MockMvcBuilders.standaloneSetup(verbResource)
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
    public static Verb createEntity(EntityManager em) {
        Verb verb = new Verb()
            .type(DEFAULT_TYPE)
            .definition(DEFAULT_DEFINITION)
            .jlptLevel(DEFAULT_JLPT_LEVEL)
            .gradeLevel(DEFAULT_GRADE_LEVEL)
            .ending(DEFAULT_ENDING)
            .verbText(DEFAULT_VERB_TEXT)
            .kanjiText(DEFAULT_KANJI_TEXT)
            .romanjiText(DEFAULT_ROMANJI_TEXT);
        return verb;
    }

    @Before
    public void initTest() {
        verb = createEntity(em);
    }

    @Test
    @Transactional
    public void createVerb() throws Exception {
        int databaseSizeBeforeCreate = verbRepository.findAll().size();

        // Create the Verb
        restVerbMockMvc.perform(post("/api/verbs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(verb)))
            .andExpect(status().isCreated());

        // Validate the Verb in the database
        List<Verb> verbList = verbRepository.findAll();
        assertThat(verbList).hasSize(databaseSizeBeforeCreate + 1);
        Verb testVerb = verbList.get(verbList.size() - 1);
        assertThat(testVerb.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testVerb.getDefinition()).isEqualTo(DEFAULT_DEFINITION);
        assertThat(testVerb.getJlptLevel()).isEqualTo(DEFAULT_JLPT_LEVEL);
        assertThat(testVerb.getGradeLevel()).isEqualTo(DEFAULT_GRADE_LEVEL);
        assertThat(testVerb.getEnding()).isEqualTo(DEFAULT_ENDING);
        assertThat(testVerb.getVerbText()).isEqualTo(DEFAULT_VERB_TEXT);
        assertThat(testVerb.getKanjiText()).isEqualTo(DEFAULT_KANJI_TEXT);
        assertThat(testVerb.getRomanjiText()).isEqualTo(DEFAULT_ROMANJI_TEXT);
    }

    @Test
    @Transactional
    public void createVerbWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = verbRepository.findAll().size();

        // Create the Verb with an existing ID
        verb.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVerbMockMvc.perform(post("/api/verbs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(verb)))
            .andExpect(status().isBadRequest());

        // Validate the Verb in the database
        List<Verb> verbList = verbRepository.findAll();
        assertThat(verbList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDefinitionIsRequired() throws Exception {
        int databaseSizeBeforeTest = verbRepository.findAll().size();
        // set the field null
        verb.setDefinition(null);

        // Create the Verb, which fails.

        restVerbMockMvc.perform(post("/api/verbs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(verb)))
            .andExpect(status().isBadRequest());

        List<Verb> verbList = verbRepository.findAll();
        assertThat(verbList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkJlptLevelIsRequired() throws Exception {
        int databaseSizeBeforeTest = verbRepository.findAll().size();
        // set the field null
        verb.setJlptLevel(null);

        // Create the Verb, which fails.

        restVerbMockMvc.perform(post("/api/verbs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(verb)))
            .andExpect(status().isBadRequest());

        List<Verb> verbList = verbRepository.findAll();
        assertThat(verbList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkGradeLevelIsRequired() throws Exception {
        int databaseSizeBeforeTest = verbRepository.findAll().size();
        // set the field null
        verb.setGradeLevel(null);

        // Create the Verb, which fails.

        restVerbMockMvc.perform(post("/api/verbs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(verb)))
            .andExpect(status().isBadRequest());

        List<Verb> verbList = verbRepository.findAll();
        assertThat(verbList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndingIsRequired() throws Exception {
        int databaseSizeBeforeTest = verbRepository.findAll().size();
        // set the field null
        verb.setEnding(null);

        // Create the Verb, which fails.

        restVerbMockMvc.perform(post("/api/verbs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(verb)))
            .andExpect(status().isBadRequest());

        List<Verb> verbList = verbRepository.findAll();
        assertThat(verbList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkVerbTextIsRequired() throws Exception {
        int databaseSizeBeforeTest = verbRepository.findAll().size();
        // set the field null
        verb.setVerbText(null);

        // Create the Verb, which fails.

        restVerbMockMvc.perform(post("/api/verbs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(verb)))
            .andExpect(status().isBadRequest());

        List<Verb> verbList = verbRepository.findAll();
        assertThat(verbList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRomanjiTextIsRequired() throws Exception {
        int databaseSizeBeforeTest = verbRepository.findAll().size();
        // set the field null
        verb.setRomanjiText(null);

        // Create the Verb, which fails.

        restVerbMockMvc.perform(post("/api/verbs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(verb)))
            .andExpect(status().isBadRequest());

        List<Verb> verbList = verbRepository.findAll();
        assertThat(verbList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVerbs() throws Exception {
        // Initialize the database
        verbRepository.saveAndFlush(verb);

        // Get all the verbList
        restVerbMockMvc.perform(get("/api/verbs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(verb.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].definition").value(hasItem(DEFAULT_DEFINITION.toString())))
            .andExpect(jsonPath("$.[*].jlptLevel").value(hasItem(DEFAULT_JLPT_LEVEL.toString())))
            .andExpect(jsonPath("$.[*].gradeLevel").value(hasItem(DEFAULT_GRADE_LEVEL)))
            .andExpect(jsonPath("$.[*].ending").value(hasItem(DEFAULT_ENDING.toString())))
            .andExpect(jsonPath("$.[*].verbText").value(hasItem(DEFAULT_VERB_TEXT.toString())))
            .andExpect(jsonPath("$.[*].kanjiText").value(hasItem(DEFAULT_KANJI_TEXT.toString())))
            .andExpect(jsonPath("$.[*].romanjiText").value(hasItem(DEFAULT_ROMANJI_TEXT.toString())));
    }

    @Test
    @Transactional
    public void getVerb() throws Exception {
        // Initialize the database
        verbRepository.saveAndFlush(verb);

        // Get the verb
        restVerbMockMvc.perform(get("/api/verbs/{id}", verb.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(verb.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.definition").value(DEFAULT_DEFINITION.toString()))
            .andExpect(jsonPath("$.jlptLevel").value(DEFAULT_JLPT_LEVEL.toString()))
            .andExpect(jsonPath("$.gradeLevel").value(DEFAULT_GRADE_LEVEL))
            .andExpect(jsonPath("$.ending").value(DEFAULT_ENDING.toString()))
            .andExpect(jsonPath("$.verbText").value(DEFAULT_VERB_TEXT.toString()))
            .andExpect(jsonPath("$.kanjiText").value(DEFAULT_KANJI_TEXT.toString()))
            .andExpect(jsonPath("$.romanjiText").value(DEFAULT_ROMANJI_TEXT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVerb() throws Exception {
        // Get the verb
        restVerbMockMvc.perform(get("/api/verbs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVerb() throws Exception {
        // Initialize the database
        verbService.save(verb);

        int databaseSizeBeforeUpdate = verbRepository.findAll().size();

        // Update the verb
        Verb updatedVerb = verbRepository.findOne(verb.getId());
        // Disconnect from session so that the updates on updatedVerb are not directly saved in db
        em.detach(updatedVerb);
        updatedVerb
            .type(UPDATED_TYPE)
            .definition(UPDATED_DEFINITION)
            .jlptLevel(UPDATED_JLPT_LEVEL)
            .gradeLevel(UPDATED_GRADE_LEVEL)
            .ending(UPDATED_ENDING)
            .verbText(UPDATED_VERB_TEXT)
            .kanjiText(UPDATED_KANJI_TEXT)
            .romanjiText(UPDATED_ROMANJI_TEXT);

        restVerbMockMvc.perform(put("/api/verbs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVerb)))
            .andExpect(status().isOk());

        // Validate the Verb in the database
        List<Verb> verbList = verbRepository.findAll();
        assertThat(verbList).hasSize(databaseSizeBeforeUpdate);
        Verb testVerb = verbList.get(verbList.size() - 1);
        assertThat(testVerb.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testVerb.getDefinition()).isEqualTo(UPDATED_DEFINITION);
        assertThat(testVerb.getJlptLevel()).isEqualTo(UPDATED_JLPT_LEVEL);
        assertThat(testVerb.getGradeLevel()).isEqualTo(UPDATED_GRADE_LEVEL);
        assertThat(testVerb.getEnding()).isEqualTo(UPDATED_ENDING);
        assertThat(testVerb.getVerbText()).isEqualTo(UPDATED_VERB_TEXT);
        assertThat(testVerb.getKanjiText()).isEqualTo(UPDATED_KANJI_TEXT);
        assertThat(testVerb.getRomanjiText()).isEqualTo(UPDATED_ROMANJI_TEXT);
    }

    @Test
    @Transactional
    public void updateNonExistingVerb() throws Exception {
        int databaseSizeBeforeUpdate = verbRepository.findAll().size();

        // Create the Verb

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restVerbMockMvc.perform(put("/api/verbs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(verb)))
            .andExpect(status().isCreated());

        // Validate the Verb in the database
        List<Verb> verbList = verbRepository.findAll();
        assertThat(verbList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteVerb() throws Exception {
        // Initialize the database
        verbService.save(verb);

        int databaseSizeBeforeDelete = verbRepository.findAll().size();

        // Get the verb
        restVerbMockMvc.perform(delete("/api/verbs/{id}", verb.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Verb> verbList = verbRepository.findAll();
        assertThat(verbList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Verb.class);
        Verb verb1 = new Verb();
        verb1.setId(1L);
        Verb verb2 = new Verb();
        verb2.setId(verb1.getId());
        assertThat(verb1).isEqualTo(verb2);
        verb2.setId(2L);
        assertThat(verb1).isNotEqualTo(verb2);
        verb1.setId(null);
        assertThat(verb1).isNotEqualTo(verb2);
    }
}
