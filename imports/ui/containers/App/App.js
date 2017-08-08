import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading';
import AppPage from '../../pages/App';

const composer = ({ params }, onData) => {
  const currentUser = Meteor.user()
  if (currentUser) {
    onData(null, { user: currentUser });
  }
  onData(null, { user: null });
};

export default composeWithTracker(composer, Loading)(AppPage);
