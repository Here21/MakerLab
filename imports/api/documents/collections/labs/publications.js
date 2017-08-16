import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Labs from './index';

Meteor.publish('labs.all', () => {
  return Labs.find(
    { removed: false },
    { sort: { createdAt: -1 }, fields: { description: 0 } }
  );
});

Meteor.publish('labs.ownerLabs', (userId) => {
  check(userId, String);
  return Labs.find({ ownerId: userId });
});

Meteor.publish('labs.specialLabId', (labId) => {
  check(labId, String);
  return Labs.find({ _id: labId });
});

Meteor.publish('labs.valid', () => {
  // check(userid, String);
  return Labs.find();
});
