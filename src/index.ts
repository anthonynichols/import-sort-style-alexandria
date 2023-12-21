import {IStyleAPI, IStyleItem} from 'import-sort-style';

import {IImport} from 'import-sort-parser';

function isLocalModule(imported: IImport) {
  return (
    imported.moduleName.startsWith('~') ||
    imported.moduleName.startsWith('_')
  );
}

function isStylesheet(imported: IImport) {
  return (
    imported.moduleName.endsWith('css') ||
    imported.moduleName.endsWith('less') ||
    imported.moduleName.endsWith('sass') ||
    imported.moduleName.endsWith('scss') ||
    imported.moduleName.endsWith('styl')
  );
}

export default function(styleApi: IStyleAPI): IStyleItem[] {
  const {
    and,
    hasMember,
    hasNoMember,
    isAbsoluteModule,
    isRelativeModule,
    moduleName,
    name,
    not,
    unicode,
  } = styleApi;

  function customSort(a: string, b: string) {
    let _a = a.replace(/(\.*\/)+/, '\.\/');
    let _b = b.replace(/(\.*\/)+/, '\.\/');
    return unicode(_a.toLowerCase(), _b.toLowerCase());
  }

  return [
    // * ----------------------------------------------------------------------
    // * Import side effects
    // * ----------------------------------------------------------------------

    // * import 'module'
    {
      match: and(hasNoMember, isAbsoluteModule, not(isLocalModule), not(isStylesheet)),
      sort: moduleName(customSort),
    },

    {separator: true},

    // * import '~/local-module' or '_/local-module'
    {
      match: and(hasNoMember, isLocalModule, not(isStylesheet)),
      sort: moduleName(customSort),
    },

    {separator: true},

    // * import './relative-module'
    {
      match: and(hasNoMember, isRelativeModule, not(isStylesheet)),
      sort: moduleName(customSort),
    },

    {separator: true},

    // * ----------------------------------------------------------------------
    // * Import external
    // * ----------------------------------------------------------------------

    // * import * as foo | foo | {foo} from 'module'
    {
      match: and(hasMember, isAbsoluteModule, not(isLocalModule), not(isStylesheet)),
      sort: moduleName(customSort),
      sortNamedMembers: name(customSort),
    },

    {separator: true},

    // * ----------------------------------------------------------------------
    // * Import internal using prefix
    // * ----------------------------------------------------------------------

    // * import * as foo | foo | {foo} from '~/module' | '_/module'
    {
      match: and(hasMember, isLocalModule, not(isStylesheet)),
      sort: moduleName(customSort),
      sortNamedMembers: name(customSort),
    },

    {separator: true},

    // * ----------------------------------------------------------------------
    // * Import internal using relative
    // * ----------------------------------------------------------------------

    // * import * as foo | foo | {foo} from './module'
    {
      match: and(hasMember, isRelativeModule, not(isStylesheet)),
      sort: moduleName(customSort),
      sortNamedMembers: name(customSort),
    },

    {separator: true},

    // * ----------------------------------------------------------------------
    // * Import stylesheet
    // * ----------------------------------------------------------------------

    // * import styles from 'stylesheet.css|less|sass|scss|styl'
    {
      match: and(hasMember, isAbsoluteModule, not(isLocalModule), isStylesheet),
      sort: moduleName(customSort),
    },

    // * import 'stylesheet.css|less|sass|scss|styl'
    {
      match: and(hasNoMember, isAbsoluteModule, not(isLocalModule), isStylesheet),
      sort: moduleName(customSort),
    },

    {separator: true},

    // * import styles from '~/local-stylesheet.css|less|sass|scss|styl' or '_/local-stylesheet.css|less|sass|scss|styl'
    {
      match: and(hasMember, isLocalModule, isStylesheet),
      sort: moduleName(customSort),
    },

    // * import styles from './relative-module'
    {
      match: and(hasMember, isRelativeModule, isStylesheet),
      sort: moduleName(customSort),
    },

    // * import '~/local-stylesheet.css|less|sass|scss|styl' or '_/local-stylesheet.css|less|sass|scss|styl'
    {
      match: and(hasNoMember, isLocalModule, isStylesheet),
      sort: moduleName(customSort),
    },

    // * import './relative-module'
    {
      match: and(hasNoMember, isRelativeModule, isStylesheet),
      sort: moduleName(customSort),
    },
  ];
}
