package com.moovda_project.moovda.comment.controller;

import com.moovda_project.moovda.comment.service.LikeService;
import com.moovda_project.moovda.oauth2_jwt.utils.MemberIdExtractor;
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
        boolean result = false;
        result = likeService.addLike(memberId,commentId);

        return result==true ? new ResponseEntity<>(HttpStatus.OK) : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
