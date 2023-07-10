package com.moovda_project.moovda.answer.entity;

import com.moovda_project.moovda.audit.Auditable;
import com.moovda_project.moovda.member.entity.Member;
import com.moovda_project.moovda.movie.entity.Movie;
import com.moovda_project.moovda.question.entity.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Answer extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    public void addQuestion(Question question){
        this.question = question;
        if(this.question.getAnswers().contains(this)){
            this.question.getAnswers().add(this);
        }
    }
/*
    public void addMember(Member member) {
        this.member = member;
        if(this.member.getAnswers().contains(this)){
            this.member.getAnswers().add(this);
        }
    }

    public void addMovie(Movie movie) {
        this.movie = movie;
        if(this.movie.getAnswers().contatins(this)) {
            this.member.getAnswers().add(this);
        }
    }
 */
}
