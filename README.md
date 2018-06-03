# import-sort-style-alexandria

Alexandria App style for [import-sort](https://github.com/renke/import-sort).

```js
// external modules
import * as _ from 'lodash';
import * as express from 'express';
import * as React from 'react';
import PropTypes from 'prop-types';
import { aaa, bbb, ccc } from 'aaa';
import { aaa, bbb, ccc } from 'bbb';

// local modules (either "~" or "_")
import * as Abathur from '~/Abathur';
import * as Nova from '~/nova';
import Dehaka from '~/Dehaka';
import Kerrigan from '~/kerrigan';
import { Morales } from '~/medic';
import { Zeratul } from '~/Zeratul';
// or 
import * as Abathur from '_/Abathur';
import * as Nova from '_/nova';
import Dehaka from '_/Dehaka';
import Kerrigan from '_/kerrigan';
import { Morales } from '_/medic';
import { Zeratul } from '_/Zeratul';

// relative modules
import * as Artanis from './Artanis';
import Tassadar from './tassadar';
import { Zagara } from './Zagara';
```
