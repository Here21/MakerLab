import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Labs from './index';

Meteor.publish('labs.all', () => {
  return Labs.find(
    { removed: false },
    { sort: { createdAt: -1 }, fields: { description: 0 } }
  );
});

Meteor.publish('labs.ownerLabs', (userid) => {
  check(userid, String);
  return Labs.find({ ownerId: userid });
});

Meteor.publish('labs.valid', () => {
  // check(userid, String);
  return Labs.find();
});
