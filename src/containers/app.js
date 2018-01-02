import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './header';
import Register from './register';
import SignIn from './sign-in';
import SignOut from './sign-out';
import JuncturesCreate from './create';
import JuncturesList from './list';
import JuncturesEdit from './edit';
import Loading from './loading';
import NotFound from './404';

import Main from '../components/main';
import routes from '../routes';
import {
	watchAuthState,
	watchJuncturesList,
	redirectTo
} from '../actions/actions';

const Home = () => (
	<div>
		<h1>Juncture</h1>
		<p>A point of time, especially one made critical or important by a concurrence of circumstances.</p>
		<p>
			<Link to={routes.register.path}>Register</Link> or <Link to={routes.signIn.path}>Sign In</Link>
		</p>
	</div>
);

const mapStateToProps = ({ router, user, common }) => ({
	router,
	redirectTo: common.redirectTo,
	userAuthenticated: user.authenticated,
	appReady: common.appReady
});

const mapDispatchToProps = (dispatch) => ({
	watchJunctures: () => dispatch(watchJuncturesList()),
	watchAuthState: () => dispatch(watchAuthState()),
	redirect: (path) => dispatch(redirectTo(path))
});

class App extends Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.redirectTo) {
			this.props.redirect(nextProps.redirectTo);
		}

		if (nextProps.userAuthenticated && !this.props.userAuthenticated) {
			this.props.watchJunctures();
		}
	}

	componentDidMount() {
		this.props.watchAuthState();
	}

	render() {
		return (
			<div>
				<Header/>
				<Main>
					{this.props.appReady ? (
						this.props.userAuthenticated ? (
							<Switch>
								<Route
									exact path={routes.home.path}
									component={Home}
								/>
								<Route
									exact path={routes.juncturesCreate.path}
									component={JuncturesCreate}
								/>
								<Route
									exact path={routes.junctures.path}
									component={JuncturesList}
								/>
								<Route
									exact path={routes.juncturesEdit.path}
									component={JuncturesEdit}
								/>
								<Route
									exact path={routes.signOut.path}
									component={SignOut}
								/>
								<Route
									component={NotFound}
								/>
							</Switch>
						) : (
							<Switch>
								<Route
									exact path={routes.home.path}
									component={Home}
								/>
								<Route
									exact path={routes.register.path}
									component={Register}
								/>
								<Route
									exact path={routes.signIn.path}
									component={SignIn}
								/>
								<Route
									component={NotFound}
								/>
							</Switch>
						)
					) : (
						<Loading />
					)}
				</Main>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
