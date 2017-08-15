import { Meteor } from 'meteor/meteor';

Meteor.publish('user.all', () => {
  return Meteor.users.find();
});
