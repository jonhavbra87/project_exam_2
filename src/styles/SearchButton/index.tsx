import styled from 'styled-components';

export const SearchButton = styled.button`
  background: linear-gradient(60deg, #e26ee5, #f4c4f5, #e26ee5);
  color: #1f1f1f;
  padding: 12px 24px;
  font-weight: bold;
  border: none;
  border-radius: 0 5px 5px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease;

  &:hover {
    background: linear-gradient(-60deg, #f4c4f5, #e26ee5, #f4c4f5);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }
`;
