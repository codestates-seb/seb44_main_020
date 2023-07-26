'use client';

import Modal, { SearchMovieList } from '@/components/Question/Modal';
import * as S from '@/components/Question/SearchBox.styled';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface ModalTriggerProps {
  onSuccess: (movie: SearchMovieList) => void;
}

const ModalTrigger = ({ onSuccess }: ModalTriggerProps) => {
  const searchParams = useSearchParams()!;
  const pathname = usePathname();
  const showModal = searchParams?.get('modal');
  const router = useRouter();

  const onSelectMovie = (movie: SearchMovieList) => {
    onSuccess(movie);
    router.replace(`${pathname}`);
  };

  return (
    <>
      <Link href={`${pathname}/?modal=true`} replace>
        <S.MoviePickButton>+ 추천할 영화 고르기</S.MoviePickButton>
      </Link>
      {showModal && <Modal onSelectItem={onSelectMovie} />}
    </>
  );
};

interface SearchBoxProps {
  onSubmit: ({
    selectedMovie,
    textValue,
  }: {
    selectedMovie: SearchMovieList;
    textValue: string;
  }) => void;
  defaultValue?: {
    content: string;
  } & SearchMovieList;
}

const SearchBox = ({ onSubmit, defaultValue }: SearchBoxProps) => {
  const router = useRouter();
  const [selectedMovie, setSelectedMovie] = useState<SearchMovieList | null>(
    defaultValue ? defaultValue : null,
  );
  const [textValue, setTextValue] = useState<string>(
    defaultValue?.content ?? '',
  );

  const onSelectMovie = (movie: SearchMovieList) => {
    setSelectedMovie(movie);
  };

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textValue = e.target.value;
    setTextValue(textValue);
  };

  const onClickSubmitButton = () => {
    if (!selectedMovie) {
      return alert('영화를 선택해주세요!');
    }
    onSubmit({ selectedMovie, textValue });
    setSelectedMovie(null);
    setTextValue('');
  };

  const resetSelectedMovie = () => {
    setSelectedMovie(null);
  };

  return (
    <S.SearchBoxGroup>
      <S.SearchBox>
        {selectedMovie ? (
          <div>
            <Link href={`movie/${selectedMovie.movieId}`}>
              <S.SelectedMovieContainer>
                <div>
                  <img
                    src={selectedMovie.poster}
                    alt="movieposter"
                    width={'56px'}
                    height={'64px'}
                  />
                </div>
                <div>
                  <S.SelectedMovieTitle>
                    {selectedMovie.title}
                  </S.SelectedMovieTitle>
                </div>
                <div>
                  <S.SelectedMovieProdYear>
                    {selectedMovie.prodYear}
                  </S.SelectedMovieProdYear>
                </div>
              </S.SelectedMovieContainer>
            </Link>
            <S.ChangeMovieButton onClick={resetSelectedMovie}>
              영화 다시 선택하기
            </S.ChangeMovieButton>
          </div>
        ) : (
          <S.MovieSelector>
            <ModalTrigger onSuccess={onSelectMovie} />
          </S.MovieSelector>
        )}
        <S.AnswerCreateBox>
          <S.Textarea onChange={onChangeTextArea} value={textValue} />
        </S.AnswerCreateBox>
        <S.ButtonBox>
          <S.Button onClick={onClickSubmitButton}>추천하기</S.Button>
        </S.ButtonBox>
      </S.SearchBox>
    </S.SearchBoxGroup>
  );
};

export default SearchBox;
