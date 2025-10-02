import React, { useState, useEffect } from 'react';
import ContentDisplay from './ContentDisplay';
import { getPageContent } from '../utils/api';

const PageTemplate = ({ pageName }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPageContent(pageName);
        setContent(data);
      } catch (err) {
        setError('Failed to load content. Please try again later.');
        console.error('Error fetching content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [pageName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return <ContentDisplay content={content} />;
};

export default PageTemplate; 