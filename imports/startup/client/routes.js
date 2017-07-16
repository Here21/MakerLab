import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import NotFound from '../../ui/pages/NotFound.js';

// App
import App from '../../ui/pages/App';
import Home from '../../ui/pages/App/Home';
import Lab from '../../ui/pages/App/Lab';
import Course from '../../ui/pages/App/Course';
import Project from '../../ui/pages/App/Project';
import Login from '../../ui/pages/App/Login';
import SecondaryPage from '../../ui/pages/App/SecondaryPage';

// Dashboard
import Dashboard from '../../ui/pages/Dashboard';
import Me from '../../ui/pages/Dashboard/Me';
import MyLab from '../../ui/containers/dashboard/MyLab';
import MyCourse from '../../ui/pages/Dashboard/MyCourse';
import LabEditor from '../../ui/pages/Dashboard/LabEditor';


Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route component={App}>
        {/* Redirects */}
        <Redirect from="/" to="/home" />
        <Redirect from="/dashboard" to="/dashboard/me" />

        <IndexRoute component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/lab" component={Lab} />
        <Route path="/course" component={Course} />
        <Route path="/project" component={Project} />
        <Route path="/login" component={Login} />
        <Route path="/lab/:labId" component={SecondaryPage} />
        <Route path="/course/:courseId" component={SecondaryPage} />
        <Route path="/project/:projectId" component={SecondaryPage} />
      </Route>
      <Route component={Dashboard}>
        <IndexRoute component={Me} />
        <Route path="/dashboard/me" component={Me} />
        <Route path="/dashboard/lab" component={MyLab} />
        <Route path="/dashboard/lab/new" component={LabEditor} />
        <Route path="/dashboard/course" component={MyCourse} />
      </Route>
      <Route path="*" component={ NotFound } />
    </Router>,
    document.getElementById('react-root')
  );
});
