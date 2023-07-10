package com.moovda_project.moovda.comment.service;

import com.moovda_project.moovda.comment.entity.Comment;
import com.moovda_project.moovda.comment.entity.Like;
import com.moovda_project.moovda.comment.repository.LikeRepository;
import com.moovda_project.moovda.member.entity.Member;
import com.moovda_project.moovda.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@RequiredArgsConstructor
@Service
public class LikeService {
    private final LikeRepository likeRepository;
    private final CommentService commentService;
    private final MemberService memberService;

    public boolean addLike(long memberId, long commentId) {
        Comment comment = commentService.findVerifiedComment(commentId);
        Member member = memberService.findMember(memberId);

        if(isNotAlreadyLike(member,comment)) {
            likeRepository.save(new Like(member,comment));
            return true;
        }

        else {
            likeRepository.deleteByMemberAndComment(member,comment);
        }
        return false;
    }

    private boolean isNotAlreadyLike(Member member, Comment comment) {
        return likeRepository.findByMemberAndComment(member,comment).isEmpty();
    }
}
