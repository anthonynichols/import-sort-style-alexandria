export const code = `
import { render } from '@/react-dom';
import { action, computed } from '@/mobx';
import { zeratul } from '@/Zeratul';
import { Component } from '@/react';
import { map, merge, assign } from '@/lodash';
import { observer } from '@/mobx-react';
import { abathur } from '@/Abathur';
`.trim() + '\n';

export const expected = `
import { abathur } from '@/Abathur';
import { assign, map, merge } from '@/lodash';
import { action, computed } from '@/mobx';
import { observer } from '@/mobx-react';
import { Component } from '@/react';
import { render } from '@/react-dom';
import { zeratul } from '@/Zeratul';
`.trim() + '\n';
