import React, {useEffect} from 'react';

const FirstLoading = () => {
    useEffect(() => {
        const wrap = document.getElementById('app-loading');

        if (wrap)
            wrap.style.display = 'none';
    }, []);

    return process.env.NODE_ENV !== 'production' ? <div className="loading" id="app-loading"></div> : '';
};

export default FirstLoading;
