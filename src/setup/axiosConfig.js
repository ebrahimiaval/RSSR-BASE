import axios from "axios";
import {API_DOMAIN} from "./constant";

// set Global axios defaults
axios.defaults.baseURL = API_DOMAIN;
axios.defaults.timeout = 58000; // fix uncontroled server 502 Error