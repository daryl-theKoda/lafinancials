import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface PublicFormAccessProps {
  children: React.ReactNode;
}

const PublicFormAccess: React.FC<PublicFormAccessProps> = ({ children }) => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Allow access to forms for both authenticated and non-authenticated users
  return <>{children}</>;
};

export default PublicFormAccess;
