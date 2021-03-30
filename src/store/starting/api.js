/**
 * STARTING APIS
 */

import axios from "axios";
import { API } from "@/constants";

const headers = {
  "Content-Type": "application/json"
};

export default {
  /**
   * @returns {Promise}
   */
  requestNodeInfo() {
    return axios({
      method: "get",
      baseURL: `${API.NODE_INFO}`,
      headers: headers
    });
  },
  /**
   * @returns {Promise}
   */
  requestPool() {
    return axios({
      method: "get",
      baseURL: `${API.STAKING}`,
      url: "/pool",
      headers: headers
    });
  },
  /**
   * @returns {Promise}
   */
  requestStakingParameters() {
    return axios({
      method: "get",
      baseURL: `${API.STAKING}`,
      url: "/parameters",
      headers: headers
    });
  },
  /**
   * @returns {Promise}
   */
  requestConversionRate() {
    return axios({
      method: "get",
      baseURL: `${API.MINT}`,
      url: "/conversion_rate",
      headers: headers
    });
  }
};
