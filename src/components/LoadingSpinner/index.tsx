import { useState, useEffect } from 'react';
import { StyledLoader, LoaderContainer } from '../../styles/StyledLoader';

const LoadingSpinner = ({ isLoading }: { isLoading: boolean }) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 500); 

      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  if (!showLoader) return null;

  return (
    <LoaderContainer>
      <StyledLoader />
    </LoaderContainer>
  );
};

export default LoadingSpinner;
