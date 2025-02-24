import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const prixClipFix = keyframes`
  0% { clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0); }
  25% { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0); }
  50% { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%); }
  75% { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%); }
  100% { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0); }
`;


export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); 
  z-index: 9999;
`;


export const StyledLoader = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  position: relative;
  animation: ${rotate} 1s linear infinite;

  &::before,
  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 5px solid #220840;
    animation: ${prixClipFix} 2s linear infinite;
  }

  &::after {
    border-color: #7e30e1;
    animation:
      ${prixClipFix} 2s linear infinite,
      ${rotate} 0.5s linear infinite reverse;
    inset: 6px;
  }


  @media (max-width: 768px) {
    width: 64px;
    height: 64px;
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

export default StyledLoader;
