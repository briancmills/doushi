package app.doushi.web.rest;

import java.net.*;
import java.util.*;

import javax.validation.Valid;

import org.slf4j.*;
import org.springframework.data.domain.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.codahale.metrics.annotation.Timed;

import app.doushi.domain.Verb;
import app.doushi.service.VerbService;
import app.doushi.web.rest.errors.BadRequestAlertException;
import app.doushi.web.rest.util.*;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing Verb.
 */
@RestController
@RequestMapping("/api")
public class VerbResource {

    private final Logger log = LoggerFactory.getLogger(VerbResource.class);

    private static final String ENTITY_NAME = "verb";

    private final VerbService verbService;

    public VerbResource(VerbService verbService) {
        this.verbService = verbService;
    }

    /**
     * POST  /verbs : Create a new verb.
     *
     * @param verb the verb to create
     * @return the ResponseEntity with status 201 (Created) and with body the new verb, or with status 400 (Bad Request) if the verb has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/verbs")
    @Timed
    public ResponseEntity<Verb> createVerb(@Valid @RequestBody Verb verb) throws URISyntaxException {
        log.debug("REST request to save Verb : {}", verb);
        if (verb.getId() != null) {
            throw new BadRequestAlertException("A new verb cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Verb result = verbService.save(verb);
        return ResponseEntity.created(new URI("/api/verbs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /verbs : Updates an existing verb.
     *
     * @param verb the verb to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated verb,
     * or with status 400 (Bad Request) if the verb is not valid,
     * or with status 500 (Internal Server Error) if the verb couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/verbs")
    @Timed
    public ResponseEntity<Verb> updateVerb(@Valid @RequestBody Verb verb) throws URISyntaxException {
        log.debug("REST request to update Verb : {}", verb);
        if (verb.getId() == null) {
            return createVerb(verb);
        }
        Verb result = verbService.save(verb);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, verb.getId().toString()))
            .body(result);
    }

    /**
     * GET  /verbs : get all the verbs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of verbs in body
     */
    @GetMapping("/verbs")
    @Timed
    public ResponseEntity<List<Verb>> getAllVerbs(Pageable pageable) {
        log.debug("REST request to get a page of Verbs");
        Page<Verb> page = verbService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/verbs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /verbs/:id : get the "id" verb.
     *
     * @param id the id of the verb to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the verb, or with status 404 (Not Found)
     */
    @GetMapping("/verbs/{id}")
    @Timed
    public ResponseEntity<Verb> getVerb(@PathVariable Long id) {
        log.debug("REST request to get Verb : {}", id);
        Verb verb = verbService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(verb));
    }
    
    /**
     * GET  /verbs/study : get the next verb to study
     *
     * @return the ResponseEntity with status 200 (OK) and with body the verb, or with status 404 (Not Found)
     */
    @GetMapping("/verbs/study")
    @Timed
    public ResponseEntity<Verb> getVerbToStudy() {
        log.debug("REST request to get getVerbToStudy : ");
        Verb verb = verbService.getVerbToStudy();
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(verb));
    }
    
    /**
     * GET  /verbs/study/available : get a count of the verbs available to study now
     *
     * @param id the id of the verb to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the verb, or with status 404 (Not Found)
     */
    @GetMapping("/verbs/study/available")
    @Timed
    public ResponseEntity<List<Verb>> getVerbsAvailableToStudy() {
        log.debug("REST request to get getVerbsAvailableToStudy : ");
        List<Verb> verbs = verbService.getVerbsAvailableToStudy();
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(verbs));
    }
    
    


    /**
     * DELETE  /verbs/:id : delete the "id" verb.
     *
     * @param id the id of the verb to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/verbs/{id}")
    @Timed
    public ResponseEntity<Void> deleteVerb(@PathVariable Long id) {
        log.debug("REST request to delete Verb : {}", id);
        verbService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
