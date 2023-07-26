'use client';

import styled from 'styled-components';

export const SearchBoxGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchBox = styled.div`
  margin: 1.5rem 1rem;
  width: 1024px;
  background-color: #334163;

  border-radius: 16px;
  padding: 1rem;
`;

export const SelectedMovieContainer = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.5);
  height: 64px;
  width: 32%;
`;

export const SelectedMovieTitle = styled.p`
  padding-top: 1rem;
  padding-left: 0.75rem;
  font-weight: 700;
  font-size: small;
`;

export const SelectedMovieProdYear = styled.p`
  padding-top: 0.25rem;
  padding-left: 0.75rem;
  font-weight: bold;
`;

export const ChangeMovieButton = styled.button`
  border-radius: 4px;
  width: 100%;
  background-color: #111321;
  &:hover {
    background-color: #111321;
    cursor: pointer;
    color: white;
  }
  display: flex;
  background-color: #c2c2c2;
  height: 48px;
  cursor: pointer;
  color: black;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: large;
  margin: 0.25rem 0 0.5rem 0;
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
  height: 152px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 142px;
  resize: none;
  padding: 1rem;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
`;

export const Button = styled.button`
  padding: 12px 24px;
  border-radius: 4px;
  width: 100px;
  background-color: #111321;
  &:hover {
    background-color: rgba(108, 99, 255, 0.3);
  }
  cursor: pointer;
  color: white;
`;
