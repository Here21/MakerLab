import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Files from './index';

if (Meteor.isServer) {
  console.log('method ------------------------------------------')
  /* Set deny/allow rules:
   * Deny all
   * @see http://docs.meteor.com/#/full/deny
   */
  // Images.denyClient();

  /* Allow all
   * @see http://docs.meteor.com/#/full/allow
   */
  Files.allowClient();

  /* Deny per action
   * @see http://docs.meteor.com/#/full/deny
   */
  // Images.deny({
  //   insert: function() {
  //     return false;
  //   },
  //   update: function() {
  //     return true;
  //   },
  //   remove: function() {
  //     return false;
  //   }
  // });

  /* Allow per action
   * @see http://docs.meteor.com/#/full/allow
   */
  Files.allow({
    insert: () => {
      return true;
    },
    update: () => {
      return false;
    },
    remove: () => {
      return true;
    }
  });
}

Meteor.methods({
  // 'Images.add': function documentsInsert(data) {
  //   check(data, Object);
  //   if (data._id) {
  //     Images.update({ _id: data._id }, { $set: { ...data } });
  //   } else {
  //     data.ownerId = this.userId || 'ddd';
  //     Images.insert(data);
  //   }
  // },
  // 'Images.remove': function documentsInsert(id) {
  //   check(id, String);
  //   Images.update(
  //     { _id: id },
  //     { $set: { removed: true, removedAt: new Date() } }
  //   );
  // },
  'Files.findOne': function documentsFind(id) {
    // console.log(id);
    check(id, String);
    // console.log(Images.findOne({ _id: id }));
    return Files.findOne({ _id: id });

  },
});
