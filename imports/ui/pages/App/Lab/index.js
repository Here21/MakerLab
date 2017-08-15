import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LabCard from '../../../components/LabCard';
import './style.scss';

export default class Lab extends Component {
  render() {
    const { labs } = this.props;
    console.log("in to component!", labs);
    return (
      <div className="lab-page">
        {
          labs && labs.map(lab => <LabCard key={lab._id} lab={lab} />)
        }
      </div>
    );
  }
}

Lab.propTypes = {
  labs: PropTypes.array,
};
