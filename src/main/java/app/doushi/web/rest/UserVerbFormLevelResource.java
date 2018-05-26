package app.doushi.web.rest;

import com.codahale.metrics.annotation.Timed;
import app.doushi.domain.UserVerbFormLevel;
import app.doushi.service.UserVerbFormLevelService;
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
 * REST controller for managing UserVerbFormLevel.
 */
@RestController
@RequestMapping("/api")
public class UserVerbFormLevelResource {

    private final Logger log = LoggerFactory.getLogger(UserVerbFormLevelResource.class);

    private static final String ENTITY_NAME = "userVerbFormLevel";

    private final UserVerbFormLevelService userVerbFormLevelService;

    public UserVerbFormLevelResource(UserVerbFormLevelService userVerbFormLevelService) {
        this.userVerbFormLevelService = userVerbFormLevelService;
    }

    /**
     * POST  /user-verb-form-levels : Create a new userVerbFormLevel.
     *
     * @param userVerbFormLevel the userVerbFormLevel to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userVerbFormLevel, or with status 400 (Bad Request) if the userVerbFormLevel has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-verb-form-levels")
    @Timed
    public ResponseEntity<UserVerbFormLevel> createUserVerbFormLevel(@Valid @RequestBody UserVerbFormLevel userVerbFormLevel) throws URISyntaxException {
        log.debug("REST request to save UserVerbFormLevel : {}", userVerbFormLevel);
        if (userVerbFormLevel.getId() != null) {
            throw new BadRequestAlertException("A new userVerbFormLevel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserVerbFormLevel result = userVerbFormLevelService.save(userVerbFormLevel);
        return ResponseEntity.created(new URI("/api/user-verb-form-levels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-verb-form-levels : Updates an existing userVerbFormLevel.
     *
     * @param userVerbFormLevel the userVerbFormLevel to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userVerbFormLevel,
     * or with status 400 (Bad Request) if the userVerbFormLevel is not valid,
     * or with status 500 (Internal Server Error) if the userVerbFormLevel couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-verb-form-levels")
    @Timed
    public ResponseEntity<UserVerbFormLevel> updateUserVerbFormLevel(@Valid @RequestBody UserVerbFormLevel userVerbFormLevel) throws URISyntaxException {
        log.debug("REST request to update UserVerbFormLevel : {}", userVerbFormLevel);
        if (userVerbFormLevel.getId() == null) {
            return createUserVerbFormLevel(userVerbFormLevel);
        }
        UserVerbFormLevel result = userVerbFormLevelService.save(userVerbFormLevel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userVerbFormLevel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-verb-form-levels : get all the userVerbFormLevels.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of userVerbFormLevels in body
     */
    @GetMapping("/user-verb-form-levels")
    @Timed
    public ResponseEntity<List<UserVerbFormLevel>> getAllUserVerbFormLevels(Pageable pageable) {
        log.debug("REST request to get a page of UserVerbFormLevels");
        Page<UserVerbFormLevel> page = userVerbFormLevelService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/user-verb-form-levels");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /user-verb-form-levels/:id : get the "id" userVerbFormLevel.
     *
     * @param id the id of the userVerbFormLevel to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userVerbFormLevel, or with status 404 (Not Found)
     */
    @GetMapping("/user-verb-form-levels/{id}")
    @Timed
    public ResponseEntity<UserVerbFormLevel> getUserVerbFormLevel(@PathVariable Long id) {
        log.debug("REST request to get UserVerbFormLevel : {}", id);
        UserVerbFormLevel userVerbFormLevel = userVerbFormLevelService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userVerbFormLevel));
    }

    /**
     * DELETE  /user-verb-form-levels/:id : delete the "id" userVerbFormLevel.
     *
     * @param id the id of the userVerbFormLevel to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-verb-form-levels/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserVerbFormLevel(@PathVariable Long id) {
        log.debug("REST request to delete UserVerbFormLevel : {}", id);
        userVerbFormLevelService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
