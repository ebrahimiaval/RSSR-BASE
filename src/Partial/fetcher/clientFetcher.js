import React, {Component} from 'react';
import {connect, setStore} from "trim-redux";
import {defaultState} from "../../setup/store";
import {clientQueryString} from "../../setup/utility/clientQueryString";
import {isErrorData} from "../../setup/utility/isErrorData";
import {responseValidation} from "../../setup/utility/responseValidation";
import {convertErrorToResponse} from "../../setup/utility/convertErrorToResponse";
import DefaultErrors from "./DefaultErrors";
import axios from "axios";


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
            } catch (err) {
                console.error('⚠ data is not valid.', err);
            }

            if (needClientFetch)
                this.fetchProvider();
            else
                this.debugLog(false);
        }





        // fetch data and insert to redux ::2::
        fetchProvider() {
            this.debugLog(true);

            const request = TheComponent.fetch(this.ftechParams);

            this.cancelRequest = request.cancel;

            request.then((response) => {
                responseValidation(response);
                setStore(stateName, response.data);
            })
                .catch(function (err) {
                    // ignore canceled request
                    if (axios.isCancel(err))
                        return;

                    const response = convertErrorToResponse(err);
                    setStore(stateName, response.data);
                })
                .finally(() => {
                    delete this.cancelRequest;
                })
        }




        // log fetch type in development environment
        debugLog(inClient) {
            if (JSON.parse(process.env.RSSR_FETCHER_DEBUG))
                console.info((inClient ? '🙎‍♂️' : '🌎') + ' fetch ' + this.props.match.url + ' in ' + (inClient ? 'client' : 'server'));
        }





        resetDataHolder() {
            const defaultValue = defaultState[stateName];
            setStore(stateName, defaultValue);

            // when try to fetch but last equal fetch was not complited
            if (this.cancelRequest) {
                this.cancelRequest();
                delete this.cancelRequest;
            }
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
