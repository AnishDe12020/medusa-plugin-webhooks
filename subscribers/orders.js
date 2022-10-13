"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrderSubscriber = /*#__PURE__*/_createClass(function OrderSubscriber(_ref) {
  var notificationService = _ref.notificationService;

  _classCallCheck(this, OrderSubscriber);

  this.notificationService_ = notificationService;
  this.notificationService_.subscribe("order.placed", "webhooks");
  this.notificationService_.subscribe("order.updated", "webhooks");
  this.notificationService_.subscribe("order.completed", "webhooks");
  this.notificationService_.subscribe("order.canceled", "webhooks");
});

var _default = OrderSubscriber;
exports["default"] = _default;