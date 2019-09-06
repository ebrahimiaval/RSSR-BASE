import React from 'react';
import {Helmet} from "react-helmet";

const ProcessError = props => {
    const isDevEnv = process.env.NODE_ENV === 'development';

    return (
        <div className="p-5">
            <Helmet title="خطای پردازش"/>
            {
                !isDevEnv ?
                    <div className="px-3 pb-3" dir="rtl">
                        <h2>خطای پردازش</h2>
                        <p>متاسفانه در طول پردازش خطایی رخ داده است، در صورت امکان به صفحه قبل بازگردید و با پشتیبانی تماس بگیرید.</p>
                    </div>
                    : ''
            }
            <div className="alert alert-danger text-right" dir="ltr">
                {props.error.message}
            </div>
            {
                isDevEnv ?
                    <pre className="px-3 text-right">{props.error.stack}</pre>
                    :
                    <script dangerouslySetInnerHTML={{__html: 'console.log(`' + JSON.stringify(props.error.stack) + '`)'}}/>
            }
        </div>
    )
}


export default ProcessError;