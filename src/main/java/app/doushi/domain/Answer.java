package app.doushi.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Answer.
 */
@Entity
@Table(name = "answer")
public class Answer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "correct", nullable = false)
    private Boolean correct;

    @NotNull
    @Column(name = "date", nullable = false)
    private ZonedDateTime date;

    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "input", length = 100, nullable = false)
    private String input;

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

    public Boolean isCorrect() {
        return correct;
    }

    public Answer correct(Boolean correct) {
        this.correct = correct;
        return this;
    }

    public void setCorrect(Boolean correct) {
        this.correct = correct;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Answer date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public String getInput() {
        return input;
    }

    public Answer input(String input) {
        this.input = input;
        return this;
    }

    public void setInput(String input) {
        this.input = input;
    }

    public User getUser() {
        return user;
    }

    public Answer user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Verb getVerb() {
        return verb;
    }

    public Answer verb(Verb verb) {
        this.verb = verb;
        return this;
    }

    public void setVerb(Verb verb) {
        this.verb = verb;
    }

    public ConjugatedVerb getConjugatedVerb() {
        return conjugatedVerb;
    }

    public Answer conjugatedVerb(ConjugatedVerb conjugatedVerb) {
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
        Answer answer = (Answer) o;
        if (answer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), answer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Answer{" +
            "id=" + getId() +
            ", correct='" + isCorrect() + "'" +
            ", date='" + getDate() + "'" +
            ", input='" + getInput() + "'" +
            "}";
    }
}
