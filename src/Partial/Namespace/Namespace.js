import PropTypes from 'prop-types';
import config from "../../../namespace";

let list = {};

function rebuildList() {
    list = {}

    config.namespace.forEach(function (item, index) {
        list[item] = config.prefix + item[0] + index
    })
}

const Namespace = ({children, namespace}) => {
    const chd = {...children};
    const chdProps = {...chd.props};

    if (list[namespace] === undefined)
        rebuildList();

    chdProps.id = list[namespace];

    chd.props = chdProps;
    return chd;
}

Namespace.propTypes = {
    namespace: PropTypes.oneOf(config.namespace).isRequired
}

export default Namespace;
