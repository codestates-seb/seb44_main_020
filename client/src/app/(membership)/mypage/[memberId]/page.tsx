'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setLoginState } from '@/redux/features/loginSlice';
import { click } from '@/redux/features/deleteSlice';
import { MainPoster } from '@/components/MainPoster/MainPoster';
import MyCarousel from '@/components/MyCarousel/MyCarousel';
import * as S from './page.styled';
import { ThemeProvider } from 'styled-components';
import theme from '@/components/MainPoster/theme';
import { fetchData, deleteData } from '@/services/api';

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
  const dispatch = useDispatch();
  const { memberId } = useParams();
  const memberIdtoNumber = Number(memberId);
  const userId = useSelector((state: RootState) => state.auth.memberId);

  const [data, setData] = useState<My | null>(null);

  // 나머지 코드는 이전과 동일합니다.

  useEffect(() => {
    fetchDataHandler();
  }, []);

  //마이페이지 정보 조회
  const fetchDataHandler = useCallback(async () => {
    try {
      const result = await fetchData(`/members/${memberId}`);
      setData(result);
    } catch (error: any) {
      console.log(error.message);
    }
  }, [memberId]);

  // 회원삭제
  const handleDelete = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        await deleteData(`/members/${memberId}`);
        handleLogout();
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  //로그아웃
  const handleLogout = () => {
    dispatch(setLoginState(false));
    localStorage.clear();
    signOut();
    alert('회원 정보가 삭제되었습니다.');
    router.push('/');
  };

  //삭제 버튼 노출
  const handleShowDelete = () => {
    dispatch(click());
  };

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
      <S.Container>
        <S.Nickname>{data?.nickname} 님의 리스트</S.Nickname>
        <S.SectionWrapper>
          <S.Section>
            <S.SectionTitle>
              <S.Title>볼 영화</S.Title>
              {userId === memberIdtoNumber ? (
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

          {/*로그인한 본인일 때만 회원 삭제 섹션 노출 */}
          {userId === memberIdtoNumber && (
            <S.Section>
              <S.SectionTitle>
                <S.Title>계정 관리</S.Title>
              </S.SectionTitle>
              <S.DeleteContainter>
                <S.Text>회원 삭제</S.Text>
                <S.DeleteBtn onClick={handleDelete}>삭제하기</S.DeleteBtn>
              </S.DeleteContainter>
            </S.Section>
          )}
        </S.SectionWrapper>
      </S.Container>
    </S.Wrapper>
  );
}
