'use client';

import styled from 'styled-components';
import HeaderLogo from '@/assets/like.svg';
import CloseIcon from '@/assets/close.svg';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
  background-color: rgba(256, 256, 256, 0.9);
  padding: 0.5rem;
  color: black;
  border: 0;
  box-shadow: 0 10px 10px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-radius: 8px;
`;

export const SubmitButton = styled.button`
  background-color: transparent;
  border: transparent;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  color: black;
  cursor: pointer;
`;

export const ClosedIcon = styled(CloseIcon)`
  fill: black;
  width: 20px;
  height: 16px;
`;

export const SearchTipWrapper = styled.div`
  width: 384px;
  height: 100%;
  padding-left: 1rem;
`;

export const SearchDiscription = styled.div`
  font-size: 11px;
  color: grey;
  margin-bottom: 1rem;
`;

export const SearchTip = styled.div`
  margin-bottom: 0.5rem;
`;

export const SearchExample = styled.div`
  margin-top: 0.125rem;
  margin-left: 1.125rem;
`;

export const SearchTipBanner = styled.div``;

export const SearchInputAndSearchedList = styled.div`
  width: 100%;
`;

export const SearchedListBox = styled.div`
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 384px;
  height: 350px;
  overflow: auto;
  flex-shrink: 0;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

export const SearchedMovieBox = styled.div`
  &:hover {
    background-color: #c2c2c2;
    cursor: pointer;
  }
  display: flex;
  background-color: white;
  height: 64px;
`;

export const SearchedMovieTitle = styled.p`
  padding-top: 1rem;
  padding-left: 0.75rem;
  font-weight: 700;
  font-size: small;
`;

export const SearchedMovieProdYear = styled.p`
  padding-top: 0.25rem;
  padding-left: 0.75rem;
  font-weight: bold;
`;

export const SearchContainer = styled.div`
  display: flex;
  padding: 0rem 1rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  position: relative;
`;

export const SearchInput = styled.input`
  padding: 0.5rem 1.25rem 0.5rem 2.75rem;
  border-radius: 1rem;
  display: flex;
  flex: 1;
  width: 100%;
`;

export const SearchButton = styled.button`
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid rgba(255, 255, 255, 0);
  position: absolute;
  padding-left: 0.5rem;
`;

export const Fragment = styled.div`
  display: flex;
  justify-content: center;
`;

export const ShowPageContainer = styled.div`
  color: black;
  padding: 0.25rem 0.5rem 0.5rem 0.5rem;
  font-weight: 500;
  font-size: small;
`;

export const SearchIcon = styled.div`
  cursor: pointer;
  padding: 0.5rem 0rem 0.5rem 0.5rem;
`;

export const PaginationButton = styled.button`
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid rgba(255, 255, 255, 0);
  padding: 0 0.75rem;
  color: black;
`;
