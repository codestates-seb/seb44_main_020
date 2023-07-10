'use client';

import styled from 'styled-components';
//조정해야할 사이즈나 여백이 있을 때에는 다음과 형식으로 props를 전달하여 주세요.
//속성: ${(props)=>props.속성||'처음 적혀있던 기본값'};

export const Wrapper=styled.div`
>a{
  text-decoration: none;
}`
export const Container = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.theme.width};
  height: auto;
  gap: 5px;
  cursor: pointer;
  position: relative;
`;

export const PosterImg = styled.img`
  border-radius: 20px;
`;

export const Title = styled.div<{posterTitleGap?:string}>`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.posterTitleGap};
`;
export const TitleText = styled.div<{ titleFonSize?: string, maxWidth?:string }>`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: ${(props) => props.theme.maxWidth};
  color: #e2e2e2;
  font-size: ${(props) => props.theme.titleFontSize};
`;
export const Star = styled.div`
  display: flex;
  justify-content: center;
`;

export const Delete = styled.div`
position: absolute;
margin-left:150px;
margin-top:10px;
`;
