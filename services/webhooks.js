"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _axios = _interopRequireDefault(require("axios"));

var _medusaInterfaces = require("medusa-interfaces");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Event;

(function (Event) {
  Event[Event["order.placed"] = 0] = "order.placed";
  Event[Event["order.updated"] = 1] = "order.updated";
  Event[Event["order.completed"] = 2] = "order.completed";
  Event[Event["order.canceled"] = 3] = "order.canceled";
})(Event || (Event = {}));

var WebhooksService = /*#__PURE__*/function (_NotificationService) {
  (0, _inherits2["default"])(WebhooksService, _NotificationService);

  var _super = _createSuper(WebhooksService);

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
  function WebhooksService(_ref, options) {
    var _this;

    var orderService = _ref.orderService;
    (0, _classCallCheck2["default"])(this, WebhooksService);
    _this = _super.call(this);
    _this.options_ = options;
    _this.orderService_ = orderService;
    return _this;
  }

  (0, _createClass2["default"])(WebhooksService, [{
    key: "handleOrderEvents",
    value: function () {
      var _handleOrderEvents = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
        var order;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.orderService_.retrieve(id, {
                  select: ["shipping_total", "discount_total", "tax_total", "refunded_total", "gift_card_total", "subtotal", "total"],
                  relations: ["customer", "billing_address", "shipping_address", "discounts", "discounts.rule", "shipping_methods", "shipping_methods.shipping_option", "payments", "fulfillments", "returns", "gift_cards", "gift_card_transactions"]
                });

              case 2:
                order = _context.sent;
                console.log("handleOrderPlaced", order);
                return _context.abrupt("return", order);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleOrderEvents(_x) {
        return _handleOrderEvents.apply(this, arguments);
      }

      return handleOrderEvents;
    }()
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(event, eventData) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = event;
                _context2.next = _context2.t0 === "order.placed" ? 3 : _context2.t0 === "order.updated" ? 3 : _context2.t0 === "order.completed" ? 3 : _context2.t0 === "order.canceled" ? 3 : 6;
                break;

              case 3:
                _context2.next = 5;
                return this.handleOrderEvents(eventData.id);

              case 5:
                return _context2.abrupt("return", _context2.sent);

              case 6:
                return _context2.abrupt("return", {});

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchData(_x2, _x3) {
        return _fetchData.apply(this, arguments);
      }

      return fetchData;
    }()
  }, {
    key: "sendNotification",
    value: function () {
      var _sendNotification = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(event, eventData) {
        var _this$options_$webhoo, _this$options_;

        var data;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(!this.options_.webhook_config[event] || this.options_.webhook_config[event].enabled === false)) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                _context3.next = 4;
                return this.fetchData(event, eventData);

              case 4:
                data = _context3.sent;
                _context3.next = 7;
                return this.postWebhook({
                  event: event,
                  data: data,
                  options: this.options_,
                  config: (_this$options_$webhoo = (_this$options_ = this.options_) === null || _this$options_ === void 0 ? void 0 : _this$options_.webhook_config) !== null && _this$options_$webhoo !== void 0 ? _this$options_$webhoo : null
                }, this.options_.webhook_config[event].overrideUrl, this.options_.webhook_config[event].overrideHeaders);

              case 7:
                return _context3.abrupt("return", _context3.sent);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function sendNotification(_x4, _x5) {
        return _sendNotification.apply(this, arguments);
      }

      return sendNotification;
    }()
    /**
     *
     * @param {Object} data - data to be passed in to the body of the webhook
     * @param {string} overrideUrl - optional override url for the webhook
     * @param {Object} overrideHeaders - optional override headers for the webhook
     * @returns Promise<AxiosResponse<any, any>>
     */

  }, {
    key: "postWebhook",
    value: function () {
      var _postWebhook = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(data, overrideUrl, overrideHeaders) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", _axios["default"].post(overrideUrl !== null && overrideUrl !== void 0 ? overrideUrl : this.options_.webhook_url, data, {
                  headers: overrideHeaders !== null && overrideHeaders !== void 0 ? overrideHeaders : this.options_.webhook_headers
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function postWebhook(_x6, _x7, _x8) {
        return _postWebhook.apply(this, arguments);
      }

      return postWebhook;
    }()
  }]);
  return WebhooksService;
}(_medusaInterfaces.NotificationService);

(0, _defineProperty2["default"])(WebhooksService, "identifier", "webhooks");
var _default = WebhooksService;
exports["default"] = _default;