"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _axios = _interopRequireDefault(require("axios"));

var _medusaInterfaces = require("medusa-interfaces");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var WebhooksService = /*#__PURE__*/function (_BaseService) {
  (0, _inherits2["default"])(WebhooksService, _BaseService);

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

    (0, _objectDestructuringEmpty2["default"])(_ref);
    (0, _classCallCheck2["default"])(this, WebhooksService);
    _this = _super.call(this);
    _this.options_ = options;
    return _this;
  }
  /**
   *
   * @param {Object} data - data to be passed in to the body of the webhook
   * @returns Promise<AxiosResponse<any, any>>
   */


  (0, _createClass2["default"])(WebhooksService, [{
    key: "postWebhook",
    value: function () {
      var _postWebhook = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _axios["default"].post(this.options_.webhook_url, data, {
                  headers: this.options_.webhook_headers
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function postWebhook(_x) {
        return _postWebhook.apply(this, arguments);
      }

      return postWebhook;
    }()
  }]);
  return WebhooksService;
}(_medusaInterfaces.BaseService);

var _default = WebhooksService;
exports["default"] = _default;