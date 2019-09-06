import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import {browserHistory} from "../../setup/browserHistory";


class Error404 extends Component {
    render() {
        return (
            <div id="e404" className="container-fluid mb-3">
                <Helmet title="متاسفانه صفحه مورد نظر یافت نشد!"/>
                <div className="row">
                    <div className="col-12 text-center">
                        <h4 className="py-5">متاسفانه صفحه مورد نظر پیدا نشد!</h4>
                        <img src="/asset/img/error-404.png" alt="page not found" width="300"/>
                        <br/>
                        <button className="btn btn-secondary ml-3 mt-4" onClick={() => browserHistory.goBack()}>
                            <i className="fa fa-angle-right font-weight-bold ml-1"></i>
                            بازگشت
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Error404;
