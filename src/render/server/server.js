import als from "async-local-storage";
import {render} from "./render/render";
import {fetchProvider} from "./fetchProvider";
import {initialize} from "./initialize";


export default function serverRenderer() {
    // start async-local-storage
    als.enable();

    return (req, res) => {
        // each request need unique scope to can define and work with variables over the request
        als.scope();

        const
            timerStart = Date.now(),// use in errorLogger for calculate proccess time
            response = (error) => render(error, req, res, timerStart); // make response

        try {
            // define basic parameters
            initialize(req);

            // call fetch() of component and get data
            fetchProvider(req)
                .then(() => response()) // get data successfully
                .catch((e) => response(e)); // occur error in fetchProvider() or render()
        } catch (e) {
            response(e) // occur error in try
        }
    };
}
