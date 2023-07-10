package com.moovda_project.moovda.answer.controller;

import com.moovda_project.moovda.answer.dto.AnswerDto;
import com.moovda_project.moovda.answer.entity.Answer;
import com.moovda_project.moovda.answer.mapper.AnswerMapper;
import com.moovda_project.moovda.answer.service.AnswerService;
import com.moovda_project.moovda.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("questions/{question-id}/answers")
@Validated
public class AnswerController {
    private final static String ANSWER_DEFAULT_URL = "/questions/{question-id}/answers";
    private final AnswerMapper answerMapper;
    private final AnswerService answerService;

    public AnswerController(AnswerMapper answerMapper,AnswerService answerService) {
        this.answerMapper = answerMapper;
        this.answerService = answerService;
    }

    @PostMapping
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerDto.Post request,
                                     @Positive @PathVariable("question-id") long questionId) {
        request.setQuestionId(questionId);
        Answer createdAnswer = answerService.createAnswer(answerMapper.answerPostToAnswer(request));

        URI location = UriCreator.createUri("/answers", createdAnswer.getAnswerId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@Valid @RequestBody AnswerDto.Patch request,
                                      @Positive @PathVariable("answer-id") long answerId) {
        request.setAnswerId(answerId);
        answerService.updateAnswer(answerMapper.answerPatchToAnswer(request));

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@Positive @PathVariable("answer-id") long answerId) {
        answerService.deleteAnswer(answerId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
