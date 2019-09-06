import React from 'react';
import serialize from "serialize-javascript";
import als from "async-local-storage";


export default function (props) {
    const
        {renderedApp, helmet, error} = props,
        htmlAttrs = helmet.htmlAttributes.toComponent(),
        bodyAttrs = helmet.bodyAttributes.toComponent();

    // transfer data from server to client
    let dataTransfer;
    if (!error) {
        const updatedState = als.get('updatedState');
        if (updatedState !== undefined)
            dataTransfer = 'RSSR_UPDATED_REDUX_STATES =' + serialize(updatedState);
    } else {
        dataTransfer = 'RSSR_PROCCESS_ERROR = true'; //::4::
    }

    return (
        <html lang="fa" {...htmlAttrs}>
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <meta name="theme-color" content="#c90065"/>
            <link rel="manifest" href="/manifest.json"/>
            {helmet.title.toComponent()}
            {helmet.meta.toComponent()}
            {helmet.link.toComponent()}
            <link rel="shortcut icon" href="/fav.ico" type="image/icon"/>
            <link rel="stylesheet" href={`/dist/styles.css?v=${process.env.VERSION}`}/>
        </head>
        <body className="rtl" {...bodyAttrs}>
            <div id="app-root" dangerouslySetInnerHTML={{__html: renderedApp}}></div>
            {
                dataTransfer ? <script dangerouslySetInnerHTML={{__html: dataTransfer}}/> : ''
            }
            <script src={`/dist/client.js?v=${process.env.VERSION}`}></script>
        </body>
        </html>
    );
}