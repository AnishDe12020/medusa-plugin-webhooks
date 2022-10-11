import axios from "axios";
import { NotificationService } from "medusa-interfaces";

class WebhooksService extends NotificationService {
  [x: string]: any;
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

    this.orderService_ = orderService;
    this.options_ = options;
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
      case "order.canceled":
        return await this.handleOrderEvents(eventData.id);
      default:
        return {};
    }
  }

  async sendNotification(event, eventData) {
    const data = await this.fetchData(event, eventData);
    return await this.postWebhook({ event: event, data: data });
  }

  /**
   *
   * @param {Object} data - data to be passed in to the body of the webhook
   * @returns Promise<AxiosResponse<any, any>>
   */
  async postWebhook(data) {
    console.log("postWebhook", data);
    return axios.post(
      this.options_.webhook_url ??
        "https://play.svix.com/in/e_HyNsLihQrQaJgTNHhUbRMJ6I4Ng/",
      data,
      {
        headers: this.options_.webhook_headers,
      }
    );
  }
}

export default WebhooksService;
