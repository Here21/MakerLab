import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading';
import CoursePage from '../../pages/App/CoursePage';

import Course from '../../../api/documents/collections/course';

const composer = async ({ params }, onData) => {
  const courseId = params.courseId;
  const courses = Meteor.subscribe('course.findCourseById', courseId);
  // TODO: user.all 不合适
  const users = Meteor.subscribe('user.all');

  if (courses.ready() && users.ready()) {
    const course = Course.findOne({ _id: courseId });
    const user = Meteor.users.findOne({ _id: course.ownerId }, { fields: { profile: 1 } });
    onData(null, { data: course, user: user.profile });
  }
};

export default composeWithTracker(composer, Loading)(CoursePage);
