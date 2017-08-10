import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  'user.update': function documentsUpdate(id, values) {
    check(id, String);
    check(values, Object);
    Meteor.users.update(
      { _id: id },
      {
        $set: {
          'profile.bio': values.bio,
          'profile.organization': values.organization,
          'profile.skills': values.skills,
        },
      },
    );
  },
});
