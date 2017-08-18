import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Project from './index';

Meteor.methods({
  'Project.add': function documentsInsert(data) {
    check(data, Object);
    Project.insert(data);
  },
  'Project.edit': function documentsUpdate(data) {
    check(data, Object);
    Project.update({ _id: data._id }, { $set: { ...data } });
  },
  'Project.remove': function documentsRemove(id) {
    check(id, String);
    Project.update(
      { _id: id },
      { $set: { removed: true, removedAt: new Date() } }
    );
  },
});
