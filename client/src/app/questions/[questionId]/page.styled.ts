'use client';

import styled from 'styled-components';

export const PageGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const goMenuBtnBox = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: row;
  width: 1024px;
`;

export const goMenuBtn = styled.button`
  margin-top: 10px;

  padding: 12px 24px;
  border-radius: 8px;
  width: 250px;
  background-color: #111321;
  &:hover {
    background-color: rgba(108, 99, 255, 0.3);
  }
  cursor: pointer;
  color: white;
`;

export const AnswerCountContainer = styled.div`
  display: flex;
  width: 1024px;
`;

export const AnswerCountBox = styled.div`
  display: flex;
  font-weight: 600;
  font-size: large;
`;

export const AskBox = styled.div`
  width: 1024px;
  background-color: #162135;
  padding: 1rem;
  margin: 0.75rem 1rem;
  border: 0.5px solid #8a97ab;
  border-radius: 12px;
`;

export const BoxTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

export const LeftBox = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 8px;
`;

export const Nickname = styled.p`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: white;
  font-size: 0.75rem;
`;

export const Time = styled.p`
  color: #8a97ab;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
`;

export const RightBox = styled.div`
  display: flex;
  gap: 8px;
  margin: 0px 8px 8px 0px;
`;

export const EditBtn = styled.button`
  width: 28px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0);
  border-color: rgba(255, 255, 255, 0);
  color: white;
  font-size: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DeleteBtn = styled.button`
  width: 28px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0);
  border-color: rgba(255, 255, 255, 0);
  color: white;
  font-size: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BoxTitle = styled.h3`
  font-weight: bold;
  margin: 0px 0px 12px 8px;
`;

export const BoxMid = styled.div`
  border-top: 0.1px solid #8a97ab;
`;

export const ContentBox = styled.div`
  margin: 16px 8px 0px 8px;
`;

export const PageBottom = styled.div`
  padding: 0.5rem;
  margin: 0.75rem 1rem;
  width: 1024px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  padding: 1rem;
`;

export const MovieSelector = styled.div``;

export const MoviePickButton = styled.button`
  width: 100%;
  height: 50px;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: medium;
  cursor: pointer;
`;

export const AnswerCreateBox = styled.div`
  height: 310px;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
`;

export const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  width: 100px;
  background-color: #111321;
  &:hover {
    background-color: rgba(108, 99, 255, 0.3);
  }
  cursor: pointer;
  color: white;
`;
