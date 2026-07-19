// In-memory store for OTPs and Verification flags
// Used as a fallback or primary store if Redis is not available locally.

const store = new Map();

export const memoryStore = {
  setEx: (key, seconds, value) => {
    store.set(key, value);
    // Auto delete after 'seconds'
    setTimeout(() => {
      store.delete(key);
    }, seconds * 1000);
  },
  get: (key) => {
    return store.get(key) || null;
  },
  del: (key) => {
    store.delete(key);
  }
};
