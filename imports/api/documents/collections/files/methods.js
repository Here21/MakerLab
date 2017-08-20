import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Files from './index';

if (Meteor.isServer) {
  Files.allowClient();
  Files.allow({
    insert: () => {
      return true;
    },
    update: () => {
      return false;
    },
    remove: () => {
      return true;
    }
  });
}

Meteor.methods({
  'Files.findOne': function documentsFind(id) {
    check(id, String);
    return Files.findOne({ _id: id });

  },
});
