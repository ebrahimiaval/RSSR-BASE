import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';

const Flickity = typeof window !== 'undefined' ? require('flickity') : undefined;

class Slider extends Component {

    constructor(props) {
        super(props);
        this.wrap = createRef();
    }


    set() {
        const {options, isDisable} = this.props;

        if (isDisable)
            return '';

        this.flkty = new Flickity(this.wrap.current, options);

        if (options && options.actions)
            options.actions(this.flkty, this.wrap.current)
    }


    unset() {
        if (!this.props.isDisable && this.flkty)
            this.flkty.destroy();
    }


    componentDidMount() {
        this.set();
    }


    shouldComponentUpdate(nextProps, nextState) {
        const listExist = !!this.props.list && !!nextProps.list;

        // ignore update when parent component update but slider list does not changes
        if (listExist && (JSON.stringify(this.props.list) === JSON.stringify(nextProps.list)))
            return false;

        this.unset()

        return true;
    }


    componentDidUpdate() {
        this.set();
    }


    componentWillUnmount() {
        this.unset()
    }


    render() {
        const {className, children, elementType} = this.props;
        const elmType = elementType || 'div';
        return (
            React.createElement(
                elmType,
                {
                    ref: this.wrap,
                    className: className
                },
                [...children]
            )
        )
    }
}

Slider.propTypes = {
    options: PropTypes.object,
    elementType: PropTypes.string,
    className: PropTypes.string,
    list: PropTypes.array,
    isDisable: PropTypes.bool
};

export default Slider;
