export const code = `
import { isDir, generateId } from '~/utilities';
import PropTypes from 'prop-types';
import * as lib from './local-lib';
import _ from 'lodash';
import { observer } from 'mobx-react';
import { Zeratul } from '~/Zeratul';
import * as ReactDOM from 'react-dom';
import styles from './style-lib.module.css';
import { IconButton } from '../../../ui';
import * as express from 'express';
import something from '../module-something';
import componentStyles from '../styles/component.module.css';
import 'totally-awesome';
import './styles.css';
import Something, { Another } from 'another-awesome';
import * as Abathur from '~/Abathur';
import { action, type Observable, computed } from 'mobx';
import { Icon, Dropdown, Checkbox, Button, Card } from '~/ui';
import * as Models from '~/models';
import { ccc, aaa, bbb } from 'bbb';
import type {Resolver} from 'some-lib';
import * as React from 'react';
import * as Services from '~/services';
import * as reactRouter from 'react-router';
import another from './another-local-lib';
import './locally-awesome';
import { bbb, aaa, ccc } from 'aaa';
`.trim() + '\n';

export const expected = `
import 'totally-awesome';

import './locally-awesome';

import { aaa, bbb, ccc } from 'aaa';
import Something, { Another } from 'another-awesome';
import { aaa, bbb, ccc } from 'bbb';
import * as express from 'express';
import _ from 'lodash';
import { action, computed, type Observable } from 'mobx';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as reactRouter from 'react-router';
import type {Resolver} from 'some-lib';

import * as Abathur from '~/Abathur';
import * as Models from '~/models';
import * as Services from '~/services';
import { Button, Card, Checkbox, Dropdown, Icon } from '~/ui';
import { generateId, isDir } from '~/utilities';
import { Zeratul } from '~/Zeratul';

import another from './another-local-lib';
import * as lib from './local-lib';
import something from '../module-something';
import { IconButton } from '../../../ui';

import styles from './style-lib.module.css';
import componentStyles from '../styles/component.module.css';
import './styles.css';
`.trim() + '\n';

export const codeUnderscore = `
import { isDir, generateId } from '_/utilities';
import PropTypes from 'prop-types';
import * as lib from './local-lib';
import _ from 'lodash';
import { observer } from 'mobx-react';
import { Zeratul } from '_/Zeratul';
import * as ReactDOM from 'react-dom';
import styles from './style-lib.module.css';
import type {Resolver} from 'some-lib';
import { IconButton } from '../../../ui';
import * as express from 'express';
import something from '../module-something';
import componentStyles from '../styles/component.module.css';
import 'totally-awesome';
import './styles.css';
import Something, { Another } from 'another-awesome';
import * as Abathur from '_/Abathur';
import { action, type Observable, computed } from 'mobx';
import { Icon, Dropdown, Checkbox, Button, Card } from '_/ui';
import * as Models from '_/models';
import { ccc, aaa, bbb } from 'bbb';
import * as React from 'react';
import * as Services from '_/services';
import * as reactRouter from 'react-router';
import another from './another-local-lib';
import './locally-awesome';
import { bbb, aaa, ccc } from 'aaa';
`.trim() + '\n';

export const expectedUnderscore = `
import 'totally-awesome';

import './locally-awesome';

import { aaa, bbb, ccc } from 'aaa';
import Something, { Another } from 'another-awesome';
import { aaa, bbb, ccc } from 'bbb';
import * as express from 'express';
import _ from 'lodash';
import { action, computed, type Observable } from 'mobx';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as reactRouter from 'react-router';
import type {Resolver} from 'some-lib';

import * as Abathur from '_/Abathur';
import * as Models from '_/models';
import * as Services from '_/services';
import { Button, Card, Checkbox, Dropdown, Icon } from '_/ui';
import { generateId, isDir } from '_/utilities';
import { Zeratul } from '_/Zeratul';

import another from './another-local-lib';
import * as lib from './local-lib';
import something from '../module-something';
import { IconButton } from '../../../ui';

import styles from './style-lib.module.css';
import componentStyles from '../styles/component.module.css';
import './styles.css';
`.trim() + '\n';
