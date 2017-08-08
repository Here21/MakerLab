import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading';
import LabPage from '../../pages/App/Lab';



const composer = ({ params }, onData) => {
  const labs = Meteor.subscribe('labs.valid');
  console.log('here');
  if (labs.ready()) {
    const data = Lab.find();
    console.log(data.fetch());
    onData(null, { labs: data.fetch() });
  }
  // onData(null, { });
};

export default composeWithTracker(composer, Loading)(LabPage);
