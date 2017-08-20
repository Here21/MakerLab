import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading';
import LabPage from '../../pages/App/Lab';

import Lab from '../../../api/documents/collections/labs';

const composer = async ({ params }, onData) => {
  const labs = Meteor.subscribe('labs.all');
  const users = Meteor.subscribe('user.all');
  if (labs.ready() && users.ready()) {
    const data = Lab.find({}, { sort: { createdAt: -1 } }).fetch();
    data.forEach((lab) => {
      const user = Meteor.users.findOne({ _id: lab.ownerId }, { fields: { profile: 1 } });
      lab.user = user;
    });
    onData(null, { labs: data });
  }
};

export default composeWithTracker(composer, Loading)(LabPage);
