import { del, get, set } from 'idb-keyval';
import { Persister } from '@tanstack/react-query-persist-client';

export const createIndexedDBPersister = (dbName = 'my-app-cache'): Persister => {
  return {
    persistClient: async (client) => {
      await set(dbName, client);
    },
    restoreClient: async () => {
      return await get<any>(dbName);
    },
    removeClient: async () => {
      await del(dbName);
    },
  };
};