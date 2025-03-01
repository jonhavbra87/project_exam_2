import { useState, useEffect } from 'react';
import { StyledLoader, LoaderContainer } from '../../styles/StyledLoader';

/**
 * A loading spinner component that provides a smooth transition when showing/hiding
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isLoading - Controls whether the spinner should be displayed
 * @returns {JSX.Element|null} - Returns the loader component when visible, null when hidden
 *
 * @example
 * // Basic usage with a loading state
 * const [loading, setLoading] = useState(true);
 *
 * // In your component:
 * <LoadingSpinner isLoading={loading} />
 *
 * @example
 * // Usage with API call
 * const [loading, setLoading] = useState(false);
 *
 * const fetchData = async () => {
 *   setLoading(true);
 *   try {
 *     await api.getData();
 *   } finally {
 *     setLoading(false);
 *   }
 * };
 *
 * // Then in your JSX:
 * <LoadingSpinner isLoading={loading} />
 */

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
