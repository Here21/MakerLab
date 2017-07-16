import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../components/Loading';
import Lab from '../pages/App/Lab';

import BodyData from '../../api/documents/collections/lab';


const composer = ({ params }, onData) => {
  const userId = Meteor.userId();
  const bodyData = Meteor.subscribe('bodyData.isExisted', userId);
  if (bodyData.ready()) {
    const existed = BodyData.findOne({ userId });
    onData(null, { existed, userId });
  }
  // onData(null, {});
};

export default composeWithTracker(composer, Loading)(Lab);
