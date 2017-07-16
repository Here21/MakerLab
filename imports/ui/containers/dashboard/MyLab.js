import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Loading from '../../components/Loading';
import MyLab from '../../pages/Dashboard/MyLab';

import Lab from '../../../api/documents/collections/lab';


const composer = ({ params }, onData) => {
  const userId = Meteor.userId();
  const labs = Meteor.subscribe('labs.ownerLabs', userId);
  const data = [
    {
      key: 1,
      name: 'MakerLab',
      researchDirection: '移动互联网',
      likes: 22,
      createdAt: '2017-04-11',
    },
    {
      key: 2,
      name: 'MakerLab',
      researchDirection: '移动互联网',
      likes: 22,
      createdAt: '2017-04-11',
    },
    {
      key: 3,
      name: 'MakerLab',
      researchDirection: '移动互联网',
      likes: 22,
      createdAt: '2017-04-11',
    },
    {
      key: 4,
      name: 'MakerLab',
      researchDirection: '移动互联网',
      likes: 22,
      createdAt: '2017-04-11',
    },
  ];
  if (labs.ready()) {
    const myLabs = Lab.find({ ownerId: userId });
    onData(null, { myLabs });
    return;
  }
  onData(null, { data });
};

export default composeWithTracker(composer, Loading)(MyLab);
