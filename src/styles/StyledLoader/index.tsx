import styled, { keyframes } from 'styled-components';

// 🔄 Animations
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

// ✅ Loader container som sentrerer loaderen
export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.8); /* Semi-transparent bakgrunn */
  z-index: 9999;
`;

// 🔄 Loader
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

  // 📱 Responsiv styling
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }

  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
  }
`;

export default StyledLoader;
