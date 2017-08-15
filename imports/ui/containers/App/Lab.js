import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading';
import LabPage from '../../pages/App/Lab';

import Lab from '../../../api/documents/collections/labs';

const composer = async ({ params }, onData) => {
  const labs = Meteor.subscribe('labs.valid');
  const users = Meteor.subscribe('user.all');
  console.log(users.ready());
  if (labs.ready() && users.ready()) {
    const data = Lab.find().fetch();
    data.forEach((lab) => {
      const user = Meteor.users.findOne({ _id: lab.ownerId }, { fields: { profile: 1 } });
      console.log(user);
      lab.user = user;
    });
    // const files = data.map(async (lab) => {
    //   return new Promise((resolve, reject) => {
    //
    //   });
    // });
    // return Promise.all(files);
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    onData(null, { labs: data });
  }
  // onData(null, { });
};

export default composeWithTracker(composer, Loading)(LabPage);
