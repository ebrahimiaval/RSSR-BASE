import React, {Fragment, useEffect} from 'react';
import {Helmet} from "react-helmet";
import {ToastContainer} from 'react-toastify';
import Router from "../Component/Router/Router";
import Menu from "../Partial/Menu/Menu";
import FirstLoading from "../Partial/FirstLoading/FirstLoading";
import {firstSetup} from "../Partial/Auth/action/firstSetup";
import SignInModal from "../Partial/Auth/SignInModal";
import SignUpModal from "../Partial/Auth/SignUpModal";
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
