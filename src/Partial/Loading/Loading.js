import PropTypes from 'prop-types';
import "./loadingEffect.scss";

const Loading = theProps => {
    let children = theProps.children;

    // add loading class
    if (theProps.isLoading || theProps.reloading) {
        children = {...children};
        const props = {...children.props};


        if (props.className === undefined)
            props.className = '';

        props.className += theProps.isLoading ? " loading-animate" : "";
        props.className += theProps.reloading ? " reload-animate" : "";

        children.props = props;
    }

    return children;
};

Loading.propTypes = {
    isLoading: PropTypes.bool,
    reloading: PropTypes.bool,
};

export default Loading;
