import connection from './connection';

export const create = (collection: string, document: object) =>
  connection().then((db) => db.collection(collection).insertOne(document));

export const readAll = (collection: string) =>
  connection().then((db) => db.collection(collection).find().toArray());

export const readOneById = (collection: string, _id: string) =>
  connection().then((db) => db.collection(collection).findOne({ _id }));

export const readOneByUser = (collection: string, user: string) =>
  connection().then((db) => db.collection(collection).findOne({ user }));
