export const code = `
import * as _ from '_/lodash';
import * as reactRouter from '~/react-router';
import * as React from '_/react';
import * as ReactDOM from '~/react-dom';
import * as express from '_/express';
`.trim() + '\n';

export const expected = `
import * as express from '_/express';
import * as _ from '_/lodash';
import * as React from '_/react';
import * as ReactDOM from '~/react-dom';
import * as reactRouter from '~/react-router';
`.trim() + '\n';
