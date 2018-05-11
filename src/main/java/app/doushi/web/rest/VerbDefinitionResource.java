package app.doushi.web.rest;

import com.codahale.metrics.annotation.Timed;
import app.doushi.domain.VerbDefinition;
import app.doushi.service.VerbDefinitionService;
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
 * REST controller for managing VerbDefinition.
 */
@RestController
@RequestMapping("/api")
public class VerbDefinitionResource {

    private final Logger log = LoggerFactory.getLogger(VerbDefinitionResource.class);

    private static final String ENTITY_NAME = "verbDefinition";

    private final VerbDefinitionService verbDefinitionService;

    public VerbDefinitionResource(VerbDefinitionService verbDefinitionService) {
        this.verbDefinitionService = verbDefinitionService;
    }

    /**
     * POST  /verb-definitions : Create a new verbDefinition.
     *
     * @param verbDefinition the verbDefinition to create
     * @return the ResponseEntity with status 201 (Created) and with body the new verbDefinition, or with status 400 (Bad Request) if the verbDefinition has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/verb-definitions")
    @Timed
    public ResponseEntity<VerbDefinition> createVerbDefinition(@Valid @RequestBody VerbDefinition verbDefinition) throws URISyntaxException {
        log.debug("REST request to save VerbDefinition : {}", verbDefinition);
        if (verbDefinition.getId() != null) {
            throw new BadRequestAlertException("A new verbDefinition cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VerbDefinition result = verbDefinitionService.save(verbDefinition);
        return ResponseEntity.created(new URI("/api/verb-definitions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /verb-definitions : Updates an existing verbDefinition.
     *
     * @param verbDefinition the verbDefinition to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated verbDefinition,
     * or with status 400 (Bad Request) if the verbDefinition is not valid,
     * or with status 500 (Internal Server Error) if the verbDefinition couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/verb-definitions")
    @Timed
    public ResponseEntity<VerbDefinition> updateVerbDefinition(@Valid @RequestBody VerbDefinition verbDefinition) throws URISyntaxException {
        log.debug("REST request to update VerbDefinition : {}", verbDefinition);
        if (verbDefinition.getId() == null) {
            return createVerbDefinition(verbDefinition);
        }
        VerbDefinition result = verbDefinitionService.save(verbDefinition);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, verbDefinition.getId().toString()))
            .body(result);
    }

    /**
     * GET  /verb-definitions : get all the verbDefinitions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of verbDefinitions in body
     */
    @GetMapping("/verb-definitions")
    @Timed
    public ResponseEntity<List<VerbDefinition>> getAllVerbDefinitions(Pageable pageable) {
        log.debug("REST request to get a page of VerbDefinitions");
        Page<VerbDefinition> page = verbDefinitionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/verb-definitions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /verb-definitions/:id : get the "id" verbDefinition.
     *
     * @param id the id of the verbDefinition to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the verbDefinition, or with status 404 (Not Found)
     */
    @GetMapping("/verb-definitions/{id}")
    @Timed
    public ResponseEntity<VerbDefinition> getVerbDefinition(@PathVariable Long id) {
        log.debug("REST request to get VerbDefinition : {}", id);
        VerbDefinition verbDefinition = verbDefinitionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(verbDefinition));
    }

    /**
     * DELETE  /verb-definitions/:id : delete the "id" verbDefinition.
     *
     * @param id the id of the verbDefinition to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/verb-definitions/{id}")
    @Timed
    public ResponseEntity<Void> deleteVerbDefinition(@PathVariable Long id) {
        log.debug("REST request to delete VerbDefinition : {}", id);
        verbDefinitionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
