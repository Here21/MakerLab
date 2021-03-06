import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Labs from '../../../api/documents/collections/labs';
import Loading from '../../components/Loading';
import MyLab from '../../pages/Dashboard/MyLab';

const composer = ({ params }, onData) => {
  const userId = Meteor.userId();
  const labs = Meteor.subscribe('labs.ownerLabs', userId);
  if (labs.ready()) {
    const data = Labs.find({}).fetch();
    onData(null, { data });
  }
};

export default composeWithTracker(composer, Loading)(MyLab);
