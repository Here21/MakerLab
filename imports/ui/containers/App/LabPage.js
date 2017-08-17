import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading';
import LabPage from '../../pages/App/LabPage';

import Lab from '../../../api/documents/collections/labs';
import User from '../../../api/documents/collections/user';
import Course from '../../../api/documents/collections/course';

const composer = async ({ params }, onData) => {
  const labs = Meteor.subscribe('labs.specialLabId', params.labId);
  const users = Meteor.subscribe('user.all');

  if (labs.ready() && users.ready()) {
    const data = Lab.findOne({ _id: params.labId });
    const ownerId = data.ownerId;
    Meteor.subscribe('course.ownerCourse', ownerId);
    const user = User.findOne({ _id: ownerId }, { fields: { profile: 1 } });
    const ownerCourse = Course.find({ ownerId }).fetch();

    ownerCourse.forEach((course) => {
      course.user = user;
    });

    console.log(ownerCourse);
    onData(null, { data, user, courses: ownerCourse });
  }
};

export default composeWithTracker(composer, Loading)(LabPage);
