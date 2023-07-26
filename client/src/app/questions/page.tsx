'use client';

import * as S from '@/app/questions/page.styled';
import { QuestionBox } from '@/components/Question/QuestionBox';
import axios from 'axios';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export interface QuestionItem {
  questionId: string;
  title: string;
  content: string;
  nickname: string;
  createdAt: string;
  answerCount: number;
  views: number;
}
export interface QuestionListResponse {
  data: QuestionItem[];
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

const QuestionListPage = () => {
  const searchParams = useSearchParams();

  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageInfo, setPageInfo] = useState<QuestionListResponse['pageInfo']>({
    page: 1,
    size: 10,
    totalElements: 100,
    totalPages: 10,
  });

  const page = searchParams.get('page') ?? 1;

  useEffect(() => {
    const getQuestionList = async () => {
      setLoading(true);

      const source = `${process.env.NEXT_PUBLIC_API_URL}/questions?page=${page}`;
      const response = await axios.get(source, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setQuestions(response.data.data);
    };
    getQuestionList();
    setLoading(false);
  }, [page]);

  return (
    <S.TalkPage>
      <S.TalkPageBox>
        <S.Header>
          <S.Title>MoovTalk</S.Title>
          <S.ButtonBox>
            <Link href={'/questions/create'}>
              <S.Button>추천 받기</S.Button>
            </Link>
          </S.ButtonBox>
        </S.Header>
        <S.QuestionBox>
          <QuestionBoxes loading={loading} questions={questions} />
        </S.QuestionBox>
        {!loading ? (
          <Pagination
            totalElements={pageInfo?.totalElements}
            size={pageInfo.size}
          />
        ) : null}
      </S.TalkPageBox>
    </S.TalkPage>
  );
};

interface QuestionBoxesProps {
  questions: QuestionItem[];
  loading: boolean;
}

const QuestionBoxes = ({ loading, questions }: QuestionBoxesProps) => {
  if (loading) return <div>영화 추천 목록을 불러오는 중입니다...</div>;

  return (
    <ul>
      {questions.map((question) => (
        <QuestionBox key={question.questionId} question={question} />
      ))}
    </ul>
  );
};

interface PaginationProps {
  totalElements: number;
  size: number;
}

const Pagination = ({ totalElements, size }: PaginationProps) => {
  const searchParams = useSearchParams()!;
  const router = useRouter();
  const pathname = usePathname();
  const page = searchParams.get('page') ?? 1;

  const onPaginate = useCallback(
    (value: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', value.toString());

      return params.toString();
    },
    [searchParams],
  );

  const pageNumbers = Array.from(
    { length: Math.ceil(totalElements / size) },
    (_, i) => i + 1,
  );

  return (
    <>
      <S.PaginationBtnContainer>
        {pageNumbers.map((pageNumber) => (
          <S.PaginationBtnBox key={pageNumber}>
            <S.PaginationBtn
              onClick={() => {
                router.push(pathname + '?' + onPaginate(pageNumber));
              }}
              className={page === pageNumber.toString() ? 'active' : ''}
            >
              {pageNumber}
            </S.PaginationBtn>
          </S.PaginationBtnBox>
        ))}
      </S.PaginationBtnContainer>
    </>
  );
};

export default QuestionListPage;
