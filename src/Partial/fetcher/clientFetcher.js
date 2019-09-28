import React, {Component} from 'react';
import {connect, setStore} from "trim-redux";
import {defaultState} from "../../setup/store";
import {clientQueryString} from "../../setup/utility/clientQueryString";
import {isErrorData} from "../../setup/utility/isErrorData";
import {responseValidation} from "../../setup/utility/responseValidation";
import {convertErrorToResponse} from "../../setup/utility/convertErrorToResponse";
import DefaultErrors from "./DefaultErrors";


/**
 *  provider Fetcher HOC of client side
 *
 * Fetcher is a HOC and wrap 'TheComponent'
 * to can handel fetching data actions of 'TheComponent'.
 * Fetcher in client contian all fetch actions.
 *
 * @param TheComponent : React Compoentn
 * @returns {Fecher} : Fetcher HOC of client side
 */
export const clientFetcher = function (TheComponent) {

    const stateName = TheComponent.redux;

    class Fecher extends Component {
        constructor(props) {
            super(props);

            // params passed to fetch() on the client ::1::
            this.ftechParams = {
                match: this.props.match,
                query: clientQueryString()
            };

            let needClientFetch;
            try {
                needClientFetch = JSON.stringify(this.props[stateName]) === JSON.stringify(defaultState[stateName])
            } catch (e) {
                console.error('⚠ data is not valid.', e);
            }

            if (needClientFetch)
                this.fetchProvider();
            else
                this.logger(false);
        }





        // fetch data and insert to redux
        fetchProvider() {
            this.logger(true);

            // ::2::
            TheComponent
                .fetch(this.ftechParams)
                .then((response) => {
                    // excute 'throw new Error' if response is not valid
                    responseValidation(response);
                    setStore(stateName, response.data);
                })
                .catch(function (error) {
                    const response = convertErrorToResponse(error);
                    setStore(stateName, response.data);
                })
        }




        // log fetch type in development environment
        logger(inClient) {
            if (JSON.parse(process.env.RSSR_FETCHER_LOGGER))
                console.info((inClient ? '🙎‍♂️' : '🌎') + ' fetch ' + this.props.match.url + ' in ' + (inClient ? 'client' : 'server'));
        }





        resetDataHolder() {
            const defaultValue = defaultState[stateName];
            setStore(stateName, defaultValue);
        }





        /**
         *  update when route update. for example click on like '/post/2' in mounted component with path '/post/1'
         */
        componentDidUpdate(prevProps) {
            if (this.props.location.key === prevProps.location.key)
                return;

            // update match
            this.ftechParams.match = this.props.match;

            // to show loading
            this.resetDataHolder();

            // get data of new route
            this.fetchProvider();

        }





        componentWillUnmount() {
            // then clear state to refetching data on next mounting
            this.resetDataHolder();
        }





        render() {
            const data = this.props[stateName];
            if (isErrorData(data))
                return <DefaultErrors data={data}/>

            return <TheComponent {...this.props}/>;
        }
    }


    return connect(s => ({[stateName]: s[stateName]}))(Fecher);
}
