## Medusa Plugin Webhooks

![Banner](https://i.imgur.com/CQtgm3b.png)

## About

### Participants

- Anish De

  GitHub: [@AnishDe12020](https://github.com/AnishDe12020)

  Twitter: [@AnishDe12020](https://twitter.com/AnishDe12020)

  Discord: AnishDe12020#8442 (ID: 727047127271735387)

### Description

A Medusa plugin giving the power of webhooks to your Medusa store. Receive notifications on discord, slack or anywhere where webhooks can be consumed on events on from your store.

#### Features

- A helper function to send webhooks from your custom code
- A webhook for order-related events
- Ability to assign custom webhook urls to every event

### Preview

![Flowchart](https://i.imgur.com/iZRhovy.png)

## Setting up the Medusa Webhooks Plugin

### Prerequisites

- A Medusa server ([Quickstart Guide](https://docs.medusajs.com/quickstart/quick-start/))
- Redis setup on your Medusa server ([Configuring Redis on your Medusa server](https://docs.medusajs.com/tutorial/set-up-your-development-environment/#redis))
- A webhook endpoint to which you can post webhooks (for testing purposes, I recommend using [Svix Play](https://play.svix.com/))

### Install and Setup the Webhooks Plugin

To install the plugin using NPM, run the following command in your Medusa server directory:

```bash
npm install medusa-plugin-webhooks
```

If you prefer using Yarn, run the following command in your Medusa server directory:

```bash
yarn add medusa-plugin-webhooks
```

Once the plugin is installed, we need to add it to the `plugins` array in the `medusa-config.js` file in your Medusa server directory:

```js
const plugins = [
  ...{
    resolve: "medusa-plugin-webhooks",
    options: {
      webhook_url: "https://mystore.com/events", // REQUIRED: CHANGE THIS TO A VALID WEBHOOK ENDPOINT
      webhook_headers: {
        "x-api-key": "supersecretapikey", // You can add custom headers (for example, for authentication)
      },
      webhook_config: {
        "order.placed": {
          enabled: true,
          overrideUrl: "https://mystore.com/events/order-placed", // You can override the URL on a per-event basis,
          overrideHeaders: {
            "x-api-key": "supersecretorderplacedapikey", // You can override the headers on a per-event basis
          },
        },
      },
    },
  },
];
```

Currently these 4 events are supported:

- `order.placed`
- `order.updated`
- `order.completed`
- `order.canceled`

By default, notifications for all events are disabled. To enable notifications for any of the above events, set the `enabled` property to `true` in the `webhook_config` object. (see example above)

You can override the URL or headers for any of the above events by setting the `overrideUrl` or `overrideHeaders` properties in the `webhook_config` object. (see example above)

### Sending a webhook event from your custom code

You can post a webhook from your code by resolving the webhooks service and then using the `postWebhook` function. For example:

```js
const webhooksService = scope.resolve("webhooksService");
await webhooksService.postWebhook(
  {
    event: "order.placed",
    data: {
      order_id: "order_id",
      customer_id: "customer_id",
      total_price: 1000,
      currency_code: "USD",
      metadata: {},
    },
  },
  "mystore.com/events/custom", // You can pass in an URL override here as well
  {
    "x-api-key": "customeventsapikey", // You can pass in custom headers here as well
  }
);
```

If you face any issues or have any questions, feel free to [open an issue](https://github.com/AnishDe12020/medusa-plugin-webhooks/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc)

## Contributing

If you want to suggest a new feature, open a [new issue with the feature request template](https://github.com/AnishDe12020/medusa-plugin-webhooks/issues/new?assignees=&labels=enhancement&template=feature_request.yml&title=%5BFEAT%5D%3A+). For bug reports, use the [bug report issue template](https://github.com/AnishDe12020/medusa-plugin-webhooks/issues/new?assignees=AnishDe12020&labels=bug&template=bug_report.yml&title=%5BBUG%5D%3A+).

To make a pr, fork the repository, clone it, create a new branch that describes the new feature or the bug it is fixing. Then make the required changes, commit them (we strongly recommend that you follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification and gitmojis are welcome as well). The next step is to create a pull request and a maintainer will review it as soon as possible.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/AnishDe12020/medusa-plugin-webhooks/blob/main/LICENSE.md) file for more details.

The plugin structure was inspired by the [official Sendgrid plugin](https://github.com/medusajs/medusa/tree/master/packages/medusa-plugin-sendgrid) and borrows some code from it.

## Resources

- [Medusa Documentation](https://docs.medusajs.com/)
- [NPM Repository](https://www.npmjs.com/package/medusa-plugin-webhooks)
- [GitHub Repository](https://github.com/AnishDe12020/medusa-plugin-webhooks)
