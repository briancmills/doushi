package app.doushi.domain;

import java.io.Serializable;
import java.util.*;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import app.doushi.domain.enumeration.*;

/**
 * A Verb.
 */
@Entity
@Table(name = "verb")
public class Verb implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private VerbType type;

    @NotNull
    @Size(min = 1)
    @Column(name = "definition", nullable = false)
    private String definition;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "jlpt_level", nullable = false)
    private JlptLevel jlptLevel;

    @NotNull
    @Min(value = 1)
    @Max(value = 12)
    @Column(name = "grade_level", nullable = false)
    private Integer gradeLevel;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "ending", nullable = false)
    private VerbEnding ending;

    @NotNull
    @Size(min = 1)
    @Column(name = "verb_text", nullable = false)
    private String verbText;

    @Column(name = "kanji_text")
    private String kanjiText;

    @NotNull
    @Size(min = 1)
    @Column(name = "romanji_text", nullable = false)
    private String romanjiText;

    @OneToMany(mappedBy = "verb")
    @JsonIgnore
    private Set<VerbDefinition> definitions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public VerbType getType() {
        return type;
    }

    public Verb type(VerbType type) {
        this.type = type;
        return this;
    }

    public void setType(VerbType type) {
        this.type = type;
    }

    public String getDefinition() {
        return definition;
    }

    public Verb definition(String definition) {
        this.definition = definition;
        return this;
    }

    public void setDefinition(String definition) {
        this.definition = definition;
    }

    public JlptLevel getJlptLevel() {
        return jlptLevel;
    }

    public Verb jlptLevel(JlptLevel jlptLevel) {
        this.jlptLevel = jlptLevel;
        return this;
    }

    public void setJlptLevel(JlptLevel jlptLevel) {
        this.jlptLevel = jlptLevel;
    }

    public Integer getGradeLevel() {
        return gradeLevel;
    }

    public Verb gradeLevel(Integer gradeLevel) {
        this.gradeLevel = gradeLevel;
        return this;
    }

    public void setGradeLevel(Integer gradeLevel) {
        this.gradeLevel = gradeLevel;
    }

    public VerbEnding getEnding() {
        return ending;
    }

    public Verb ending(VerbEnding ending) {
        this.ending = ending;
        return this;
    }

    public void setEnding(VerbEnding ending) {
        this.ending = ending;
    }

    public String getVerbText() {
        return verbText;
    }

    public Verb verbText(String verbText) {
        this.verbText = verbText;
        return this;
    }

    public void setVerbText(String verbText) {
        this.verbText = verbText;
    }

    public String getKanjiText() {
        return kanjiText;
    }

    public Verb kanjiText(String kanjiText) {
        this.kanjiText = kanjiText;
        return this;
    }

    public void setKanjiText(String kanjiText) {
        this.kanjiText = kanjiText;
    }

    public String getRomanjiText() {
        return romanjiText;
    }

    public Verb romanjiText(String romanjiText) {
        this.romanjiText = romanjiText;
        return this;
    }

    public void setRomanjiText(String romanjiText) {
        this.romanjiText = romanjiText;
    }

    public Set<VerbDefinition> getDefinitions() {
        return definitions;
    }

    public Verb definitions(Set<VerbDefinition> verbDefinitions) {
        this.definitions = verbDefinitions;
        return this;
    }

    public Verb addDefinitions(VerbDefinition verbDefinition) {
        this.definitions.add(verbDefinition);
        verbDefinition.setVerb(this);
        return this;
    }

    public Verb removeDefinitions(VerbDefinition verbDefinition) {
        this.definitions.remove(verbDefinition);
        verbDefinition.setVerb(null);
        return this;
    }

    public void setDefinitions(Set<VerbDefinition> verbDefinitions) {
        this.definitions = verbDefinitions;
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
        Verb verb = (Verb) o;
        if (verb.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), verb.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Verb{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", definition='" + getDefinition() + "'" +
            ", jlptLevel='" + getJlptLevel() + "'" +
            ", gradeLevel=" + getGradeLevel() +
            ", ending='" + getEnding() + "'" +
            ", verbText='" + getVerbText() + "'" +
            ", kanjiText='" + getKanjiText() + "'" +
            ", romanjiText='" + getRomanjiText() + "'" +
            "}";
    }
}
