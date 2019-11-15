import React, {Component, createRef} from 'react';
import {IS_BROWSER} from "../../setup/constant";
import PropTypes from 'prop-types';

const Flickity = IS_BROWSER ? require('flickity') : undefined;

class Slider extends Component {

    constructor(props) {
        super(props);
        this.wrap = createRef();
    }

    setFlickity() {
        const {options} = this.props;

        this.flkty = new Flickity(this.wrap.current, options);

        if (options.actions)
            options.actions(this.flkty, this.wrap.current)
    }

    componentDidMount() {
        this.setFlickity();
    }


    shouldComponentUpdate(nextProps, nextState) {
        const listExist = !!this.props.list && !!nextProps.list;

        if (listExist && (JSON.stringify(this.props.list) === JSON.stringify(nextProps.list)))
            return false;

        this.flkty.destroy();
        return true;
    }

    componentDidUpdate() {
        this.setFlickity();
    }

    componentWillUnmount() {
        this.flkty.destroy();
    }

    render() {
        const {className, children} = this.props;
        return (
            <div ref={this.wrap} className={className}>
                {children}
            </div>
        );
    }
}

Slider.propTypes = {
    options: PropTypes.object,
    className: PropTypes.string,
    list: PropTypes.array
};

export default Slider;
