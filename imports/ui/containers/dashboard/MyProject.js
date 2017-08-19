import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Project from '../../../api/documents/collections/project';
import Loading from '../../components/Loading';
import MyProject from '../../pages/Dashboard/MyProject';


const composer = ({ params }, onData) => {
  const userId = Meteor.userId();
  const course = Meteor.subscribe('project.ownerProject', userId);
  if (course.ready()) {
    const data = Project.find({}).fetch();
    onData(null, { data });
  }
};

export default composeWithTracker(composer, Loading)(MyProject);
