package com.moovda_project.moovda.module.comment.controller;

import com.moovda_project.moovda.module.comment.service.LikeService;
import com.moovda_project.moovda.global.auth.utils.MemberIdExtractor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;

    @PostMapping("/comments/{comment_id}/likes")
    public ResponseEntity addLike(@PathVariable("comment_id") @Positive long commentId) {
        Long memberId = MemberIdExtractor.extractMemberId();

        likeService.addLike(memberId,commentId);

        return ResponseEntity.ok().build();
    }
}