'use client';

import Starfull from '@/static/fullStar.svg'
import Starhalf from '@/static/halfStar.svg'
import Starempty from '@/static/emptyStar.svg'
import Image from 'next/image';
import * as S from './StarrateShow.styled';

interface proptype {
  rate: number;
}

export function StarrateShow({ rate }: proptype) {
  const starRatings = [1, 2, 3, 4, 5];
  return (
    <S.Container>
      {starRatings.map((starRating) => {
        if (rate >= starRating) {
          return <Image src={Starfull} alt="fullStar" key={starRating} />;
        } else if (rate === starRating - 0.5) {
          return <Image src={Starhalf} alt="halfStar" key={starRating} />;
        } else {
          return <Image src={Starempty} alt="emptyStar" key={starRating} />;
        }
      })}
    </S.Container>
  );
}
