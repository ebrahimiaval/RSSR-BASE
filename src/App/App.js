import React, {Fragment, useEffect} from 'react';
import {Helmet} from "react-helmet";
import {ToastContainer} from 'react-toastify';
import Router from "../Partial/Router/Router";
import Menu from "../Component/Menu/Menu";
import FirstLoading from "../Component/FirstLoading/FirstLoading";
import {firstSetup} from "../Component/Auth/action/firstSetup";
import SignInModal from "../Component/Auth/SignInModal";
import SignUpModal from "../Component/Auth/SignUpModal";
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
