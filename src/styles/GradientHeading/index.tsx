/**
 * @fileoverview Styled gradient heading component with responsive sizing
 * @module components/typography/GradientHeading
 */
import styled from 'styled-components';

/**
 * A styled h1 component featuring a gradient text effect and responsive sizing
 *
 * This heading component uses a dark gradient effect with text-background-clip
 * to create a visually striking header. The component is fully responsive with
 * font sizes that scale based on viewport width.
 *
 * @component
 * @example
 * import GradientHeading from './typography/GradientHeading';
 *
 * const PageHeader = () => {
 *   return (
 *     <header>
 *       <GradientHeading>Welcome to Our Platform</GradientHeading>
 *     </header>
 *   );
 * };
 */
const GradientHeading = styled.h1`
  font-size: 2.5rem; /* Base font size for mobile */
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  margin-top: 1rem;
  background: linear-gradient(45deg, #1f1f1f, #49108b);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  border-bottom: 1px solid #1f1f1f;
  margin-bottom: 24px;
  letter-spacing: 0.05em;
  transition:
    color 0.4s ease-in-out,
    transform 0.2s ease-in-out;

  /* Responsive font sizes */
  @media (min-width: 640px) {
    font-size: 3rem; /* Medium devices (e.g., tablets) */
  }

  @media (min-width: 1024px) {
    font-size: 4rem; /* Large devices (e.g., desktops) */
  }
`;

export default GradientHeading;
