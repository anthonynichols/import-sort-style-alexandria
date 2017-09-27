export const code = `
import { isDir, generateId } from '~/utilities';
import PropTypes from 'prop-types';
import * as lib from './local-lib';
import * as _ from 'lodash';
import { observer } from 'mobx-react';
import { Zeratul } from '@/Zeratul';
import * as ReactDOM from 'react-dom';
import { IconButton } from '../../../ui';
import * as express from 'express';
import 'totally-awesome';
import * as Abathur from '@/Abathur';
import { action, computed } from 'mobx';
import { Icon, Dropdown, Checkbox, Button, Card } from '~/ui';
import * as Models from '~/models';
import { ccc, aaa, bbb } from 'bbb';
import * as React from 'react';
import * as Services from '~/services';
import * as reactRouter from 'react-router';
import './locally-awesome';
import { bbb, aaa, ccc } from 'aaa';
`.trim() + '\n';

export const expected = `
import 'totally-awesome';

import './locally-awesome';

import * as _ from 'lodash';
import * as express from 'express';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as reactRouter from 'react-router';
import PropTypes from 'prop-types';
import { aaa, bbb, ccc } from 'aaa';
import { aaa, bbb, ccc } from 'bbb';
import { action, computed } from 'mobx';
import { observer } from 'mobx-react';

import * as Abathur from '@/Abathur';
import { Zeratul } from '@/Zeratul';

import * as Models from '~/models';
import * as Services from '~/services';
import { Button, Card, Checkbox, Dropdown, Icon } from '~/ui';
import { generateId, isDir } from '~/utilities';

import * as lib from './local-lib';
import { IconButton } from '../../../ui';
`.trim() + '\n';
