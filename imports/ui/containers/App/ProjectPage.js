import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading';
import ProjectPage from '../../pages/App/ProjectPage';

import Project from '../../../api/documents/collections/project';

const composer = async ({ params }, onData) => {
  const projectId = params.projectId;
  const projectSub = Meteor.subscribe('project.findProjectById', projectId);
  // TODO: user.all 不合适
  const users = Meteor.subscribe('user.all');

  if (projectSub.ready() && users.ready()) {
    const project = Project.findOne({ _id: projectId });
    const user = Meteor.users.findOne({ _id: project.ownerId }, { fields: { profile: 1 } });
    onData(null, { data: project, user: user.profile });
  }
};

export default composeWithTracker(composer, Loading)(ProjectPage);
