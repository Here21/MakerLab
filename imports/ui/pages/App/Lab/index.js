import React, { Component } from 'react';
import { Carousel } from 'antd';
import PropTypes from 'prop-types';
import LabCard from '../../../components/LabCard';
import './style.scss';

export default class Lab extends Component {
  render() {
    const { labs } = this.props;
    return (
      <div className="lab-page">
        <div className="lab-carousel">
          <Carousel autoplay>
            <div>
              <h3></h3>
            </div>
            <div>
              <h3></h3>
            </div>
          </Carousel>
        </div>
        <div className="lab-card-list">
          {
            labs && labs.map(lab => <LabCard key={lab._id} lab={lab} />)
          }
        </div>
      </div>
    );
  }
}

Lab.propTypes = {
  labs: PropTypes.array,
};
