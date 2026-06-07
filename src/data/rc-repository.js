/**
 * Repository RC — soft delete, sync window.RC_DATA.
 */
import { RC_DATA } from './rc.seed.js';
import { ensureRc8dFields } from './rc-8d-defaults.js';
import { createEntityRepository } from '../core/entity-repository.js';

const rcRepo = createEntityRepository({
  storageKey: 'xm_rc_entities',
  windowKey: 'RC_DATA',
  seed: RC_DATA,
  idField: 'n',
});

export function initRcRepository() {
  rcRepo.hydrate();
  const items = rcRepo.getAll();
  let changed = false;
  items.forEach((rc) => {
    const before = JSON.stringify(rc);
    ensureRc8dFields(rc);
    if (JSON.stringify(rc) !== before) changed = true;
  });
  if (changed) rcRepo.persist(items);
}

export function updateRc(id, patch) {
  initRcRepository();
  return rcRepo.update(id, patch);
}

export function listRc(opts = {}) {
  initRcRepository();
  return rcRepo.list(opts);
}

export function getRcById(id) {
  initRcRepository();
  return rcRepo.getById(id);
}

export function archiveRc(id) {
  initRcRepository();
  return rcRepo.archive(id);
}

export function restoreRc(id) {
  initRcRepository();
  return rcRepo.restore(id);
}

export function hardDeleteRc(id) {
  initRcRepository();
  rcRepo.hardDelete(id);
}

export function createRc(row) {
  initRcRepository();
  return rcRepo.create(row);
}
