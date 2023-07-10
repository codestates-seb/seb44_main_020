'use client'
import styled from 'styled-components';

interface MovieListProps {
    hasContent?: boolean;
  }
  
export const Wrapper=styled.div`
margin:20px 90px;`;

export const PageTitle=styled.div`
font-size: 15px;
color:#ffffff;
`;
export const Container=styled.div`
margin: 30px 0;
background-color:#0F204E;
border-radius:20px;
display:flex;
flex-direction:column;`;

export const Nickname=styled.div`
font-size:xx-large;
padding: 50px 80px;
color: #ffffff;
font-weight: bolder;
letter-spacing: 1.5px;
`;

export const SectionWrapper=styled.div`
width:90%;
display:flex;
flex-direction:column;
justify-content:center;
margin: 0 auto;`;

export const Section=styled.div`
margin-bottom:30px ;
`;

export const SectionTitle=styled.div`
border-bottom:1px solid #5E7AEA;
padding-bottom:10px;
display: flex;
gap: 90%;
`;

export const ShowDelete=styled.div`
cursor: pointer;
font-size:14px;
color:#D2D2D2;
font-weight: 400;
`;

export const Title=styled.div`
color:#5E7AEA;
font-weight: bold;
font-size:16px;
`;

export const SectionContent=styled.div`
margin-top:40px;
display:flex;
align-items:center;
position: relative;`;

export const DeleteContainter=styled.div`
display:flex;
gap: 87%;
align-items: center;
margin-top:40px;
`;

export const Text=styled.div`
color:#E0E0E0;
font-size:16px;`;

export const DeleteBtn=styled.button`
padding: 10px;
border-radius: 5px;
background-color: #283A6D;
border: 2px solid #5E7AEA;
color: #ffffff;
font-size:16px;
cursor: pointer;
&:hover{
    background-color:#5C2435 ;
    border: 2px solid #A84966; 
}
`;

export const MovieList=styled.div<MovieListProps>`
min-height: ${(props) => (props.hasContent ? 'auto' : '200px')};
display:flex;
gap: 30px;
overflow-x:scroll;
white-space:nowrap;
`;

