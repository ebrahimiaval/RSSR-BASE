import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import {api} from "../../setup/api";
import {route} from "../../setup/route";
import {axios} from "../../setup/utility/axios";
import {fecher} from "../../component/fetcher/fetcher";
import "./home.scss";





class Home extends Component {

    static redux = 'home';
    static fetch() {
        return axios({
            // timeout: IS_SERVER ? 20 : 1000,
            // url: api.s404 + '?mocky-delay=50ms',
            // url: api.s200_posts + '?mocky-delay=50ms',
            url: api.posts,
            // token: true,
            // token: '',
            // token: [''],
            // headers: {sample: '---sample---'},
            // baseURL: false,
        })
        // .then((response) => {
        //     ''.map(() => '');
        //
        //     return response;
        //
        //     // storeState.home = response.data;
        // })
        // .catch(function (error) {
        //     if (error.response)
        //         if (error.response.status === 504) {
        //             error.response.data = {error: true, message: 'oh, noooo!'};
        //             return error.response;
        //         }
        //
        //     throw error;
        // });
    }


    render() {
        const {home} = this.props;

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
    }
}



// HOC
Home = fecher(Home);

export default Home;
