package app.doushi.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ConjugatedVerbDefinition.
 */
@Entity
@Table(name = "conjugated_verb_definition")
public class ConjugatedVerbDefinition implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 1)
    @Column(name = "definition", nullable = false)
    private String definition;

    @ManyToOne(optional = false)
    @NotNull
    private ConjugatedVerb conjugatedVerb;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDefinition() {
        return definition;
    }

    public ConjugatedVerbDefinition definition(String definition) {
        this.definition = definition;
        return this;
    }

    public void setDefinition(String definition) {
        this.definition = definition;
    }

    public ConjugatedVerb getConjugatedVerb() {
        return conjugatedVerb;
    }

    public ConjugatedVerbDefinition conjugatedVerb(ConjugatedVerb conjugatedVerb) {
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
        ConjugatedVerbDefinition conjugatedVerbDefinition = (ConjugatedVerbDefinition) o;
        if (conjugatedVerbDefinition.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), conjugatedVerbDefinition.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ConjugatedVerbDefinition{" +
            "id=" + getId() +
            ", definition='" + getDefinition() + "'" +
            "}";
    }
}
