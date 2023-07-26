'use client';

import * as S from '@/components/Question/Modal.styled';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

interface ModalProps {
  onSelectItem: (movie: SearchMovieList) => void;
}

const Modal = ({ onSelectItem }: ModalProps) => {
  const pathname = usePathname();

  const onSelectMovie = (movie: SearchMovieList) => {
    onSelectItem(movie);
  };

  return (
    <S.ModalWrapper>
      <S.ModalContent>
        <div>
          <Link href={pathname} replace>
            <S.SubmitButton>
              <S.ClosedIcon />
            </S.SubmitButton>
          </Link>
        </div>
        <S.SearchTipBanner>
          <SearchTipContainer />
        </S.SearchTipBanner>
        <S.SearchInputAndSearchedList>
          <SearchModal onSelect={onSelectMovie} />
        </S.SearchInputAndSearchedList>
      </S.ModalContent>
    </S.ModalWrapper>
  );
};

const SearchTipContainer = () => {
  return (
    <S.SearchTipWrapper>
      <div>
        <S.SearchDiscription>
          <S.SearchTip>
            💡 영화 제목, 감독, 배우 모두 검색 가능합니다.
          </S.SearchTip>
          <p>💡 전체 키워드를 입력하면 더 빠른 결과를 얻을 수 있습니다.</p>
          <S.SearchExample>
            예: 해리 포터 ❌ ➡️ 해리 포터와 아즈카반의 죄수 ⭕️
          </S.SearchExample>
        </S.SearchDiscription>
      </div>
    </S.SearchTipWrapper>
  );
};

export interface SearchMovieList {
  movieId: string;
  title: string;
  poster: string;
  prodYear: number | string;
  pageInfo: {
    currentPage: number;
    pageSize: number;
    total: number;
  };
}
export interface Movie {
  movies: SearchMovieList[];
}

interface SearchModalProps {
  onSelect: (movie: SearchMovieList) => void;
}

const SearchModal = ({ onSelect }: SearchModalProps) => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? 1;
  const [searchResult, setSearchResult] = useState<
    SearchMovieList[] | undefined
  >(undefined);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchKeyword) {
      const MovieSearchData = async () => {
        const source = `${process.env.NEXT_PUBLIC_API_URL}/movies/search?page=${currentPage}&keyword=${searchKeyword}`;
        const response = await axios.get(source, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('Authorization'),
          },
        });

        setSearchResult(response.data.movies);
        setTotalPages(response.data.pageInfo.total);
      };
      MovieSearchData();
    }
  };

  const onPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const onNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchKeyword = e.target.value;
    setSearchKeyword(searchKeyword);
  };

  const onSelectMovie = (movie: SearchMovieList) => {
    onSelect(movie);
  };

  return (
    <form onSubmit={onSubmit}>
      <S.SearchContainer>
        <S.SearchInput
          type="text"
          onChange={onChange}
          placeholder="추천하고 싶은 영화를 검색해 보세요!"
        ></S.SearchInput>
        <S.SearchButton type="submit">
          <S.SearchIcon>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: 'grey', fontSize: '18px' }}
            />
          </S.SearchIcon>
        </S.SearchButton>
      </S.SearchContainer>
      <SearchedMovieList
        searchResult={searchResult}
        onSelectMovie={onSelectMovie}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
      />
    </form>
  );
};

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}: PaginationProps) => {
  return (
    <div>
      {typeof currentPage === 'number' && typeof totalPages === 'number' && (
        <S.Fragment>
          <S.PaginationButton onClick={onPrevPage}>◀️</S.PaginationButton>
          <S.ShowPageContainer>
            {currentPage} / {totalPages}
          </S.ShowPageContainer>
          <S.PaginationButton onClick={onNextPage}>▶️</S.PaginationButton>
        </S.Fragment>
      )}
    </div>
  );
};

interface SearchedMovieListProps {
  searchResult: SearchMovieList[] | undefined;
  onSelectMovie: (movie: SearchMovieList) => void;
}

const SearchedMovieList = ({
  searchResult,
  onSelectMovie,
}: SearchedMovieListProps) => {
  const onClickMovie = (movie: SearchMovieList) => {
    onSelectMovie(movie);
  };

  return (
    <S.SearchedListBox>
      {searchResult?.map((movie) => (
        <S.SearchedMovieBox
          onClick={() => onClickMovie(movie)}
          key={movie.movieId}
        >
          <div>
            <img
              src={movie.poster}
              alt="movieposter"
              width={'56px'}
              height={'64px'}
            />
          </div>
          <div>
            <S.SearchedMovieTitle>{movie.title}</S.SearchedMovieTitle>
          </div>
          <div>
            <S.SearchedMovieProdYear>{movie.prodYear}</S.SearchedMovieProdYear>
          </div>
        </S.SearchedMovieBox>
      ))}
    </S.SearchedListBox>
  );
};

export default Modal;
