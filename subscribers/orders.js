"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var OrderSubscriber = /*#__PURE__*/(0, _createClass2["default"])(function OrderSubscriber(_ref) {
  var notificationService = _ref.notificationService;
  (0, _classCallCheck2["default"])(this, OrderSubscriber);
  this.notificationService_ = notificationService;
  this.notificationService_.subscribe("order.placed", "webhooks");
  this.notificationService_.subscribe("order.updated", "webhooks");
  this.notificationService_.subscribe("order.completed", "webhooks");
  this.notificationService_.subscribe("order.canceled", "webhooks");
});
var _default = OrderSubscriber;
exports["default"] = _default;