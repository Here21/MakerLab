import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Labs from './index';

Meteor.methods({
  'Labs.add': function documentsInsert(data) {
    check(data, Object);
    console.log(data);
    Labs.insert(data);
  },
  'Labs.edit': function documentsInsert(data) {
    check(data, Object);
    Labs.update({ _id: data._id }, { $set: { ...data } });
  },
  'Labs.remove': function documentsInsert(id) {
    check(id, String);
    Labs.update(
      { _id: id },
      { $set: { removed: true, removedAt: new Date() } }
    );
  },
});
