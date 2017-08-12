import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Course from './index';

Meteor.methods({
  'Course.add': function documentsInsert(data) {
    check(data, Object);
    Course.insert(data);
  },
  'Course.edit': function documentsInsert(data) {
    check(data, Object);
    Course.update({ _id: data._id }, { $set: { ...data } });
  },
  'Course.remove': function documentsInsert(id) {
    check(id, String);
    Course.update(
      { _id: id },
      { $set: { removed: true, removedAt: new Date() } }
    );
  },
});
