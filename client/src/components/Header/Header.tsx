'use client';
import MoovDa from '@/assets/moovdaLogo.svg';
import {
  faMagnifyingGlass,
  faPen,
  faRightToBracket,
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import {
  StyledHeader,
  StyledIconAsk,
  StyledIconMyPage,
  StyledIconSearch,
  StyledLog,
  StyledLogo,
} from './Header.styled';
import { useSession, signIn, signOut } from 'next-auth/react';

const Header = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <StyledHeader>
      <StyledLogo>
        <MoovDa />
      </StyledLogo>
      <StyledIconSearch>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          style={{ color: 'white' }}
          size="xl"
          onClick={() => router.push('/search')}
        />
      </StyledIconSearch>
      <StyledIconAsk>
        <FontAwesomeIcon
          icon={faPen}
          style={{ color: 'white' }}
          size="xl"
          onClick={() => router.push('/questions')}
        />
      </StyledIconAsk>
      <StyledIconMyPage>
        <FontAwesomeIcon
          icon={faUser}
          style={{ color: 'white' }}
          size="xl"
          onClick={() => router.push('/mypage')}
        />
      </StyledIconMyPage>
      {session ? (
        <StyledLog onClick={() => signOut()}>
          LogOut
          <p>{session.user?.name}님 환영합니다.</p>
        </StyledLog>
      ) : (
        <StyledLog onClick={() => router.push('/login')}>LogIn</StyledLog>
      )}
    </StyledHeader>
  );
};

export default Header;
