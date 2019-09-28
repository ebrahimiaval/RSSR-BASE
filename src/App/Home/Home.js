import React from 'react';
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import {api} from "../../setup/api";
import {route} from "../../setup/route";
import {axios} from "../../setup/utility/axios";
import {fecher} from "../../Partial/fetcher/fetcher";
import "./home.scss";


function Home(props) {
    const {home} = props;

    return (
        <div id="hme" className="container">
            <Helmet title="صفحه ‌اصلی"/>

            <div className="jumbotron mt-3" id="abc">
                <h5>موفقیت اتفاقی نیست!</h5>
                <p className="lead">
                    برای خلق بهترین‌ها باید بیشتر تلاش کرد، چیزی که ساده به دست بیاد، می‌تونه خیلی ساده هم از دست بره.
                </p>
            </div>

            <div className="row">
                {
                    (home.isLoading) ?
                        (
                            <div className="col-24 text-center">
                                <img src="/asset/img/loading.gif" alt="loading"/>
                                <div> در حال بار گذاری مطالب</div>
                            </div>
                        )
                        :
                        (
                            home.map((item) => (
                                <div className="col-md-8 my-2 px-3 animated fadeIn" key={item.id}>
                                    <Link to={route.post(item.id)} className="card">
                                        <div className="card-body">
                                            <h3 className="card-title text-truncate h6">{item.title}</h3>
                                            <p className="card-text text-truncate">{item.body}</p>
                                            <span>مشاهده مطلب</span>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        )
                }
            </div>
        </div>
    );
};


Home.redux = 'home';
Home.fetch = function () {
    return axios({url: api.posts})
}

export default fecher(Home);
