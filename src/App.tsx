import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import LoginPage from "./screens/login";
import SpendingPage from "./screens/spendings";
import IncomePage from "./screens/income";
import TotalPage from "./screens/total";
import DataService from "./DataService";
// импортируем сюда экраны

const authorized_routes = [
    {
        path: "/spendings",
        component: SpendingPage
    },
    {
        path: "/income",
        component: IncomePage
    },
    {
        path: '/total',
        component: TotalPage
    },
    {
        path: '/',
        component: () => <Redirect to="/total" />,
    }
]

const AuthRouter = () => (
    <Router>
            <div>
                <Switch>
                    {authorized_routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </div>
    </Router>
)

const routes = [
    {
        path: "/login",
        component: LoginPage
    },
    {
        path: "/",
        render: ({location}: { location: any }) => {
            return DataService.isUserAuthorized() ? (
                <AuthRouter />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {from: location}
                    }}
                />
            );
        }
    }
];

export default function AuthExample() {
    return (
        <Router>
            <div>
                <Switch>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </div>
        </Router>
    );
}

function RouteWithSubRoutes(route: any, extraProps = {}) {
    return (
        <Route
            exact={route.exact}
            path={route.path}
            render={props => route.render
                ? route.render(props)
                : <route.component {...props} {...extraProps} route={route}/>}
            strict={route.strict}
        />
    );
}