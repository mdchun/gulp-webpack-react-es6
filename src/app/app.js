var Router = ReactRouter;
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var NotFoundRoute = Router.NotFoundRoute;

var PageHome = require('../pages/home');
var PageDetail = require('../pages/detail');
var PageError = require('../pages/error');

class App extends React.Component {
    render() {
        return (<div>
            <RouteHandler/>
        </div>)
    }
}

var routes = (
    <Route name="app" path="/" handler={App}>
        <DefaultRoute handler={PageHome}/>
        <Route name="home" handler={PageHome}/>
        <Route name="detail" handler={PageDetail}/>
        <NotFoundRoute handler={PageError}/>
    </Route>
);

Router.run(routes, function (Handler, state) {
    React.render(<Handler/>, document.getElementById('App'));
});