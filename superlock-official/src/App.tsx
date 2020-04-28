import React from 'react';
import { Router } from 'reach-router';
import Home from './views/Home';

import './less/reset.less';
import './less/common.less';

namespace App {
    export interface Props {}

    export interface State {
        title: string;
    }
}

class App extends React.Component<App.Props, App.State> {
    constructor(props: App.Props, context?: any) {
        super(props, context);
        this.state = {
            title: '',
        };
    }

    render() {
        return (
            <Router mode="hash">
                <Home path="/" />
            </Router>
        );
    }
}

export default App;
