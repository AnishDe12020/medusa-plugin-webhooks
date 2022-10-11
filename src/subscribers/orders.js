class OrderSubscriber {
  constructor({ notificationService }) {
    this.notificationService_ = notificationService;

    this.notificationService_.subscribe("order.placed", "webhooks");
    this.notificationService_.subscribe("order.updated", "webhooks");
    this.notificationService_.subscribe("order.completed", "webhooks");
    this.notificationService_.subscribe("order.canceled", "webhooks");
  }
}

export default OrderSubscriber;
