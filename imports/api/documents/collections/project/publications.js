import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Project from './index';

Meteor.publish('project.all', () => {
  return Project.find(
    { removed: false },
    { sort: { createdAt: -1 }, fields: { description: 0, files: 0 } }
  );
});

Meteor.publish('project.ownerProject', (userId) => {
  check(userId, String);
  return Project.find(
    { ownerId: userId },
    { sort: { createdAt: -1 }, fields: { content: 0 } }
    );
});

Meteor.publish('project.findProjectById', (projectId) => {
  check(projectId, String);
  return Project.find({ _id: projectId });
});

Meteor.publish('project.valid', () => {
  // check(userid, String);
  return Project.find();
});
