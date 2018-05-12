package app.doushi.web.rest;

import com.codahale.metrics.annotation.Timed;
import app.doushi.domain.ConjugatedVerbDefinition;
import app.doushi.service.ConjugatedVerbDefinitionService;
import app.doushi.web.rest.errors.BadRequestAlertException;
import app.doushi.web.rest.util.HeaderUtil;
import app.doushi.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ConjugatedVerbDefinition.
 */
@RestController
@RequestMapping("/api")
public class ConjugatedVerbDefinitionResource {

    private final Logger log = LoggerFactory.getLogger(ConjugatedVerbDefinitionResource.class);

    private static final String ENTITY_NAME = "conjugatedVerbDefinition";

    private final ConjugatedVerbDefinitionService conjugatedVerbDefinitionService;

    public ConjugatedVerbDefinitionResource(ConjugatedVerbDefinitionService conjugatedVerbDefinitionService) {
        this.conjugatedVerbDefinitionService = conjugatedVerbDefinitionService;
    }

    /**
     * POST  /conjugated-verb-definitions : Create a new conjugatedVerbDefinition.
     *
     * @param conjugatedVerbDefinition the conjugatedVerbDefinition to create
     * @return the ResponseEntity with status 201 (Created) and with body the new conjugatedVerbDefinition, or with status 400 (Bad Request) if the conjugatedVerbDefinition has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/conjugated-verb-definitions")
    @Timed
    public ResponseEntity<ConjugatedVerbDefinition> createConjugatedVerbDefinition(@Valid @RequestBody ConjugatedVerbDefinition conjugatedVerbDefinition) throws URISyntaxException {
        log.debug("REST request to save ConjugatedVerbDefinition : {}", conjugatedVerbDefinition);
        if (conjugatedVerbDefinition.getId() != null) {
            throw new BadRequestAlertException("A new conjugatedVerbDefinition cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ConjugatedVerbDefinition result = conjugatedVerbDefinitionService.save(conjugatedVerbDefinition);
        return ResponseEntity.created(new URI("/api/conjugated-verb-definitions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /conjugated-verb-definitions : Updates an existing conjugatedVerbDefinition.
     *
     * @param conjugatedVerbDefinition the conjugatedVerbDefinition to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated conjugatedVerbDefinition,
     * or with status 400 (Bad Request) if the conjugatedVerbDefinition is not valid,
     * or with status 500 (Internal Server Error) if the conjugatedVerbDefinition couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/conjugated-verb-definitions")
    @Timed
    public ResponseEntity<ConjugatedVerbDefinition> updateConjugatedVerbDefinition(@Valid @RequestBody ConjugatedVerbDefinition conjugatedVerbDefinition) throws URISyntaxException {
        log.debug("REST request to update ConjugatedVerbDefinition : {}", conjugatedVerbDefinition);
        if (conjugatedVerbDefinition.getId() == null) {
            return createConjugatedVerbDefinition(conjugatedVerbDefinition);
        }
        ConjugatedVerbDefinition result = conjugatedVerbDefinitionService.save(conjugatedVerbDefinition);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, conjugatedVerbDefinition.getId().toString()))
            .body(result);
    }

    /**
     * GET  /conjugated-verb-definitions : get all the conjugatedVerbDefinitions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of conjugatedVerbDefinitions in body
     */
    @GetMapping("/conjugated-verb-definitions")
    @Timed
    public ResponseEntity<List<ConjugatedVerbDefinition>> getAllConjugatedVerbDefinitions(Pageable pageable) {
        log.debug("REST request to get a page of ConjugatedVerbDefinitions");
        Page<ConjugatedVerbDefinition> page = conjugatedVerbDefinitionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/conjugated-verb-definitions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /conjugated-verb-definitions/:id : get the "id" conjugatedVerbDefinition.
     *
     * @param id the id of the conjugatedVerbDefinition to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the conjugatedVerbDefinition, or with status 404 (Not Found)
     */
    @GetMapping("/conjugated-verb-definitions/{id}")
    @Timed
    public ResponseEntity<ConjugatedVerbDefinition> getConjugatedVerbDefinition(@PathVariable Long id) {
        log.debug("REST request to get ConjugatedVerbDefinition : {}", id);
        ConjugatedVerbDefinition conjugatedVerbDefinition = conjugatedVerbDefinitionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(conjugatedVerbDefinition));
    }

    /**
     * DELETE  /conjugated-verb-definitions/:id : delete the "id" conjugatedVerbDefinition.
     *
     * @param id the id of the conjugatedVerbDefinition to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/conjugated-verb-definitions/{id}")
    @Timed
    public ResponseEntity<Void> deleteConjugatedVerbDefinition(@PathVariable Long id) {
        log.debug("REST request to delete ConjugatedVerbDefinition : {}", id);
        conjugatedVerbDefinitionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
