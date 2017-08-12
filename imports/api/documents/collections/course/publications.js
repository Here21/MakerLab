import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Course from './index';

Meteor.publish('course.all', () => {
  return Course.find(
    { removed: false },
    { sort: { createdAt: -1 }, fields: { description: 0 } }
  );
});

Meteor.publish('course.ownerCourse', (userId) => {
  check(userId, String);
  return Course.find(
    { ownerId: userId },
    { sort: { createdAt: -1 }, fields: { content: 0 } }
    );
});

Meteor.publish('course.valid', () => {
  // check(userid, String);
  return Course.find();
});
