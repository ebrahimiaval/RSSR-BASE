import {Component} from 'react';
import PropTypes from 'prop-types';
import {random} from "../../setup/utility/random";

class Breackpoint extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            show: props.server || true
        }
    }


    setFromTo() {
        const points = {
            unlimited: 10000000, // max end
            hl: 1460,
            lhl: 1330,
            xl: 1200,
            lxl: 1096,
            lg: 992,
            llg: 880,
            md: 768,
            lmd: 672,
            sm: 576,
            lsm: 443,
            xs: 310,
            hs: 0// start
        }
        const {from, to} = this.props;
        this.fromPoint = points[from || 'hs']
        this.toPoint = points[to || 'unlimited']
    }


    componentDidMount() {
        this.setFromTo();
        this.resizeEvent = 'resize.bp' + random(1000000000);
        this.$window = $(window);
        this.$window
            .on(this.resizeEvent, () => {
                const width = this.$window.outerWidth();
                const nextValue = this.fromPoint <= width && width <= this.toPoint;
                if (nextValue !== this.state.show)
                    this.setState({show: nextValue})
            })
    }

    componentWillUnmount() {
        this.$window.off(this.resizeEvent)
    }



    render() {
        console.log('render')
        return this.state.show ? this.props.children() : ''
    }
}

Breackpoint.propTypes = {
    server: PropTypes.bool,
    from: PropTypes.string,
    to: PropTypes.string
};

export default Breackpoint;
