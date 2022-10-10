class OrderSubscriber {
  constructor({ notificationService }) {
    this.notificationService_ = notificationService;

    this.notificationService_.subscribe("order.placed", "webhooks");
  }
}

export default OrderSubscriber;
