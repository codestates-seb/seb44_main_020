'use client';
import styled from 'styled-components';

export const StyledSection = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 400px;
  padding: 34px 28px 32px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 7px 0px;
  border: 3px solid rgb(204, 211, 224);
  background-color: #466093;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledLogo = styled.div`
  flex: 0.4;
  display: flex;
`;

export const StyledMessage = styled.div`
  flex: 0.4;
  display: flex;
  font-size: 25px;
  color: #ffffff;
`;

export const StyledLoginBtn = styled.button`
  width: 220px;
  height: 35px;
  border-radius: 10px;
  background-color: #ffffff;
  cursor: pointer;
  border: 0;
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const StyledButtonText = styled.div`
  font-size: 14px;
`;
export const StyledSignupBtn = styled.button`
  display: flex;
  font-size: 12px;
  background-color: #466093;
  color: #ffffff;
  border: 0;
  cursor: pointer;
  margin-left: 8px;
`;
