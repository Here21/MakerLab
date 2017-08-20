import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Images from './index';

if (Meteor.isServer) {
  Images.allowClient();
  Images.allow({
    insert: () => {
      return true;
    },
    update: () => {
      return false;
    },
    remove: () => {
      return true;
    },
  });
}

Meteor.methods({
  'Images.findOne': function documentsFind(id) {
    check(id, String);
    return Images.findOne({ _id: id });
  },
});
