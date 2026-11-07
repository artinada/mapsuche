import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { Router } from 'wouter'
import { Amplify } from 'aws-amplify'
import outputs from '../../amplify_outputs.json'
import App from './App.tsx'
import './index.css'

Amplify.configure(outputs)

const root = document.getElementById('root')!
const application = (
  <React.StrictMode>
    <Router><App /></Router>
  </React.StrictMode>
)

if (root.hasChildNodes() && root.dataset.hydrate !== 'false') hydrateRoot(root, application)
else createRoot(root).render(application)
