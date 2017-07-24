import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Images from './index';

Meteor.methods({
  'Images.add': function documentsInsert(data) {
    check(data, Object);
    if (data._id) {
      Images.update({ _id: data._id }, { $set: { ...data } });
    } else {
      data.ownerId = this.userId || 'ddd';
      Images.insert(data);
    }
  },
  'Images.remove': function documentsInsert(id) {
    check(id, String);
    Images.update(
      { _id: id },
      { $set: { removed: true, removedAt: new Date() } }
    );
  },
});
