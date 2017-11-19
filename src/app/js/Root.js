import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import DocumentTitle from 'react-document-title';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createHashHistory } from 'history';

const Root = ({ store, routes, admin = false }) => {
    const history = syncHistoryWithStore(admin ? createHashHistory() : browserHistory, store);
    const pageTitle = /https?:\/\/([\w-]+)/.exec(process.env.EZMASTER_PUBLIC_URL)[1];
    return (
        <DocumentTitle title={pageTitle}>
            <Provider {...{ store }}>
                <MuiThemeProvider>
                    <Router {...{ history, routes }} />
                </MuiThemeProvider>
            </Provider>
        </DocumentTitle>
    );
};

Root.propTypes = {
    routes: PropTypes.object.isRequired, // eslint-disable-line
    store: PropTypes.object.isRequired, // eslint-disable-line
};

export default Root;
