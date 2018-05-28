package app.doushi.domain;


import java.io.Serializable;
import java.util.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import app.doushi.domain.enumeration.KyuDan;

/**
 * Tracks a set of verbs and their progress through the application for the given user. 
 * The level on this set will not stay in sync with the items in the set.  Instead it is the
 * max level the items have ever gotten to.  
 */
@Entity
@Table(name = "user_verb_set")
public class UserVerbSet implements Serializable {

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
    
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(
            name = "user_verb_set_verbs",
            joinColumns = @JoinColumn(name = "user_verb_set_id"),
            inverseJoinColumns = @JoinColumn(name = "verb_id")
    )
    @JsonIgnore
    private Set<Verb> verbs = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public KyuDan getLevel() {
        return level;
    }

    public UserVerbSet level(KyuDan level) {
        this.level = level;
        return this;
    }

    public void setLevel(KyuDan level) {
        this.level = level;
    }

    public User getUser() {
        return user;
    }

    public UserVerbSet user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Verb> getVerbs() {
        return verbs;
    }
    
    public UserVerbSet verbs(Set<Verb> verbs) {
        this.verbs = verbs;
        return this;
    }

    public void setVerbs(Set<Verb> verbs) {
        this.verbs = verbs;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserVerbSet set = (UserVerbSet) o;
        if (set.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), set.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserVerbSet{" +
            "id=" + getId() +
            ", level='" + getLevel() + "'" +
            ", verbs=" + getVerbs()  +
            "}";
    }
}
