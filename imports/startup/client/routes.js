import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import NotFound from '../../ui/pages/NotFound/index.js';

// App
// import App from '../../ui/pages/App';
import App from '../../ui/containers/App/App';
import Home from '../../ui/pages/App/Home';
import Lab from '../../ui/containers/App/Lab';
import Course from '../../ui/containers/App/Course';
import Project from '../../ui/pages/App/Project';
import Login from '../../ui/pages/App/Login';
import LabPage from '../../ui/containers/App/LabPage';
import ProjectPage from '../../ui/pages/App/ProjectPage';

// Dashboard
import Dashboard from '../../ui/pages/Dashboard';
import ProfileSettings from '../../ui/containers/dashboard/ProfileSettings';
import MyLab from '../../ui/containers/dashboard/MyLab';
import MyCourse from '../../ui/containers/dashboard/MyCourse';
import LabEditor from '../../ui/pages/Dashboard/LabEditor';
import CourseEditor from '../../ui/pages/Dashboard/CourseEditor';


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
        <Route path="/lab/:labId" component={LabPage} />
        <Route path="/course/:courseId" component={LabPage} />
        <Route path="/project/:projectId" component={ProjectPage} />
      </Route>
      <Route component={Dashboard}>
        <IndexRoute component={ProfileSettings} />
        <Route path="/dashboard/me" component={ProfileSettings} />
        <Route path="/dashboard/lab" component={MyLab} />
        <Route path="/dashboard/course" component={MyCourse} />
        <Route path="/dashboard/lab/new" component={LabEditor} />
        <Route path="/dashboard/course/new" component={CourseEditor} />
      </Route>
      <Route path="*" component={ NotFound } />
    </Router>,
    document.getElementById('react-root')
  );
});
