import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Files from './index';

// Meteor.publish('images.all', () => {
//   return Images.find(
//     { removed: false },
//     { sort: { createdAt: -1 }, fields: { description: 0 } }
//   );
// });
//
// Meteor.publish('labs.ownerLabs', userid => {
//   check(userid, String);
//   return Images.find({ ownerId: userid });
// });
//
// Meteor.publish('labs.valid', () => {
//   // check(userid, String);
//   return Images.find();
// });

Meteor.publish('files.all', () => {
  // console.log('publish', Images.find().cursor);
  return Files.find().cursor;
});
