import axios from "axios";
import { NotificationService } from "medusa-interfaces";

type EventConfig = {
  enabled: boolean;
  overrideUrl?: string;
  overrideHeaders?: { [key: string]: string };
};

// enum Event {
//   "order.placed",
//   "order.updated",
//   "order.completed",
//   "order.canceled",
// }

type Options = {
  webhook_url: string;
  webhook_headers: { [key: string]: string };
  webhook_config: { [key: string]: EventConfig };
};

class WebhooksService extends NotificationService {
  options_: Options;
  orderService_: any;
  static identifier = "webhooks";
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
  constructor({ orderService }, options) {
    super();

    this.options_ = options;
    this.orderService_ = orderService;
  }

  async handleOrderEvents(id) {
    const order = await this.orderService_.retrieve(id, {
      select: [
        "shipping_total",
        "discount_total",
        "tax_total",
        "refunded_total",
        "gift_card_total",
        "subtotal",
        "total",
      ],
      relations: [
        "customer",
        "billing_address",
        "shipping_address",
        "discounts",
        "discounts.rule",
        "shipping_methods",
        "shipping_methods.shipping_option",
        "payments",
        "fulfillments",
        "returns",
        "gift_cards",
        "gift_card_transactions",
      ],
    });

    console.log("handleOrderPlaced", order);

    return order;
  }

  async fetchData(event, eventData) {
    switch (event) {
      case "order.placed":
      case "order.updated":
      case "order.completed":
      case "order.canceled":
        return await this.handleOrderEvents(eventData.id);
      default:
        return {};
    }
  }

  async sendNotification(event, eventData) {
    console.log("options", this.options_);
    console.log("config", this.options_?.webhook_config);
    // if (
    //   !this.options_.webhook_config[event] ||
    //   this.options_.webhook_config[event].enabled === false
    // ) {
    //   return;
    // }

    const data = await this.fetchData(event, eventData);
    return await this.postWebhook(
      {
        event: event,
        data: data,
        options: this.options_,
        config: this.options_?.webhook_config ?? null,
      }
      // this.options_.webhook_config[event].overrideUrl,
      // this.options_.webhook_config[event].overrideHeaders
    );
  }

  /**
   *
   * @param {Object} data - data to be passed in to the body of the webhook
   * @param {string} overrideUrl - optional override url for the webhook
   * @param {Object} overrideHeaders - optional override headers for the webhook
   * @returns Promise<AxiosResponse<any, any>>
   */
  async postWebhook(data, overrideUrl?: string, overrideHeaders?: any) {
    return axios.post(overrideUrl ?? this.options_.webhook_url, data, {
      headers: overrideHeaders ?? this.options_.webhook_headers,
    });
  }
}

export default WebhooksService;
