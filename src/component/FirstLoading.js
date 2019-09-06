import React, {Component} from 'react';

class FirstLoading extends Component {
    componentDidMount() {
        const wrap = document.getElementById('app-loading');

        if (wrap)
            wrap.style.display = 'none';
    }

    render() {
        return process.env.NODE_ENV === 'production' ? <div className="loading" id="app-loading"></div> : '';
    }
}

export default FirstLoading;
