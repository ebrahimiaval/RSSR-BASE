import {storage} from "../../../setup/utility/storage";
import {setLocalUserAsGuest} from "./setLocalUserAsGuest";
import {authentication} from "./authentication";

export const firstSetup = function () {
    const token = storage.get('localUserToken');
    if (token === null) {
        // Guest user
        setLocalUserAsGuest();
    } else {
        // Real user
        // when token exist mean in the past one user loged in
        // but does not mean user is a valid user, so token need authentication.
        //
        // when server say token is valid then it's a Real and Valid user, and
        // when server say is NOT valid then runing signingOut() method and
        // set user as Guest user and remove token from localstorage.
        authentication(token)
            .then(() => {
                /**
                 * @@@ GET_USER_CART
                 */
            })
            .catch(() => {
                /**
                 * @@@ Clear_USER_Cart
                 */
            });
    }
}