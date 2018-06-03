export const code = `
import { render } from '~/react-dom';
import { computed, action } from '~/mobx';
import { Component } from '~/react';
import { map, merge, assign } from '~/lodash';
import { observer } from '~/mobx-react';
`.trim() + '\n';

export const expected = `
import { assign, map, merge } from '~/lodash';
import { action, computed } from '~/mobx';
import { observer } from '~/mobx-react';
import { Component } from '~/react';
import { render } from '~/react-dom';
`.trim() + '\n';

export const codeUnderscore = `
import { render } from '_/react-dom';
import { computed, action } from '_/mobx';
import { Component } from '_/react';
import { map, merge, assign } from '_/lodash';
import { observer } from '_/mobx-react';
`.trim() + '\n';

export const expectedUnderscore = `
import { assign, map, merge } from '_/lodash';
import { action, computed } from '_/mobx';
import { observer } from '_/mobx-react';
import { Component } from '_/react';
import { render } from '_/react-dom';
`.trim() + '\n';
