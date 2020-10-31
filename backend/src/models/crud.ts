import connection from './connection';

export const create = (collection: string, document: object) =>
  connection().then((db) => db.collection(collection).insertOne(document));

export const readAll = (collection: string) =>
  connection().then((db) => db.collection(collection).find());

export const readOneById = (collection: string, query: object) =>
  connection().then((db) => db.collection(collection).find(query));
