import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Documents from '../collections/lab';

Meteor.publish('labs.ownerLabs', (userid) => {
  check(userid, String);
  return Documents.find({ ownerId: userid });
});
