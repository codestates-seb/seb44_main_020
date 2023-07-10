'use client'
import {click} from '@/redux/features/deleteSlice'
import { useDispatch, useSelector } from 'react-redux';
// import { useState, useEffect,useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { MainPoster } from '@/components/MainPoster/MainPoster';
import {data} from './dummydata'
import * as S from './page.styled';
import theme from '@/components/MainPoster/theme';
import { ThemeProvider } from 'styled-components';
import { useCallback } from 'react';
import { RootState } from '@/redux/store';

export default function MyPage() {
    //const navigate=useNavigate();
    // const [data, setData]=useState([]);
    const showDelete =useSelector((state: RootState)=> state.showDelete.value);
    const dispatch=useDispatch();
    const handleShowDelete=()=>{
      dispatch(click());
      console.log(showDelete)
    }

  // useEffect(()=>{
  //   axios.get('주소/members/${member_id}')
  //   .then((res)=>{
  //     setData(res.data);
  //   }).catch((error)=>{
  //     console.log(error.message);
  //   });
  // },[]);


//회원삭제
  // const handleDelete = useCallback(() => {
  //   if (window.confirm('삭제하시겠습니까?')) {
  //     axios
  //       .delete(
  //         `주소/members/${member_id}`,
  //         {
  //           headers: {
  //            //권한헤더
  //           },
  //         }
  //       )
  //       .then(() => {
  //       //로그아웃
  //       alert('회원 정보가 삭제되었습니다.');
  //       navigate('/');
  //       })
  //       .catch((error) => {
  //         console.log( error.message);
  //       });
  //   } 
  // }, [memberId]);

const toWatchlist =data.toWatch.map((list)=>(
    <ThemeProvider theme={theme.myPage}>
<MainPoster key={list.movie_id} data={list} isWatched={false} isToWatch={true}/> 
</ThemeProvider>
));

const watchedList=data.watched.map((list)=>(
    <ThemeProvider theme={theme.myPage}>
    <MainPoster key={list.movie_id} data={list} isWatched={true} isToWatch={false}/> 
    </ThemeProvider>
))

  return <S.Wrapper>
  <S.PageTitle>     {/*현재 로그인한 사용자와 my paged의 member_id가 같을 때 표시 */}
    my page
  </S.PageTitle>
  <S.Container>
    <S.Nickname>{data.nickname} 님의 리스트</S.Nickname>
    <S.SectionWrapper>
    <S.Section>
    <S.SectionTitle>
      <S.Title>볼 영화</S.Title>   
      <S.ShowDelete onClick={handleShowDelete}>삭제</S.ShowDelete></S.SectionTitle>  {/*현재 로그인한 사용자와 my paged의 member_id가 같을 때 표시 */}
    <S.SectionContent>
      <S.MovieList hasContent={toWatchlist.length > 0}>{toWatchlist}</S.MovieList>
    </S.SectionContent>
    </S.Section>
    <S.Section>
    <S.SectionTitle><S.Title>본 영화</S.Title> </S.SectionTitle>
    <S.SectionContent>
      <S.MovieList hasContent={toWatchlist.length > 0}>{watchedList}</S.MovieList>
    </S.SectionContent>
    </S.Section>
    <S.Section> {/*현재 로그인한 사용자와 my paged의 member_id가 같을 때 표시 */}
    <S.SectionTitle>계정 관리</S.SectionTitle>
    <S.DeleteContainter>
      <S.Text>회원 삭제</S.Text>
      <S.DeleteBtn>삭제하기</S.DeleteBtn>  {/*onClick시 handleDelete*/}
      </S.DeleteContainter>
    </S.Section>
    </S.SectionWrapper>
  </S.Container>
</S.Wrapper>;
}
