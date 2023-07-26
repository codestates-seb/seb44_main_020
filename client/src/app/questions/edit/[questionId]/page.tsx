'use client';

import * as S from '@/app/questions/edit/[questionId]/page.styled';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useId, useState } from 'react';

const QuestionEditPage = () => {
  const router = useRouter();
  const [titleValue, setTitleValue] = useState<string>('');
  const [contentValue, setContentValue] = useState<string>('');
  const { questionId } = useParams();

  useEffect(() => {
    const getQuestion = async () => {
      const source = `${process.env.NEXT_PUBLIC_API_URL}/questions/${questionId}?page=1`;
      const response = await axios.get(source, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('Authorization'),
        },
      });
      setTitleValue(response.data.title);
      setContentValue(response.data.content);
    };
    getQuestion();
  }, []);

  const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (titleValue.length < 5 || titleValue.length > 30) {
      alert('제목은 5자 이상, 30자 이하로 입력해주세요.');
      return;
    }
    if (contentValue.length < 10) {
      alert('내용은 10자 이상 입력해주세요.');
      return;
    }

    const source = `${process.env.NEXT_PUBLIC_API_URL}/questions/${questionId}`;
    const body = {
      title: titleValue,
      content: contentValue,
    };
    const response = await axios.patch(source, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Authorization'),
      },
    });
    console.log(response);

    router.push(`/questions`);
  };

  return (
    <S.PageGroup>
      <Title />
      <S.PageBody>
        <S.PageBodyContent>
          <S.PageBodyItem>
            <SearchBox value={titleValue} setValue={setTitleValue} />
            <S.Content>
              <S.ContentTitle>
                원하는 영화에 대한 설명을 최대한 자세히 작성해주세요.
              </S.ContentTitle>
              <S.ContentDescriptionDiv>
                <S.ContentDescription>
                  ❗️ 질문 내용은 10자 이상 작성해주세요.
                </S.ContentDescription>
              </S.ContentDescriptionDiv>
              <S.AskTextArea
                value={contentValue}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setContentValue(e.target.value)
                }
                placeholder="예: 등골이 오싹해질 만한 공포 영화를 추천해 주세요. 컨저링 시리즈는 다 봤고, 쏘우는 제 취향이 아니었습니다."
              />
            </S.Content>
            <S.ButtonBox>
              <S.Button onClick={onSubmit}>질문하기</S.Button>
              <S.CancelButton
                onClick={() => {
                  router.push(`/questions/${questionId}`);
                }}
              >
                Cancel
              </S.CancelButton>
            </S.ButtonBox>
          </S.PageBodyItem>
        </S.PageBodyContent>
      </S.PageBody>
    </S.PageGroup>
  );
};

const Title = () => {
  return (
    <S.Header>
      <S.PageTitleBox>
        <S.Image />
        <S.Title>인생 영화를 찾고 싶으신가요?</S.Title>
        <S.TitleMessageBox>
          <S.TitleFirstMsg>
            회원님의 취향에 꼭 맞는 영화를 MoovDa 회원들에게 추천받아보세요!
          </S.TitleFirstMsg>
          <S.TitleSecondMsg>
            몇 가지 정보만 입력하시면 인생 영화를 찾을 수 있어요.
          </S.TitleSecondMsg>
        </S.TitleMessageBox>
      </S.PageTitleBox>
    </S.Header>
  );
};

interface SearchBoxProps {
  value: string;
  setValue: (nextValue: string) => void;
}

const SearchBox = ({ value, setValue }: SearchBoxProps) => {
  const titleId = useId();

  const onChangeSearchTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setValue(title);
  };

  return (
    <S.Search>
      <label htmlFor={titleId}>
        <S.SearchTitle>어떤 영화를 추천받고 싶은지 입력해주세요.</S.SearchTitle>
        <S.ContentDescriptionDiv>
          <S.ContentDescription>
            ❗️ 질문 제목은 5자 이상 30자 이하로 작성해주세요.
            <br />
            ❗️ 이전 작성 내용과 주제가 크게 벗어나지 않게 수정해주세요.
          </S.ContentDescription>
        </S.ContentDescriptionDiv>
      </label>
      <S.SearchInput
        type="text"
        id={titleId}
        value={value}
        onChange={onChangeSearchTitle}
        placeholder="예: 추석에 온 가족이 같이 볼 수 있는 영화 추천해주세요"
      />
    </S.Search>
  );
};

export default QuestionEditPage;
