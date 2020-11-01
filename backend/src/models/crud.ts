import { ObjectId } from 'mongodb';
import connection from './connection';

export const create = (collection: string, document: object) =>
  connection().then((db) => db.collection(collection).insertOne(document));

export const readAll = (collection: string) =>
  connection().then((db) => db.collection(collection).find().toArray());

export const readOneById = (collection: string, id: string) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection(collection).findOne(new ObjectId(id)));
};

export const readOneByUser = (collection: string, user: string) =>
  connection().then((db) => db.collection(collection).findOne({ user }));

export const updateById = (collection: string, id: string, update: object) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) =>
    db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: update })
  );
};

export const deleteById = (collection: string, id: string) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) =>
    db.collection(collection).findOneAndDelete({ _id: new ObjectId(id) })
  );
};
