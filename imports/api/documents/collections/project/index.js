import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Project = new Mongo.Collection('project');

Project.schema = new SimpleSchema({
  ownerId: {
    type: String,
  },
  projectName: {
    type: String,
  },
  projectSort: {
    type: String,
  },
  projectType: {
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

Project.attachSchema(Project.schema);

export default Project;
