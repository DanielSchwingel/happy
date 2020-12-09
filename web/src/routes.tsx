import React, { useContext } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import { AuthContext } from './contexts/AuthContext';
import history from './utils/history';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Orphanages from './pages/Orphanages';

function PrivateRoute({ ...rest }) {
	const { signed } = useContext(AuthContext);
	console.log(signed);
	if (!signed) {
		return <Redirect to='/login'/>
		
	}
	return (
		<Route {...rest} />
	)
}

function Routes() {
	return (
		<Router history={history}> 
			<Switch>
				<Route path='/' component={Landing} exact/>
				<Route path='/app' component={OrphanagesMap}/>
				<Route path='/login' component={Login}/>
				<Route path='/forgot-password' component={ForgotPassword}/>
				<Route path='/reset-password' component={ResetPassword}/>
				<Route path='/orphanages/create' component={CreateOrphanage}/>
				<Route path='/orphanages/:id' component={Orphanage}/>
				<PrivateRoute path='/orphanages' component={Orphanages}/>
			</Switch>
		</Router>

	)
}

export default Routes;