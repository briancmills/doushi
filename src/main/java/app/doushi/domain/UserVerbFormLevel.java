package app.doushi.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import app.doushi.domain.enumeration.KyuDan;

/**
 * A UserVerbFormLevel.
 */
@Entity
@Table(name = "user_verb_form_level")
public class UserVerbFormLevel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "level", nullable = false)
    private KyuDan level;

    @ManyToOne(optional = false)
    @NotNull
    private User user;

    @ManyToOne
    private Verb verb;

    @ManyToOne
    private ConjugatedVerb conjugatedVerb;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public KyuDan getLevel() {
        return level;
    }

    public UserVerbFormLevel level(KyuDan level) {
        this.level = level;
        return this;
    }

    public void setLevel(KyuDan level) {
        this.level = level;
    }

    public User getUser() {
        return user;
    }

    public UserVerbFormLevel user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Verb getVerb() {
        return verb;
    }

    public UserVerbFormLevel verb(Verb verb) {
        this.verb = verb;
        return this;
    }

    public void setVerb(Verb verb) {
        this.verb = verb;
    }

    public ConjugatedVerb getConjugatedVerb() {
        return conjugatedVerb;
    }

    public UserVerbFormLevel conjugatedVerb(ConjugatedVerb conjugatedVerb) {
        this.conjugatedVerb = conjugatedVerb;
        return this;
    }

    public void setConjugatedVerb(ConjugatedVerb conjugatedVerb) {
        this.conjugatedVerb = conjugatedVerb;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserVerbFormLevel userVerbFormLevel = (UserVerbFormLevel) o;
        if (userVerbFormLevel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userVerbFormLevel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserVerbFormLevel{" +
            "id=" + getId() +
            ", level='" + getLevel() + "'" +
            "}";
    }
}
