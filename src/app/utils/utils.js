"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../models/user");
var Utils = (function () {
    function Utils() {
    }
    Utils.getUserFromStorage = function () {
        var userFromStorage = localStorage.getItem('currentUser');
        var loginName = JSON.parse(userFromStorage).loginName;
        var user = new user_1.User(loginName);
        return user;
    };
    Utils.getUserTokenFromStorage = function () {
        var userFromStorage = localStorage.getItem('currentUser');
        var token = JSON.parse(userFromStorage).token;
        return token;
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map