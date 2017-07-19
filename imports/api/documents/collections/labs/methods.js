import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Labs from './index';

Meteor.methods({
  'Labs.add': function documentsInsert(data) {
    check(data, Object);
    if (data._id) {
      Labs.update({ _id: data._id }, { $set: { ...data } });
    } else {
      data.ownerId = this.userId || 'ddd';
      Labs.insert(data);
    }
  },
  'Labs.remove': function documentsInsert(id) {
    check(id, String);
    Labs.update(
      { _id: id },
      { $set: { removed: true, removedAt: new Date() } }
    );
  },
});
