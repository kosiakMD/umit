import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';
import '../imports/api/icpc.js';

import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import { render } from 'react-dom';
// import { Router, Route, IndexRoute, browserHistory } from 'react-router';
// import { StaticRouter } from 'react-router-dom';
// import { StaticRouter as Router, Route} from 'react-router-dom';
// import App from '../imports/ui/App';

// import '../imports/routes';

// import { createServer } from 'http';

// createServer((req, res) => {
//
//     // This context object contains the results of the render
//     const context = {}
//
//     const html = ReactDOMServer.renderToString(
//         <StaticRouter location={req.url} context={context}>
//             <App/>
//         </StaticRouter>
//     )
//
//     // context.url will contain the URL to redirect to if a <Redirect> was used
//     if (context.url) {
//         res.writeHead(302, {
//             Location: context.url
//         })
//         res.end()
//     } else {
//         res.write(html)
//         res.end()
//     }
// }).listen(4000)

// import fs from 'fs';
// let html = fs.readFile('/client/main.js', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

// fs.readdir('./', (err, files) => {
//     if (err) throw err;
//     console.log(files);
// });

// import '../imports/routes';

console.log(Meteor.isServer);
Meteor.startup(() => {
  // code to run on server at startup
    console.info('Server is running good');
    // const context = {}

    /*const html = ReactDOMServer.renderToString(
        <StaticRouter
            location={'/'}
            context={context}
        >
            <div >Hello</div>
            {/!*<App/>*!/}
        </StaticRouter>
    )*/

    // if (context.url) {
    //     res.writeHead(301, {
    //         Location: context.url
    //     })
    //     res.end()
    // } else {
    // res.write(`
    //   <!doctype html>
    //   <div id="app">${html}</div>
    //`)
    //     res.end()
    // }
    // render(<App/>,this)
    // console.log(arguments)
    // return html;
    // return '<!doctype html>';

    // render(
    //     <StaticRouter location={'/'} context={{}}>
    //         <App/>
    //     </StaticRouter>,
    //     // <Router history={browserHistory} >
    //     //     <Route path="/" component={App} />
    //     // </Router>,
    //     document.getElementById('render-target')
    // );
//
    /*render(
        <StaticRouter
            basename={'/'}
            forceRefresh={false}
            //getUserConfirmation={optionalFunc}
            //keyLength={optionalNumber}
        >
            <App/>
        </StaticRouter>,
        // <Router history={browserHistory} >
        //     <Route path="/" component={App} />
        // </Router>,
        document.getElementById('render-target')
    );*/
});
