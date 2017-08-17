import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading';
import CoursePage from '../../pages/App/CourserPage';

import Course from '../../../api/documents/collections/course';

const composer = async ({ params }, onData) => {
  const courses = Meteor.subscribe('course.findOne');
  // TODO: user.all 不合适
  const users = Meteor.subscribe('user.all');

  if (courses.ready() && users.ready()) {
    const course = Course.findOne({ _id: params.courseId });
    const user = Meteor.users.findOne({ _id: course.ownerId }, { fields: { profile: 1 } });
    console.log(user)
    onData(null, { data: course, user });
  }
};

export default composeWithTracker(composer, Loading)(CoursePage);
