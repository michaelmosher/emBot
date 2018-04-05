"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var node_fetch_1 = require("node-fetch"), Fetch = node_fetch_1;
var client_1 = require("@slack/client");
var Env = require("require-env");
var Lex = require("./lex");
var BOT_CORE_URL = Env.require('CORE_URL');
var LEX_BOT_VERSION = Env.require('LEX_BOT_VERSION');
var TOKEN = Env.require('SLACK_API_TOKEN');
var lexBot = new Lex.LexBot('emBot', LEX_BOT_VERSION);
var rtm = new client_1.RTMClient(TOKEN);
var web = new client_1.WebClient(TOKEN);
main();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        var Users, Bot;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, refreshLocalUsers()];
                case 1:
                    Users = _a.sent();
                    rtm.start({});
                    rtm.on('connected', function () { return __awaiter(_this, void 0, void 0, function () {
                        var botUserId, b;
                        return __generator(this, function (_a) {
                            botUserId = rtm.activeUserId;
                            b = Users.find(function (u) { return u.id === botUserId; });
                            if (b === undefined) {
                                throw 'Bot is undefined!';
                            }
                            Bot = b;
                            return [2];
                        });
                    }); });
                    rtm.on('reconnected', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, refreshLocalUsers()];
                                case 1:
                                    Users = _a.sent();
                                    return [2];
                            }
                        });
                    }); });
                    rtm.on('team_join', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, refreshLocalUsers()];
                                case 1:
                                    Users = _a.sent();
                                    return [2];
                            }
                        });
                    }); });
                    rtm.on('user_change', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, refreshLocalUsers()];
                                case 1:
                                    Users = _a.sent();
                                    return [2];
                            }
                        });
                    }); });
                    rtm.on('message', function (event) { return __awaiter(_this, void 0, void 0, function () {
                        var user, sanitized, lRes, email, channel, rs, error_1, garbage;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!messageIsForBot(event.text, Bot)) return [3, 6];
                                    rtm.sendTyping(event.channel);
                                    user = Users.find(function (u) { return u.id === event.user; });
                                    if (user === undefined) {
                                        return [2, rtm.sendMessage('My mommy told me not to talk to strangers', event.channel)];
                                    }
                                    sanitized = event.text
                                        .replace("<@" + Bot.id + ">", '')
                                        .replace(Bot.name, '') || 'hello';
                                    return [4, lexBot.postText(sanitized, user.name)];
                                case 1:
                                    lRes = _a.sent();
                                    if (!(lRes.dialogState === 'ReadyForFulfillment')) return [3, 5];
                                    email = user.profile.email;
                                    channel = event.channel;
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 4, , 5]);
                                    return [4, coreRequest(lRes, email, channel)];
                                case 3:
                                    rs = _a.sent();
                                    return [2, rtm.sendMessage(rs, event.channel)];
                                case 4:
                                    error_1 = _a.sent();
                                    console.log(error_1);
                                    return [2, rtm.sendMessage('Sorry, I\'m having some networking trouble. Please try again later.', event.channel)];
                                case 5:
                                    if (lRes.message == undefined) {
                                        garbage = JSON.stringify(lRes);
                                        return [2, rtm.sendMessage("Sorry, Lex send me this garbage: " + garbage, event.channel)];
                                    }
                                    return [2, rtm.sendMessage(lRes.message, event.channel)];
                                case 6: return [2];
                            }
                        });
                    }); });
                    return [2];
            }
        });
    });
}
function messageIsForBot(text, bot) {
    var idRegex = new RegExp(bot.id);
    var nameRegex = new RegExp(bot.name);
    return idRegex.test(text) || nameRegex.test(text);
}
function refreshLocalUsers() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, web.users.list()
                    .then(function (res) {
                    if (res.error) {
                        console.log(res.error);
                        return [];
                    }
                    var body = res;
                    return body.members;
                })];
        });
    });
}
function coreRequest(l, userEmail, channel) {
    return __awaiter(this, void 0, void 0, function () {
        var rq, rs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rq = buildCoreRequest(l, userEmail, channel);
                    return [4, node_fetch_1["default"](rq)];
                case 1:
                    rs = _a.sent();
                    return [2, handleCoreResponse(rs)];
            }
        });
    });
}
function buildCoreRequest(lexOutput, userEmail, channel) {
    var url = BOT_CORE_URL + "/" + lexOutput.intentName;
    var body = { lexOutput: lexOutput, userEmail: userEmail, channel: channel };
    return new Fetch.Request(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    });
}
function handleCoreResponse(rs) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, rs.text()];
        });
    });
}
