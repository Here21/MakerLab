import React, { Component } from 'react';
import LabCard from '../../../components/LabCard';
import './style.scss';

export default class Lab extends Component {
  render() {
    // const data = this.props.data;
    console.log(this.proos)
    return (
      <div className="lab-page">
        <LabCard />
        <LabCard />
        <LabCard />
        <LabCard />
        <LabCard />
        <LabCard />
        <LabCard />
      </div>
    );
  }
}
