import 'mocha';

import * as parser from 'import-sort-parser-typescript';
import { applyChanges, sortImports } from 'import-sort';
import { assert } from 'chai';
import { IStyle, IStyleAPI, IStyleItem } from 'import-sort-style';

import ALEXANDRIA_STYLE from '../src'; 

describe('sortImports (typescript, ALEXANDRIA_STYLE)', () => {
  it('should sort the imports', () => {

const code = `
import { isDir, generateId } from '~/utilities';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { IconButton } from '../../../ui';
import { action, computed } from 'mobx';
import { Icon, Dropdown, Checkbox, Button, Card } from '~/ui';
import * as Models from '~/models';
import * as _ from 'lodash';
import * as React from 'react';
import * as Services from '~/services';
`.trim() + '\n';

const expected = `
import * as React from 'react';

import * as _ from 'lodash';
import PropTypes from 'prop-types';
import { action, computed } from 'mobx';
import { observer } from 'mobx-react';

import * as Models from '~/models';
import * as Services from '~/services';
import { generateId, isDir } from '~/utilities';
import { Button, Card, Checkbox, Dropdown, Icon } from '~/ui';

import { IconButton } from '../../../ui';
`.trim() + '\n';

    const result = sortImports(code, parser, ALEXANDRIA_STYLE);
    const actual = result.code;
    const changes = result.changes;

    assert.equal(expected, actual);
    assert.equal(applyChanges(code, changes), expected);
  })
})