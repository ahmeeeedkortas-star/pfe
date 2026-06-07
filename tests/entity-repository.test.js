import { describe, it, expect, beforeEach } from 'vitest';
import { createEntityRepository } from '../src/core/entity-repository.js';

describe('entity-repository', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('archive et restore un enregistrement', () => {
    const repo = createEntityRepository({
      storageKey: 'test_entities',
      seed: [{ n: 'T-1', s: 'Ouvert' }],
      idField: 'n',
    });
    repo.hydrate();
    repo.archive('T-1');
    expect(repo.list({ includeArchived: false }).items).toHaveLength(0);
    expect(repo.list({ includeArchived: true }).items).toHaveLength(1);
    repo.restore('T-1');
    expect(repo.list({ includeArchived: false }).items).toHaveLength(1);
  });

  it('filtre par statut et pagine', () => {
    const repo = createEntityRepository({
      storageKey: 'test_paginate',
      seed: [
        { n: 'A', s: 'Ouvert' },
        { n: 'B', s: 'Clôturé' },
        { n: 'C', s: 'Ouvert' },
      ],
      idField: 'n',
    });
    repo.hydrate();
    const page1 = repo.list({ filters: { status: 'Ouvert' }, page: 1, pageSize: 1 });
    expect(page1.total).toBe(2);
    expect(page1.items).toHaveLength(1);
    expect(page1.items[0].n).toBe('A');
  });
});
