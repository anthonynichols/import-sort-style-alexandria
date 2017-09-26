import { IStyleAPI, IStyleItem } from "import-sort-style";

type ImportType = "import" | "require" | "import-equals" | "import-type";

type NamedMember = {
  alias: string,
  name: string,
}

interface IImport {
  defaultMember?: string;
  end: number;
  moduleName: string;
  namedMembers: NamedMember[];
  namespaceMember?: string;
  start: number;
  type: ImportType;
}


function isLocalModule(imported: IImport) {
  if (imported.moduleName.startsWith('~')) return true;
  
  return false;
}

function isReactMember(member: string) {
  return member === 'React';
}

function isReactModule(imported: IImport) {
  if (imported.moduleName === 'react') return true;

  return false;
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
    // import "module";
    {match: and(hasNoMember, isAbsoluteModule)},
    
    {separator: true},

    // import "./relative-module";
    {match: and(hasNoMember, isRelativeModule)},
    
    {separator: true},
    
    // import * as _ from "module";
    {match: and(hasOnlyNamespaceMember, isAbsoluteModule, not(isLocalModule), not(member(startsWithAlphanumeric))), sort: moduleName(naturally)},
    // import * as (m|M)odule from "module";
    {match: and(hasOnlyNamespaceMember, isAbsoluteModule, not(isLocalModule)), sort: moduleName(naturally)},
    // import _, * as (m|M)odule from "module";
    {match: and(hasDefaultMember, hasNamespaceMember, isAbsoluteModule, not(isLocalModule), not(member(startsWithAlphanumeric))), sort: moduleName(naturally)},
    // import (m|M)odule, * as _ from "module";
    {match: and(hasDefaultMember, hasNamespaceMember, isAbsoluteModule, not(isLocalModule), or(member(startsWithAlphanumeric), not(member(startsWithAlphanumeric)))), sort: moduleName(naturally)},
    // import (m|M)odule, * as (o|O)therModule from "module";
    {match: and(hasDefaultMember, hasNamespaceMember, isAbsoluteModule, member(startsWithAlphanumeric)), sort: moduleName(naturally)},
    // import _ from "module";
    {match: and(hasOnlyDefaultMember, isAbsoluteModule, not(member(startsWithAlphanumeric))), sort: moduleName(naturally)},
    // import (m|M)odule from "module";
    {match: and(hasOnlyDefaultMember, isAbsoluteModule, member(startsWithAlphanumeric)), sort: moduleName(naturally)},
    // import _, { (m|M)odule, ... } from "module"
    {match: and(hasDefaultMember, hasNamedMembers, isAbsoluteModule, not(isLocalModule), not(member(startsWithAlphanumeric))), sort: moduleName(naturally), sortNamedMembers: name(naturally)},
    // import (m|M)odule, { (o|O)therModule, ... } from "module"
    {match: and(hasDefaultMember, hasNamedMembers, isAbsoluteModule, not(isLocalModule), member(startsWithAlphanumeric)), sort: moduleName(naturally), sortNamedMembers: name(naturally)},
    // import { _, (m|M)odule, ... } from "module"
    {match: and(hasOnlyNamedMembers, isAbsoluteModule, not(isLocalModule), not(member(startsWithAlphanumeric))), sort: moduleName(naturally), sortNamedMembers: name(naturally)},
    // import { (m|M)odule, ... } from "module"
    {match: and(hasOnlyNamedMembers, isAbsoluteModule, not(isLocalModule), member(startsWithAlphanumeric)), sort: moduleName(naturally), sortNamedMembers: name(naturally)},
    
    {separator: true},

    // import * as _ from "~/[Local Module]";
    {match: and(hasOnlyNamespaceMember, isLocalModule, not(member(startsWithAlphanumeric))), sort: moduleName(naturally)},
    // import * as Module from "~/[Local Module]";
    {match: and(hasOnlyNamespaceMember, isLocalModule), sort: moduleName(naturally)},
    // import _, * as (m|M)odule from "~/[Local Module]";
    {match: and(hasDefaultMember, hasNamespaceMember, isLocalModule, not(member(startsWithAlphanumeric))), sort: moduleName(naturally)},
    // import (m|M)odule, * as _ from "~/[Local Module]";
    {match: and(hasDefaultMember, hasNamespaceMember, isLocalModule, or(member(startsWithAlphanumeric), not(member(startsWithAlphanumeric)))), sort: moduleName(naturally)},
    // import (m|M)odule, * as (o|O)therModule from "~/[Local Module]";
    {match: and(hasDefaultMember, hasNamespaceMember, isLocalModule, member(startsWithAlphanumeric)), sort: moduleName(naturally)},
    // import _ from "~/[Local Module]";
    {match: and(hasOnlyDefaultMember, isLocalModule, not(member(startsWithAlphanumeric))), sort: moduleName(naturally)},
    // import (m|M)odule from "~/[Local Module]";
    {match: and(hasOnlyDefaultMember, isLocalModule, member(startsWithAlphanumeric)), sort: moduleName(naturally)},
    // import _, { (m|M)odule, ... } from "~/[Local Module]"
    {match: and(hasDefaultMember, hasNamedMembers, isLocalModule, not(member(startsWithAlphanumeric))), sort: moduleName(naturally), sortNamedMembers: name(naturally)},
    // import (m|M)odule, { (o|O)therModule, ... } from "~/[Local Module]"
    {match: and(hasDefaultMember, hasNamedMembers, isLocalModule, member(startsWithAlphanumeric)), sort: moduleName(naturally), sortNamedMembers: name(naturally)},
    // import { _, (m|M)odule, ... } from "~/[Local Module]"
    {match: and(hasOnlyNamedMembers, isLocalModule, not(member(startsWithAlphanumeric))), sort: moduleName(naturally), sortNamedMembers: name(naturally)},
    // import { (m|M)odule, ... } from "~/[Local Module]"
    {match: and(hasOnlyNamedMembers, isLocalModule), sort: moduleName(naturally), sortNamedMembers: name(naturally)},

    {separator: true},

    // import * as _ from "./module";
    {match: and(hasOnlyNamespaceMember, isRelativeModule, not(member(startsWithAlphanumeric))), sort: moduleName(naturally)},
    // import * as Module from "./module]";
    {match: and(hasOnlyNamespaceMember, isRelativeModule), sort: moduleName(naturally)},
    // import _, * as (m|M)odule from "./module";
    {match: and(hasDefaultMember, hasNamespaceMember, isRelativeModule, not(member(startsWithAlphanumeric))), sort: moduleName(naturally)},
    // import (m|M)odule, * as _ from "./module";
    {match: and(hasDefaultMember, hasNamespaceMember, isRelativeModule, or(member(startsWithAlphanumeric), not(member(startsWithAlphanumeric)))), sort: moduleName(naturally)},
    // import (m|M)odule, * as (o|O)therModule from "./module";
    {match: and(hasDefaultMember, hasNamespaceMember, isRelativeModule, member(startsWithAlphanumeric)), sort: moduleName(naturally)},
    // import _ from "./module";
    {match: and(hasOnlyDefaultMember, isRelativeModule, not(member(startsWithAlphanumeric))), sort: moduleName(naturally)},
    // import (m|M)odule from "./module";
    {match: and(hasOnlyDefaultMember, isRelativeModule, member(startsWithAlphanumeric)), sort: moduleName(naturally)},
    // import _, { (m|M)odule, ... } from "./module"
    {match: and(hasDefaultMember, hasNamedMembers, isRelativeModule, not(member(startsWithAlphanumeric))), sortNamedMembers: name(naturally)},
    // import (m|M)odule, { (o|O)therModule, ... } from "./module"
    {match: and(hasDefaultMember, hasNamedMembers, isRelativeModule, member(startsWithAlphanumeric)), sort: moduleName(naturally), sortNamedMembers: name(naturally)},
    // import { _, (m|M)odule, ... } from "./module"
    {match: and(hasOnlyNamedMembers, isRelativeModule, not(member(startsWithAlphanumeric))), sort: moduleName(naturally), sortNamedMembers: name(naturally)},
    // import { (m|M)odule, ... } from "./module"
    {match: and(hasOnlyNamedMembers, isRelativeModule, member(startsWithAlphanumeric)), sort: moduleName(naturally), sortNamedMembers: name(naturally)},

    {separator: true},    
  ];
}
