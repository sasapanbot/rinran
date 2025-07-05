// lock.js
const fs = require('fs');
const path = '/tmp/instance.lock';

function isLocked() {
  return fs.existsSync(path);
}

function createLock() {
  fs.writeFileSync(path, Date.now().toString());
}

function clearLockOnExit() {
  process.on('exit', () => {
    if (fs.existsSync(path)) fs.unlinkSync(path);
  });
  process.on('SIGINT', () => process.exit());
  process.on('SIGTERM', () => process.exit());
}

module.exports = {
  isLocked,
  createLock,
  clearLockOnExit
};
