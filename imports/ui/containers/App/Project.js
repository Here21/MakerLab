import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading';
import ProjectPage from '../../pages/App/Project';

import Project from '../../../api/documents/collections/project';

const composer = async ({ params }, onData) => {
  const project = Meteor.subscribe('project.all');
  if (project.ready()) {
    const data = Project.find({}, { sort: { createdAt: -1 } }).fetch();
    onData(null, { projects: data });
  }
};

export default composeWithTracker(composer, Loading)(ProjectPage);
