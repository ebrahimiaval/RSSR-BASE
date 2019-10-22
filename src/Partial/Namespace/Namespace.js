import PropTypes from 'prop-types';
import sassNamespace from "../../../sass-namespace";


const Namespace = ({children, namespace}) => {
    const chd = {...children};
    const chdProps = {...chd.props};

    chdProps.id = 'n' + sassNamespace.indexOf(namespace);

    chd.props = chdProps;
    return chd;
};

Namespace.propTypes = {
    namespace: PropTypes.oneOf(sassNamespace).isRequired
};

export default Namespace;
