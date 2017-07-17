import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Loading from '../../components/Loading';
import MyLab from '../../pages/Dashboard/MyLab';

import Labs from '/imports/api/documents/collections/labs/';

const composer = ({ params }, onData) => {
  const labs = Meteor.subscribe('labs.all');
  // const data = [
  //   {
  //     key: 1,
  //     img: '/maker_lab_icon.png',
  //     name: 'MakerLab',
  //     researchDirection: '移动互联网',
  //     likes: 22,
  //     createdAt: '2017-04-11'
  //   },
  //   {
  //     key: 2,
  //     img: '/maker_lab_icon.png',
  //     name: 'MakerLab',
  //     researchDirection: '移动互联网',
  //     likes: 22,
  //     createdAt: '2017-04-11'
  //   },
  //   {
  //     key: 3,
  //     img: '/maker_lab_icon.png',
  //     name: 'MakerLab',
  //     researchDirection: '移动互联网',
  //     likes: 22,
  //     createdAt: '2017-04-11'
  //   },
  //   {
  //     key: 4,
  //     img: '/maker_lab_icon.png',
  //     name: 'MakerLab',
  //     researchDirection: '移动互联网',
  //     likes: 22,
  //     createdAt: '2017-04-11'
  //   }
  // ];
  if (labs.ready()) {
    const data = Labs.find({}).fetch();
    onData(null, { data });
    return;
  }
  onData(null, { data: [] });
};

export default composeWithTracker(composer, Loading)(MyLab);
