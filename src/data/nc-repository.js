/**
 * Repository NC — soft delete, sync window.NC_DATA.
 */
import { NC_DATA } from './nc.seed.js';
import { createEntityRepository } from '../core/entity-repository.js';

const ncRepo = createEntityRepository({
  storageKey: 'xm_nc_entities',
  windowKey: 'NC_DATA',
  seed: NC_DATA,
  idField: 'n',
});

export function initNcRepository() {
  ncRepo.hydrate();
}

export function listNc(opts = {}) {
  initNcRepository();
  return ncRepo.list(opts);
}

export function getNcById(id) {
  initNcRepository();
  return ncRepo.getById(id);
}

export function createNc(row) {
  initNcRepository();
  return ncRepo.create(row);
}

export function updateNc(id, patch) {
  initNcRepository();
  return ncRepo.update(id, patch);
}

export function archiveNc(id) {
  initNcRepository();
  return ncRepo.archive(id);
}

export function restoreNc(id) {
  initNcRepository();
  return ncRepo.restore(id);
}

export function hardDeleteNc(id) {
  initNcRepository();
  ncRepo.hardDelete(id);
}
