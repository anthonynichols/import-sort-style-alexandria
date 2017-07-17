import { IStyleAPI, IStyleItem } from "import-sort-style";

function isAlexandriaModule(imported: IImport) {
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
    name,
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
    
    // import * as React from "react";
    {match: and(hasOnlyNamespaceMember, isReactModule, member(isReactMember))},
    // import React from "react";
    {match: and(hasOnlyDefaultMember, isReactModule, member(isReactMember))},
    // import React, { Module, ... } from "react";
    {match: and(hasDefaultMember, hasNamedMembers, isReactModule, or(member(isReactMember), member(startsWithAlphanumeric))), sortNamedMembers: name(unicode)},

    {separator: true},

    // import * as _ from "module";
    {match: and(hasOnlyNamespaceMember, isAbsoluteModule, not(isAlexandriaModule), not(member(startsWithAlphanumeric))), sort: member(unicode)},
    // import * as (m|M)odule from "module";
    {match: and(hasOnlyNamespaceMember, isAbsoluteModule, not(isAlexandriaModule)), sort: member(unicode)},
    // import _, * as (m|M)odule from "module";
    {match: and(hasDefaultMember, hasNamespaceMember, isAbsoluteModule, not(isAlexandriaModule), not(member(startsWithAlphanumeric))), sort: member(unicode)},
    // import (m|M)odule, * as _ from "module";
    {match: and(hasDefaultMember, hasNamespaceMember, isAbsoluteModule, not(isAlexandriaModule), or(member(startsWithAlphanumeric), not(member(startsWithAlphanumeric)))), sort: member(unicode)},
    // import (m|M)odule, * as (o|O)therModule from "module";
    {match: and(hasDefaultMember, hasNamespaceMember, isAbsoluteModule, member(startsWithAlphanumeric)), sort: member(unicode)},
    // import _ from "module";
    {match: and(hasOnlyDefaultMember, isAbsoluteModule, not(member(startsWithAlphanumeric))), sort: member(unicode)},
    // import (m|M)odule from "module";
    {match: and(hasOnlyDefaultMember, isAbsoluteModule, member(startsWithAlphanumeric)), sort: member(unicode)},
    // import _, { (m|M)odule, ... } from "module"
    {match: and(hasDefaultMember, hasNamedMembers, isAbsoluteModule, not(isAlexandriaModule), not(member(startsWithAlphanumeric))), sortNamedMembers: name(unicode)},
    // import (m|M)odule, { (o|O)therModule, ... } from "module"
    {match: and(hasDefaultMember, hasNamedMembers, isAbsoluteModule, not(isAlexandriaModule), member(startsWithAlphanumeric)), sort: member(unicode), sortNamedMembers: name(unicode)},
    // import { _, (m|M)odule, ... } from "module"
    {match: and(hasOnlyNamedMembers, isAbsoluteModule, not(isAlexandriaModule), not(member(startsWithAlphanumeric))), sort: member(unicode), sortNamedMembers: name(unicode)},
    // import { (m|M)odule, ... } from "module"
    {match: and(hasOnlyNamedMembers, isAbsoluteModule, not(isAlexandriaModule), member(startsWithAlphanumeric)), sort: member(unicode), sortNamedMembers: name(unicode)},
    
    {separator: true},

    // import * as _ from "~/~/[Alexandria Module]";
    {match: and(hasOnlyNamespaceMember, isAlexandriaModule, not(member(startsWithAlphanumeric))), sort: member(unicode)},
    // import * as Module from "~/[Alexandria Module]";
    {match: and(hasOnlyNamespaceMember, isAlexandriaModule), sort: member(unicode)},
    // import _, * as (m|M)odule from "~/[Alexandria Module]";
    {match: and(hasDefaultMember, hasNamespaceMember, isAlexandriaModule, not(member(startsWithAlphanumeric))), sort: member(unicode)},
    // import (m|M)odule, * as _ from "~/[Alexandria Module]";
    {match: and(hasDefaultMember, hasNamespaceMember, isAlexandriaModule, or(member(startsWithAlphanumeric), not(member(startsWithAlphanumeric)))), sort: member(unicode)},
    // import (m|M)odule, * as (o|O)therModule from "~/[Alexandria Module]";
    {match: and(hasDefaultMember, hasNamespaceMember, isAlexandriaModule, member(startsWithAlphanumeric)), sort: member(unicode)},
    // import _ from "~/[Alexandria Module]";
    {match: and(hasOnlyDefaultMember, isAlexandriaModule, not(member(startsWithAlphanumeric))), sort: member(unicode)},
    // import (m|M)odule from "~/[Alexandria Module]";
    {match: and(hasOnlyDefaultMember, isAlexandriaModule, member(startsWithAlphanumeric)), sort: member(unicode)},
    // import _, { (m|M)odule, ... } from "~/[Alexandria Module]"
    {match: and(hasDefaultMember, hasNamedMembers, isAlexandriaModule, not(member(startsWithAlphanumeric))), sortNamedMembers: name(unicode)},
    // import (m|M)odule, { (o|O)therModule, ... } from "~/[Alexandria Module]"
    {match: and(hasDefaultMember, hasNamedMembers, isAlexandriaModule, member(startsWithAlphanumeric)), sort: member(unicode), sortNamedMembers: name(unicode)},
    // import { _, (m|M)odule, ... } from "~/[Alexandria Module]"
    {match: and(hasOnlyNamedMembers, isAlexandriaModule, not(member(startsWithAlphanumeric))), sort: member(unicode), sortNamedMembers: name(unicode)},
    // import { (m|M)odule, ... } from "~/[Alexandria Module]"
    {match: and(hasOnlyNamedMembers, isAlexandriaModule), sortNamedMembers: name(unicode)},

    {separator: true},

    // import * as _ from "./module";
    {match: and(hasOnlyNamespaceMember, isRelativeModule, not(member(startsWithAlphanumeric))), sort: member(unicode)},
    // import _, * as (m|M)odule from "./module";
    {match: and(hasDefaultMember, hasNamespaceMember, isRelativeModule, not(member(startsWithAlphanumeric))), sort: member(unicode)},
    // import (m|M)odule, * as _ from "./module";
    {match: and(hasDefaultMember, hasNamespaceMember, isRelativeModule, or(member(startsWithAlphanumeric), not(member(startsWithAlphanumeric)))), sort: member(unicode)},
    // import (m|M)odule, * as (o|O)therModule from "./module";
    {match: and(hasDefaultMember, hasNamespaceMember, isRelativeModule, member(startsWithAlphanumeric)), sort: member(unicode)},
    // import _ from "./module";
    {match: and(hasOnlyDefaultMember, isRelativeModule, not(member(startsWithAlphanumeric))), sort: member(unicode)},
    // import (m|M)odule from "./module";
    {match: and(hasOnlyDefaultMember, isRelativeModule, member(startsWithAlphanumeric)), sort: member(unicode)},
    // import _, { (m|M)odule, ... } from "./module"
    {match: and(hasDefaultMember, hasNamedMembers, isRelativeModule, not(member(startsWithAlphanumeric))), sortNamedMembers: name(unicode)},
    // import (m|M)odule, { (o|O)therModule, ... } from "./module"
    {match: and(hasDefaultMember, hasNamedMembers, isRelativeModule, member(startsWithAlphanumeric)), sort: member(unicode), sortNamedMembers: name(unicode)},
    // import { _, (m|M)odule, ... } from "./module"
    {match: and(hasOnlyNamedMembers, isRelativeModule, not(member(startsWithAlphanumeric))), sort: member(unicode), sortNamedMembers: name(unicode)},
    // import { (m|M)odule, ... } from "./module"
    {match: and(hasOnlyNamedMembers, isRelativeModule, member(startsWithAlphanumeric)), sort: member(unicode), sortNamedMembers: name(unicode)},

    {separator: true},    
  ];
}

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
