import { IMatcherFunction, IStyleAPI, IStyleItem } from 'import-sort-style';
import { IImport, ImportType, NamedMember } from 'import-sort-parser';

function isLocalModule(imported: IImport) {
  return imported.moduleName.indexOf('~') === 0
      || imported.moduleName.indexOf('_') === 0;
}


export default function(styleApi: IStyleAPI): IStyleItem[] {
  const {
    and,
    hasDefaultMember,
    hasNamedMembers,
    hasNamespaceMember,
    hasNoMember,
    hasOnlyDefaultMember,
    hasOnlyNamedMembers,
    hasOnlyNamespaceMember,
    isAbsoluteModule,
    isRelativeModule,
    member,
    moduleName,
    name,
    naturally,
    not,
    or,
    startsWithAlphanumeric,
    startsWithLowerCase,
    startsWithUpperCase,
    unicode,
  } = styleApi;

  return [
    // import 'module'
    {match: and(hasNoMember, isAbsoluteModule)},

    {separator: true},

    // import '~/local-module' or '_/local-module'
    {match: and(hasNoMember, isLocalModule)},

    {separator: true},

    // import './relative-module'
    {match: and(hasNoMember, isRelativeModule)},

    {separator: true},

    // import * as _ from 'module'
    {match: and(hasOnlyNamespaceMember, isAbsoluteModule, not(isLocalModule), not(member(startsWithAlphanumeric))), sort: moduleName(naturally)},
    // import * as (m|M)odule from 'module'
    {match: and(hasOnlyNamespaceMember, isAbsoluteModule, not(isLocalModule)), sort: moduleName(naturally)},
    // import _, * as (m|M)odule from 'module'
    {match: and(hasDefaultMember, hasNamespaceMember, isAbsoluteModule, not(isLocalModule), not(member(startsWithAlphanumeric))), sort: moduleName(naturally)},
    // import (m|M)odule, * as _ from 'module'
    {match: and(hasDefaultMember, hasNamespaceMember, isAbsoluteModule, not(isLocalModule), or(member(startsWithAlphanumeric), not(member(startsWithAlphanumeric)))), sort: moduleName(naturally)},
    // import (m|M)odule, * as (o|O)therModule from 'module'
    {match: and(hasDefaultMember, hasNamespaceMember, isAbsoluteModule, not(isLocalModule), member(startsWithAlphanumeric)), sort: moduleName(naturally)},
    // import _ from 'module'
    {match: and(hasOnlyDefaultMember, isAbsoluteModule, not(isLocalModule), not(member(startsWithAlphanumeric))), sort: moduleName(naturally)},
    // import (m|M)odule from 'module'
    {match: and(hasOnlyDefaultMember, isAbsoluteModule, not(isLocalModule), member(startsWithAlphanumeric)), sort: moduleName(naturally)},
    // import _, { (m|M)odule, ... } from 'module'
    {match: and(hasDefaultMember, hasNamedMembers, isAbsoluteModule, not(isLocalModule), not(member(startsWithAlphanumeric))), sort: moduleName(naturally), sortNamedMembers: name(naturally)},
    // import (m|M)odule, { (o|O)therModule, ... } from 'module'
    {match: and(hasDefaultMember, hasNamedMembers, isAbsoluteModule, not(isLocalModule), member(startsWithAlphanumeric)), sort: moduleName(naturally), sortNamedMembers: name(naturally)},
    // import { _, (m|M)odule, ... } from 'module'
    {match: and(hasOnlyNamedMembers, isAbsoluteModule, not(isLocalModule), not(member(startsWithAlphanumeric))), sort: moduleName(naturally), sortNamedMembers: name(naturally)},
    // import { (m|M)odule, ... } from 'module'
    {match: and(hasOnlyNamedMembers, isAbsoluteModule, not(isLocalModule), member(startsWithAlphanumeric)), sort: moduleName(naturally), sortNamedMembers: name(naturally)},

    {separator: true},

    // import * as _ from '~/local-module' or '_/local-module'
    {match: and(hasOnlyNamespaceMember, isLocalModule, not(member(startsWithAlphanumeric))), sort: moduleName(naturally)},
    // import * as Module from '~/local-module' or '_/local-module'
    {match: and(hasOnlyNamespaceMember, isLocalModule), sort: moduleName(naturally)},
    // import _, * as (m|M)odule from '~/local-module' or '_/local-module'
    {match: and(hasDefaultMember, hasNamespaceMember, isLocalModule, not(member(startsWithAlphanumeric))), sort: moduleName(naturally)},
    // import (m|M)odule, * as _ from '~/local-module' or '_/local-module'
    {match: and(hasDefaultMember, hasNamespaceMember, isLocalModule, or(member(startsWithAlphanumeric), not(member(startsWithAlphanumeric)))), sort: moduleName(naturally)},
    // import (m|M)odule, * as (o|O)therModule from '~/local-module' or '_/local-module'
    {match: and(hasDefaultMember, hasNamespaceMember, isLocalModule, member(startsWithAlphanumeric)), sort: moduleName(naturally)},
    // import _ from '~/local-module' or '_/local-module'
    {match: and(hasOnlyDefaultMember, isLocalModule, not(member(startsWithAlphanumeric))), sort: moduleName(naturally)},
    // import (m|M)odule from '~/local-module' or '_/local-module'
    {match: and(hasOnlyDefaultMember, isLocalModule, member(startsWithAlphanumeric)), sort: moduleName(naturally)},
    // import _, { (m|M)odule, ... } from '~/local-module' or '_/local-module'
    {match: and(hasDefaultMember, hasNamedMembers, isLocalModule, not(member(startsWithAlphanumeric))), sort: moduleName(naturally), sortNamedMembers: name(naturally)},
    // import (m|M)odule, { (o|O)therModule, ... } from '~/local-module' or '_/local-module'
    {match: and(hasDefaultMember, hasNamedMembers, isLocalModule, member(startsWithAlphanumeric)), sort: moduleName(naturally), sortNamedMembers: name(naturally)},
    // import { _, (m|M)odule, ... } from '~/local-module' or '_/local-module'
    {match: and(hasOnlyNamedMembers, isLocalModule, not(member(startsWithAlphanumeric))), sort: moduleName(naturally), sortNamedMembers: name(naturally)},
    // import { (m|M)odule, ... } from '~/local-module' or '_/local-module'
    {match: and(hasOnlyNamedMembers, isLocalModule), sort: moduleName(naturally), sortNamedMembers: name(naturally)},

    {separator: true},

    // import * as _ from './module'
    {match: and(hasOnlyNamespaceMember, isRelativeModule, not(member(startsWithAlphanumeric))), sort: moduleName(naturally)},
    // import * as Module from './module]'
    {match: and(hasOnlyNamespaceMember, isRelativeModule), sort: moduleName(naturally)},
    // import _, * as (m|M)odule from './module'
    {match: and(hasDefaultMember, hasNamespaceMember, isRelativeModule, not(member(startsWithAlphanumeric))), sort: moduleName(naturally)},
    // import (m|M)odule, * as _ from './module'
    {match: and(hasDefaultMember, hasNamespaceMember, isRelativeModule, or(member(startsWithAlphanumeric), not(member(startsWithAlphanumeric)))), sort: moduleName(naturally)},
    // import (m|M)odule, * as (o|O)therModule from './module'
    {match: and(hasDefaultMember, hasNamespaceMember, isRelativeModule, member(startsWithAlphanumeric)), sort: moduleName(naturally)},
    // import _ from './module'
    {match: and(hasOnlyDefaultMember, isRelativeModule, not(member(startsWithAlphanumeric))), sort: moduleName(naturally)},
    // import (m|M)odule from './module'
    {match: and(hasOnlyDefaultMember, isRelativeModule, member(startsWithAlphanumeric)), sort: moduleName(naturally)},
    // import _, { (m|M)odule, ... } from './module'
    {match: and(hasDefaultMember, hasNamedMembers, isRelativeModule, not(member(startsWithAlphanumeric))), sortNamedMembers: name(naturally)},
    // import (m|M)odule, { (o|O)therModule, ... } from './module'
    {match: and(hasDefaultMember, hasNamedMembers, isRelativeModule, member(startsWithAlphanumeric)), sort: moduleName(naturally), sortNamedMembers: name(naturally)},
    // import { _, (m|M)odule, ... } from './module'
    {match: and(hasOnlyNamedMembers, isRelativeModule, not(member(startsWithAlphanumeric))), sort: moduleName(naturally), sortNamedMembers: name(naturally)},
    // import { (m|M)odule, ... } from './module'
    {match: and(hasOnlyNamedMembers, isRelativeModule, member(startsWithAlphanumeric)), sort: moduleName(naturally), sortNamedMembers: name(naturally)},

    {separator: true},
  ];
}
