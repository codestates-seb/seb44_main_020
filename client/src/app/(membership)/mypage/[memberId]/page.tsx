'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import axios from 'axios';
import { setLoginState } from '@/redux/features/loginSlice';
import { click } from '@/redux/features/deleteSlice';
import { MainPoster } from '@/components/MainPoster/MainPoster';
import MyCarousel from '@/components/MyCarousel/MyCarousel';
import * as S from './page.styled';
import { ThemeProvider } from 'styled-components';
import theme from '@/components/MainPoster/theme';

interface ToWatch {
  movieId: number;
  title: string;
  poster: string;
}

interface Watched {
  movieId: number;
  title: string;
  poster: string;
}

interface My {
  memberId: number;
  nickname: string;
  toWatch: ToWatch[];
  watched: Watched[];
}

export default function MyPage() {
  const router = useRouter();
  const [data, setData] = useState<My | null>(null);
  const { memberId } = useParams();
  const userId = useSelector((state: RootState) => state.auth.memberId);

  const dispatch = useDispatch();

  const handleShowDelete = () => {
    dispatch(click());
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/v11/members/${memberId}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  // 회원삭제
  const handleDelete = useCallback(() => {
    if (window.confirm('삭제하시겠습니까?')) {
      axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/members/${memberId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('Authorization'),
          },
        })
        .then(() => {
          //로그아웃
          dispatch(setLoginState(false));
          localStorage.clear();
          signOut();
          alert('회원 정보가 삭제되었습니다.');
          //메인으로 redirect
          router.push('/');
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [memberId]);

  const toWatchlist = data?.toWatch?.map((list) => (
    <ThemeProvider theme={theme.myPage} key={list.movieId}>
      <MainPoster data={list} isWatched={false} isToWatch={true} />
    </ThemeProvider>
  ));

  const watchedList = data?.watched?.map((list) => (
    <ThemeProvider theme={theme.myPage} key={list.movieId}>
      <MainPoster
        key={list.movieId}
        data={list}
        isWatched={true}
        isToWatch={false}
      />
    </ThemeProvider>
  ));

  return (
    <S.Wrapper>
      {userId === memberId ? <S.PageTitle>my page</S.PageTitle> : ''}
      <S.Container>
        <S.Nickname>{data?.nickname} 님의 리스트</S.Nickname>
        <S.SectionWrapper>
          <S.Section>
            <S.SectionTitle>
              <S.Title>볼 영화</S.Title>
              {userId === memberId ? (
                <S.ShowDelete onClick={handleShowDelete}>편집</S.ShowDelete>
              ) : (
                ''
              )}
            </S.SectionTitle>
            <S.SectionContent>
              {toWatchlist?.length === 0 ? (
                <S.EmptyText>목록이 비어 있습니다.</S.EmptyText>
              ) : (
                <S.MovieList>
                  <MyCarousel props={toWatchlist} />
                </S.MovieList>
              )}
            </S.SectionContent>
          </S.Section>
          <S.Section>
            <S.SectionTitle>
              <S.Title>본 영화</S.Title>{' '}
            </S.SectionTitle>
            <S.SectionContent>
              {watchedList?.length === 0 ? (
                <S.EmptyText>목록이 비어 있습니다.</S.EmptyText>
              ) : (
                <S.MovieList>
                  <MyCarousel props={watchedList} />
                </S.MovieList>
              )}
            </S.SectionContent>
          </S.Section>
          {userId === memberId ? (
            <S.Section>
              <S.SectionTitle>
                <S.Title>계정 관리</S.Title>
              </S.SectionTitle>
              <S.DeleteContainter>
                <S.Text>회원 삭제</S.Text>
                <S.DeleteBtn onClick={handleDelete}>삭제하기</S.DeleteBtn>
              </S.DeleteContainter>
            </S.Section>
          ) : (
            ''
          )}
        </S.SectionWrapper>
      </S.Container>
    </S.Wrapper>
  );
}
