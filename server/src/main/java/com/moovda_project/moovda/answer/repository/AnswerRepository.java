package com.moovda_project.moovda.answer.repository;

import com.moovda_project.moovda.answer.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface AnswerRepository extends JpaRepository<Answer, Long> {
    List<Answer> findAll(@Param("questionId") long questionId);
}
