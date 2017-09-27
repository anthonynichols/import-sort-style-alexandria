import 'mocha';

import * as parser from 'import-sort-parser-typescript';
import { applyChanges, sortImports } from 'import-sort';
import { assert } from 'chai';
import { IStyle, IStyleAPI, IStyleItem } from 'import-sort-style';

import ALEXANDRIA_STYLE from '../src';

describe('sortImports (typescript, ALEXANDRIA_STYLE)', () => {
  it('should sort external modules', async () => {
    const { code, expected } = await import('./fixtures/external-modules');
    const result = sortImports(code, parser, ALEXANDRIA_STYLE);
    const actual = result.code;
    const changes = result.changes;

    assert.equal(expected, actual);
    assert.equal(applyChanges(code, changes), expected);
  });

  it('should sort named external modules', async () => {
    const { code, expected } = await import('./fixtures/named-external-modules');
    const result = sortImports(code, parser, ALEXANDRIA_STYLE);
    const actual = result.code;
    const changes = result.changes;

    assert.equal(expected, actual);
    assert.equal(applyChanges(code, changes), expected);
  });

  it('should sort local root modules', async () => {
    const { code, expected } = await import('./fixtures/local-root-modules');
    const result = sortImports(code, parser, ALEXANDRIA_STYLE);
    const actual = result.code;
    const changes = result.changes;

    assert.equal(expected, actual);
    assert.equal(applyChanges(code, changes), expected);
  });

  it('should sort named local root modules', async () => {
    const { code, expected } = await import('./fixtures/named-local-root-modules');
    const result = sortImports(code, parser, ALEXANDRIA_STYLE);
    const actual = result.code;
    const changes = result.changes;

    assert.equal(expected, actual);
    assert.equal(applyChanges(code, changes), expected);
  });

  it('should sort local modules', async () => {
    const { code, expected } = await import('./fixtures/local-modules');
    const result = sortImports(code, parser, ALEXANDRIA_STYLE);
    const actual = result.code;
    const changes = result.changes;

    assert.equal(expected, actual);
    assert.equal(applyChanges(code, changes), expected);
  });

  it('should sort named local modules', async () => {
    const { code, expected } = await import('./fixtures/named-local-modules');
    const result = sortImports(code, parser, ALEXANDRIA_STYLE);
    const actual = result.code;
    const changes = result.changes;

    assert.equal(expected, actual);
    assert.equal(applyChanges(code, changes), expected);
  });

  it('should sort relative modules', async () => {
    const { code, expected } = await import('./fixtures/relative-modules');
    const result = sortImports(code, parser, ALEXANDRIA_STYLE);
    const actual = result.code;
    const changes = result.changes;

    assert.equal(expected, actual);
    assert.equal(applyChanges(code, changes), expected);
  });

  it('should sort named relative modules', async () => {
    const { code, expected } = await import('./fixtures/named-relative-modules');
    const result = sortImports(code, parser, ALEXANDRIA_STYLE);
    const actual = result.code;
    const changes = result.changes;

    assert.equal(expected, actual);
    assert.equal(applyChanges(code, changes), expected);
  });

  it('should sort all of the things!', async () => {
    const { code, expected } = await import('./fixtures/all-of-the-things');
    const result = sortImports(code, parser, ALEXANDRIA_STYLE);
    const actual = result.code;
    const changes = result.changes;

    assert.equal(expected, actual);
    assert.equal(applyChanges(code, changes), expected);
  });
});
