export const code = `
import * as _ from 'lodash';
import * as reactRouter from 'react-router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as express from 'express';
`.trim() + '\n';

export const expected = `
import * as express from 'express';
import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as reactRouter from 'react-router';
`.trim() + '\n';
