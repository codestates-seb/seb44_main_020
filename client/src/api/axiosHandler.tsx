//axios 호출 함수를 모아놓은 곳입니다.
import { useCallback } from 'react';
import axios from 'axios';

interface Props {
  url: string;
}

//삭제
export const handleDelete = useCallback(
  ({ url }: Props) => {
    if (window.confirm('삭제하시겠습니까?')){
      //삭제 확인 경고창
      axios
        .delete(
          url,
          //   {
          //     headers: ,          //authorization 헤더
          //   }
        )
        .then(() => {
          console.log('삭제 성공');
          alert('삭제가 완료되었습니다.');
        })
        .catch((error) => {
          console.log('Error:', error.message);
        });
  }},
  [],
);
