import React from 'react';
import { Route, Switch } from 'react-router-dom';

import inVite from '../pages/Guest/Invite';

function GuestLayout() {
    return (
        <div>
            <Switch>
                <Route exact path="/invite" component={inVite} />
            </Switch>
        </div>
    );
}
export default GuestLayout;
