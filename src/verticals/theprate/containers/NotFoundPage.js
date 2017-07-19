import React from 'react';
import ErrorPage from '../../../core/components/ErrorPage';

export default function NotFoundPage() {
  return <ErrorPage statusCode={404} />;
}
