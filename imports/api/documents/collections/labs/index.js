import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Labs = new Mongo.Collection('labs');

Labs.schema = new SimpleSchema({
  ownerId: {
    type: String
  },
  labName: {
    type: String
  },
  image: {
    type: String,
    optional: true
  },
  description: {
    type: String,
    optional: true
  },
  researchDirection: {
    type: [String],
    optional: true
  },
  likes: {
    type: Number,
    defaultValue: 0
  },
  state: {
    type: String,
    optional: true
  },
  removed: {
    type: Boolean,
    defaultValue: false
  },
  removedAt: {
    type: Date,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      } else {
        this.unset(); // Prevent user from supplying their own value
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  }
});

Labs.attachSchema(Labs.schema);

export default Labs;