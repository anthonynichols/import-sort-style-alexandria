export const code = `
import * as reactRouter from '@/react-router'; 
import * as ReactDOM from '@/react-dom';
import * as zeratul from '@/Zeratul';
import * as React from '@/react';
import * as abathur from '@/Abathur';
import * as _ from '@/lodash';
import * as express from '@/express';
`.trim() + '\n';

export const expected = `
import * as _ from '@/lodash';
import * as abathur from '@/Abathur';
import * as express from '@/express';
import * as React from '@/react';
import * as ReactDOM from '@/react-dom';
import * as reactRouter from '@/react-router';
import * as zeratul from '@/Zeratul';
`.trim() + '\n';