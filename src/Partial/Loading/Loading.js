import PropTypes from 'prop-types';
import "./loadingEffect.scss";

const Loading = (props) => {
    const {isLoading, reloading, children} = props;
    const copy = {
        props: {...props},
        children: {...children},
        childrenProps: {...children.props}
    }

    // add loading class
    if (isLoading || reloading) {
        if (children.props.className === undefined)
            copy.childrenProps.className = '';

        if (isLoading) {
            copy.childrenProps.className += " loading-animate";
            delete copy.props.isLoading;
        }

        if (reloading) {
            copy.childrenProps.className += " reload-animate";
            delete copy.props.reloading;
        }

        copy.children.props = copy.childrenProps;
    }

    copy.children.props = {...copy.childrenProps, ...copy.props}

    return copy.children;
}

Loading.propTypes = {
    isLoading: PropTypes.bool,
    reloading: PropTypes.bool,
}

export default Loading;
