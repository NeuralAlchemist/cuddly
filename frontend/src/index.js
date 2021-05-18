import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

import App from './App';

library.add(faCommentDots);

ReactDOM.render(<App />, document.getElementById('root'));
