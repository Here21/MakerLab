import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading';
import LabPage from '../../pages/App/LabPage';

import Lab from '../../../api/documents/collections/labs';
import User from '../../../api/documents/collections/user';

const composer = async ({ params }, onData) => {
  const labs = Meteor.subscribe('labs.specialLabId', params.labId);
  const users = Meteor.subscribe('user.all');

  if (labs.ready() && users.ready()) {
    const data = Lab.findOne({ _id: params.labId });
    console.log(data);
    const user = User.findOne({ _id: data.ownerId });
    console.log(user);
    onData(null, { data, user });
  }
};

export default composeWithTracker(composer, Loading)(LabPage);
