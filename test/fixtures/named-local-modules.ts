export const code = `
import { render } from '~/react-dom';
import { action, computed } from '~/mobx';
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