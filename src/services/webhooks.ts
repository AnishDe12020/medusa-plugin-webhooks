import axios from "axios";
import { BaseService } from "medusa-interfaces";

class WebhooksService extends BaseService {
  options_: any;
  /**
   * @param {Object} options - configuration for this plugin defined in `medusa-config.js`
   * example for this plugin:
   * {
   * 	  webhook_url: https://example.com/medusa-webhook,
   *      webhooks_headers: [
   * 		{
   * 			name: "x-api-key",
   * 			value: "supersecretapikey"
   * 		}
   * 	 ]
   * }
   */
  constructor({}: object, options: object) {
    super();

    this.options_ = options;
  }

  /**
   *
   * @param {Object} data - data to be passed in to the body of the webhook
   * @returns Promise<AxiosResponse<any, any>>
   */
  async postWebhook(data) {
    return axios.post(this.options_.webhook_url, data, {
      headers: this.options_.webhook_headers,
    });
  }
}

export default WebhooksService;
