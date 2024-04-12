'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '@/services/api';
import * as S from './page.styled';
import { ThemeProvider } from 'styled-components';
import MainCarousel from '@/components/MainCarousel/MainCarousel';
import { MainPoster } from '@/components/MainPoster/MainPoster';
import theme from '@/components/MainPoster/theme';
import MoovDa from '@/assets/moovdaLogo.svg';

export default function MainPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get('/movies/main')
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const posters = data.map((poster, index) => (
    <ThemeProvider theme={theme.mainPage} key={index}>
      <MainPoster data={poster} isWatched={false} isToWatch={false} />
    </ThemeProvider>
  ));
  return (
    <S.Container>
      <S.Left>
        <S.TextContainer>
          <S.SmallText>
            <S.TextBox>아직도 해리포터가 인생영화인가요?</S.TextBox>
            <S.TextBox>새로운 인생 영화를 찾고 계신가요?</S.TextBox>
            <S.TextBox>
              많은 사람들과 공유하고픈 영화 이야기가 있나요?
            </S.TextBox>
          </S.SmallText>
          <S.MidText>
            세상의 영화가 다 있는 <span>뭅다</span>에서 <span>묻다</span>
          </S.MidText>
          <S.LargeText>
            <div>
              <MoovDa /> 에서 새로운
            </div>
            <div>영화 세상을 경험하세요</div>
          </S.LargeText>
        </S.TextContainer>
      </S.Left>
      <S.Right>
        <S.Poster>
          <MainCarousel props={posters} />
        </S.Poster>
      </S.Right>
    </S.Container>
  );
}
