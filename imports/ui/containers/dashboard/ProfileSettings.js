import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading';
import ProfileSettings from '../../pages/Dashboard/ProfileSettings';

const composer = ({ params }, onData) => {
  const currentUser = Meteor.user();
  if (currentUser) {
    onData(null, { user: currentUser });
  }
};

export default composeWithTracker(composer, Loading)(ProfileSettings);
