'use client';

import { QuestionDetailResponse } from '@/app/questions/[questionId]/page';
import * as S from '@/components/Question/AnswerBox.styled';
import {
  AnswerType,
  deleteAnswerList,
  editAnswerList,
} from '@/redux/features/answerListSlice';
import { RootState } from '@/redux/store';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchMovieList } from './Modal';
import SearchBox from './SearchBox';

interface AnswerBoxProps {
  answer: AnswerType;
  question: QuestionDetailResponse | null;
}

const AnswerBox = ({ answer, question }: AnswerBoxProps) => {
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const dispatch = useDispatch();
  const { questionId } = useParams();
  const answerId = answer.answerId;

  const onEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const onSubmit = async ({
    selectedMovie,
    textValue,
  }: {
    selectedMovie?: SearchMovieList;
    textValue: string;
  }) => {
    const source = `${process.env.NEXT_PUBLIC_API_URL}/questions/${questionId}/answers/${answerId}`;
    const body = {
      answerId: answer.answerId,
      nickname: answer.nickname,
      content: textValue,
      movie: {
        title: selectedMovie?.title,
        poster: selectedMovie?.poster,
        prodYear: selectedMovie?.prodYear,
      },
    };
    const response = await axios.patch(source, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Authorization'),
      },
    });
    setIsEditing(false);

    dispatch(
      editAnswerList({
        answerId: answer.answerId,
        nickname: answer.nickname,
        content: textValue,
        movie: {
          title: selectedMovie?.title,
          poster: selectedMovie?.poster,
          prodYear: selectedMovie?.prodYear,
        },
      }),
    );
  };

  return (
    <S.AnswerBoxGroup>
      <S.AnswerBox>
        <AnswerBoxTop
          onEditClick={onEditClick}
          answer={answer}
          question={question}
        />
        <S.AnswerBoxMid>
          {isEditing ? (
            <SearchBox
              onSubmit={onSubmit}
              defaultValue={{
                movieId: '',
                content: answer.content,
                title: answer.movie?.title,
                poster: answer.movie?.poster,
                prodYear: answer.movie?.prodYear,
                pageInfo: {
                  currentPage: 0,
                  pageSize: 0,
                  total: 0,
                },
              }}
            />
          ) : (
            <S.ContentBox>
              <div>{answer.content}</div>
              <AnswerBoxBottom answer={answer} />
            </S.ContentBox>
          )}
        </S.AnswerBoxMid>
      </S.AnswerBox>
    </S.AnswerBoxGroup>
  );
};

interface AnswerBoxTopProps {
  onEditClick: () => void;
  answer: AnswerType;
  question: QuestionDetailResponse | null;
}

const AnswerBoxTop = ({ onEditClick, answer, question }: AnswerBoxTopProps) => {
  const dispatch = useDispatch();
  const answerId = answer.memberId;
  const { questionId } = useParams();
  const userId = useSelector((state: RootState) => state.auth.memberId);
  const [isAuthor, setIsAuthor] = useState<boolean>(false);

  const handleDeleteAnswer = async () => {
    dispatch(deleteAnswerList(answer));
    const source = `${process.env.NEXT_PUBLIC_API_URL}/questions/${questionId}/answers/${answerId}`;
    await axios.delete(source, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Authorization'),
      },
    });
    console.log('답변이 삭제되었습니다.');
  };

  useEffect(() => {
    if (userId === answerId) {
      setIsAuthor(true);
    }
  }, []);

  return (
    <S.BoxTop>
      <S.LeftBox>
        <Link href={`/mypage/${userId}`}>
          <S.Nickname>{answer.nickname}</S.Nickname>
        </Link>
        <S.Time>
          {question?.createdAt ? AnswerDate(new Date(question.createdAt)) : ''}
        </S.Time>
      </S.LeftBox>
      {isAuthor && (
        <S.RightBox>
          <S.EditBtn onClick={onEditClick}>수정</S.EditBtn>
          <S.DeleteBtn onClick={handleDeleteAnswer}>삭제</S.DeleteBtn>
        </S.RightBox>
      )}
    </S.BoxTop>
  );
};

const AnswerDate = (createdAt: Date): string => {
  const milliSeconds: number = new Date().getTime() - createdAt.getTime();
  const seconds: number = milliSeconds / 1000;

  if (seconds < 60) return `방금 전`;
  const minutes: number = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours: number = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days: number = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks: number = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months: number = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years: number = days / 365;
  return `${Math.floor(years)}년 전`;
};

interface AnswerBoxBottomProps {
  answer: AnswerType;
}

const AnswerBoxBottom = ({ answer }: AnswerBoxBottomProps) => {
  const { movieId } = useParams();
  return (
    <Link href={`/movie/${movieId}`}>
      <S.BoxBottom>
        <S.SelectedMovieBox>
          <S.Poster>{answer?.movie?.poster}</S.Poster>
          <S.MovieInfo>
            <S.MovieTitle>{answer?.movie?.title}</S.MovieTitle>
            <S.MovieReleaseDate>{answer?.movie?.prodYear}</S.MovieReleaseDate>
          </S.MovieInfo>
        </S.SelectedMovieBox>
      </S.BoxBottom>
    </Link>
  );
};

export default AnswerBox;
