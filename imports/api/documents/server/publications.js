import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Labs from '../collections/lab';

Meteor.publish('labs.ownerLabs', (userid) => {
  check(userid, String);
  return Labs.find({ ownerId: userid });
});

Meteor.publish('labs.valid', () => {
  // check(userid, String);
  return Labs.find();
});

