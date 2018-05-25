package app.doushi.web.rest;

import java.net.*;
import java.util.*;

import javax.validation.Valid;

import org.slf4j.*;
import org.springframework.data.domain.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.codahale.metrics.annotation.Timed;

import app.doushi.domain.ConjugatedVerb;
import app.doushi.service.ConjugatedVerbService;
import app.doushi.web.rest.errors.BadRequestAlertException;
import app.doushi.web.rest.util.*;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing ConjugatedVerb.
 */
@RestController
@RequestMapping("/api")
public class ConjugatedVerbResource {

    private final Logger log = LoggerFactory.getLogger(ConjugatedVerbResource.class);

    private static final String ENTITY_NAME = "conjugatedVerb";

    private final ConjugatedVerbService conjugatedVerbService;

    public ConjugatedVerbResource(ConjugatedVerbService conjugatedVerbService) {
        this.conjugatedVerbService = conjugatedVerbService;
    }

    /**
     * POST  /conjugated-verbs : Create a new conjugatedVerb.
     *
     * @param conjugatedVerb the conjugatedVerb to create
     * @return the ResponseEntity with status 201 (Created) and with body the new conjugatedVerb, or with status 400 (Bad Request) if the conjugatedVerb has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/conjugated-verbs")
    @Timed
    public ResponseEntity<ConjugatedVerb> createConjugatedVerb(@Valid @RequestBody ConjugatedVerb conjugatedVerb) throws URISyntaxException {
        log.debug("REST request to save ConjugatedVerb : {}", conjugatedVerb);
        if (conjugatedVerb.getId() != null) {
            throw new BadRequestAlertException("A new conjugatedVerb cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ConjugatedVerb result = conjugatedVerbService.save(conjugatedVerb);
        return ResponseEntity.created(new URI("/api/conjugated-verbs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /conjugated-verbs : Updates an existing conjugatedVerb.
     *
     * @param conjugatedVerb the conjugatedVerb to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated conjugatedVerb,
     * or with status 400 (Bad Request) if the conjugatedVerb is not valid,
     * or with status 500 (Internal Server Error) if the conjugatedVerb couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/conjugated-verbs")
    @Timed
    public ResponseEntity<ConjugatedVerb> updateConjugatedVerb(@Valid @RequestBody ConjugatedVerb conjugatedVerb) throws URISyntaxException {
        log.debug("REST request to update ConjugatedVerb : {}", conjugatedVerb);
        if (conjugatedVerb.getId() == null) {
            return createConjugatedVerb(conjugatedVerb);
        }
        ConjugatedVerb result = conjugatedVerbService.save(conjugatedVerb);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, conjugatedVerb.getId().toString()))
            .body(result);
    }

    /**
     * GET  /conjugated-verbs : get all the conjugatedVerbs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of conjugatedVerbs in body
     */
    @GetMapping("/conjugated-verbs")
    @Timed
    public ResponseEntity<List<ConjugatedVerb>> getAllConjugatedVerbs(Pageable pageable) {
        log.debug("REST request to get a page of ConjugatedVerbs");
        Page<ConjugatedVerb> page = conjugatedVerbService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/conjugated-verbs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    
    /**
     * GET  /conjugated-verbs/verb/:id : get all the conjugatedVerbs for the given verb ID.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of conjugatedVerbs in body
     */
    @GetMapping("/conjugated-verbs/verb/{id}")
    @Timed
    public ResponseEntity<List<ConjugatedVerb>> getAllConjugatedVerbs(@PathVariable Long id) {
        log.debug("REST request to get a page of ConjugatedVerbs");
        List<ConjugatedVerb> results = conjugatedVerbService.findAllByVerb(id);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    /**
     * GET  /conjugated-verbs/:id : get the "id" conjugatedVerb.
     *
     * @param id the id of the conjugatedVerb to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the conjugatedVerb, or with status 404 (Not Found)
     */
    @GetMapping("/conjugated-verbs/{id}")
    @Timed
    public ResponseEntity<ConjugatedVerb> getConjugatedVerb(@PathVariable Long id) {
        log.debug("REST request to get ConjugatedVerb : {}", id);
        ConjugatedVerb conjugatedVerb = conjugatedVerbService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(conjugatedVerb));
    }

    /**
     * DELETE  /conjugated-verbs/:id : delete the "id" conjugatedVerb.
     *
     * @param id the id of the conjugatedVerb to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/conjugated-verbs/{id}")
    @Timed
    public ResponseEntity<Void> deleteConjugatedVerb(@PathVariable Long id) {
        log.debug("REST request to delete ConjugatedVerb : {}", id);
        conjugatedVerbService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
