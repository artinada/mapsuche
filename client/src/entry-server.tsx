import React from 'react';
import { renderToString } from 'react-dom/server';
import { Router } from 'wouter';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import App from './App';
import { getPageSeo } from '../../shared/seo';

Amplify.configure(outputs);

export function render(pathname: string) {
  const html = renderToString(<React.StrictMode><Router ssrPath={pathname}><App /></Router></React.StrictMode>);
  return { html, seo: getPageSeo(pathname) };
}
