import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading';
import CoursePage from '../../pages/App/Course';

import Course from '../../../api/documents/collections/course';

const composer = async ({ params }, onData) => {
  const courses = Meteor.subscribe('course.all');
  const users = Meteor.subscribe('user.all');
  if (courses.ready() && users.ready()) {
    const data = Course.find().fetch();
    data.forEach((course) => {
      const user = Meteor.users.findOne({ _id: course.ownerId }, { fields: { profile: 1 } });
      course.user = user;
    });
    onData(null, { courses: data });
  }
};

export default composeWithTracker(composer, Loading)(CoursePage);
