import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Course = new Mongo.Collection('Course');

Course.schema = new SimpleSchema({
  ownerId: {
    type: String,
  },
  courseName: {
    type: String,
  },
  department: {
    type: String,
  },
  courseType: {
    type: String,
    optional: true,
  },
  coverId: {
    type: String,
    optional: true,
  },
  coverSrc: {
    type: String,
    optional: true,
  },
  content: {
    type: String,
    optional: true,
  },
  files: {
    type: Array,
    optional: true,
  },
  'files.$': {
    type: Object,
    blackbox: true,
  },
  likes: {
    type: Number,
    defaultValue: 0,
  },
  state: {
    type: String,
    optional: true,
  },
  removed: {
    type: Boolean,
    defaultValue: false,
  },
  removedAt: {
    type: Date,
    optional: true,
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) return new Date();
    },
  },
  updatedAt: {
    type: Date,
    autoValue() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    optional: true,
  },
});

Course.attachSchema(Course.schema);

export default Course;
