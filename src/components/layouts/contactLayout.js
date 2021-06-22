import React from 'react';
import { Route, Switch } from 'react-router-dom';

import detail from '../pages/Contact/contact';
import howto from '../pages/Contact/howTo';
import contactUs from '../pages/Contact/us';

function ContactLayout() {
    return (
        <div>
            <Switch>
                <Route exact path="/contact" component={detail} />
                <Route path="/contact/howtouse" component={howto} />
                <Route path="/contact/contactus" component={contactUs} />
            </Switch>
        </div>
    );
}
export default ContactLayout;
