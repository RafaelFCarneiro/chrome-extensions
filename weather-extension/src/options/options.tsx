import React from 'react';
import { createRoot } from 'react-dom/client';
import './options.css';

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);

const test = <img src='icon.png' />;
root.render(test);
