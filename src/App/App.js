import React, {Fragment, useEffect} from 'react';
import {Helmet} from "react-helmet";
import {ToastContainer} from 'react-toastify';
import Router from "../component/Router";
import Menu from "../component/Menu/Menu";
import FirstLoading from "../component/FirstLoading";
import {firstSetup} from "../component/Auth/action/firstSetup";
import SignInModal from "../component/Auth/SignInModal";
import SignUpModal from "../component/Auth/SignUpModal";
import "./app.scss";


function App() {
    useEffect(() => {
        // user Authentication, get cart, set theme and more.
        firstSetup();
    }, []);

    return (
        <Fragment>
            <FirstLoading/>
            <Menu/>
            <Router/>
            <Helmet defaultTitle="React Server Side Rendering"/>
            <SignInModal/>
            <SignUpModal/>
            <ToastContainer rtl={true}/>
        </Fragment>
    );
};

export default App;
