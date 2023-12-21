export const code = `
import {faBoxCheck} from '@fortawesome/pro-light-svg-icons';
import {observable} from 'mobx';
import React from 'react';
import {observer} from 'mobx-react';

import {SignUp} from './SignUp';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
`.trim() + '\n';

export const expected = `
import {faBoxCheck} from '@fortawesome/pro-light-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';

import {SignUp} from './SignUp';
`.trim() + '\n';
