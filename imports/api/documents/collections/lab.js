import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Lab = new Mongo.Collection('Lab');
export default Lab;

Lab.schema = new SimpleSchema({
  ownerId: {
    type: String,
  },
  labName: {
    type: String,
  },
  description: {
    type: String,
    optional: true,
  },
  researchDirection: {
    type: String,
    optional: true,
  },
  likes: {
    type: Number,
    optional: true,
  },
  state: {
    type: String,
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    },
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true,
  },
});

Lab.attachSchema(Lab.schema);
