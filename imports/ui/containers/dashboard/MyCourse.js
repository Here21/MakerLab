import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Course from '../../../api/documents/collections/course';
import Loading from '../../components/Loading';
import MyCourse from '../../pages/Dashboard/MyCourse';


const composer = ({ params }, onData) => {
  const userId = Meteor.userId();
  const course = Meteor.subscribe('course.ownerCourse', userId);
  if (course.ready()) {
    const data = Course.find({}).fetch();
    onData(null, { data });
  }
};

export default composeWithTracker(composer, Loading)(MyCourse);
