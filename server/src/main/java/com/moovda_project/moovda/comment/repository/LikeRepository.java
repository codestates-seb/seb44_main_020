package com.moovda_project.moovda.comment.repository;

import com.moovda_project.moovda.comment.entity.Comment;
import com.moovda_project.moovda.comment.entity.Like;
import com.moovda_project.moovda.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
     Optional<Like> findByMemberAndComment(Member member, Comment comment);

     void deleteByMemberAndComment(Member member, Comment comment);
}
