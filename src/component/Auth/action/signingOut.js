import {storage} from "../../../setup/utility/storage";
import {setLocalUserAsGuest} from "./setLocalUserAsGuest";


/**
 * signing out user
 * clear localUser data in redux and set Gust User value to it.
 */
export const signingOut = () => {
    // clear user detail from redux
    setLocalUserAsGuest();

    // clear user token from localstorage
    storage.set('localUserToken', null);

    /**
     * @@@ Clear_USER_Cart
     */
}