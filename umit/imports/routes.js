/**
 * Created by WebStorm.
 * User: Anton Kosiak
 * Date: 3/19/17
 * Time: 16:02
 */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { StaticRouter, BrowserRouter as Router, Route, Switch, Redirect, Link, NavLink, Match } from 'react-router-dom'

// import { BrowserRouter } from 'react-router-dom';

import App from './ui/App';
import Todos from './ui/todos/containers/Todos';
import Icpc from './ui/icpc/containers/Icpc';
import Group from './ui/icpc/containers/Group';
import Diagnose from './ui/icpc/containers/Diagnose';
import './startup/accounts-config.js';

const RouterConfig = ()=>(
    <div>
        {/*<Match exactly pattern='/todo' component={App}/>,*/}
        {/*<Match pattern='/' component={Page()}/>*/}
    </div>
);

Meteor.startup(() => {
    // render(ReactLayout.render(App), document.getElementById('render-target'));
    // ReactLayout.render(App,);
    // render(<App />, document.getElementById('render-target'));
    render(
        <Router
            basename={'/'}
            forceRefresh={false}
            //getUserConfirmation={optionalFunc}
            keyLength={10}>
            <div>
                {/*<Redirect from="/" to="/index" />*/}
                <Route exact path="/" /*component={App}*/>
                    <App>
                        <Route exact path="/todo" component={Todos}/>
                        <Route exact path="/icpc" component={Icpc}/>
                        <Route exact path="/icpc/:group" component={Group}/>
                        <Route exact path="/icpc/:group/:diagnoseID" component={Diagnose}/>
                    </App>
                </Route>
            </div>
        </Router>,
        // <Router history={browserHistory} >
        //     <Route path="/" component={App} />
        // </Router>,
        document.getElementById('render-target')
    );
});

