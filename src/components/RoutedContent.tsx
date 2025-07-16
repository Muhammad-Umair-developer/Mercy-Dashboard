import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface RoutedContentProps {
  children: React.ReactNode;
}

// This component helps manage side effects when routes change
const RoutedContent: React.FC<RoutedContentProps> = ({ children }) => {
  const location = useLocation();
  
  // Run this effect whenever the route changes
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Force any blur events to complete to avoid stuck focus states
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    
    // You can add other route change cleanup here
    
  }, [location.pathname]);
  
  return <>{children}</>;
};

export default RoutedContent;
