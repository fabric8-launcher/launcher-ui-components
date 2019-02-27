'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));
require('reflect-metadata');
var injectionJs = require('injection-js');
var _ = require('lodash');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
}

function checkNotNull(param, name) {
    if (name === void 0) { name = 'variable'; }
    if (!param) {
        throw new Error(name + " must be defined.");
    }
    return param;
}

var Locations = /** @class */ (function () {
    function Locations() {
    }
    Locations.joinPath = function () {
        var parts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parts[_i] = arguments[_i];
        }
        if (!parts || parts.length === 0) {
            return '';
        }
        var result = parts[0];
        for (var _a = 0, _b = parts.slice(1); _a < _b.length; _a++) {
            var part = _b[_a];
            result = Locations.joinWithSlash(result, part);
        }
        return result;
    };
    Locations.joinWithSlash = function (start, end) {
        if (!end || !end.length) {
            return start;
        }
        var slashes = 0;
        if (start.endsWith('/')) {
            slashes++;
        }
        if (end.startsWith('/')) {
            slashes++;
        }
        if (slashes === 2) {
            return start + end.substring(1);
        }
        if (slashes === 1) {
            return start + end;
        }
        return start + "/" + end;
    };
    Locations.createWebsocketUrl = function (url) {
        checkNotNull(url, 'url');
        url = url.substring(0, url.indexOf('/api'));
        if (url.indexOf('https') !== -1) {
            return url.replace('https', 'wss');
        }
        else if (url.indexOf('http') !== -1) {
            return url.replace('http', 'ws');
        }
        else if (url.startsWith('/') || url.startsWith(':')) {
            url = (url.startsWith(':') ? location.hostname : location.host) + url;
            return (location.protocol === 'https:' ? 'wss://' : 'ws://') + url;
        }
        throw new Error('Error while creating websocket url from url: ' + url);
    };
    return Locations;
}());

var HttpService = /** @class */ (function () {
    function HttpService() {
        this.http = axios.create();
    }
    HttpService.prototype.get = function (url, endpoint, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.get(Locations.joinPath(url, endpoint), config)
                        .then(function (response) { return response.data; }, this.handleError)];
            });
        });
    };
    HttpService.prototype.head = function (url, endpoint, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.head(Locations.joinPath(url, endpoint), config)
                        .then(function (response) { return response.data; }, this.handleError)];
            });
        });
    };
    HttpService.prototype.post = function (url, endpoint, data, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.post(Locations.joinPath(url, endpoint), data, config)
                        .then(function (response) { return response.data; }, this.handleError)];
            });
        });
    };
    HttpService.prototype.handleError = function (reason) {
        var errMsg;
        if (reason && reason.message) {
            errMsg = "An error occurred: " + reason.message;
        }
        else {
            errMsg = "Backend returned " + reason;
        }
        throw new Error(errMsg);
    };
    HttpService = __decorate([
        injectionJs.Injectable()
    ], HttpService);
    return HttpService;
}());

function fillPropsValuesWithEnums(propsContainer, enums) {
    if (!propsContainer.props || propsContainer.props.length === 0) {
        return propsContainer;
    }
    var props = propsContainer.props.map(function (p) {
        return __assign({}, fillPropsValuesWithEnums(p, enums), { values: enums[p.id] });
    });
    return __assign({}, propsContainer, { props: props });
}
function propsWithValuesMapper(enums) {
    return function (c) { return fillPropsValuesWithEnums(c, enums); };
}
var relations = ['example', 'mission', 'runtime', 'version'];
function copyProperties(obj, props, lambda) {
    var result = {};
    for (var prop in props) {
        if (props.hasOwnProperty(prop)) {
            var value = _.get(obj, prop);
            if (relations.indexOf(prop) === -1) {
                result[prop] = value;
            }
            else {
                result[prop] = lambda(value, obj, prop);
            }
        }
    }
    return result;
}
function filterExample(query, catalog) {
    var missionById = _.keyBy(catalog.missions, 'id');
    var runtimeById = _.keyBy(catalog.runtimes, 'id');
    var result = [];
    for (var i = 0; i < catalog.boosters.length; i++) {
        var example = catalog.boosters[i];
        result[i] = copyProperties(example, query, function (name, obj, relation) {
            return copyProperties(relation === 'mission' ? missionById[name] : runtimeById[name], query[relation]);
        });
    }
    return result;
}
function filterExampleMission(query, catalog) {
    var runtimeById = _.keyBy(catalog.runtimes, 'id');
    var lambda = function (name, obj) {
        return _.uniqBy(filterExamples(catalog.boosters, undefined, obj.id), function (b) { return b.runtime; }).map(
        // @ts-ignore
        function (b) { return copyProperties(runtimeById[b.runtime], query.runtime); });
    };
    var result = [];
    if (query.id) {
        return catalog.missions.filter(function (m) { return m.id === query.id; }).map(function (m) { return copyProperties(m, query, lambda); });
    }
    else {
        for (var i = 0; i < catalog.missions.length; i++) {
            var mission = catalog.missions[i];
            result[i] = copyProperties(mission, query, lambda);
        }
    }
    return result;
}
function filterExampleRuntime(query, catalog) {
    var runtimeById = _.keyBy(catalog.runtimes, 'id');
    var result = [];
    for (var i = 0; i < catalog.runtimes.length; i++) {
        var runtime = catalog.runtimes[i];
        // @ts-ignore
        result[i] = copyProperties(runtime, query, function (name, obj) { return runtimeById[obj.id].versions.map(function (v) { return copyProperties(v, query.version); }); });
    }
    return result;
}
function filter(query, catalog) {
    if (query.example) {
        return filterExample(query.example, catalog);
    }
    if (query.mission) {
        return filterExampleMission(query.mission, catalog);
    }
    if (query.runtime) {
        return filterExampleRuntime(query.runtime, catalog);
    }
    return [];
}
function filterExamples(examples, cluster, missionId, runtimeId, versionId) {
    var availableExamples = examples.filter(function (b) {
        return (!missionId || b.mission === missionId)
            && (!runtimeId || b.runtime === runtimeId)
            && (!versionId || b.version === versionId);
    });
    if (availableExamples.length === 0) {
        return [];
    }
    if (!cluster) {
        return availableExamples;
    }
    var examplesRunningOnCluster = availableExamples.filter(function (b) {
        return checkRunsOnCluster(b, cluster);
    });
    if (examplesRunningOnCluster.length === 0) {
        return [];
    }
    return examplesRunningOnCluster;
}
function checkRunsOnCluster(example, cluster) {
    var defaultResult = true;
    var runsOn = _.get(example, 'metadata.app.launcher.runsOn');
    if (typeof runsOn === 'string') {
        runsOn = [runsOn];
    }
    if (runsOn && runsOn.length !== 0) {
        for (var _i = 0, runsOn_1 = runsOn; _i < runsOn_1.length; _i++) {
            var supportedCategory = runsOn_1[_i];
            if (!supportedCategory.startsWith('!')) {
                defaultResult = false;
            }
            if (supportedCategory.toLowerCase() === 'all'
                || supportedCategory.toLowerCase() === '*'
                || supportedCategory.toLocaleLowerCase() === cluster) {
                return true;
            }
            else if (supportedCategory.toLowerCase() === 'none'
                || supportedCategory.toLowerCase() === '!*'
                || supportedCategory.toLowerCase() === ('!' + cluster)) {
                return false;
            }
        }
    }
    return defaultResult;
}

var ExampleAppDescriptor = /** @class */ (function () {
    function ExampleAppDescriptor(payload) {
        this.projectName = payload.projectName;
        this.projectVersion = '1.0.0';
        this.targetEnvironment = 'os';
        this.clusterId = payload.clusterId;
        var part = payload.parts[0];
        this.mission = part.shared.mission.id;
        this.runtime = part.shared.runtime.name;
        this.runtimeVersion = part.shared.runtime.version;
        this.gitRepository = payload.repository;
    }
    ExampleAppDescriptor.toExampleAppDescriptor = function (payload) {
        return new ExampleAppDescriptor(payload);
    };
    return ExampleAppDescriptor;
}());
function toRuntime(arg) {
    var parts = arg.split('/', 2);
    return { name: parts[0], version: parts.length > 1 ? parts[1] : undefined };
}

var DefaultLauncherClient = /** @class */ (function () {
    function DefaultLauncherClient(httpService, config) {
        this.httpService = httpService;
        this.config = config;
    }
    DefaultLauncherClient.prototype.exampleCatalog = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.get(this.config.launcherURL, '/booster-catalog')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DefaultLauncherClient.prototype.findExampleApps = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = filter;
                        _b = [query];
                        return [4 /*yield*/, this.exampleCatalog()];
                    case 1: return [2 /*return*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                }
            });
        });
    };
    DefaultLauncherClient.prototype.capabilities = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.get(this.config.creatorUrl, '/capabilities', this.getRequestConfig())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DefaultLauncherClient.prototype.enum = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.get(this.config.creatorUrl, '/enums')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DefaultLauncherClient.prototype.enums = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.get(this.config.creatorUrl, '/enums')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DefaultLauncherClient.prototype.importAnalyze = function (gitImportUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = '/import/analyze?gitImportUrl' + encodeURIComponent(gitImportUrl);
                        return [4 /*yield*/, this.httpService.get(this.config.creatorUrl, endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DefaultLauncherClient.prototype.download = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (payload.parts.length === 1 && payload.parts[0].shared.mission) {
                            // TODO example app download (build link)
                            throw new Error('Download is not implemented yet for example app');
                        }
                        return [4 /*yield*/, this.httpService.post(this.config.creatorUrl, '/zip', payload, this.getRequestConfig())];
                    case 1:
                        r = _a.sent();
                        return [2 /*return*/, ({
                                downloadLink: this.config.launcherURL + "/download?id=" + r.id
                            })];
                }
            });
        });
    };
    DefaultLauncherClient.prototype.launch = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, p, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        p = payload;
                        if (payload.parts.length === 1 && payload.parts[0].shared.mission) {
                            endpoint = this.config.launcherURL;
                            p = ExampleAppDescriptor.toExampleAppDescriptor(payload);
                        }
                        else {
                            endpoint = this.config.creatorUrl;
                        }
                        return [4 /*yield*/, this.httpService.post(endpoint, '/launch', p, this.getRequestConfig())];
                    case 1:
                        r = _a.sent();
                        return [2 /*return*/, {
                                id: r.uuid_link,
                                events: r.event
                            }];
                }
            });
        });
    };
    DefaultLauncherClient.prototype.follow = function (id, events, listener) {
        var socket = new WebSocket(Locations.createWebsocketUrl(this.config.launcherURL) + id);
        socket.onmessage = function (msg) {
            var message = JSON.parse(msg.data);
            if (message.data && message.data.error) {
                listener.onError(new Error(message.data.error));
                socket.close();
            }
            else {
                listener.onMessage(message);
                if (message.statusMessage === events[events.length - 1].name) {
                    listener.onComplete();
                    socket.close();
                }
            }
        };
        socket.onerror = listener.onError;
        socket.onclose = listener.onComplete;
    };
    DefaultLauncherClient.prototype.gitRepositoryExists = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.head(this.config.launcherURL, "/services/git/repositories/" + payload.repositoryName, this.getRequestConfig({ gitProvider: payload.gitProvider }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DefaultLauncherClient.prototype.gitInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.get(this.config.launcherURL, '/services/git/user', this.getRequestConfig())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DefaultLauncherClient.prototype.ocClusters = function () {
        return __awaiter(this, void 0, void 0, function () {
            var r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.get(this.config.launcherURL, '/services/openshift/clusters', this.getRequestConfig())];
                    case 1:
                        r = _a.sent();
                        return [2 /*return*/, r.map(function (c) { return (__assign({}, c.cluster, { connected: c.connected })); })];
                }
            });
        });
    };
    DefaultLauncherClient.prototype.ocExistsProject = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.head(this.config.launcherURL, "/services/openshift/projects/" + payload.projectName, this.getRequestConfig({ clusterId: payload.clusterId }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DefaultLauncherClient.prototype.getRequestConfig = function (config) {
        if (config === void 0) { config = {}; }
        var headers = {};
        if (config.gitProvider) {
            headers['X-Git-Provider'] = config.gitProvider;
        }
        if (this.authorizationToken) {
            headers['Authorization'] = "Bearer " + this.authorizationToken;
        }
        if (config.executionIndex) {
            headers['X-Execution-Step-Index'] = config.executionIndex;
        }
        if (config.clusterId) {
            headers['X-OpenShift-Cluster'] = config.clusterId;
        }
        return { headers: headers };
    };
    return DefaultLauncherClient;
}());

var capabilities = [
  {
    "module": "database",
    "type": "capability",
    "name": "Relational Persistence",
    "description": "Sets up basic CRUD (Create, Read, Update, Delete) operations with a relational database",
    "metadata": {
      "category": "backend",
      "icon": "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14'%3e %3cpath d='M12.178 1.997c-0.534-0.306-1.266-0.55-2.184-0.728s-1.922-0.269-3.003-0.269c-1.084 0-2.084 0.091-3.006 0.269-0.919 0.181-1.65 0.422-2.181 0.728-0.534 0.309-0.803 0.641-0.803 1v2.031c0 0.359 0.269 0.694 0.803 1s1.266 0.55 2.184 0.728c0.919 0.178 1.922 0.269 3.003 0.269s2.084-0.091 3.003-0.269c0.919-0.178 1.65-0.422 2.184-0.728 0.534-0.309 0.803-0.641 0.803-1v-2.031c0-0.359-0.269-0.694-0.803-1z'%3e%3c/path%3e %3cpath d='M6.988 8.022c-1.231 0-2.384-0.109-3.456-0.334-1.072-0.222-1.916-0.553-2.531-0.991v3.328c0 0.359 0.269 0.694 0.803 1s1.263 0.55 2.184 0.728c0.919 0.178 1.922 0.269 3.003 0.269s2.081-0.091 3.003-0.269c0.919-0.178 1.65-0.422 2.184-0.728 0.534-0.309 0.803-0.641 0.803-1v-3.328c-0.622 0.438-1.466 0.766-2.538 0.991-1.072 0.222-2.225 0.334-3.456 0.334z'%3e%3c/path%3e %3c/svg%3e"
    },
    "props": [
      {
        "id": "databaseType",
        "name": "Database Type",
        "description": "The type of database to use",
        "required": true,
        "type": "enum",
        "values": [
          "postgresql",
          "mysql"
        ],
        "default": "postgresql"
      },
      {
        "id": "runtime",
        "name": "Runtime",
        "description": "The runtime to use",
        "required": true,
        "shared": true,
        "type": "object",
        "props": [
          {
            "id": "name",
            "name": "Runtime Name",
            "description": "The name of the runtime to use",
            "required": true,
            "shared": true,
            "type": "enum",
            "values": [
              "nodejs",
              "springboot",
              "thorntail",
              "vertx"
            ]
          },
          {
            "id": "version",
            "name": "Runtime Version",
            "description": "The version of the runtime to use",
            "shared": true,
            "type": "enum",
            "enumRef": "runtime.version.${runtime.name}"
          }
        ]
      },
      {
        "id": "maven",
        "name": "Maven Project Setting",
        "description": "The ids and version to use for the Maven project",
        "required": true,
        "shared": true,
        "enabledWhen": {
          "propId": "runtime.name",
          "equals": [
            "vertx",
            "springboot",
            "thorntail"
          ]
        },
        "type": "object",
        "props": [
          {
            "id": "groupId",
            "name": "Group Id",
            "description": "The Maven Group Id for the project",
            "required": true,
            "type": "string",
            "default": "org.openshift.appgen"
          },
          {
            "id": "artifactId",
            "name": "Artifact Id",
            "description": "The Maven Artifact Id for the project",
            "required": true,
            "type": "string",
            "default": "my-app"
          },
          {
            "id": "version",
            "name": "Version",
            "description": "The Maven Version for the project",
            "required": true,
            "type": "string",
            "default": "1.0.0"
          }
        ]
      },
      {
        "id": "nodejs",
        "name": "Node.js Project Setting",
        "description": "The name and version to use for the Node.js project",
        "required": true,
        "shared": true,
        "enabledWhen": {
          "propId": "runtime.name",
          "equals": [
            "nodejs"
          ]
        },
        "type": "object",
        "props": [
          {
            "id": "name",
            "name": "Name",
            "description": "The Node.js Name for the project",
            "required": true,
            "type": "string",
            "default": "my-app"
          },
          {
            "id": "version",
            "name": "Version",
            "description": "The Node.js Version for the project",
            "required": true,
            "type": "string",
            "default": "1.0.0"
          }
        ]
      }
    ]
  },
  {
    "module": "rest",
    "type": "capability",
    "name": "HTTP API",
    "description": "Exposes an HTTP API for receiving invocations across network boundaries",
    "metadata": {
      "category": "backend",
      "icon": "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='15' height='14' viewBox='0 0 15 14'%3e %3cpath d='M14.241 6.55c-0.403-0.456-0.937-0.869-1.937-1.219 0.563-1.313 0.006-2.069-0.388-2.459-0.384-0.391-0.856-0.587-1.409-0.587-0.5 0-0.931 0.163-1.297 0.484-0.006-0.009-0.012-0.019-0.019-0.025l-1.003 7.444-6.194-4.834c-0.597 0.281-1.081 0.703-1.45 1.272s-0.553 1.197-0.553 1.884c0 0.962 0.344 1.788 1.028 2.472s1.509 1.028 2.472 1.028h8.5c0.828 0 1.534-0.294 2.122-0.878 0.587-0.587 0.878-1.444 0.878-2.122 0-0.338 0.15-1.447-0.75-2.459z'%3e%3c/path%3e %3cpath d='M1.806 4.041l5.763 4.5 0.934-6.928c-1.016-1.403-2.219-1.613-2.978-1.613-1.025 0-1.906 0.362-2.631 1.091s-1.091 1.606-1.091 2.631c0 0.072 0.006 0.178 0.016 0.312-0.003 0.003-0.009 0.003-0.012 0.006z'%3e%3c/path%3e %3c/svg%3e"
    },
    "props": [
      {
        "id": "runtime",
        "name": "Runtime",
        "description": "The runtime to use",
        "required": true,
        "shared": true,
        "type": "object",
        "props": [
          {
            "id": "name",
            "name": "Runtime Name",
            "description": "The name of the runtime to use",
            "required": true,
            "shared": true,
            "type": "enum",
            "values": [
              "nodejs",
              "springboot",
              "thorntail",
              "vertx"
            ]
          },
          {
            "id": "version",
            "name": "Runtime Version",
            "description": "The version of the runtime to use",
            "shared": true,
            "type": "enum",
            "enumRef": "runtime.version.${runtime.name}"
          }
        ]
      },
      {
        "id": "maven",
        "name": "Maven Project Setting",
        "description": "The ids and version to use for the Maven project",
        "required": true,
        "shared": true,
        "enabledWhen": {
          "propId": "runtime.name",
          "equals": [
            "vertx",
            "springboot",
            "thorntail"
          ]
        },
        "type": "object",
        "props": [
          {
            "id": "groupId",
            "name": "Group Id",
            "description": "The Maven Group Id for the project",
            "required": true,
            "type": "string",
            "default": "org.openshift.appgen"
          },
          {
            "id": "artifactId",
            "name": "Artifact Id",
            "description": "The Maven Artifact Id for the project",
            "required": true,
            "type": "string",
            "default": "my-app"
          },
          {
            "id": "version",
            "name": "Version",
            "description": "The Maven Version for the project",
            "required": true,
            "type": "string",
            "default": "1.0.0"
          }
        ]
      },
      {
        "id": "nodejs",
        "name": "Node.js Project Setting",
        "description": "The name and version to use for the Node.js project",
        "required": true,
        "shared": true,
        "enabledWhen": {
          "propId": "runtime.name",
          "equals": [
            "nodejs"
          ]
        },
        "type": "object",
        "props": [
          {
            "id": "name",
            "name": "Name",
            "description": "The Node.js Name for the project",
            "required": true,
            "type": "string",
            "default": "my-app"
          },
          {
            "id": "version",
            "name": "Version",
            "description": "The Node.js Version for the project",
            "required": true,
            "type": "string",
            "default": "1.0.0"
          }
        ]
      }
    ]
  },
  {
    "module": "web-app",
    "type": "capability",
    "name": "Web Application",
    "description": "Adds a simple Hello World web application to the user's project",
    "metadata": {
      "category": "frontend"
    },
    "props": [
      {
        "id": "runtime",
        "name": "Runtime",
        "description": "The runtime to use",
        "required": true,
        "shared": true,
        "type": "object",
        "props": [
          {
            "id": "name",
            "name": "Runtime Name",
            "description": "The name of the runtime to use",
            "required": true,
            "shared": true,
            "type": "enum",
            "values": [
              "react",
              "angular",
              "vuejs"
            ]
          },
          {
            "id": "version",
            "name": "Runtime Version",
            "description": "The version of the runtime to use",
            "shared": true,
            "type": "enum",
            "enumRef": "runtime.version.${runtime.name}"
          }
        ]
      }
    ]
  },
  {
    "module": "welcome",
    "type": "capability",
    "name": "Welcome Application",
    "description": "Deploys a Welcome Application where all selected capabilities can be tested. Required.",
    "metadata": {
      "category": "support",
      "icon": "data:image/svg+xml,%0A%3Csvg width='14' height='14' data-prefix='fas' data-icon='home' class='svg-inline--fa fa-home fa-w-18' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3E%3Cpath fill='currentColor' d='M488 312.7V456c0 13.3-10.7 24-24 24H348c-6.6 0-12-5.4-12-12V356c0-6.6-5.4-12-12-12h-72c-6.6 0-12 5.4-12 12v112c0 6.6-5.4 12-12 12H112c-13.3 0-24-10.7-24-24V312.7c0-3.6 1.6-7 4.4-9.3l188-154.8c4.4-3.6 10.8-3.6 15.3 0l188 154.8c2.7 2.3 4.3 5.7 4.3 9.3zm83.6-60.9L488 182.9V44.4c0-6.6-5.4-12-12-12h-56c-6.6 0-12 5.4-12 12V117l-89.5-73.7c-17.7-14.6-43.3-14.6-61 0L4.4 251.8c-5.1 4.2-5.8 11.8-1.6 16.9l25.5 31c4.2 5.1 11.8 5.8 16.9 1.6l235.2-193.7c4.4-3.6 10.8-3.6 15.3 0l235.2 193.7c5.1 4.2 12.7 3.5 16.9-1.6l25.5-31c4.2-5.2 3.4-12.7-1.7-16.9z'%3E%3C/path%3E%3C/svg%3E"
    },
    "props": []
  }
]
;

var databaseType = [
	{
		id: "postgresql",
		name: "PostgreSQL"
	},
	{
		id: "mysql",
		name: "mySQL"
	}
];
var enums = {
	"runtime.name": [
	{
		id: "nodejs",
		name: "Node.js",
		icon: "data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Cpath d='M0 600h600V0H0z'/%3E%3C/clipPath%3E%3CclipPath id='b'%3E%3Cpath d='M239.032 373.393l-42.134-24.315a5.085 5.085 0 0 1-2.545-4.407v-48.666c0-1.818.969-3.497 2.544-4.408l42.133-24.334a5.093 5.093 0 0 1 5.091 0l42.124 24.334a5.093 5.093 0 0 1 2.543 4.408v48.668a5.084 5.084 0 0 1-2.545 4.405l-42.123 24.315a5.088 5.088 0 0 1-5.088 0'/%3E%3C/clipPath%3E%3ClinearGradient id='c' x2='1' gradientTransform='scale(-86.48019 86.48019) rotate(-63.886 1.799 4.453)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23687e67'/%3E%3Cstop offset='.529' stop-color='%23687e67'/%3E%3Cstop offset='1' stop-color='%2383a178'/%3E%3C/linearGradient%3E%3CclipPath id='d'%3E%3Cpath d='M195.4 292.914a5.09 5.09 0 0 1 1.497-1.317l36.143-20.874 6.017-3.46a5.127 5.127 0 0 1 2.936-.665c.337.028.673.09 1.001.185l44.43 81.357a5.06 5.06 0 0 1-1.181.938l-27.588 15.925-14.579 8.39c-.417.24-.864.413-1.323.526z'/%3E%3C/clipPath%3E%3ClinearGradient id='e' x2='1' gradientTransform='scale(132.79816 -132.79816) rotate(-36.459 -2.712 -3.873)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23687e67'/%3E%3Cstop offset='.138' stop-color='%23687e67'/%3E%3Cstop offset='.697' stop-color='%239bb48f'/%3E%3Cstop offset='.908' stop-color='%239bb48f'/%3E%3Cstop offset='1' stop-color='%239bb48f'/%3E%3C/linearGradient%3E%3CclipPath id='f'%3E%3Cpath d='M239.032 373.393l-42.134-24.315a5.087 5.087 0 0 1-2.545-4.407v-48.666c0-1.818.97-3.497 2.544-4.408l42.133-24.334a5.093 5.093 0 0 1 5.091 0l42.124 24.334a5.093 5.093 0 0 1 2.543 4.408v48.668a5.084 5.084 0 0 1-2.545 4.405l-42.123 24.315a5.09 5.09 0 0 1-5.088 0'/%3E%3C/clipPath%3E%3CclipPath id='g'%3E%3Cpath d='M237.627 382.331l-.58-.331h.774z'/%3E%3C/clipPath%3E%3ClinearGradient id='h' x2='1' gradientTransform='matrix(97.417 0 0 -97.417 192.862 382.166)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%239bb48f'/%3E%3Cstop offset='.092' stop-color='%239bb48f'/%3E%3Cstop offset='.303' stop-color='%239bb48f'/%3E%3Cstop offset='.862' stop-color='%23687e67'/%3E%3Cstop offset='1' stop-color='%23687e67'/%3E%3C/linearGradient%3E%3CclipPath id='i'%3E%3Cpath d='M241.065 374.048a5.072 5.072 0 0 1-2.033-.655l-42.014-24.245 45.293-82.513a5.081 5.081 0 0 1 1.81.628l42.124 24.334a5.096 5.096 0 0 1 2.458 3.477l-46.178 78.89a5.295 5.295 0 0 1-1.035.102c-.142 0-.284-.006-.425-.018'/%3E%3C/clipPath%3E%3ClinearGradient id='j' x2='1' gradientTransform='matrix(97.417 0 0 -97.417 192.862 320.348)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%239bb48f'/%3E%3Cstop offset='.092' stop-color='%239bb48f'/%3E%3Cstop offset='.303' stop-color='%239bb48f'/%3E%3Cstop offset='.862' stop-color='%23687e67'/%3E%3Cstop offset='1' stop-color='%23687e67'/%3E%3C/linearGradient%3E%3CclipPath id='k'%3E%3Cpath d='M239.032 373.393l-42.134-24.315a5.087 5.087 0 0 1-2.545-4.407v-48.666c0-1.818.97-3.497 2.544-4.408l42.133-24.334a5.093 5.093 0 0 1 5.091 0l42.124 24.334a5.093 5.093 0 0 1 2.543 4.408v48.668a5.084 5.084 0 0 1-2.545 4.405l-42.123 24.315a5.09 5.09 0 0 1-5.088 0'/%3E%3C/clipPath%3E%3CclipPath id='l'%3E%3Cpath d='M290.279 292.38l-.279.477v-.639z'/%3E%3C/clipPath%3E%3ClinearGradient id='m' x2='1' gradientTransform='matrix(97.417 0 0 -97.417 192.862 292.538)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%239bb48f'/%3E%3Cstop offset='.092' stop-color='%239bb48f'/%3E%3Cstop offset='.303' stop-color='%239bb48f'/%3E%3Cstop offset='.862' stop-color='%23687e67'/%3E%3Cstop offset='1' stop-color='%23687e67'/%3E%3C/linearGradient%3E%3CclipPath id='n'%3E%3Cpath d='M239.032 373.393l-42.134-24.315a5.087 5.087 0 0 1-2.545-4.407v-48.666c0-1.818.97-3.497 2.544-4.408l42.133-24.334a5.093 5.093 0 0 1 5.091 0l42.124 24.334a5.093 5.093 0 0 1 2.543 4.408v48.668a5.084 5.084 0 0 1-2.545 4.405l-42.123 24.315a5.09 5.09 0 0 1-5.088 0'/%3E%3C/clipPath%3E%3CclipPath id='o'%3E%3Cpath d='M286.351 291.597l-42.177-24.333a5.084 5.084 0 0 0-1.861-.633l.84-1.53L290 292.218v.639l-1.158 1.979c-.347-1.348-1.263-2.528-2.491-3.239'/%3E%3C/clipPath%3E%3ClinearGradient id='p' x2='1' gradientTransform='matrix(97.417 0 0 -97.417 192.862 279.968)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%239bb48f'/%3E%3Cstop offset='.092' stop-color='%239bb48f'/%3E%3Cstop offset='.303' stop-color='%239bb48f'/%3E%3Cstop offset='.862' stop-color='%23687e67'/%3E%3Cstop offset='1' stop-color='%23687e67'/%3E%3C/linearGradient%3E%3CclipPath id='q'%3E%3Cpath d='M239.032 373.393l-42.134-24.315a5.087 5.087 0 0 1-2.545-4.407v-48.666c0-1.818.97-3.497 2.544-4.408l42.133-24.334a5.093 5.093 0 0 1 5.091 0l42.124 24.334a5.093 5.093 0 0 1 2.543 4.408v48.668a5.084 5.084 0 0 1-2.545 4.405l-42.123 24.315a5.09 5.09 0 0 1-5.088 0'/%3E%3C/clipPath%3E%3CclipPath id='r'%3E%3Cpath d='M286.351 291.597l-42.177-24.333a5.084 5.084 0 0 0-1.861-.633l.84-1.53L290 292.218v.639l-1.158 1.979c-.347-1.348-1.263-2.528-2.491-3.239'/%3E%3C/clipPath%3E%3ClinearGradient id='s' x2='1' gradientTransform='scale(-136.49806 136.49806) rotate(-63.886 .986 3.099)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23687e67'/%3E%3Cstop offset='.529' stop-color='%23687e67'/%3E%3Cstop offset='1' stop-color='%2383a178'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg clip-path='url(%23a)' transform='matrix(1.33333 0 0 -1.33333 0 800)'%3E%3Cpath fill='%23689f63' d='M296.953 165.056c-1.46 0-2.912.38-4.19 1.12l-13.338 7.893c-1.99 1.114-1.019 1.509-.362 1.738 2.657.922 3.195 1.135 6.031 2.743.295.167.687.103.992-.076l10.247-6.083c.371-.206.895-.206 1.237 0l39.95 23.058c.372.212.61.64.61 1.08v46.105c0 .45-.238.872-.62 1.1l-39.933 23.039a1.25 1.25 0 0 1-1.23 0l-39.924-23.045a1.285 1.285 0 0 1-.634-1.094V196.53c0-.441.246-.86.63-1.068l10.944-6.323c5.938-2.97 9.574.528 9.574 4.04v45.52c0 .644.517 1.15 1.161 1.15h5.065c.634 0 1.158-.506 1.158-1.15v-45.52c0-7.924-4.316-12.47-11.829-12.47-2.309 0-4.127 0-9.202 2.502l-10.476 6.03a8.437 8.437 0 0 0-4.19 7.289v46.104c0 2.995 1.602 5.792 4.19 7.28L292.764 273c2.527 1.429 5.887 1.429 8.395 0l39.947-23.085a8.434 8.434 0 0 0 4.196-7.281V196.53a8.457 8.457 0 0 0-4.196-7.288l-39.947-23.065a8.375 8.375 0 0 0-4.206-1.121'/%3E%3Cpath fill='%23689f63' d='M309.293 196.818c-17.482 0-21.144 8.024-21.144 14.755 0 .64.514 1.151 1.154 1.151h5.165c.577 0 1.058-.415 1.148-.978.78-5.258 3.105-7.912 13.677-7.912 8.416 0 12 1.904 12 6.37 0 2.573-1.017 4.484-14.096 5.765-10.93 1.081-17.692 3.496-17.692 12.24 0 8.061 6.794 12.868 18.186 12.868 12.798 0 19.131-4.442 19.933-13.972a1.17 1.17 0 0 0-.305-.889 1.178 1.178 0 0 0-.846-.369h-5.185a1.15 1.15 0 0 0-1.12.903c-1.245 5.533-4.27 7.301-12.477 7.301-9.189 0-10.257-3.2-10.257-5.6 0-2.906 1.26-3.75 13.667-5.393 12.277-1.623 18.11-3.92 18.11-12.55 0-8.704-7.259-13.69-19.918-13.69m48.646 48.882h1.343c1.098 0 1.304.773 1.304 1.22 0 1.184-.816 1.184-1.264 1.184h-1.383zm-1.632 3.789h2.975c1.019 0 3.016 0 3.016-2.283 0-1.59-1.02-1.914-1.632-2.118 1.184-.081 1.264-.856 1.426-1.955.083-.692.206-1.875.448-2.281h-1.831c-.043.406-.33 2.607-.33 2.728-.118.49-.284.733-.894.733h-1.506v-3.461h-1.672zm-3.563-4.298c0-3.586 2.893-6.48 6.436-6.48 3.586 0 6.478 2.955 6.478 6.48 0 3.584-2.932 6.436-6.478 6.436-3.503 0-6.436-2.81-6.436-6.436m14.155-.022c0-4.236-3.464-7.7-7.7-7.7-4.196 0-7.7 3.423-7.7 7.7 0 4.359 3.587 7.7 7.7 7.7 4.157 0 7.7-3.341 7.7-7.7'/%3E%3Cpath fill='%23333' fill-rule='evenodd' d='M173.243 345.433a5.108 5.108 0 0 1-2.558 4.445l-42.355 24.375a4.977 4.977 0 0 1-2.331.674h-.438a5.052 5.052 0 0 1-2.34-.674l-42.354-24.375a5.132 5.132 0 0 1-2.561-4.445l.093-65.635c0-.913.474-1.762 1.277-2.21a2.461 2.461 0 0 1 2.54 0l25.173 14.414c1.592.945 2.56 2.614 2.56 4.439v30.664c0 1.828.969 3.52 2.555 4.429l10.718 6.173a5.092 5.092 0 0 0 2.564.687c.873 0 1.768-.226 2.544-.687l10.715-6.173a5.1 5.1 0 0 0 2.558-4.43v-30.663c0-1.825.982-3.504 2.564-4.44l25.165-14.413a2.49 2.49 0 0 1 2.557 0 2.556 2.556 0 0 1 1.27 2.21zm199.867-34.176c0-.456-.245-.88-.64-1.106l-14.549-8.386a1.282 1.282 0 0 0-1.277 0l-14.548 8.386c-.397.227-.64.65-.64 1.106v16.799c0 .456.243.879.64 1.108l14.546 8.402a1.28 1.28 0 0 0 1.281 0l14.547-8.402c.395-.23.64-.652.64-1.108zm3.93 124.403a2.56 2.56 0 0 1-3.805-2.235v-65a1.79 1.79 0 0 0-2.685-1.551l-10.609 6.112a5.115 5.115 0 0 1-5.112-.001l-42.37-24.453a5.115 5.115 0 0 1-2.56-4.431v-48.916c0-1.828.975-3.516 2.557-4.432l42.37-24.471a5.12 5.12 0 0 1 5.118 0l42.377 24.47a5.122 5.122 0 0 1 2.558 4.433V417.12a5.118 5.118 0 0 1-2.624 4.468zm141.091-107.165a5.116 5.116 0 0 1 2.546 4.424v11.854c0 1.823-.97 3.51-2.548 4.425l-42.099 24.443a5.117 5.117 0 0 1-5.127.007l-42.356-24.453a5.115 5.115 0 0 1-2.558-4.43v-48.903c0-1.84.987-3.537 2.584-4.446l42.093-23.985a5.112 5.112 0 0 1 5.017-.028l25.46 14.151a2.557 2.557 0 0 1 .032 4.455l-42.625 24.465a2.559 2.559 0 0 0-1.286 2.219v15.326c0 .914.488 1.76 1.281 2.216l13.266 7.648a2.555 2.555 0 0 0 2.554 0l13.272-7.648a2.556 2.556 0 0 0 1.28-2.216v-12.058a2.56 2.56 0 0 1 3.844-2.213z'/%3E%3Cpath fill='%23689f63' fill-rule='evenodd' d='M472.842 330.786a.98.98 0 0 0 .982 0l8.13-4.69a.983.983 0 0 0 .491-.851v-9.388a.982.982 0 0 0-.49-.851l-8.13-4.691a.98.98 0 0 0-.983 0l-8.124 4.69a.982.982 0 0 0-.49.852v9.388c0 .35.186.675.49.85z'/%3E%3C/g%3E%3Cg clip-path='url(%23b)' transform='matrix(1.33333 0 0 -1.33333 0 800)'%3E%3Cpath fill='url(%23c)' d='M239.032 373.393l-42.134-24.315a5.085 5.085 0 0 1-2.545-4.407v-48.666c0-1.818.969-3.497 2.544-4.408l42.133-24.334a5.093 5.093 0 0 1 5.091 0l42.124 24.334a5.093 5.093 0 0 1 2.543 4.408v48.668a5.084 5.084 0 0 1-2.545 4.405l-42.123 24.315a5.088 5.088 0 0 1-5.088 0'/%3E%3C/g%3E%3Cg clip-path='url(%23d)' transform='matrix(1.33333 0 0 -1.33333 0 800)'%3E%3Cpath fill='url(%23e)' d='M195.4 292.914a5.09 5.09 0 0 1 1.497-1.317l36.143-20.874 6.017-3.46a5.127 5.127 0 0 1 2.936-.665c.337.028.673.09 1.001.185l44.43 81.357a5.06 5.06 0 0 1-1.181.938l-27.588 15.925-14.579 8.39c-.417.24-.864.413-1.323.526z'/%3E%3C/g%3E%3Cg clip-path='url(%23f)' transform='matrix(1.33333 0 0 -1.33333 0 800)'%3E%3Cg clip-path='url(%23g)'%3E%3Cpath fill='url(%23h)' d='M237.627 382.331l-.58-.331h.774z'/%3E%3C/g%3E%3C/g%3E%3Cg clip-path='url(%23i)' transform='matrix(1.33333 0 0 -1.33333 0 800)'%3E%3Cpath fill='url(%23j)' d='M241.065 374.048a5.072 5.072 0 0 1-2.033-.655l-42.014-24.245 45.293-82.513a5.081 5.081 0 0 1 1.81.628l42.124 24.334a5.096 5.096 0 0 1 2.458 3.477l-46.178 78.89a5.295 5.295 0 0 1-1.035.102c-.142 0-.284-.006-.425-.018'/%3E%3C/g%3E%3Cg clip-path='url(%23k)' transform='matrix(1.33333 0 0 -1.33333 0 800)'%3E%3Cg clip-path='url(%23l)'%3E%3Cpath fill='url(%23m)' d='M290.279 292.38l-.279.477v-.639z'/%3E%3C/g%3E%3C/g%3E%3Cg clip-path='url(%23n)' transform='matrix(1.33333 0 0 -1.33333 0 800)'%3E%3Cg clip-path='url(%23o)'%3E%3Cpath fill='url(%23p)' d='M286.351 291.597l-42.177-24.333a5.084 5.084 0 0 0-1.861-.633l.84-1.53L290 292.218v.639l-1.158 1.979c-.347-1.348-1.263-2.528-2.491-3.239'/%3E%3C/g%3E%3C/g%3E%3Cg clip-path='url(%23q)' transform='matrix(1.33333 0 0 -1.33333 0 800)'%3E%3Cg clip-path='url(%23r)'%3E%3Cpath fill='url(%23s)' d='M286.351 291.597l-42.177-24.333a5.084 5.084 0 0 0-1.861-.633l.84-1.53L290 292.218v.639l-1.158 1.979c-.347-1.348-1.263-2.528-2.491-3.239'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
		description: "A JavaScript runtime built on Chrome's V8 JavaScript engine, using an event-driven, non-blocking I/O model for lightweight efficiency.",
		metadata: {
			categories: [
				"backend"
			],
			language: "javascript"
		}
	},
	{
		id: "springboot",
		name: "Spring Boot",
		icon: "data:image/png;base64,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",
		description: "Create stand-alone, production-grade Spring based Applications that you can \"just run\".",
		metadata: {
			categories: [
				"backend"
			],
			language: "java"
		}
	},
	{
		id: "thorntail",
		name: "Thorntail",
		icon: "data:image/svg+xml;charset=utf8,%3Csvg%20id%3D%22Layer_1%22%20data-name%3D%22Layer%201%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill%3A%23656565%3B%7D.cls-2%7Bfill%3A%233f9c35%3B%7D.cls-3%7Bfill%3A%230088ce%3B%7D.cls-4%7Bfill%3A%2392d400%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%3Ctitle%3Ethorntail_icon_rgb_512px%3C%2Ftitle%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M444.32%2C406.46a59.28%2C59.28%2C0%2C0%2C0-6.67%2C4.37c-2.32%2C1.7-4.52%2C3.57-6.8%2C5.33-1.08.84-2.22%2C1.59-3.33%2C2.38.07.21.14.42.22.63%2C2.9%2C1.22%2C5.81%2C2.4%2C8.7%2C3.66%2C3.7%2C1.63%2C7.36%2C3.4%2C11.08%2C5%2C3%2C1.27%2C6.2%2C2.14%2C9.2%2C3.51a48.31%2C48.31%2C0%2C0%2C0%2C22%2C4.61c1.77-.07%2C2.45-1.45%2C2.87-2.74.2-.61-.68-2.08-1.4-2.66a76.52%2C76.52%2C0%2C0%2C0-9.33-6.92%2C64%2C64%2C0%2C0%2C1-11.81-9%2C37.32%2C37.32%2C0%2C0%2C0-11.83-7.76C446.32%2C406.47%2C445%2C406.08%2C444.32%2C406.46Z%22%2F%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M373.53%2C423c-1.39-1-2.89-1.75-4.21-2.8-2-1.58-3.82-3.38-5.81-5-1.75-1.38-3.62-2.57-5.73-4a45.31%2C45.31%2C0%2C0%2C0-9.23%2C8.39c-.74.92-1.37%2C1.94-2.14%2C2.82-1.16%2C1.34-1.17%2C1.9.5%2C2.85%2C4.47%2C2.55%2C9%2C5%2C13.5%2C7.5%2C5.38%2C3%2C10.86%2C5.7%2C16.13%2C8.89a18.59%2C18.59%2C0%2C0%2C0%2C10.4%2C3%2C32.32%2C32.32%2C0%2C0%2C1%2C7.49.18%2C4.31%2C4.31%2C0%2C0%2C0%2C4.74-1.51l-2.62-2.78c-.6-.64-1.2-1.28-1.77-2a14.16%2C14.16%2C0%2C0%2C0-1.77-2.17c-1.39-1.07-2.93-1.9-4.37-2.9C383.6%2C430.07%2C378.57%2C426.53%2C373.53%2C423Z%22%2F%3E%3Cpath%20d%3D%22M347.45%2C122.88a46.74%2C46.74%2C0%2C0%2C0%2C3%2C4.72c1.09%2C1.45%2C2.58%2C2.58%2C3.63%2C4%2C2.41%2C3.36%2C6%2C3.35%2C9.16%2C4.57.5.19%2C1.5-.74%2C1.94-1.4a2.18%2C2.18%2C0%2C0%2C0-.58-1.84%2C23.63%2C23.63%2C0%2C0%2C0-3.69-2.25c-4-2.05-6.42-5.72-8.56-9.48a54.9%2C54.9%2C0%2C0%2C1-4.09-9.78c-.71-2.14-1.55-4.44-.66-7%2C1.89%2C3.33%2C3.63%2C6.36%2C5.32%2C9.41%2C3.37%2C6%2C8.92%2C9.57%2C13.94%2C13.68a4.8%2C4.8%2C0%2C0%2C0%2C3.24%2C1.16%2C3.85%2C3.85%2C0%2C0%2C0%2C2.42-2.12c.26-.55-.33-2-.92-2.6-2.27-2.37-4.88-4.39-7-6.87a96.58%2C96.58%2C0%2C0%2C1-6.52-9%2C63.32%2C63.32%2C0%2C0%2C1-4.48-7.51A21.54%2C21.54%2C0%2C0%2C1%2C351%2C89.38a16.54%2C16.54%2C0%2C0%2C0-.3-4.19%2C13.4%2C13.4%2C0%2C0%2C0-1-2.58c-.78.53-1.57%2C1-2.34%2C1.59a.9.9%2C0%2C0%2C0-.26.47c-1.3%2C4.11-2.42%2C8.28-1.79%2C12.86.49%2C3.58.54%2C3.58-1.63%2C6.11%2C0-1.37%2C1.19-2.68-.31-4.12-.24.3-.49.49-.57.75A21%2C21%2C0%2C0%2C0%2C345%2C118.44C345.87%2C119.88%2C346.59%2C121.42%2C347.45%2C122.88Z%22%2F%3E%3Cpath%20d%3D%22M360.19%2C87.75c.24%2C1.55.12%2C3.16.51%2C4.67.65%2C2.56.88%2C5.34%2C3.1%2C7.33a2%2C2%2C0%2C0%2C1%2C.54%2C1.42c-.14%2C1.73.89%2C2.9%2C1.84%2C4.13a17.5%2C17.5%2C0%2C0%2C1%2C2.44%2C3.27c2%2C4.49%2C5.3%2C7.82%2C8.89%2C10.84a39.56%2C39.56%2C0%2C0%2C0%2C5.75%2C3.9c1.77%2C1%2C3.1.44%2C3.91-1.4.74-1.65-.36-2.94-1.47-3.82a38.83%2C38.83%2C0%2C0%2C1-8.56-9.6c-1.8-2.83-3.21-5.92-4.81-8.89a23.57%2C23.57%2C0%2C0%2C1-1.73-3c-1.57-4.37-2.94-8.81-4.55-13.17-1-2.82-2.37-5.53-3.7-8.58a13.33%2C13.33%2C0%2C0%2C0-1.7%2C1.24c-1.54%2C1.63-1.77%2C3.83-1.54%2C6.08C359.3%2C84%2C359.89%2C85.87%2C360.19%2C87.75Z%22%2F%3E%3Cpath%20d%3D%22M359.17%2C230.84a7.61%2C7.61%2C0%2C0%2C0-.33%2C2.85c-.18%2C2.68-.32%2C5.37-.48%2C8.05l.28%2C0%2C.06.58c.41%2C3.79.42%2C3.79%2C3.91%2C4.83.28.08.52.4.79.45a3.17%2C3.17%2C0%2C0%2C0%2C1.63.09c2.75-1.12%2C3-4%2C3.13-6.59.13-3.4-1.3-6.65-3.07-9.66C363.68%2C229.06%2C360.34%2C228.68%2C359.17%2C230.84Z%22%2F%3E%3Cpath%20d%3D%22M437.84%2C227.32a2.69%2C2.69%2C0%2C0%2C1%2C.53%2C1.41c.23%2C1.76%2C1.34%2C2.67%2C2.73%2C1.92%2C3-1.62%2C3.93-2.49%2C3.52-6.27-.07-.7-.13-1.4-.2-2.1%2C0-2.53-.41-4.72-3.25-5.78-1.7-.63-2.42-.62-2.34%2C1.17.09%2C2.26-.93%2C3.9-1.71%2C5.69A3.22%2C3.22%2C0%2C0%2C0%2C437.84%2C227.32Z%22%2F%3E%3Cpath%20class%3D%22cls-2%22%20d%3D%22M305.16%2C349.53c1.28-1.92%2C2.63-3.78%2C3.81-5.77a24.55%2C24.55%2C0%2C0%2C0%2C1.81-4.08c.78-2.09%2C1.37-4.27%2C2.19-6.34%2C1-2.43%2C2.48-4.73%2C0-7.49-.15-.18-.16-.5-.29-.72-2.32-4-4.78-8-8.38-10.87-2.77-2.23-5.66-4.31-8.6-6.24a35.56%2C35.56%2C0%2C0%2C1-10.9-11.23c-1.31-2.11-2.91-4-4.38-6.05l-.46.08c0%2C.66%2C0%2C1.31.1%2C2a24.25%2C24.25%2C0%2C0%2C1%2C.47%2C3.33c-.05%2C1.52-.44%2C3-.53%2C4.52-.13%2C2.19-.1%2C4.4-.16%2C6.61-.05%2C2-.28%2C4-.14%2C5.95.26%2C3.6.84%2C7.2%2C1.1%2C10.81.39%2C5.6.63%2C11.2.9%2C16.79.13%2C2.85%2C0%2C5.7.29%2C8.54.54%2C4.67%2C1.36%2C9.33%2C2.12%2C14%2C.26%2C1.57.72%2C3.12%2C1.05%2C4.69.91%2C4.28%2C1.79%2C8.56%2C2.77%2C13.25.23-.57.31-.73.36-.9a62.67%2C62.67%2C0%2C0%2C1%2C12.39-24.22A72%2C72%2C0%2C0%2C0%2C305.16%2C349.53Z%22%2F%3E%3Cpath%20class%3D%22cls-2%22%20d%3D%22M474.64%2C305.11c-.19%2C4.23-.35%2C8.19-.55%2C12.14-.15%2C2.8-.43%2C5.58-.51%2C8.39s-1.32%2C5.46-.87%2C8.45c.09.57-.32%2C1.17-.4%2C1.78a12.33%2C12.33%2C0%2C0%2C0%2C0%2C1.72l.95.26c.6-1.45%2C1.13-2.93%2C1.8-4.33a52.78%2C52.78%2C0%2C0%2C0%2C2.71-5.36c.9-2.64%2C1.46-5.44%2C2.11-8.19a12.29%2C12.29%2C0%2C0%2C0-1.22-8.05c-.74-1.61-1.68-3.13-2.57-4.66C475.68%2C306.57%2C475.2%2C305.94%2C474.64%2C305.11Z%22%2F%3E%3Cpath%20class%3D%22cls-3%22%20d%3D%22M281.52%2C378q-1.72-7.81-3.33-15.66c-.7-3.4-1.43-6.81-1.93-10.22-.34-2.41-.33-4.83-.44-7.25-.24-5.38-.38-10.75-.73-16.14-.23-3.61-.72-7.24-1.12-10.86a20.94%2C20.94%2C0%2C0%2C1-.49-4.15c.65-5.75-.54-11.52-1-17.29-.38-4.53-.59-9.07-1-13.6a7.64%2C7.64%2C0%2C0%2C0-1.11-3.51c-3.54-5.09-7.21-10.1-10.88-15.11-2.37-3.24-4.87-6.39-7.22-9.64-1.32-1.82-2.38-3.85-3.72-5.65-3.48-4.72-6.94-9.47-10.63-14s-6.35-9.56-10.49-13.55c-.81-.78-1.37-1.84-2.14-2.69-1.52-1.66-3.15-3.21-4.63-4.92-1.13-1.3-2-2.83-3.15-4.13-2-2.25-4.14-4.33-6.09-6.6-3.32-3.89-6.5-7.91-9.82-11.8-2.46-2.89-5.12-5.58-7.56-8.48-2.18-2.58-4.08-5.43-6.3-8-3.42-3.95-7.2-7.58-10.46-11.66-2.86-3.57-5.47-7.3-9-10.28-2.67-2.29-5.25-4.71-7.82-7.14-3.41-3.21-5.7-7.55-9.64-10.29-2-1.41-3.71-3.46-5.54-5.22.51%2C3.47%2C3.89%2C4.11%2C5.3%2C6.94S155.29%2C141%2C157%2C144s4.61%2C5.17%2C6.58%2C8c4.34%2C6.27%2C8.71%2C12.56%2C12.53%2C19.15%2C4.19%2C7.23%2C7.76%2C14.81%2C11.61%2C22.24%2C2.17%2C4.18%2C4.2%2C8.34%2C7.63%2C11.83a185.5%2C185.5%2C0%2C0%2C1%2C12.76%2C14.88%2C18.82%2C18.82%2C0%2C0%2C1%2C4%2C9.63c-1.4-.06-2.62-.12-3.84-.16-4-.13-6.57-2.79-8.86-6.09a56.85%2C56.85%2C0%2C0%2C0-5.13-6.58c-3.11-3.27-6.64-6.12-9.62-9.5a186.6%2C186.6%2C0%2C0%2C0-13.56-14.56c-6.58-6.05-12.79-12.57-19.87-18A89.47%2C89.47%2C0%2C0%2C1%2C138.86%2C164a65.66%2C65.66%2C0%2C0%2C0-6.54-6.49c-3.3-2.75-6.86-5.11-9.53-8.67a17.65%2C17.65%2C0%2C0%2C0-3-2.91%2C100.15%2C100.15%2C0%2C0%2C1-8.32-6.93c-2.73-2.75-6.13-4.74-9.21-7.1-4.17-3.2-8.27-6.54-12.52-9.61-4.06-2.94-8.17-5.86-12.46-8.36-6.78-4-14-6.36-21.45-8.51%2C2%2C1.68%2C3.92%2C3.4%2C5.93%2C5%2C1.44%2C1.16%2C3%2C2.11%2C4.45%2C3.26%2C2.22%2C1.77%2C4.37%2C3.65%2C6.58%2C5.44.74.59%2C1.63%2C1%2C2.38%2C1.54%2C2.54%2C1.93%2C5.07%2C3.87%2C7.55%2C5.89%2C1%2C.82%2C1.77%2C2%2C2.78%2C2.75s2.45%2C1.24%2C3.47%2C2.14c4.43%2C3.9%2C8.81%2C7.88%2C13.16%2C11.88%2C3.92%2C3.63%2C7.9%2C7.21%2C11.66%2C11%2C3.27%2C3.32%2C7.07%2C6%2C9.84%2C10%2C2.06%2C2.94%2C4.76%2C5.41%2C7.07%2C8.18%2C1.29%2C1.56%2C2.29%2C3.36%2C3.54%2C5%2C1.6%2C2%2C3.4%2C3.91%2C5%2C6%2C4.74%2C6.22%2C9.48%2C12.45%2C14.08%2C18.78%2C2.85%2C3.93%2C5.42%2C8.07%2C8.18%2C12.08a77.13%2C77.13%2C0%2C0%2C0%2C5.06%2C6.82c1.2%2C1.39%2C3%2C2.24%2C4.2%2C3.61a26.64%2C26.64%2C0%2C0%2C1%2C3.44%2C4.88%2C1.68%2C1.68%2C0%2C0%2C1-1.65%2C2.55%2C61.45%2C61.45%2C0%2C0%2C1-7.86-2.53c-1.92-.78-3.67-2.09-5.55-3.05-6.88-3.52-13.77-7-20.68-10.47-3.65-1.82-7.33-3.57-11.06-5.13s-7.32-2.52-10.88-4.07c-5.59-2.43-11.11-5.08-16.62-7.73-3.15-1.51-6.21-3.24-9.34-4.8-4.58-2.29-9.15-4.66-13.8-6.75-6.76-3-13.55-6.06-20.42-8.72C50.91%2C176.81%2C45.64%2C174.15%2C40%2C173A24.94%2C24.94%2C0%2C0%2C1%2C36.9%2C172l-.1.45c2%2C.78%2C4.11%2C1.44%2C6.09%2C2.38%2C3.59%2C1.71%2C7.13%2C3.57%2C10.67%2C5.41%2C4.16%2C2.17%2C8.28%2C4.41%2C12.43%2C6.59%2C2%2C1.06%2C4.08%2C2%2C6%2C3.12q6.45%2C3.83%2C12.78%2C7.87c6.13%2C3.89%2C12.14%2C8%2C18.36%2C11.73%2C4%2C2.37%2C7.52%2C5.39%2C11.46%2C7.76%2C2.58%2C1.55%2C5%2C3.35%2C7.52%2C5.11%2C4.08%2C2.9%2C8.18%2C5.77%2C12.18%2C8.81%2C5.74%2C4.36%2C11.47%2C8.75%2C17.08%2C13.32%2C4.36%2C3.55%2C8.54%2C7.37%2C12.76%2C11.11q8.29%2C7.36%2C16.53%2C14.8c1.28%2C1.15%2C2.41%2C2.5%2C3.75%2C3.55s2.84%2C1.71%2C4.16%2C2.72c5.75%2C4.45%2C11.57%2C8.82%2C17.17%2C13.49a154%2C154%2C0%2C0%2C1%2C14.64%2C13.22%2C208.52%2C208.52%2C0%2C0%2C1%2C13.71%2C17.1c4%2C5.33%2C7.52%2C11%2C11.52%2C16.35%2C3.41%2C4.54%2C7.27%2C8.72%2C10.79%2C13.18%2C3%2C3.88%2C6%2C7.82%2C8.77%2C11.93%2C3.6%2C5.41%2C6.84%2C11.08%2C10.41%2C16.53%2C2.27%2C3.47%2C4.83%2C6.73%2C7.27%2C10.08.9%2C1.24%2C1.82%2C2.47%2C2.73%2C3.7-.46-1.71-1.35-3.19-1.81-4.77C282.91%2C384.35%2C282.21%2C381.15%2C281.52%2C378Z%22%2F%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M495.3%2C259.58c-3.76-.66-7.64-.9-11.23-2.26-4-1.5-7.94-1.74-11.9-2.47-3.32-.62-6.67-.84-10-1.46s-6.79-1.6-10.19-2.32a33.23%2C33.23%2C0%2C0%2C0-5-.74c-4.39-.25-8.79-.56-13.14-.48-2.23%2C0-3%2C1.62-2.76%2C4%2C.2%2C1.78.49%2C3.55.74%2C5.32l-.26.15c.7%2C1.48%2C1.51%2C2.92%2C2.08%2C4.44.86%2C2.33%2C2.5%2C1.55%2C3.95%2C1.65.18%2C0%2C.36.11.54.11%2C3.65.13%2C7.31.38%2C10.95.36%2C5.15%2C0%2C10.27-.31%2C15.42-.37%2C4.23-.06%2C8.46.54%2C12.67-.49s9-1%2C13.54-1.46a29.4%2C29.4%2C0%2C0%2C0%2C4.92-.51c1.12-.32%2C2.93-1.38%2C2.84-2C498.2%2C259.57%2C496.54%2C259.8%2C495.3%2C259.58Z%22%2F%3E%3Cpath%20d%3D%22M503.54%2C256.9a15.8%2C15.8%2C0%2C0%2C0-3.7-1.11c-3.67-.87-7.35-1.69-11-2.53l-6.62-1.54a23.12%2C23.12%2C0%2C0%2C1%2C.47-4.06%2C20%2C20%2C0%2C0%2C0%2C1.16-7.68c-.2-2.81.84-5.57%2C1.06-8.47.5-6.57%2C1.12-13.09.07-19.8-.31-2-.56-4-1-6a37.83%2C37.83%2C0%2C0%2C0-4.07-11c-1.74-2.86-3.56-5.67-5.41-8.46-.85-1.29-1.9-2.45-2.81-3.71-2.73-3.79-5.19-7.83-8.21-11.34-4.32-5-9.11-9.58-13.56-14.48-3.29-3.62-6.32-7.5-9.56-11.18-1.61-1.82-3.4-3.49-5.18-5.14-1-.92-2.28-1.5-3.15-2.51-2.54-3-3.84-7.15-7.74-8.85-.24-.1-.4-.5-.56-.78-2.5-4.42-6.18-7.86-9.74-11.12a42.46%2C42.46%2C0%2C0%2C1-6.28-7.92c-2.24-3.31-4.3-6.76-6.32-10.21a58.49%2C58.49%2C0%2C0%2C1-3.73-7.2c-1.16-2.88-1.93-5.89-2.87-8.84-.61-1.9-1.34-3.78-1.77-5.7-1-4.58-1.89-9.18-2.9-13.76-.12-.57-.84-1.54-1.11-1.5a2.43%2C2.43%2C0%2C0%2C0-1.66%2C1.1%2C9.82%2C9.82%2C0%2C0%2C0-.66%2C2.56l-.24-.07c0-.72%2C0-1.44%2C0-2.16l-.59-.16a29.76%2C29.76%2C0%2C0%2C0-1.28%2C4.49c-.54%2C4-.85%2C8.11-1.31%2C12.15-.08.7-.67%2C1.32-.64%2C2%2C.08%2C1.75.36%2C3.52.58%2C5.28.07.56.48%2C1.37.27%2C1.63-1.05%2C1.28-.82%2C3-.61%2C4.37a105.93%2C105.93%2C0%2C0%2C0%2C2.48%2C11A3.2%2C3.2%2C0%2C0%2C0%2C386.8%2C106a2.22%2C2.22%2C0%2C0%2C1%2C1.6%2C2.09%2C11.84%2C11.84%2C0%2C0%2C0%2C.77%2C2.68c1.15%2C3%2C2.3%2C5.9%2C3.56%2C8.8a12.66%2C12.66%2C0%2C0%2C0%2C1.83%2C2.67%2C9.15%2C9.15%2C0%2C0%2C0%2C1.71%2C1.64c1.05.79.57%2C2.06%2C1%2C2.73a26.88%2C26.88%2C0%2C0%2C0%2C3.83%2C4.54c.2.23.73.33.75.5.27%2C2%2C2.11%2C3%2C3.16%2C3.72%2C4.3%2C2.88%2C7.69%2C6.78%2C11.41%2C10.31a9.1%2C9.1%2C0%2C0%2C0%2C3.49%2C2.16c2%2C.6%2C2.28.86%2C1.15%2C2.56%2C1.38%2C1%2C2.8%2C2%2C4.13%2C3.08%2C3.05%2C2.48%2C6.66%2C4.19%2C9%2C7.66a2.57%2C2.57%2C0%2C0%2C0%2C1.22.88%2C14.29%2C14.29%2C0%2C0%2C1%2C6.88%2C5.51%2C15.68%2C15.68%2C0%2C0%2C0%2C3.11%2C3.14c2.27%2C1.78%2C4.66%2C3.39%2C7%2C5.14a9%2C9%2C0%2C0%2C1%2C1.18%2C1.5%2C11.77%2C11.77%2C0%2C0%2C0%2C2%2C2.27c3.36%2C2.2%2C5.94%2C5.26%2C8.42%2C8.42%2C1%2C1.26%2C1.65%2C2.8%2C2.57%2C4.13%2C2.4%2C3.48%2C4.89%2C6.89%2C7.3%2C10.37a16.28%2C16.28%2C0%2C0%2C1%2C2.41%2C4c1.3%2C4.06%2C2.49%2C8.16%2C3.41%2C12.29a36.25%2C36.25%2C0%2C0%2C1%2C.54%2C7c.1%2C3.87.08%2C7.72.13%2C11.59a27.06%2C27.06%2C0%2C0%2C1-2.2%2C11.94%2C1.61%2C1.61%2C0%2C0%2C1-1.27.88c-3.16-.29-6.33-.63-9.5-1.11-2.79-.43-5.57-1.17-8.36-1.6s-5.84-.65-8.76-1c-1.25-.15-2.51-.4-3.75-.64-5-.91-9.94-2.49-14.49.71-3.43%2C2.42-6.67%2C5-6.91%2C9.69-.19%2C3.73.8%2C7.65%2C1.29%2C11.48a1.72%2C1.72%2C0%2C0%2C0%2C.49%2C1c2.48%2C1.91%2C4.8%2C4.19%2C8.1%2C4.05%2C5.28-.23%2C10.58-.34%2C15.87-.46%2C5.54-.12%2C11.07-.2%2C16.61-.29%2C1.77%2C0%2C3.55%2C0%2C5.48-.06a6%2C6%2C0%2C0%2C1%2C.28%2C1.77c-1%2C7.2-2%2C14.43-3.21%2C21.58-.73%2C4.27-2%2C8.4-2.8%2C12.65-.47%2C2.42-.55%2C5-.89%2C7.42-.57%2C4.21-1.2%2C8.4-1.84%2C12.59-.15%2C1-.58%2C2-.63%2C3.06-.27%2C4.79-.41%2C9.6-.67%2C14.39-.22%2C3.95-.35%2C7.92-.87%2C11.8-.44%2C3.32-1.41%2C6.51-2%2C9.79-.57%2C2.9-1%2C5.84-1.47%2C8.78-.27%2C1.77-.3%2C3.62-.63%2C5.37-.45%2C2.36-1.25%2C4.62-1.59%2C7-.73%2C5.12-1.24%2C10.3-1.92%2C15.44a5.61%2C5.61%2C0%2C0%2C1-1%2C1.84c-3.4-2.21-6.13-5.63-10.19-3.55-1.77.9-4%2C1.08-5.55%2C2.19-3.08%2C2.16-5.61%2C5.09-9.11%2C6.74-1.13.53-1.86%2C1.89-2.8%2C2.85-.57.58-1.09%2C1.44-1.8%2C1.62-4.25%2C1.09-8.53%2C2.11-12.85%2C3-2.9.57-5.87.87-8.83%2C1.2-2.28.25-4.58.44-6.9.49-3.2.08-6.41.06-9.63%2C0-2-.06-4.12-.32-6.18-.51-.89-.08-1.77-.2-2.66-.35a4.81%2C4.81%2C0%2C0%2C1-1.92-.47c-1.77-1.22-3.43-2.64-5.17-3.89-2.38-1.7-4.82-3.29-7.19-5a2.33%2C2.33%2C0%2C0%2C1-.79-1.36c-.28-1.88-.89-2.16-2.51-1.4-4.57%2C2.14-8.08%2C5.75-11.94%2C8.88-1.17%2C1-1.86%2C2.81-4%2C2.45-.38-.07-1.31%2C1.13-1.18%2C1.52.56%2C1.73-.64%2C2.43-1.14%2C3.6-.74%2C1.71-1.94%2C1.87-3.47%2C1.64-.66-.1-1.31-.3-2-.37l-13.59-1.39a6.84%2C6.84%2C0%2C0%2C0-1.6-.16c-4.11.53-7.71-1.88-11.43-3.37a37.78%2C37.78%2C0%2C0%2C1-6.77-4c-1.81-1.22-4-2-4.87-4.45-1.31-3.8-2.53-7.63-3.75-11.45a2.4%2C2.4%2C0%2C0%2C1%2C0-1.13c.56-3.29.92-6.67%2C1.77-9.85%2C1.37-5.08%2C2.72-10.12%2C5.43-14.64%2C3.08-5.13%2C6.07-10.23%2C10.05-14.62%2C2.32-2.54%2C4.22-5.52%2C6.33-8.28a5.17%2C5.17%2C0%2C0%2C1%2C1.26-1.21c2.83-1.86%2C3.61-5.25%2C4.71-8.26.69-1.89.34-4.29.53-6.44.36-4.15.39-8.31-1.18-12.42a13.42%2C13.42%2C0%2C0%2C0-1.7-2.76%2C21.23%2C21.23%2C0%2C0%2C0-1.39-1.62%2C86.06%2C86.06%2C0%2C0%2C0-5.75-6.69c-2.59-2.48-5.49-4.59-8.23-6.89q-4.38-3.69-8.72-7.43c-1-.86-2-1.73-2.91-2.64-1.92-1.86-3.95-3.63-5.7-5.66-2.44-2.82-5.59-5.15-6.54-9.12-.07-.27-.34-.72-.51-.74-2.09-.22-1.7-1.89-1.82-3.17-.18-1.84-.12-3.68-.35-5.51s-.77-3.74-1.06-5.61c-.13-.88.33-2%2C0-2.62-1.78-3.07-.18-6.17-1.26-9.45-1.25-3.82-.87-8.11-1.08-12.2-.14-2.68-.1-5.37%2C0-8%2C0-1.24.45-2.44.45-3.68%2C0-2.13-.47-4.32-.3-6.4a58.06%2C58.06%2C0%2C0%2C1%2C1.35-7c.84-4%2C1.59-8.06%2C2.59-12%2C.58-2.28%2C1.64-4.37%2C2.39-6.59a60.91%2C60.91%2C0%2C0%2C1%2C3-7.24c2.26-4.63%2C5.7-8.13%2C8.67-12.08a8.35%2C8.35%2C0%2C0%2C1%2C2.05-1.61c1.54-1.06%2C3.07-2.13%2C4.64-3.12a20.58%2C20.58%2C0%2C0%2C1%2C3.6-1.95c2.15-.79%2C4.33-1.4%2C5.79-3.4%2C2.72-3.72%2C6.83-5.61%2C10.44-8.1%2C3.06-2.11%2C6.5-3.61%2C9.68-5.54%2C2.78-1.69%2C5.39-3.64%2C8.14-5.39%2C1.67-1.05%2C3.44-1.94%2C5.18-2.88%2C2.19-1.19%2C4.39-2.36%2C6.27-3.37a8.24%2C8.24%2C0%2C0%2C1%2C1.43-1.69%2C27.5%2C27.5%2C0%2C0%2C1%2C3-1.39l5.07-2.27-.17-.47-3.86-1.36c.18-.6-.34-1.28-1.35-1.26-.53%2C0-1%2C.24-1.57.23-3.65-.06-7.26%2C0-10.26%2C2.28-.19.15-.54.1-.83.09a8.54%2C8.54%2C0%2C0%2C0-2.65-.11c-3.57%2C1.09-7.12%2C2.26-10.62%2C3.54-4.07%2C1.48-8.27%2C2.75-12.06%2C4.77a151.29%2C151.29%2C0%2C0%2C0-13.25%2C8.45c-3.23%2C2.18-6.34%2C4.54-9.48%2C6.86-1.95%2C1.43-3.85%2C2.93-5.78%2C4.39-3.35%2C2.52-5.6%2C6.07-7.47%2C9.86-.8%2C1.62-.66%2C3.84-2.64%2C4.66-.14.07-.15.43-.24.65a13.77%2C13.77%2C0%2C0%2C1-.92%2C2.15c-.68%2C1.08-1.55%2C2-2.21%2C3.11a16.41%2C16.41%2C0%2C0%2C0-1%2C2.47%2C15.47%2C15.47%2C0%2C0%2C0-1.09%2C2.39c-.44%2C1.3-.47%2C2.95-1.26%2C3.9-2%2C2.36-1.2%2C5.47-1.71%2C8.21-.38%2C2-.05%2C4.17-.26%2C6.22-.29%2C2.89-1.14%2C5.6-.46%2C8.75.51%2C2.31-.05%2C4.76.16%2C7.15.41%2C4.42%2C1.09%2C8.84%2C1.55%2C13.26.22%2C2.12.21%2C4.25.28%2C6.37a38.29%2C38.29%2C0%2C0%2C1%2C.07%2C4.41c-.29%2C3.48-1.07%2C6.82-.16%2C10.52.67%2C2.75.63%2C5.64.9%2C8.47l-.45.14c-1.86-2.86-3.77-5.7-5.57-8.6-2.06-3.3-4-6.67-6-10s-4.22-6.81-6.28-10.25c-1.35-2.24-2.29-4.88-4-6.73-2.31-2.51-3.95-5.52-6.28-8-1.19-1.28-2.59-2.41-3.7-3.8-.56-.7-1.11-1.42-1.6-2.17-1.18-1.79-2.2-3.7-3.51-5.39-2.39-3.09-5-6.06-7.44-9.08-.45-.55-.89-1.13-1.39-1.63-1.56-1.58-3.25-3-4.7-4.71-1.21-1.39-2-3.17-3.24-4.52-2.12-2.31-4.49-4.37-6.66-6.63-1.2-1.24-2.24-2.66-3.34-4a21.45%2C21.45%2C0%2C0%2C0-3-3.6%2C4.7%2C4.7%2C0%2C0%2C1-2-2.36c-.23-.66-1.25-1.07-1.92-1.59a3.62%2C3.62%2C0%2C0%2C1-.72-.62c-1.44-2-2.77-4-4.3-5.92-1.92-2.35-4.14-4.45-6-6.86-1.63-2.12-3.05-4.37-5.46-5.62-.28-.14-.41-.63-.62-1-1.15-1.73-1.71-3.83-3.67-5.07a25%2C25%2C0%2C0%2C1-3.65-3.49c-.63.29-1.48.4-1.61-1.26a1.54%2C1.54%2C0%2C0%2C0-.54-.94c-1.67-1.36-3.46-2.58-5-4-2.23-2-4.19-4.42-6.5-6.33s-5.13-3.62-7.73-5.38c-1.43-1-2.89-1.92-4.36-2.81-1.25-.76-2.56-2-3.81-2a5.1%2C5.1%2C0%2C0%2C1-4.08-2.57%2C3.27%2C3.27%2C0%2C0%2C0-3.46-1.43%2C3.49%2C3.49%2C0%2C0%2C1-1.26-.22c-.86-.27-1.71-.6-2.57-.9l.74-.73c-.84-.31-1.71-.57-2.53-.93-1.36-.61-2.69-1.32-4.05-1.91-2.13-.92-4-2.83-6.52-2.17l-1.21.33a4.76%2C4.76%2C0%2C0%2C0%2C.67%2C1.29c.89.84%2C1.94%2C1.5%2C2.78%2C2.38%2C2.85%2C2.94%2C5.63%2C6%2C8.45%2C8.92%2C3%2C3.16%2C6.36%2C6%2C8.81%2C9.72.55.84.86%2C1.86%2C1.45%2C2.65%2C2.34%2C3.1%2C4.76%2C6.13%2C7.12%2C9.21q5.13%2C6.71%2C10.23%2C13.44c2.68%2C3.52%2C5.64%2C6.86%2C7.95%2C10.61%2C2.94%2C4.78%2C5.36%2C9.89%2C8%2C14.86a8.38%2C8.38%2C0%2C0%2C1%2C.43%2C1.19c-2.41-1.8-4.85-3.49-7.15-5.38q-7.8-6.37-15.49-12.93c-3.07-2.61-6.05-5.37-9.06-8.07-5.21-4.68-10.39-9.39-15.63-14-3.68-3.27-7.36-6.56-11.19-9.62-5-4-10.07-7.8-15.16-11.59-4.09-3-8.13-6.19-12.42-8.84a129.79%2C129.79%2C0%2C0%2C0-22-11.11c-3.19-1.22-6.35-2.54-9.57-3.63s-6.14-2.07-9.2-3.15c-2.76-1-5.73-1.14-8-3.65-.16-.18-.56-.14-.85-.18-1.75-.24-3.59-.16-5.24-.79-2.53-1-4.93-2.46-7.41-3.68-1.06-.52-2.18-.93-3.27-1.39l-.34.59a8.68%2C8.68%2C0%2C0%2C0%2C1.7%2C1.85c4.07%2C2.38%2C8.16%2C4.73%2C12.31%2C6.95%2C3.44%2C1.85%2C7.08%2C2.94%2C10.07%2C6.1%2C3.21%2C3.4%2C7.17%2C6%2C10.74%2C9%2C2.35%2C2%2C4.58%2C4.16%2C6.91%2C6.16%2C4%2C3.4%2C8%2C6.67%2C12%2C10.13%2C4.15%2C3.68%2C8.25%2C7.43%2C12.21%2C11.34%2C2.52%2C2.5%2C4.62%2C5.49%2C7.12%2C8%2C4%2C4%2C8.14%2C7.78%2C12.13%2C11.76%2C3.13%2C3.12%2C6.23%2C6.28%2C9.1%2C9.65%2C1.93%2C2.26%2C3.32%2C5%2C5.17%2C7.39%2C2.31%2C2.94%2C4.9%2C5.65%2C7.26%2C8.54%2C4.81%2C5.89%2C9.94%2C11.51%2C14%2C18.05%2C1.37%2C2.22%2C2.88%2C4.36%2C4.57%2C6.9l-8.84-3.7c-5.16-2.16-10.36-4.24-15.48-6.52-3.87-1.72-7.63-3.8-11.5-5.55-4.19-1.89-8.48-3.53-12.69-5.39-7.41-3.27-14.83-6.53-22.19-10-5.52-2.59-11.29-4.2-16.82-6.86-4.49-2.16-9.36-3.32-14.1-4.62-4.21-1.16-8.48-1.92-12.73-2.79a27.17%2C27.17%2C0%2C0%2C0-3.2-.29l.44-.36c-2.72%2C0-5.45.11-8.18.07a27.59%2C27.59%2C0%2C0%2C1-4.61-.39%2C36.08%2C36.08%2C0%2C0%2C1-4-1.25c-3.1-1-6.19-2.19-9.41-2a18.41%2C18.41%2C0%2C0%2C0-2.55.58%2C52.23%2C52.23%2C0%2C0%2C0%2C4.76%2C3.47c4.47%2C2.53%2C9%2C5%2C13.51%2C7.33%2C6.62%2C3.37%2C13.32%2C6.5%2C19.94%2C9.87%2C7%2C3.58%2C14%2C7.3%2C21%2C11%2C3.17%2C1.67%2C6.41%2C3.22%2C9.47%2C5.14%2C5.38%2C3.37%2C10.67%2C6.94%2C16%2C10.49q5.92%2C4%2C11.76%2C8.1c3.94%2C2.78%2C7.8%2C5.69%2C11.73%2C8.48%2C3.31%2C2.34%2C6.73%2C4.51%2C10%2C6.9%2C2.74%2C2%2C5.36%2C4.17%2C8%2C6.31%2C4.41%2C3.58%2C8.86%2C7.11%2C13.19%2C10.81%2C6.06%2C5.19%2C12%2C10.5%2C18%2C15.78%2C5.35%2C4.72%2C10.66%2C9.5%2C16%2C14.17%2C2.61%2C2.26%2C5.34%2C4.36%2C8.07%2C6.45%2C3.88%2C3%2C7.81%2C5.85%2C11.7%2C8.8a57.21%2C57.21%2C0%2C0%2C1%2C5.63%2C4.53c2.73%2C2.68%2C5.27%2C5.56%2C7.86%2C8.39a96.12%2C96.12%2C0%2C0%2C1%2C6.43%2C7.26c2.4%2C3.23%2C4.39%2C6.78%2C6.69%2C10.1%2C2.92%2C4.21%2C5.91%2C8.38%2C9%2C12.47%2C1.89%2C2.52%2C3.92%2C4.94%2C6%2C7.29%2C3.44%2C3.88%2C7.13%2C7.53%2C10.4%2C11.55%2C3%2C3.69%2C5.62%2C7.75%2C8.42%2C11.64a29.59%2C29.59%2C0%2C0%2C1%2C2.66%2C3.63%2C60.86%2C60.86%2C0%2C0%2C0%2C8.32%2C12.28c2.33%2C2.69%2C4.56%2C5.47%2C6.81%2C8.23%2C1.34%2C1.65%2C2.57%2C3.41%2C4%2C5%2C3.93%2C4.34%2C8%2C8.53%2C11.87%2C12.95%2C2.24%2C2.57%2C4.18%2C5.43%2C6.18%2C8.22%2C3.3%2C4.6%2C8.06%2C6.89%2C12.59%2C9.38s9.74%2C3.26%2C14.77%2C3.78a27.69%2C27.69%2C0%2C0%2C0%2C2.84.31c3.65%2C0%2C7.28-.19%2C10.93%2C0%2C2.88.17%2C4.67-1.57%2C7-3%2C.22.12.74.33%2C1.21.63%2C4.07%2C2.6%2C7.86%2C5.67%2C12.25%2C7.68%2C5.38%2C2.47%2C10.59%2C5.45%2C16%2C7.93%2C3.71%2C1.72%2C7%2C4.48%2C11.35%2C4.7%2C4%2C.2%2C7.69%2C0%2C11.23-1.56%2C3.21-1.39%2C5.29-5.43%2C3.64-8.72-1.75-3.47-3.55-7.22-7.36-9.14a39.87%2C39.87%2C0%2C0%2C1-4.62-3.21l.21-.64c2.67%2C0%2C5.34-.09%2C8-.07a38.28%2C38.28%2C0%2C0%2C0%2C4.12.21%2C49.35%2C49.35%2C0%2C0%2C0%2C6.77-1.16c2.82-.7%2C5.54-1.76%2C8.37-2.44s5.48-2.21%2C8.65-.89c5.17%2C2.15%2C10.36%2C4.29%2C15.52%2C6.49%2C4.64%2C2%2C9.23%2C4.15%2C13.89%2C6%2C3.62%2C1.45%2C7.3%2C2.69%2C11%2C3.77a27.73%2C27.73%2C0%2C0%2C0%2C12.61.67c1.52-.26%2C2.83-1.47%2C4.17-2.35a15.78%2C15.78%2C0%2C0%2C0%2C2.38-2%2C1.66%2C1.66%2C0%2C0%2C0%2C.55-1.23c-.27-1.3-.39-2.84-1.14-3.82a32.66%2C32.66%2C0%2C0%2C0-7.56-7.37c-6.11-4.18-12.87-7.35-18.15-13.1%2C2-1.16%2C2-1.31%2C2.31-3.83a7.11%2C7.11%2C0%2C0%2C1%2C.2-.89c.75-3.08%2C1.6-6.13%2C2.23-9.26s.89-6.37%2C1.58-9.48c1.16-5.29%2C2.64-10.47%2C3.78-15.77a88.3%2C88.3%2C0%2C0%2C0%2C1.38-9.38c.42-4%2C.63-8.07%2C1-12.08.09-.93.31-2.36.87-2.57%2C2.25-.83%2C3.19-2.9%2C4.66-4.52%2C2.3-2.53%2C4.62-4.84%2C5.48-8.49.51-2.2%2C1.71-4.15%2C2.24-6.35.64-2.65.71-5.52%2C1.36-8.17.84-3.47-.9-6.48-2.07-9.54-.59-1.54-2.14-2.72-3.07-4.18-1.41-2.22-2.66-4.53-4-6.82a1.69%2C1.69%2C0%2C0%2C1-.23-.87c.15-2.31.34-4.62.52-6.93.43-5.93%2C2-11.66%2C1.15-17.8-.17-1.22.45-1.47%2C1.39-1.62%2C4-.66%2C8-1.24%2C12-2.12%2C2.79-.61%2C5.45-1.65%2C8.18-2.47.45-.14.95-.07%2C1.41-.18a37.82%2C37.82%2C0%2C0%2C0%2C5.08-1.3c1.76-.68%2C2.54-3.91%2C1.25-5.22A14.53%2C14.53%2C0%2C0%2C0%2C503.54%2C256.9ZM282.88%2C388.57c-2.44-3.35-5-6.61-7.27-10.08C272%2C373%2C268.8%2C367.37%2C265.2%2C362c-2.73-4.11-5.73-8-8.77-11.93-3.52-4.46-7.38-8.64-10.79-13.18-4-5.32-7.52-11-11.52-16.35a208.52%2C208.52%2C0%2C0%2C0-13.71-17.1%2C154%2C154%2C0%2C0%2C0-14.64-13.22c-5.6-4.67-11.42-9-17.17-13.49-1.32-1-2.86-1.69-4.16-2.72s-2.47-2.4-3.75-3.55q-8.25-7.43-16.53-14.8c-4.22-3.74-8.4-7.56-12.76-11.11-5.61-4.57-11.34-9-17.08-13.32-4-3-8.1-5.91-12.18-8.81-2.48-1.76-4.94-3.56-7.52-5.11-3.94-2.37-7.5-5.39-11.46-7.76-6.22-3.71-12.23-7.84-18.36-11.73q-6.33-4-12.78-7.87c-2-1.16-4-2.06-6-3.12-4.15-2.18-8.27-4.42-12.43-6.59-3.54-1.84-7.08-3.7-10.67-5.41-2-.94-4.06-1.6-6.09-2.38l.1-.45A24.94%2C24.94%2C0%2C0%2C0%2C40%2C173c5.63%2C1.11%2C10.9%2C3.77%2C16.29%2C5.85%2C6.87%2C2.66%2C13.66%2C5.68%2C20.42%2C8.72%2C4.65%2C2.09%2C9.22%2C4.46%2C13.8%2C6.75%2C3.13%2C1.56%2C6.19%2C3.29%2C9.34%2C4.8%2C5.51%2C2.65%2C11%2C5.3%2C16.62%2C7.73%2C3.56%2C1.55%2C7.29%2C2.58%2C10.88%2C4.07s7.41%2C3.31%2C11.06%2C5.13c6.91%2C3.43%2C13.8%2C6.95%2C20.68%2C10.47%2C1.88%2C1%2C3.63%2C2.27%2C5.55%2C3.05a61.45%2C61.45%2C0%2C0%2C0%2C7.86%2C2.53%2C1.68%2C1.68%2C0%2C0%2C0%2C1.65-2.55%2C26.64%2C26.64%2C0%2C0%2C0-3.44-4.88c-1.24-1.37-3-2.22-4.2-3.61a77.13%2C77.13%2C0%2C0%2C1-5.06-6.82c-2.76-4-5.33-8.15-8.18-12.08-4.6-6.33-9.34-12.56-14.08-18.78-1.57-2.06-3.37-3.93-5-6-1.25-1.6-2.25-3.4-3.54-5-2.31-2.77-5-5.24-7.07-8.18-2.77-4-6.57-6.64-9.84-10-3.76-3.81-7.74-7.39-11.66-11-4.35-4-8.73-8-13.16-11.88-1-.9-2.39-1.31-3.47-2.14s-1.79-1.93-2.78-2.75c-2.48-2-5-4-7.55-5.89-.75-.58-1.64-1-2.38-1.54-2.21-1.79-4.36-3.67-6.58-5.44-1.44-1.15-3-2.1-4.45-3.26-2-1.62-4-3.34-5.93-5%2C7.4%2C2.15%2C14.67%2C4.56%2C21.45%2C8.51%2C4.29%2C2.5%2C8.4%2C5.42%2C12.46%2C8.36%2C4.25%2C3.07%2C8.35%2C6.41%2C12.52%2C9.61%2C3.08%2C2.36%2C6.48%2C4.35%2C9.21%2C7.1a100.15%2C100.15%2C0%2C0%2C0%2C8.32%2C6.93%2C17.65%2C17.65%2C0%2C0%2C1%2C3%2C2.91c2.67%2C3.56%2C6.23%2C5.92%2C9.53%2C8.67a65.66%2C65.66%2C0%2C0%2C1%2C6.54%2C6.49%2C89.47%2C89.47%2C0%2C0%2C0%2C12.43%2C10.88c7.08%2C5.42%2C13.29%2C11.94%2C19.87%2C18a186.6%2C186.6%2C0%2C0%2C1%2C13.56%2C14.56c3%2C3.38%2C6.51%2C6.23%2C9.62%2C9.5a56.85%2C56.85%2C0%2C0%2C1%2C5.13%2C6.58c2.29%2C3.3%2C4.85%2C6%2C8.86%2C6.09%2C1.22%2C0%2C2.44.1%2C3.84.16a18.82%2C18.82%2C0%2C0%2C0-4-9.63%2C185.5%2C185.5%2C0%2C0%2C0-12.76-14.88c-3.43-3.49-5.46-7.65-7.63-11.83-3.85-7.43-7.42-15-11.61-22.24-3.82-6.59-8.19-12.88-12.53-19.15-2-2.84-4.88-5.06-6.58-8s-5-4.18-6.42-6.94-4.79-3.47-5.3-6.94c1.83%2C1.76%2C3.51%2C3.81%2C5.54%2C5.22%2C3.94%2C2.74%2C6.23%2C7.08%2C9.64%2C10.29%2C2.57%2C2.43%2C5.15%2C4.85%2C7.82%2C7.14%2C3.48%2C3%2C6.09%2C6.71%2C9%2C10.28%2C3.26%2C4.08%2C7%2C7.71%2C10.46%2C11.66%2C2.22%2C2.56%2C4.12%2C5.41%2C6.3%2C8%2C2.44%2C2.9%2C5.1%2C5.59%2C7.56%2C8.48%2C3.32%2C3.89%2C6.5%2C7.91%2C9.82%2C11.8%2C2%2C2.27%2C4.11%2C4.35%2C6.09%2C6.6%2C1.14%2C1.3%2C2%2C2.83%2C3.15%2C4.13%2C1.48%2C1.71%2C3.11%2C3.26%2C4.63%2C4.92.77.85%2C1.33%2C1.91%2C2.14%2C2.69%2C4.14%2C4%2C6.88%2C9.12%2C10.49%2C13.55s7.15%2C9.28%2C10.63%2C14c1.34%2C1.8%2C2.4%2C3.83%2C3.72%2C5.65%2C2.35%2C3.25%2C4.85%2C6.4%2C7.22%2C9.64%2C3.67%2C5%2C7.34%2C10%2C10.88%2C15.11a7.64%2C7.64%2C0%2C0%2C1%2C1.11%2C3.51c.42%2C4.53.63%2C9.07%2C1%2C13.6.49%2C5.77%2C1.68%2C11.54%2C1%2C17.29a20.94%2C20.94%2C0%2C0%2C0%2C.49%2C4.15c.4%2C3.62.89%2C7.25%2C1.12%2C10.86.35%2C5.39.49%2C10.76.73%2C16.14.11%2C2.42.1%2C4.84.44%2C7.25.5%2C3.41%2C1.23%2C6.82%2C1.93%2C10.22q1.62%2C7.84%2C3.33%2C15.66c.69%2C3.19%2C1.39%2C6.39%2C2.28%2C9.54.46%2C1.58%2C1.35%2C3.06%2C1.81%2C4.77C284.7%2C391%2C283.78%2C389.81%2C282.88%2C388.57Zm5.44-8.21c-.05.17-.13.33-.36.9-1-4.69-1.86-9-2.77-13.25-.33-1.57-.79-3.12-1.05-4.69-.76-4.65-1.58-9.31-2.12-14-.33-2.84-.16-5.69-.29-8.54-.27-5.59-.51-11.19-.9-16.79-.26-3.61-.84-7.21-1.1-10.81-.14-2%2C.09-4%2C.14-5.95.06-2.21%2C0-4.42.16-6.61.09-1.52.48-3%2C.53-4.52a24.25%2C24.25%2C0%2C0%2C0-.47-3.33c-.08-.66-.07-1.31-.1-2l.46-.08c1.47%2C2%2C3.07%2C3.94%2C4.38%2C6.05A35.56%2C35.56%2C0%2C0%2C0%2C295.73%2C308c2.94%2C1.93%2C5.83%2C4%2C8.6%2C6.24%2C3.6%2C2.91%2C6.06%2C6.85%2C8.38%2C10.87.13.22.14.54.29.72%2C2.45%2C2.76.93%2C5.06%2C0%2C7.49-.82%2C2.07-1.41%2C4.25-2.19%2C6.34a24.55%2C24.55%2C0%2C0%2C1-1.81%2C4.08c-1.18%2C2-2.53%2C3.85-3.81%2C5.77a72%2C72%2C0%2C0%2C1-4.45%2C6.61A62.67%2C62.67%2C0%2C0%2C0%2C288.32%2C380.36ZM393%2C436.48a14.16%2C14.16%2C0%2C0%2C1%2C1.77%2C2.17c.57.67%2C1.17%2C1.31%2C1.77%2C2l2.62%2C2.78a4.31%2C4.31%2C0%2C0%2C1-4.74%2C1.51%2C32.32%2C32.32%2C0%2C0%2C0-7.49-.18%2C18.59%2C18.59%2C0%2C0%2C1-10.4-3c-5.27-3.19-10.75-5.94-16.13-8.89-4.51-2.48-9-4.95-13.5-7.5-1.67-.95-1.66-1.51-.5-2.85.77-.88%2C1.4-1.9%2C2.14-2.82a45.31%2C45.31%2C0%2C0%2C1%2C9.23-8.39c2.11%2C1.48%2C4%2C2.67%2C5.73%2C4%2C2%2C1.57%2C3.82%2C3.37%2C5.81%2C5%2C1.32%2C1%2C2.82%2C1.83%2C4.21%2C2.8%2C5%2C3.51%2C10.07%2C7.05%2C15.11%2C10.56C390.08%2C434.58%2C391.62%2C435.41%2C393%2C436.48Zm66.08-21.88a64%2C64%2C0%2C0%2C0%2C11.81%2C9%2C76.52%2C76.52%2C0%2C0%2C1%2C9.33%2C6.92c.72.58%2C1.6%2C2.05%2C1.4%2C2.66-.42%2C1.29-1.1%2C2.67-2.87%2C2.74a48.31%2C48.31%2C0%2C0%2C1-22-4.61c-3-1.37-6.16-2.24-9.2-3.51-3.72-1.56-7.38-3.33-11.08-5-2.89-1.26-5.8-2.44-8.7-3.66-.08-.21-.15-.42-.22-.63%2C1.11-.79%2C2.25-1.54%2C3.33-2.38%2C2.28-1.76%2C4.48-3.63%2C6.8-5.33a59.28%2C59.28%2C0%2C0%2C1%2C6.67-4.37c.71-.38%2C2%2C0%2C2.94.38A37.32%2C37.32%2C0%2C0%2C1%2C459.09%2C414.6Zm19.55-102.68a12.29%2C12.29%2C0%2C0%2C1%2C1.22%2C8.05c-.65%2C2.75-1.21%2C5.55-2.11%2C8.19a52.78%2C52.78%2C0%2C0%2C1-2.71%2C5.36c-.67%2C1.4-1.2%2C2.88-1.8%2C4.33l-.95-.26a12.33%2C12.33%2C0%2C0%2C1%2C0-1.72c.08-.61.49-1.21.4-1.78-.45-3%2C.79-5.59.87-8.45s.36-5.59.51-8.39c.2-3.95.36-7.91.55-12.14.56.83%2C1%2C1.46%2C1.43%2C2.15C477%2C308.79%2C477.9%2C310.31%2C478.64%2C311.92Zm17-48.83a29.4%2C29.4%2C0%2C0%2C1-4.92.51c-4.53.44-9.2.4-13.54%2C1.46s-8.44.43-12.67.49c-5.15.06-10.27.34-15.42.37-3.64%2C0-7.3-.23-10.95-.36-.18%2C0-.36-.1-.54-.11-1.45-.1-3.09.68-3.95-1.65-.57-1.52-1.38-3-2.08-4.44l.26-.15c-.25-1.77-.54-3.54-.74-5.32-.28-2.42.53-4%2C2.76-4%2C4.35-.08%2C8.75.23%2C13.14.48a33.23%2C33.23%2C0%2C0%2C1%2C5%2C.74c3.4.72%2C6.79%2C1.68%2C10.19%2C2.32s6.67.84%2C10%2C1.46c4%2C.73%2C7.93%2C1%2C11.9%2C2.47%2C3.59%2C1.36%2C7.47%2C1.6%2C11.23%2C2.26%2C1.24.22%2C2.9%2C0%2C3.16%2C1.55C498.55%2C261.71%2C496.74%2C262.77%2C495.62%2C263.09Z%22%2F%3E%3Cpath%20class%3D%22cls-4%22%20d%3D%22M353.73%2C134c1%2C0%2C1.53.66%2C1.35%2C1.26l3.86%2C1.36.17.47L354%2C139.35a27.5%2C27.5%2C0%2C0%2C0-3%2C1.39%2C8.24%2C8.24%2C0%2C0%2C0-1.43%2C1.69c-1.88%2C1-4.08%2C2.18-6.27%2C3.37-1.74.94-3.51%2C1.83-5.18%2C2.88-2.75%2C1.75-5.36%2C3.7-8.14%2C5.39-3.18%2C1.93-6.62%2C3.43-9.68%2C5.54-3.61%2C2.49-7.72%2C4.38-10.44%2C8.1-1.46%2C2-3.64%2C2.61-5.79%2C3.4a20.58%2C20.58%2C0%2C0%2C0-3.6%2C1.95c-1.57%2C1-3.1%2C2.06-4.64%2C3.12a8.35%2C8.35%2C0%2C0%2C0-2.05%2C1.61c-3%2C4-6.41%2C7.45-8.67%2C12.08a60.91%2C60.91%2C0%2C0%2C0-3%2C7.24c-.75%2C2.22-1.81%2C4.31-2.39%2C6.59-1%2C4-1.75%2C8-2.59%2C12a58.06%2C58.06%2C0%2C0%2C0-1.35%2C7c-.17%2C2.08.28%2C4.27.3%2C6.4%2C0%2C1.24-.42%2C2.44-.45%2C3.68-.06%2C2.67-.1%2C5.36%2C0%2C8%2C.21%2C4.09-.17%2C8.38%2C1.08%2C12.2%2C1.08%2C3.28-.52%2C6.38%2C1.26%2C9.45.38.65-.08%2C1.74%2C0%2C2.62.29%2C1.87.82%2C3.73%2C1.06%2C5.61s.17%2C3.67.35%2C5.51c.12%2C1.28-.27%2C3%2C1.82%2C3.17.17%2C0%2C.44.47.51.74.95%2C4%2C4.1%2C6.3%2C6.54%2C9.12%2C1.75%2C2%2C3.78%2C3.8%2C5.7%2C5.66.95.91%2C1.92%2C1.78%2C2.91%2C2.64q4.35%2C3.73%2C8.72%2C7.43c2.74%2C2.3%2C5.64%2C4.41%2C8.23%2C6.89a86.06%2C86.06%2C0%2C0%2C1%2C5.75%2C6.69%2C21.23%2C21.23%2C0%2C0%2C1%2C1.39%2C1.62%2C13.42%2C13.42%2C0%2C0%2C1%2C1.7%2C2.76c1.57%2C4.11%2C1.54%2C8.27%2C1.18%2C12.42-.19%2C2.15.16%2C4.55-.53%2C6.44-1.1%2C3-1.88%2C6.4-4.71%2C8.26a5.17%2C5.17%2C0%2C0%2C0-1.26%2C1.21c-2.11%2C2.76-4%2C5.74-6.33%2C8.28-4%2C4.39-7%2C9.49-10.05%2C14.62-2.71%2C4.52-4.06%2C9.56-5.43%2C14.64-.85%2C3.18-1.21%2C6.56-1.77%2C9.85a2.4%2C2.4%2C0%2C0%2C0%2C0%2C1.13c1.22%2C3.82%2C2.44%2C7.65%2C3.75%2C11.45.83%2C2.41%2C3.06%2C3.23%2C4.87%2C4.45a37.78%2C37.78%2C0%2C0%2C0%2C6.77%2C4c3.72%2C1.49%2C7.32%2C3.9%2C11.43%2C3.37a6.84%2C6.84%2C0%2C0%2C1%2C1.6.16l13.59%2C1.39c.66.07%2C1.31.27%2C2%2C.37%2C1.53.23%2C2.73.07%2C3.47-1.64.5-1.17%2C1.7-1.87%2C1.14-3.6-.13-.39.8-1.59%2C1.18-1.52%2C2.1.36%2C2.79-1.49%2C4-2.45%2C3.86-3.13%2C7.37-6.74%2C11.94-8.88%2C1.62-.76%2C2.23-.48%2C2.51%2C1.4a2.33%2C2.33%2C0%2C0%2C0%2C.79%2C1.36c2.37%2C1.71%2C4.81%2C3.3%2C7.19%2C5%2C1.74%2C1.25%2C3.4%2C2.67%2C5.17%2C3.89a4.81%2C4.81%2C0%2C0%2C0%2C1.92.47c.89.15%2C1.77.27%2C2.66.35%2C2.06.19%2C4.13.45%2C6.18.51%2C3.22.1%2C6.43.12%2C9.63%2C0%2C2.32-.05%2C4.62-.24%2C6.9-.49%2C3-.33%2C5.93-.63%2C8.83-1.2%2C4.32-.85%2C8.6-1.87%2C12.85-3%2C.71-.18%2C1.23-1%2C1.8-1.62.94-1%2C1.67-2.32%2C2.8-2.85%2C3.5-1.65%2C6-4.58%2C9.11-6.74%2C1.59-1.11%2C3.78-1.29%2C5.55-2.19%2C4.06-2.08%2C6.79%2C1.34%2C10.19%2C3.55a5.61%2C5.61%2C0%2C0%2C0%2C1-1.84c.68-5.14%2C1.19-10.32%2C1.92-15.44.34-2.38%2C1.14-4.64%2C1.59-7%2C.33-1.75.36-3.6.63-5.37.44-2.94.9-5.88%2C1.47-8.78.64-3.28%2C1.61-6.47%2C2-9.79.52-3.88.65-7.85.87-11.8.26-4.79.4-9.6.67-14.39.05-1%2C.48-2%2C.63-3.06.64-4.19%2C1.27-8.38%2C1.84-12.59.34-2.46.42-5%2C.89-7.42.83-4.25%2C2.07-8.38%2C2.8-12.65%2C1.22-7.15%2C2.18-14.38%2C3.21-21.58a6%2C6%2C0%2C0%2C0-.28-1.77c-1.93%2C0-3.71%2C0-5.48.06-5.54.09-11.07.17-16.61.29-5.29.12-10.59.23-15.87.46-3.3.14-5.62-2.14-8.1-4.05a1.72%2C1.72%2C0%2C0%2C1-.49-1c-.49-3.83-1.48-7.75-1.29-11.48.24-4.64%2C3.48-7.27%2C6.91-9.69%2C4.55-3.2%2C9.51-1.62%2C14.49-.71%2C1.24.24%2C2.5.49%2C3.75.64%2C2.92.36%2C5.84.57%2C8.76%2C1s5.57%2C1.17%2C8.36%2C1.6c3.17.48%2C6.34.82%2C9.5%2C1.11a1.61%2C1.61%2C0%2C0%2C0%2C1.27-.88%2C27.06%2C27.06%2C0%2C0%2C0%2C2.2-11.94c-.05-3.87%2C0-7.72-.13-11.59a36.25%2C36.25%2C0%2C0%2C0-.54-7c-.92-4.13-2.11-8.23-3.41-12.29a16.28%2C16.28%2C0%2C0%2C0-2.41-4c-2.41-3.48-4.9-6.89-7.3-10.37-.92-1.33-1.58-2.87-2.57-4.13-2.48-3.16-5.06-6.22-8.42-8.42a11.77%2C11.77%2C0%2C0%2C1-2-2.27%2C9%2C9%2C0%2C0%2C0-1.18-1.5c-2.31-1.75-4.7-3.36-7-5.14a15.68%2C15.68%2C0%2C0%2C1-3.11-3.14%2C14.29%2C14.29%2C0%2C0%2C0-6.88-5.51%2C2.57%2C2.57%2C0%2C0%2C1-1.22-.88c-2.34-3.47-5.95-5.18-9-7.66-1.33-1.09-2.75-2.06-4.13-3.08%2C1.13-1.7.88-2-1.15-2.56a9.1%2C9.1%2C0%2C0%2C1-3.49-2.16c-3.72-3.53-7.11-7.43-11.41-10.31-1-.7-2.89-1.76-3.16-3.72%2C0-.17-.55-.27-.75-.5a26.88%2C26.88%2C0%2C0%2C1-3.83-4.54c-.38-.67.1-1.94-1-2.73a9.15%2C9.15%2C0%2C0%2C1-1.71-1.64%2C12.66%2C12.66%2C0%2C0%2C1-1.83-2.67c-1.26-2.9-2.41-5.85-3.56-8.8a11.84%2C11.84%2C0%2C0%2C1-.77-2.68%2C2.22%2C2.22%2C0%2C0%2C0-1.6-2.09%2C3.2%2C3.2%2C0%2C0%2C1-1.56-1.88%2C105.93%2C105.93%2C0%2C0%2C1-2.48-11c-.21-1.35-.44-3.09.61-4.37.21-.26-.2-1.07-.27-1.63-.22-1.76-.5-3.53-.58-5.28%2C0-.68.56-1.3.64-2%2C.24-2.11.44-4.23.65-6.35-8.69.1-15.24%2C1.73-20.2%2C4.1.89%2C2%2C1.74%2C3.83%2C2.44%2C5.75%2C1.61%2C4.36%2C3%2C8.8%2C4.55%2C13.17a23.57%2C23.57%2C0%2C0%2C0%2C1.73%2C3c1.6%2C3%2C3%2C6.06%2C4.81%2C8.89a38.83%2C38.83%2C0%2C0%2C0%2C8.56%2C9.6c1.11.88%2C2.21%2C2.17%2C1.47%2C3.82-.81%2C1.84-2.14%2C2.41-3.91%2C1.4a39.56%2C39.56%2C0%2C0%2C1-5.75-3.9c-3.59-3-6.87-6.35-8.89-10.84a17.5%2C17.5%2C0%2C0%2C0-2.44-3.27c-.95-1.23-2-2.4-1.84-4.13a2%2C2%2C0%2C0%2C0-.54-1.42c-2.22-2-2.45-4.77-3.1-7.33-.39-1.51-.27-3.12-.51-4.67-.3-1.88-.89-3.74-1.08-5.61a14%2C14%2C0%2C0%2C1-.06-1.82A25.94%2C25.94%2C0%2C0%2C0%2C351%2C89.48a21.7%2C21.7%2C0%2C0%2C0%2C2.55%2C11.18%2C63.32%2C63.32%2C0%2C0%2C0%2C4.48%2C7.51%2C96.58%2C96.58%2C0%2C0%2C0%2C6.52%2C9c2.13%2C2.48%2C4.74%2C4.5%2C7%2C6.87.59.61%2C1.18%2C2.05.92%2C2.6a3.85%2C3.85%2C0%2C0%2C1-2.42%2C2.12%2C4.8%2C4.8%2C0%2C0%2C1-3.24-1.16c-5-4.11-10.57-7.63-13.94-13.68-1.69-3.05-3.43-6.08-5.32-9.41-.89%2C2.56-.05%2C4.86.66%2C7a54.9%2C54.9%2C0%2C0%2C0%2C4.09%2C9.78c2.14%2C3.76%2C4.6%2C7.43%2C8.56%2C9.48a23.63%2C23.63%2C0%2C0%2C1%2C3.69%2C2.25%2C2.18%2C2.18%2C0%2C0%2C1%2C.58%2C1.84c-.44.66-1.44%2C1.59-1.94%2C1.4-2.92-1.14-6.24-1.21-8.63-3.9a21%2C21%2C0%2C0%2C1-1.32%2C1.74A2.42%2C2.42%2C0%2C0%2C1%2C353.73%2C134Zm83.39%2C89.37c.78-1.79%2C1.8-3.43%2C1.71-5.69-.08-1.79.64-1.8%2C2.34-1.17%2C2.84%2C1.06%2C3.23%2C3.25%2C3.25%2C5.78.07.7.13%2C1.4.2%2C2.1.41%2C3.78-.5%2C4.65-3.52%2C6.27-1.39.75-2.5-.16-2.73-1.92a2.69%2C2.69%2C0%2C0%2C0-.53-1.41A3.22%2C3.22%2C0%2C0%2C1%2C437.12%2C223.36Zm-72%2C8.12c1.77%2C3%2C3.2%2C6.26%2C3.07%2C9.66-.1%2C2.59-.38%2C5.47-3.13%2C6.59a3.17%2C3.17%2C0%2C0%2C1-1.63-.09c-.27%2C0-.51-.37-.79-.45-3.49-1-3.5-1-3.91-4.83l-.06-.58-.28%2C0c.16-2.68.3-5.37.48-8.05a7.61%2C7.61%2C0%2C0%2C1%2C.33-2.85C360.34%2C228.68%2C363.68%2C229.06%2C365.09%2C231.48Z%22%2F%3E%3C%2Fsvg%3E",
		description: "An innovative approach to packaging and running Java EE applications, packaging them with just enough of the server runtime to \"java -jar\" your application.",
		metadata: {
			categories: [
				"backend"
			],
			language: "java"
		}
	},
	{
		id: "vertx",
		name: "Vert.x",
		icon: "data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 280'%3E%3Cpath fill='%23022B37' d='M107 170.8L67.7 72H46.9L100 204h13.9L167 72h-20.4zm64 33.2h80v-20h-61v-37h60v-19h-60V91h61V72h-80zm180.1-90.7c0-21-14.4-42.3-43.1-42.3h-48v133h19V91h29.1c16.1 0 24 11.1 24 22.4 0 11.5-7.9 22.6-24 22.6H286v9.6l48 58.4h24.7L317 154c22.6-4 34.1-22 34.1-40.7m56.4 90.7v-1c0-6 1.7-11.7 4.5-16.6V91h39V71h-99v20h41v113h14.5z'/%3E%3Cpath fill='%23623C94' d='M458 203c0-9.9-8.1-18-18-18s-18 8.1-18 18 8.1 18 18 18 18-8.1 18-18M577.4 72h-23.2l-27.5 37.8L499.1 72h-40.4c12.1 16 33.6 46.8 47.8 66.3l-37 50.9c2 4.2 3.1 8.9 3.1 13.8v1H499l95.2-132h-16.8zm-19.7 81.5l-20.1 27.9 16.5 22.6h40.2c-9.6-13.7-24-33.3-36.6-50.5z'/%3E%3C/svg%3E",
		description: "A tool-kit for building reactive applications on the JVM.",
		metadata: {
			categories: [
				"backend"
			],
			language: "java"
		}
	},
	{
		id: "react",
		name: "React",
		description: "A reactive JavaScript framework for building user interfaces.",
		icon: "data:image/svg+xml,%3c%3fxml version='1.0' encoding='utf-8'%3f%3e %3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e %3csvg version='1.1' id='Layer_2_1_' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 841.9 595.3' enable-background='new 0 0 841.9 595.3' xml:space='preserve'%3e %3cg%3e %3cpath fill='%2361DAFB' d='M666.3%2c296.5c0-32.5-40.7-63.3-103.1-82.4c14.4-63.6%2c8-114.2-20.2-130.4c-6.5-3.8-14.1-5.6-22.4-5.6v22.3 c4.6%2c0%2c8.3%2c0.9%2c11.4%2c2.6c13.6%2c7.8%2c19.5%2c37.5%2c14.9%2c75.7c-1.1%2c9.4-2.9%2c19.3-5.1%2c29.4c-19.6-4.8-41-8.5-63.5-10.9 c-13.5-18.5-27.5-35.3-41.6-50c32.6-30.3%2c63.2-46.9%2c84-46.9l0-22.3c0%2c0%2c0%2c0%2c0%2c0c-27.5%2c0-63.5%2c19.6-99.9%2c53.6 c-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7%2c0%2c51.4%2c16.5%2c84%2c46.6c-14%2c14.7-28%2c31.4-41.3%2c49.9c-22.6%2c2.4-44%2c6.1-63.6%2c11 c-2.3-10-4-19.7-5.2-29c-4.7-38.2%2c1.1-67.9%2c14.6-75.8c3-1.8%2c6.9-2.6%2c11.5-2.6l0-22.3c0%2c0%2c0%2c0%2c0%2c0c-8.4%2c0-16%2c1.8-22.6%2c5.6 c-28.1%2c16.2-34.4%2c66.7-19.9%2c130.1c-62.2%2c19.2-102.7%2c49.9-102.7%2c82.3c0%2c32.5%2c40.7%2c63.3%2c103.1%2c82.4c-14.4%2c63.6-8%2c114.2%2c20.2%2c130.4 c6.5%2c3.8%2c14.1%2c5.6%2c22.5%2c5.6c27.5%2c0%2c63.5-19.6%2c99.9-53.6c36.4%2c33.8%2c72.4%2c53.2%2c99.9%2c53.2c8.4%2c0%2c16-1.8%2c22.6-5.6 c28.1-16.2%2c34.4-66.7%2c19.9-130.1C625.8%2c359.7%2c666.3%2c328.9%2c666.3%2c296.5z M536.1%2c229.8c-3.7%2c12.9-8.3%2c26.2-13.5%2c39.5 c-4.1-8-8.4-16-13.1-24c-4.6-8-9.5-15.8-14.4-23.4C509.3%2c224%2c523%2c226.6%2c536.1%2c229.8z M490.3%2c336.3c-7.8%2c13.5-15.8%2c26.3-24.1%2c38.2 c-14.9%2c1.3-30%2c2-45.2%2c2c-15.1%2c0-30.2-0.7-45-1.9c-8.3-11.9-16.4-24.6-24.2-38c-7.6-13.1-14.5-26.4-20.8-39.8 c6.2-13.4%2c13.2-26.8%2c20.7-39.9c7.8-13.5%2c15.8-26.3%2c24.1-38.2c14.9-1.3%2c30-2%2c45.2-2c15.1%2c0%2c30.2%2c0.7%2c45%2c1.9 c8.3%2c11.9%2c16.4%2c24.6%2c24.2%2c38c7.6%2c13.1%2c14.5%2c26.4%2c20.8%2c39.8C504.7%2c309.8%2c497.8%2c323.2%2c490.3%2c336.3z M522.6%2c323.3 c5.4%2c13.4%2c10%2c26.8%2c13.8%2c39.8c-13.1%2c3.2-26.9%2c5.9-41.2%2c8c4.9-7.7%2c9.8-15.6%2c14.4-23.7C514.2%2c339.4%2c518.5%2c331.3%2c522.6%2c323.3z M421.2%2c430c-9.3-9.6-18.6-20.3-27.8-32c9%2c0.4%2c18.2%2c0.7%2c27.5%2c0.7c9.4%2c0%2c18.7-0.2%2c27.8-0.7C439.7%2c409.7%2c430.4%2c420.4%2c421.2%2c430z M346.8%2c371.1c-14.2-2.1-27.9-4.7-41-7.9c3.7-12.9%2c8.3-26.2%2c13.5-39.5c4.1%2c8%2c8.4%2c16%2c13.1%2c24C337.1%2c355.7%2c341.9%2c363.5%2c346.8%2c371.1z M420.7%2c163c9.3%2c9.6%2c18.6%2c20.3%2c27.8%2c32c-9-0.4-18.2-0.7-27.5-0.7c-9.4%2c0-18.7%2c0.2-27.8%2c0.7C402.2%2c183.3%2c411.5%2c172.6%2c420.7%2c163z M346.7%2c221.9c-4.9%2c7.7-9.8%2c15.6-14.4%2c23.7c-4.6%2c8-8.9%2c16-13%2c24c-5.4-13.4-10-26.8-13.8-39.8C318.6%2c226.7%2c332.4%2c224%2c346.7%2c221.9z M256.2%2c347.1c-35.4-15.1-58.3-34.9-58.3-50.6c0-15.7%2c22.9-35.6%2c58.3-50.6c8.6-3.7%2c18-7%2c27.7-10.1c5.7%2c19.6%2c13.2%2c40%2c22.5%2c60.9 c-9.2%2c20.8-16.6%2c41.1-22.2%2c60.6C274.3%2c354.2%2c264.9%2c350.8%2c256.2%2c347.1z M310%2c490c-13.6-7.8-19.5-37.5-14.9-75.7 c1.1-9.4%2c2.9-19.3%2c5.1-29.4c19.6%2c4.8%2c41%2c8.5%2c63.5%2c10.9c13.5%2c18.5%2c27.5%2c35.3%2c41.6%2c50c-32.6%2c30.3-63.2%2c46.9-84%2c46.9 C316.8%2c492.6%2c313%2c491.7%2c310%2c490z M547.2%2c413.8c4.7%2c38.2-1.1%2c67.9-14.6%2c75.8c-3%2c1.8-6.9%2c2.6-11.5%2c2.6c-20.7%2c0-51.4-16.5-84-46.6 c14-14.7%2c28-31.4%2c41.3-49.9c22.6-2.4%2c44-6.1%2c63.6-11C544.3%2c394.8%2c546.1%2c404.5%2c547.2%2c413.8z M585.7%2c347.1c-8.6%2c3.7-18%2c7-27.7%2c10.1 c-5.7-19.6-13.2-40-22.5-60.9c9.2-20.8%2c16.6-41.1%2c22.2-60.6c9.9%2c3.1%2c19.3%2c6.5%2c28.1%2c10.2c35.4%2c15.1%2c58.3%2c34.9%2c58.3%2c50.6 C644%2c312.2%2c621.1%2c332.1%2c585.7%2c347.1z'/%3e %3cpolygon fill='%2361DAFB' points='320.8%2c78.4 320.8%2c78.4 320.8%2c78.4 '/%3e %3ccircle fill='%2361DAFB' cx='420.9' cy='296.5' r='45.7'/%3e %3cpolygon fill='%2361DAFB' points='520.5%2c78.1 520.5%2c78.1 520.5%2c78.1 '/%3e %3c/g%3e %3c/svg%3e",
		metadata: {
			categories: [
				"frontend"
			],
			language: "javascript"
		}
	},
	{
		id: "angular",
		name: "Angular",
		description: "A declarative JavaScript framework for building user interfaces.",
		icon: "data:image/svg+xml,%3c%3fxml version='1.0' encoding='utf-8'%3f%3e %3c!-- Generator: Adobe Illustrator 19.1.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e %3csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 250 250' style='enable-background:new 0 0 250 250%3b' xml:space='preserve'%3e %3cstyle type='text/css'%3e .st0%7bfill:%23DD0031%3b%7d .st1%7bfill:%23C3002F%3b%7d .st2%7bfill:white%3b%7d %3c/style%3e %3cg%3e %3cpolygon class='st0' points='125%2c30 125%2c30 125%2c30 31.9%2c63.2 46.1%2c186.3 125%2c230 125%2c230 125%2c230 203.9%2c186.3 218.1%2c63.2 '/%3e %3cpolygon class='st1' points='125%2c30 125%2c52.2 125%2c52.1 125%2c153.4 125%2c153.4 125%2c230 125%2c230 203.9%2c186.3 218.1%2c63.2 125%2c30 '/%3e %3cpath class='st2' d='M125%2c52.1L66.8%2c182.6h0h21.7h0l11.7-29.2h49.4l11.7%2c29.2h0h21.7h0L125%2c52.1L125%2c52.1L125%2c52.1L125%2c52.1 L125%2c52.1z M142%2c135.4H108l17-40.9L142%2c135.4z'/%3e %3c/g%3e %3c/svg%3e",
		metadata: {
			categories: [
				"frontend"
			],
			language: "javascript"
		}
	},
	{
		id: "vuejs",
		name: "Vue.js",
		description: "The Progressive JavaScript Framework",
		icon: "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e %3csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' height='400' width='400' xml:space='preserve' id='svg2' version='1.1'%3e%3cmetadata id='metadata8'%3e%3crdf:RDF%3e%3ccc:Work rdf:about=''%3e%3cdc:format%3eimage/svg%2bxml%3c/dc:format%3e%3cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3e%3c/cc:Work%3e%3c/rdf:RDF%3e%3c/metadata%3e%3cdefs id='defs6' /%3e%3cg transform='matrix(1.3333333%2c0%2c0%2c-1.3333333%2c0%2c400)' id='g10'%3e%3cg transform='translate(178.0626%2c235.0086)' id='g12'%3e%3cpath id='path14' style='fill:%234dba87%3bfill-opacity:1%3bfill-rule:nonzero%3bstroke:none' d='M 0%2c0 -22.669%2c-39.264 -45.338%2c0 h -75.491 L -22.669%2c-170.017 75.491%2c0 Z' /%3e%3c/g%3e%3cg transform='translate(178.0626%2c235.0086)' id='g16'%3e%3cpath id='path18' style='fill:%23435466%3bfill-opacity:1%3bfill-rule:nonzero%3bstroke:none' d='M 0%2c0 -22.669%2c-39.264 -45.338%2c0 H -81.565 L -22.669%2c-102.01 36.227%2c0 Z' /%3e%3c/g%3e%3c/g%3e%3c/svg%3e",
		metadata: {
			categories: [
				"frontend"
			],
			language: "javascript"
		}
	}
],
	"runtime.version.nodejs": [
	{
		id: "community",
		name: "Community"
	}
],
	"runtime.version.springboot": [
	{
		id: "community",
		name: "Community"
	}
],
	"runtime.version.thorntail": [
	{
		id: "community",
		name: "Community"
	}
],
	"runtime.version.vertx": [
	{
		id: "community",
		name: "Community"
	}
],
	"runtime.version.angular": [
	{
		id: "community",
		name: "Community"
	}
],
	"runtime.version.react": [
	{
		id: "community",
		name: "Community"
	}
],
	"runtime.version.vuejs": [
	{
		id: "community",
		name: "Community"
	}
],
	databaseType: databaseType
};

var clusters = [{"connected":false,"cluster":{"id":"starter-us-east-1","name":"Starter: US East (Virginia)","type":"starter","consoleUrl":"https://console.starter-us-east-1.openshift.com"}},{"connected":false,"cluster":{"id":"starter-us-west-1","name":"Starter: US West (California)","type":"starter","consoleUrl":"https://console.starter-us-west-1.openshift.com"}},{"connected":false,"cluster":{"id":"starter-us-west-2","name":"Starter: US West (Oregon)","type":"starter","consoleUrl":"https://console.starter-us-west-2.openshift.com"}},{"connected":true,"cluster":{"id":"starter-ca-central-1","name":"Starter: Canada (Central)","type":"starter","consoleUrl":"https://console.starter-ca-central-1.openshift.com"}},{"connected":false,"cluster":{"id":"pro-us-east-1","name":"Pro: US East (N. Virginia)","type":"pro","consoleUrl":"https://console.pro-us-east-1.openshift.com"}},{"connected":false,"cluster":{"id":"pro-eu-west-1","name":"Pro: EU West (Ireland)","type":"pro","consoleUrl":"https://console.pro-eu-west-1.openshift.com"}},{"connected":false,"cluster":{"id":"pro-ap-southeast-2","name":"Pro: Asia Pacific (Sydney)","type":"pro","consoleUrl":"https://console.pro-ap-southeast-2.openshift.com"}}];

var organizations = [
	"viande",
	"porc"
];
var repositories = [
	"jean-bon/cru",
	"jean-bon/bayonne",
	"jean-bon/serano"
];
var login = "jean-bon";
var avatarUrl = "data:image/jpeg;base64,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";
var gitUser = {
	organizations: organizations,
	repositories: repositories,
	login: login,
	avatarUrl: avatarUrl
};

var boosters = [
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-circuit-breaker",
		name: "Eclipse Vert.x - Istio - Circuit Breaker",
		description: "Runs a Eclipse Vert.x application that utilizes Circuit Breakers on Istio",
		runtime: "vert.x",
		source: {
			git: {
				url: "https://github.com/openshiftio-vertx-boosters/vertx-istio-circuit-breaker-booster",
				ref: "v3"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-security",
		name: "Istio - Spring Boot - Security",
		description: "Booster to demonstrate Istio Mutual TLS and ACL functionality.",
		runtime: "spring-boot",
		source: {
			git: {
				url: "https://github.com/snowdrop/spring-boot-istio-security-booster.git",
				ref: "1.5.17-4-redhat"
			}
		},
		version: "current-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "configmap",
		name: "Red Hat Fuse - ConfigMap Example",
		description: "Booster to expose an HTTP Greeting endpoint using Apache Camel where the message is defined as a Kubernetes ConfigMap property.",
		runtime: "fuse",
		source: {
			git: {
				url: "https://github.com/jboss-fuse/fuse-configmap-booster",
				ref: "v7.2.0-redhat-01"
			}
		},
		version: "redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: "none"
				}
			}
		},
		mission: "rest-http-secured",
		name: "Thorntail - REST and RH SSO",
		description: "A simple HTTP application using Thorntail secured by RH SSO",
		runtime: "thorntail",
		source: {
			git: {
				url: "https://github.com/thorntail-examples/rest-http-secured-redhat",
				ref: "2.2.0-redhat-1"
			}
		},
		version: "redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "crud",
		name: "Red Hat GoLang - CRUD Example",
		description: "Runs a Golang application exposing a HTTP endpoint proposing CRUD operations",
		runtime: "golang",
		source: {
			git: {
				url: "https://github.com/golang-starters/golang-http-crud",
				ref: "master"
			}
		},
		version: "redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-distributed-tracing",
		name: "Node.js - Istio - Distributed Tracing",
		description: "Runs a Node.js application that utilizes Tracing on Istio",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-istio-tracing-redhat",
				ref: "v2.1.0"
			}
		},
		version: "v10-redhat"
	},
	{
		metadata: {
			app: {
				launcher: {
					runsOn: [
						"!starter"
					]
				},
				osio: {
					enabled: false
				}
			}
		},
		mission: "cache",
		name: "Eclipse Vert.x - Cache",
		description: "Demonstrate how to use a cache server in Eclipse Vert.x",
		runtime: "vert.x",
		source: {
			git: {
				url: "https://github.com/openshiftio-vertx-boosters/vertx-cache-booster-redhat",
				ref: "v8"
			}
		},
		version: "redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-circuit-breaker",
		name: "Istio - Spring Boot - Circuit Breaker Example",
		description: "Booster to demonstrate Istio's Circuit Breaker pattern with Spring Boot.",
		runtime: "spring-boot",
		source: {
			git: {
				url: "https://github.com/snowdrop/spring-boot-istio-circuit-breaker-booster",
				ref: "1.5.17-4"
			}
		},
		version: "current-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "health-check",
		name: "Node.js - Health Checks",
		description: "Demonstrates Health Checks in Node.js",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-health-check-redhat",
				ref: "v1.2.3"
			}
		},
		version: "v8-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "cache",
		name: "Node.js Cache Booster",
		description: "Demonstrate how to use a cache server from a Node.js application",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-cache-redhat",
				ref: "v1.2.0"
			}
		},
		version: "v8-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "crud",
		name: "HTTP CRUD - Thorntail",
		description: "A simple CRUD applicaiton using Thorntail",
		runtime: "thorntail",
		source: {
			git: {
				url: "https://github.com/thorntail-examples/rest-http-crud",
				ref: "13"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "circuit-breaker",
		name: "Thorntail - Circuit Breaker",
		description: "Demonstrates Circuit Breaker in Thorntail",
		runtime: "thorntail",
		source: {
			git: {
				url: "https://github.com/thorntail-examples/circuit-breaker-redhat",
				ref: "2.2.0-redhat-1"
			}
		},
		version: "redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "health-check",
		name: "Vert.x Health Check Example",
		description: "Demonstrate health check and recovery mechanism",
		runtime: "vert.x",
		source: {
			git: {
				url: "https://github.com/openshiftio-vertx-boosters/vertx-health-checks-booster",
				ref: "v26"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-security",
		name: "Node.js - Istio - Security",
		description: "Runs a Node.js application that showcases security through Mutual TLS and ACL on Istio",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-istio-security",
				ref: "v2.2.0"
			}
		},
		version: "v10-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "crud",
		name: "HTTP CRUD - Thorntail",
		description: "A simple CRUD applicaiton using Thorntail",
		runtime: "thorntail",
		source: {
			git: {
				url: "https://github.com/thorntail-examples/rest-http-crud-redhat",
				ref: "2.2.0-redhat-1"
			}
		},
		version: "redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "rest-http",
		name: "Spring Boot - HTTP Example",
		description: "Booster to expose a HTTP Greeting endpoint using Spring Boot and Apache Tomcat in embedded mode.",
		runtime: "spring-boot",
		source: {
			git: {
				url: "https://github.com/snowdrop/spring-boot-http-booster",
				ref: "1.5.17-4"
			}
		},
		version: "current-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "messaging",
		name: "Node.js Messaging Booster",
		description: "Demonstrate how to use a Messaging Work Queue from a Node.js application",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-messaging-work-queue",
				ref: "v2.1.0"
			}
		},
		version: "v10-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "crud",
		name: "Spring Boot - CRUD Example",
		description: "Booster to expose an HTTP endpoint with CRUD operations on fruits database.",
		runtime: "spring-boot",
		source: {
			git: {
				url: "https://github.com/snowdrop/spring-boot-crud-booster",
				ref: "1.5.17-4"
			}
		},
		version: "current-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-distributed-tracing",
		name: "Red Hat Fuse - Istio - Distributed Tracing",
		description: "Runs a Apache Camel application that utilizes Tracing on Istio",
		runtime: "fuse",
		source: {
			git: {
				url: "https://github.com/jboss-fuse/fuse-istio-distributed-tracing-booster",
				ref: "v7.2.0-01"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "crud",
		name: "Node.js - CRUD Example",
		description: "Runs a Node.js application exposing a HTTP endpoint proposing CRUD operations",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-rest-http-crud-redhat",
				ref: "v1.2.3"
			}
		},
		version: "v8-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: "none"
				}
			}
		},
		mission: "rest-http-secured",
		name: "Node.js - REST and RH SSO",
		description: "A simple HTTP application using Node.js secured by RH SSO",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-rest-http-secured",
				ref: "v1.2.0"
			}
		},
		version: "v8-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "circuit-breaker",
		name: "Spring Boot - Circuit Breaker Example",
		description: "Booster to demonstrate Circuit Breaker pattern with Spring Boot.",
		runtime: "spring-boot",
		source: {
			git: {
				url: "https://github.com/snowdrop/spring-boot-circuit-breaker-booster",
				ref: "1.5.17-4"
			}
		},
		version: "current-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "circuit-breaker",
		name: "Node.js - Circuit Breaker",
		description: "Demonstrates Circuit Breaker in Node.js",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-circuit-breaker",
				ref: "v1.2.0"
			}
		},
		version: "v8-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "health-check",
		name: "Node.js - Health Checks",
		description: "Demonstrates Health Checks in Node.js",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-health-check-redhat",
				ref: "v2.0.1"
			}
		},
		version: "v10-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "messaging",
		name: "Node.js Messaging Booster",
		description: "Demonstrate how to use a Messaging Work Queue from a Node.js application",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-messaging-work-queue-redhat",
				ref: "v1.1.0"
			}
		},
		version: "v8-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: true
				}
			}
		},
		mission: "rest-http",
		name: "Spring Boot - HTTP Example",
		description: "Booster to expose a HTTP Greeting endpoint using Spring Boot and Apache Tomcat in embedded mode.",
		runtime: "spring-boot",
		source: {
			git: {
				url: "https://github.com/snowdrop/spring-boot-http-booster",
				ref: "1.5.17-4-redhat"
			}
		},
		version: "current-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "rest-http",
		name: "Red Hat Fuse - HTTP Example",
		description: "Booster to expose a HTTP Greeting endpoint using Apache camel, Spring Boot and Undertow.",
		runtime: "fuse",
		source: {
			git: {
				url: "https://github.com/jboss-fuse/fuse-rest-http-booster",
				ref: "v7.2.0"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "messaging",
		name: "Node.js Messaging Booster",
		description: "Demonstrate how to use a Messaging Work Queue from a Node.js application",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-messaging-work-queue",
				ref: "v1.1.0"
			}
		},
		version: "v8-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: "none"
				}
			}
		},
		mission: "rest-http-secured",
		name: "Secured Spring Boot - HTTP & Red Hat SSO Example",
		description: "Booster to expose a HTTP Greeting endpoint using SpringBoot & Secured by Red Hat SSO.",
		runtime: "spring-boot",
		source: {
			git: {
				url: "https://github.com/snowdrop/spring-boot-http-secured-booster",
				ref: "1.5.17-4"
			}
		},
		version: "current-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "health-check",
		name: "Thorntail - Health Checks",
		description: "Demonstrates Health Checks in Thorntail",
		runtime: "thorntail",
		source: {
			git: {
				url: "https://github.com/thorntail-examples/health-check",
				ref: "13"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "rest-http",
		name: "Vert.x HTTP Booster",
		description: "Runs a Vert.x HTTP application",
		runtime: "vert.x",
		source: {
			git: {
				url: "https://github.com/openshiftio-vertx-boosters/vertx-http-booster",
				ref: "v31"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-routing",
		name: "Thorntail - Istio - Routing",
		description: "Runs a Thorntail application that utilizes Routing on Istio",
		runtime: "thorntail",
		source: {
			git: {
				url: "https://github.com/thorntail-examples/istio-routing",
				ref: "5"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "messaging",
		name: "Node.js Messaging Booster",
		description: "Demonstrate how to use a Messaging Work Queue from a Node.js application",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-messaging-work-queue-redhat",
				ref: "v2.1.0"
			}
		},
		version: "v10-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: "none"
				}
			}
		},
		mission: "rest-http-secured",
		name: "Secured Vertx - Rest & Red Hat SSO",
		description: "Quickstart to expose a REST Greeting endpoint using Eclipse Vert.x & Secured by Red Hat SSO",
		runtime: "vert.x",
		source: {
			git: {
				url: "https://github.com/openshiftio-vertx-boosters/vertx-secured-http-booster",
				ref: "v24"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-security",
		name: "Node.js - Istio - Security",
		description: "Runs a Node.js application that showcases security through Mutual TLS and ACL on Istio",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-istio-security-redhat",
				ref: "v1.1.0"
			}
		},
		version: "v8-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "cache",
		name: "Spring Boot - Cache Example",
		description: "Booster to demonstrate how to use a cache server Spring Boot on OpenShift.",
		runtime: "spring-boot",
		source: {
			git: {
				url: "https://github.com/snowdrop/spring-boot-cache-booster",
				ref: "1.5.17-4-redhat"
			}
		},
		version: "current-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "cache",
		name: "Thorntail - Cache",
		description: "Demonstrate how to use a cache server in Thorntail",
		runtime: "thorntail",
		source: {
			git: {
				url: "https://github.com/thorntail-examples/cache",
				ref: "5"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-security",
		name: "Node.js - Istio - Security",
		description: "Runs a Node.js application that showcases security through Mutual TLS and ACL on Istio",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-istio-security-redhat",
				ref: "v2.1.0"
			}
		},
		version: "v10-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-routing",
		name: "Node.js - Istio - Routing",
		description: "Runs a Node.js application that utilizes Routing on Istio",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-istio-routing",
				ref: "v1.2.0"
			}
		},
		version: "v8-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-circuit-breaker",
		name: "Istio - Spring Boot - Circuit Breaker Example",
		description: "Booster to demonstrate Istio's Circuit Breaker pattern with Spring Boot.",
		runtime: "spring-boot",
		source: {
			git: {
				url: "https://github.com/snowdrop/spring-boot-istio-circuit-breaker-booster",
				ref: "1.5.17-4-redhat"
			}
		},
		version: "current-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-security",
		name: "Thorntail - Istio - Security",
		description: "Runs a Thorntail application that showcases security through Mutual TLS and ACL on Istio",
		runtime: "thorntail",
		source: {
			git: {
				url: "https://github.com/thorntail-examples/istio-security",
				ref: "4"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "circuit-breaker",
		name: "Thorntail - Circuit Breaker",
		description: "Demonstrates Circuit Breaker in Thorntail",
		runtime: "thorntail",
		source: {
			git: {
				url: "https://github.com/thorntail-examples/circuit-breaker",
				ref: "10"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "crud",
		name: "Node.js - CRUD Example",
		description: "Runs a Node.js application exposing a HTTP endpoint proposing CRUD operations",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-rest-http-crud",
				ref: "v1.3.0"
			}
		},
		version: "v8-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "crud",
		name: "Spring Boot - CRUD Example",
		description: "Booster to expose an HTTP endpoint with CRUD operations on fruits database.",
		runtime: "spring-boot",
		source: {
			git: {
				url: "https://github.com/snowdrop/spring-boot-crud-booster",
				ref: "1.5.17-4-redhat"
			}
		},
		version: "current-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-distributed-tracing",
		name: "Eclipse Vert.x - Istio - Distributed Tracing",
		description: "Runs a Eclipse Vert.x application that utilizes Tracing on Istio",
		runtime: "vert.x",
		source: {
			git: {
				url: "https://github.com/openshiftio-vertx-boosters/vertx-istio-distributed-tracing-booster",
				ref: "v3"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-routing",
		name: "Node.js - Istio - Routing",
		description: "Runs a Node.js application that utilizes Routing on Istio",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-istio-routing-redhat",
				ref: "v1.1.0"
			}
		},
		version: "v8-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "health-check",
		name: "Node.js - Health Checks",
		description: "Demonstrates Health Checks in Node.js",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-health-check",
				ref: "v1.3.2"
			}
		},
		version: "v8-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: "none"
				}
			}
		},
		mission: "rest-http-secured",
		name: "Thorntail - REST and RH SSO",
		description: "A simple HTTP application using Thorntail secured by RH SSO",
		runtime: "thorntail",
		source: {
			git: {
				url: "https://github.com/thorntail-examples/rest-http-secured",
				ref: "12"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "crud",
		name: "Node.js - CRUD Example",
		description: "Runs a Node.js application exposing a HTTP endpoint proposing CRUD operations",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-rest-http-crud",
				ref: "v2.1.0"
			}
		},
		version: "v10-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "cache",
		name: "Spring Boot - Cache Example",
		description: "Booster to demonstrate how to use a cache server Spring Boot on OpenShift.",
		runtime: "spring-boot",
		source: {
			git: {
				url: "https://github.com/snowdrop/spring-boot-cache-booster",
				ref: "1.5.17-4"
			}
		},
		version: "current-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-circuit-breaker",
		name: "Thorntail - Istio - Circuit Breaker",
		description: "Runs a Thorntail application that utilizes Circuit Breakers on Istio",
		runtime: "thorntail",
		source: {
			git: {
				url: "https://github.com/thorntail-examples/istio-circuit-breaker",
				ref: "5"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "rest-http",
		name: "Thorntail - HTTP",
		description: "Runs a Thorntail HTTP application",
		runtime: "thorntail",
		source: {
			git: {
				url: "https://github.com/thorntail-examples/rest-http-redhat",
				ref: "2.2.0-redhat-1"
			}
		},
		version: "redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: "none"
				}
			}
		},
		mission: "rest-http-secured",
		name: "Node.js - REST and RH SSO",
		description: "A simple HTTP application using Node.js secured by RH SSO",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-rest-http-secured-redhat",
				ref: "v2.0.1"
			}
		},
		version: "v10-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "configmap",
		name: "Node.js - HTTP & Config Map",
		description: "Simple HTTP endpoint where the Node.js application uses OpenShift ConfigMap to get the application parameters.",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-configmap",
				ref: "v2.1.0"
			}
		},
		version: "v10-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "configmap",
		name: "Node.js - HTTP & Config Map",
		description: "Simple HTTP endpoint where the Node.js application uses OpenShift ConfigMap to get the application parameters.",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-configmap",
				ref: "v1.3.0"
			}
		},
		version: "v8-community"
	},
	{
		mission: "configmap",
		name: "Vert.x - HTTP & Config Map",
		description: "Simple HTTP endpoint where the Vert.x application uses OpenShift ConfigMap to get the application parameters.",
		runtime: "vert.x",
		source: {
			git: {
				url: "https://github.com/openshiftio-vertx-boosters/vertx-configmap-booster-redhat",
				ref: "v21"
			}
		},
		version: "redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "configmap",
		name: "Node.js - HTTP & Config Map",
		description: "Simple HTTP endpoint where the Node.js application uses OpenShift ConfigMap to get the application parameters.",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-configmap-redhat",
				ref: "v1.3.0"
			}
		},
		version: "v8-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "health-check",
		name: "Red Hat Fuse - Health Check Example",
		description: "Booster to demonstrate OpenShift health probes working with Apache Camel through Spring Boot Actuator.",
		runtime: "fuse",
		source: {
			git: {
				url: "https://github.com/jboss-fuse/fuse-health-check-booster",
				ref: "v7.2.0"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "rest-http",
		name: "Node.js - HTTP",
		description: "Runs a Node.js HTTP application",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-rest-http-redhat",
				ref: "v2.0.2"
			}
		},
		version: "v10-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: true
				}
			}
		},
		mission: "health-check",
		name: "Red Hat Golang - Health Check Example",
		description: "Test",
		runtime: "golang",
		source: {
			git: {
				url: "https://github.com/golang-starters/golang-health-check",
				ref: "master"
			}
		},
		version: "redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "cache",
		name: "Node.js Cache Booster",
		description: "Demonstrate how to use a cache server from a Node.js application",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-cache",
				ref: "v2.2.0"
			}
		},
		version: "v10-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: "none"
				}
			}
		},
		mission: "rest-http-secured",
		name: "Node.js - REST and RH SSO",
		description: "A simple HTTP application using Node.js secured by RH SSO",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-rest-http-secured-redhat",
				ref: "v1.1.3"
			}
		},
		version: "v8-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: true
				}
			}
		},
		mission: "health-check",
		name: "Node.js - Health Checks",
		description: "Demonstrates Health Checks in Node.js",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-health-check",
				ref: "v2.0.2"
			}
		},
		version: "v10-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-circuit-breaker",
		name: "Node.js - Istio - Circuit Breaker",
		description: "Runs a Node.js application that utilizes Circuit Breakers on Istio",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-istio-circuit-breaker-redhat",
				ref: "v2.1.0"
			}
		},
		version: "v10-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-distributed-tracing",
		name: "Node.js - Istio - Distributed Tracing",
		description: "Runs a Node.js application that utilizes Tracing on Istio",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-istio-tracing",
				ref: "v2.2.0"
			}
		},
		version: "v10-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "cache",
		name: "Node.js Cache Booster",
		description: "Demonstrate how to use a cache server from a Node.js application",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-cache-redhat",
				ref: "v2.2.0"
			}
		},
		version: "v10-redhat"
	},
	{
		metadata: {
			app: {
				launcher: {
					runsOn: [
						"!starter"
					]
				},
				osio: {
					enabled: false
				}
			}
		},
		mission: "circuit-breaker",
		name: "Vert.x Circuit Breaker Booster",
		description: "Runs a Vert.x application using a circuit breaker",
		runtime: "vert.x",
		source: {
			git: {
				url: "https://github.com/openshiftio-vertx-boosters/vertx-circuit-breaker-booster-redhat",
				ref: "v18"
			}
		},
		version: "redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "crud",
		name: "Node.js - CRUD Example",
		description: "Runs a Node.js application exposing a HTTP endpoint proposing CRUD operations",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-rest-http-crud-redhat",
				ref: "v2.0.1"
			}
		},
		version: "v10-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "cache",
		name: "Node.js Cache Booster",
		description: "Demonstrate how to use a cache server from a Node.js application",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-cache",
				ref: "v1.2.0"
			}
		},
		version: "v8-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "circuit-breaker",
		name: "Node.js - Circuit Breaker",
		description: "Demonstrates Circuit Breaker in Node.js",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-circuit-breaker-redhat",
				ref: "v1.2.0"
			}
		},
		version: "v8-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "circuit-breaker",
		name: "Node.js - Circuit Breaker",
		description: "Demonstrates Circuit Breaker in Node.js",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-circuit-breaker-redhat",
				ref: "v2.1.0"
			}
		},
		version: "v10-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-distributed-tracing",
		name: "Istio - Spring Boot - Distributed Tracing",
		description: "Booster to demonstrate how Istio's service mesh and Distributed Tracing - Jaeger interact.",
		runtime: "spring-boot",
		source: {
			git: {
				url: "https://github.com/snowdrop/spring-boot-istio-distributed-tracing-booster.git",
				ref: "1.5.17-4"
			}
		},
		version: "current-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-circuit-breaker",
		name: "Node.js - Istio - Circuit Breaker",
		description: "Runs a Node.js application that utilizes Circuit Breakers on Istio",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-istio-circuit-breaker",
				ref: "v2.3.0"
			}
		},
		version: "v10-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "health-check",
		name: "Red Hat Fuse - Health Check Example",
		description: "Booster to demonstrate OpenShift health probes working with Apache Camel through Spring Boot Actuator.",
		runtime: "fuse",
		source: {
			git: {
				url: "https://github.com/jboss-fuse/fuse-health-check-booster",
				ref: "v7.2.0-redhat-01"
			}
		},
		version: "redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "configmap",
		name: "Vert.x - HTTP & Config Map",
		description: "Simple HTTP endpoint where the Vert.x application uses OpenShift ConfigMap to get the application parameters.",
		runtime: "vert.x",
		source: {
			git: {
				url: "https://github.com/openshiftio-vertx-boosters/vertx-configmap-booster",
				ref: "v32"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "configmap",
		name: "Red Hat Fuse - ConfigMap Example",
		description: "Booster to expose an HTTP REST endpoint using Apache Camel where the message is defined as a Kubernetes ConfigMap property.",
		runtime: "fuse",
		source: {
			git: {
				url: "https://github.com/jboss-fuse/fuse-configmap-booster",
				ref: "v7.2.0"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "circuit-breaker",
		name: "Node.js - Circuit Breaker",
		description: "Demonstrates Circuit Breaker in Node.js",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-circuit-breaker",
				ref: "v2.1.0"
			}
		},
		version: "v10-community"
	},
	{
		mission: "health-check",
		name: "Vert.x Health Check Example",
		description: "Demonstrate health check and recovery mechanism",
		runtime: "vert.x",
		source: {
			git: {
				url: "https://github.com/openshiftio-vertx-boosters/vertx-health-checks-booster-redhat",
				ref: "v19"
			}
		},
		version: "redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "cache",
		name: "Thorntail - Cache",
		description: "Demonstrate how to use a cache server in Thorntail",
		runtime: "thorntail",
		source: {
			git: {
				url: "https://github.com/thorntail-examples/cache-redhat",
				ref: "2.2.0-redhat-1"
			}
		},
		version: "redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "configmap",
		name: "Spring Boot - ConfigMap Example",
		description: "Booster to expose an HTTP Greeting endpoint using Spring Boot where the message is defined as a Kubernetes ConfigMap property.",
		runtime: "spring-boot",
		source: {
			git: {
				url: "https://github.com/snowdrop/spring-boot-configmap-booster",
				ref: "1.5.17-4-redhat"
			}
		},
		version: "current-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "configmap",
		name: "Thorntail - Config Map",
		description: "Simple HTTP endpoint where the Thorntail application uses OpenShift ConfigMap to retrieve application parameters.",
		runtime: "thorntail",
		source: {
			git: {
				url: "https://github.com/thorntail-examples/configmap",
				ref: "14"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "circuit-breaker",
		name: "Vert.x Circuit Breaker Booster",
		description: "Runs a Vert.x application using a circuit breaker",
		runtime: "vert.x",
		source: {
			git: {
				url: "https://github.com/openshiftio-vertx-boosters/vertx-circuit-breaker-booster",
				ref: "v22"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				launcher: {
					runsOn: [
						"!starter"
					]
				},
				osio: {
					enabled: false
				}
			}
		},
		mission: "crud",
		name: "Vert.x CRUD Example using JDBC",
		description: "Runs a Vert.x application exposing a HTTP endpoint proposing CRUD operations implemented on top of JDBC",
		runtime: "vert.x",
		source: {
			git: {
				url: "https://github.com/openshiftio-vertx-boosters/vertx-crud-booster-redhat",
				ref: "v18"
			}
		},
		version: "redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "rest-http",
		name: "Thorntail - HTTP",
		description: "Runs a Thorntail HTTP application",
		runtime: "thorntail",
		source: {
			git: {
				url: "https://github.com/thorntail-examples/rest-http",
				ref: "16"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "circuit-breaker",
		name: "Red Hat Fuse - Circuit Breaker Example",
		description: "Booster to demonstrate Circuit Breaker pattern with Apache Camel.",
		runtime: "fuse",
		source: {
			git: {
				url: "https://github.com/jboss-fuse/fuse-springboot-circuit-breaker-booster",
				ref: "v7.2.0"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-circuit-breaker",
		name: "Node.js - Istio - Circuit Breaker",
		description: "Runs a Node.js application that utilizes Circuit Breakers on Istio",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-istio-circuit-breaker",
				ref: "v1.3.0"
			}
		},
		version: "v8-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-routing",
		name: "Node.js - Istio - Routing",
		description: "Runs a Node.js application that utilizes Routing on Istio",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-istio-routing",
				ref: "v2.2.0"
			}
		},
		version: "v10-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "crud",
		name: "Vert.x CRUD Example using JDBC",
		description: "Runs a Vert.x application exposing a HTTP endpoint proposing CRUD operations implemented on top of JDBC",
		runtime: "vert.x",
		source: {
			git: {
				url: "https://github.com/openshiftio-vertx-boosters/vertx-crud-booster",
				ref: "v30"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: true
				}
			}
		},
		mission: "rest-http",
		name: "Red Hat Golang - HTTP Example",
		description: "Booster to expose a HTTP Greeting endpoint using Apache camel, Spring Boot and Undertow.",
		runtime: "golang",
		source: {
			git: {
				url: "https://github.com/golang-starters/golang-rest-http",
				ref: "master"
			}
		},
		version: "redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: "none"
				}
			}
		},
		mission: "rest-http-secured",
		name: "Node.js - REST and RH SSO",
		description: "A simple HTTP application using Node.js secured by RH SSO",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-rest-http-secured",
				ref: "v2.0.1"
			}
		},
		version: "v10-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "messaging",
		name: "Spring Boot - Messaging Booster",
		description: "Demonstrate how to use a Messaging Work Queue from a Spring Boot application",
		runtime: "spring-boot",
		source: {
			git: {
				url: "https://github.com/snowdrop/spring-boot-messaging-work-queue-booster",
				ref: "1.5.17-4-redhat"
			}
		},
		version: "current-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-routing",
		name: "Istio - Spring Boot - Routing",
		description: "Booster to demonstrate how Istio can be used to route traffic to/from services, including load balancing multiple different versions of the same service.",
		runtime: "spring-boot",
		source: {
			git: {
				url: "https://github.com/snowdrop/spring-boot-istio-routing-booster.git",
				ref: "1.5.17-4-redhat"
			}
		},
		version: "current-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-distributed-tracing",
		name: "Thorntail - Istio - Distributed Tracing",
		description: "Runs a Thorntail application that utilizes Tracing with Jaeger on Istio",
		runtime: "thorntail",
		source: {
			git: {
				url: "https://github.com/thorntail-examples/istio-tracing",
				ref: "4"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "circuit-breaker",
		name: "Spring Boot - Circuit Breaker Example",
		description: "Booster to demonstrate Circuit Breaker pattern with Spring Boot.",
		runtime: "spring-boot",
		source: {
			git: {
				url: "https://github.com/snowdrop/spring-boot-circuit-breaker-booster",
				ref: "1.5.17-4-redhat"
			}
		},
		version: "current-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-distributed-tracing",
		name: "Red Hat Fuse - Istio - Distributed Tracing",
		description: "Runs a Apache Camel application that utilizes Tracing on Istio",
		runtime: "fuse",
		source: {
			git: {
				url: "https://github.com/jboss-fuse/fuse-istio-distributed-tracing-booster",
				ref: "v7.2.0-redhat-01"
			}
		},
		version: "redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-circuit-breaker",
		name: "Node.js - Istio - Circuit Breaker",
		description: "Runs a Node.js application that utilizes Circuit Breakers on Istio",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-istio-circuit-breaker-redhat",
				ref: "v1.1.0"
			}
		},
		version: "v8-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-distributed-tracing",
		name: "Node.js - Istio - Distributed Tracing",
		description: "Runs a Node.js application that utilizes Tracing on Istio",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-istio-tracing",
				ref: "v1.2.0"
			}
		},
		version: "v8-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "messaging",
		name: "Spring Boot - Messaging Booster",
		description: "Demonstrate how to use a Messaging Work Queue from a Spring Boot application",
		runtime: "spring-boot",
		source: {
			git: {
				url: "https://github.com/snowdrop/spring-boot-messaging-work-queue-booster",
				ref: "1.5.17-4"
			}
		},
		version: "current-community"
	},
	{
		runtime: "vert.x",
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "cache",
		source: {
			git: {
				url: "https://github.com/openshiftio-vertx-boosters/vertx-cache-booster",
				ref: "v7"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "rest-http",
		name: "Red Hat Fuse - HTTP Example",
		description: "Booster to expose a HTTP REST endpoint using Apache camel, Spring Boot and Undertow.",
		runtime: "fuse",
		source: {
			git: {
				url: "https://github.com/jboss-fuse/fuse-rest-http-booster",
				ref: "v7.2.0-redhat-01"
			}
		},
		version: "redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "configmap",
		name: "Spring Boot - ConfigMap Example",
		description: "Booster to expose an HTTP Greeting endpoint using Spring Boot where the message is defined as a Kubernetes ConfigMap property.",
		runtime: "spring-boot",
		source: {
			git: {
				url: "https://github.com/snowdrop/spring-boot-configmap-booster",
				ref: "1.5.17-4"
			}
		},
		version: "current-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-security",
		name: "Node.js - Istio - Security",
		description: "Runs a Node.js application that showcases security through Mutual TLS and ACL on Istio",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-istio-security",
				ref: "v1.2.0"
			}
		},
		version: "v8-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "rest-http",
		name: "Node.js - HTTP",
		description: "Runs a Node.js HTTP application",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-rest-http",
				ref: "v1.3.0"
			}
		},
		version: "v8-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-security",
		name: "Istio - Spring Boot - Security",
		description: "Booster to demonstrate Istio Mutual TLS and ACL functionality.",
		runtime: "spring-boot",
		source: {
			git: {
				url: "https://github.com/snowdrop/spring-boot-istio-security-booster.git",
				ref: "1.5.17-4"
			}
		},
		version: "current-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-security",
		name: "Eckipse Vert.x - Istio - Security",
		description: "Runs a Eclipse Vert.x application that showcases security through Mutual TLS and ACL on Istio",
		runtime: "vert.x",
		source: {
			git: {
				url: "https://github.com/openshiftio-vertx-boosters/vertx-istio-security-booster",
				ref: "v3"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "health-check",
		name: "Thorntail - Health Checks",
		description: "Demonstrates Health Checks in Thorntail",
		runtime: "thorntail",
		source: {
			git: {
				url: "https://github.com/thorntail-examples/health-check-redhat",
				ref: "2.2.0-redhat-1"
			}
		},
		version: "redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: true
				}
			}
		},
		mission: "rest-http",
		name: "Node.js - HTTP",
		description: "Runs a Node.js HTTP application",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-rest-http",
				ref: "v2.1.0"
			}
		},
		version: "v10-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-routing",
		name: "Node.js - Istio - Routing",
		description: "Runs a Node.js application that utilizes Routing on Istio",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-istio-routing-redhat",
				ref: "v2.1.0"
			}
		},
		version: "v10-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: "none"
				}
			}
		},
		mission: "rest-http-secured",
		name: "Secured Spring Boot - HTTP & Red Hat SSO Example",
		description: "Booster to expose a HTTP Greeting endpoint using SpringBoot & Secured by Red Hat SSO.",
		runtime: "spring-boot",
		source: {
			git: {
				url: "https://github.com/snowdrop/spring-boot-http-secured-booster",
				ref: "1.5.17-4-redhat"
			}
		},
		version: "current-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-routing",
		name: "Eclipse Vert.x - Istio - Routing",
		description: "Runs a Eclipse Vert.x application that utilizes Routing on Istio",
		runtime: "vert.x",
		source: {
			git: {
				url: "https://github.com/openshiftio-vertx-boosters/vertx-istio-routing-booster",
				ref: "v3"
			}
		},
		version: "community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "configmap",
		name: "Node.js - HTTP & Config Map",
		description: "Simple HTTP endpoint where the Node.js application uses OpenShift ConfigMap to get the application parameters.",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-configmap-redhat",
				ref: "v2.1.0"
			}
		},
		version: "v10-redhat"
	},
	{
		metadata: {
			app: {
				launcher: {
					runsOn: "none"
				},
				osio: {
					enabled: false
				}
			}
		},
		mission: "rest-http-secured",
		name: "Secured Vertx - Rest & Red Hat SSO",
		description: "Quickstart to expose a REST Greeting endpoint using Eclipse Vert.x & Secured by Red Hat SSO",
		runtime: "vert.x",
		source: {
			git: {
				url: "https://github.com/openshiftio-vertx-boosters/vertx-secured-http-booster-redhat",
				ref: "v25"
			}
		},
		version: "redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "rest-http",
		name: "Node.js - HTTP",
		description: "Runs a Node.js HTTP application",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-rest-http-redhat",
				ref: "v1.2.5"
			}
		},
		version: "v8-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-distributed-tracing",
		name: "Istio - Spring Boot - Distributed Tracing",
		description: "Booster to demonstrate how Istio's service mesh and Distributed Tracing - Jaeger interact.",
		runtime: "spring-boot",
		source: {
			git: {
				url: "https://github.com/snowdrop/spring-boot-istio-distributed-tracing-booster.git",
				ref: "1.5.17-4-redhat"
			}
		},
		version: "current-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "health-check",
		name: "Spring Boot - Health Check Example",
		description: "Booster to demonstrate OpenShift health probes working with Spring Boot Actuator.",
		runtime: "spring-boot",
		source: {
			git: {
				url: "https://github.com/snowdrop/spring-boot-health-check-booster",
				ref: "1.5.17-4"
			}
		},
		version: "current-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"!starter"
					]
				}
			}
		},
		mission: "circuit-breaker",
		name: "Red Hat Fuse - Circuit Breaker Example",
		description: "Booster to demonstrate Circuit Breaker pattern with Apache Camel.",
		runtime: "fuse",
		source: {
			git: {
				url: "https://github.com/jboss-fuse/fuse-springboot-circuit-breaker-booster",
				ref: "v7.2.0-redhat-01"
			}
		},
		version: "redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				}
			}
		},
		mission: "configmap",
		name: "Thorntail - Config Map",
		description: "Simple HTTP endpoint where the Thorntail application uses OpenShift ConfigMap to retrieve application parameters.",
		runtime: "thorntail",
		source: {
			git: {
				url: "https://github.com/thorntail-examples/configmap-redhat",
				ref: "2.2.0-redhat-1"
			}
		},
		version: "redhat"
	},
	{
		mission: "rest-http",
		name: "Vert.x HTTP Booster",
		description: "Runs a Vert.x HTTP application",
		runtime: "vert.x",
		source: {
			git: {
				url: "https://github.com/openshiftio-vertx-boosters/vertx-http-booster-redhat",
				ref: "v19"
			}
		},
		version: "redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-routing",
		name: "Istio - Spring Boot - Routing",
		description: "Booster to demonstrate how Istio can be used to route traffic to/from services, including load balancing multiple different versions of the same service.",
		runtime: "spring-boot",
		source: {
			git: {
				url: "https://github.com/snowdrop/spring-boot-istio-routing-booster.git",
				ref: "1.5.17-4"
			}
		},
		version: "current-community"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: true
				}
			}
		},
		mission: "health-check",
		name: "Spring Boot - Health Check Example",
		description: "Booster to demonstrate OpenShift health probes working with Spring Boot Actuator.",
		runtime: "spring-boot",
		source: {
			git: {
				url: "https://github.com/snowdrop/spring-boot-health-check-booster",
				ref: "1.5.17-4-redhat"
			}
		},
		version: "current-redhat"
	},
	{
		metadata: {
			app: {
				osio: {
					enabled: false
				},
				launcher: {
					runsOn: [
						"local"
					]
				}
			}
		},
		mission: "istio-distributed-tracing",
		name: "Node.js - Istio - Distributed Tracing",
		description: "Runs a Node.js application that utilizes Tracing on Istio",
		runtime: "nodejs",
		source: {
			git: {
				url: "https://github.com/nodeshift-starters/nodejs-istio-tracing-redhat",
				ref: "v1.1.0"
			}
		},
		version: "v8-redhat"
	}
];
var runtimes = [
	{
		id: "vert.x",
		name: "Eclipse Vert.x",
		icon: "data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 280'%3E%3Cpath fill='%23022B37' d='M107 170.8L67.7 72H46.9L100 204h13.9L167 72h-20.4zm64 33.2h80v-20h-61v-37h60v-19h-60V91h61V72h-80zm180.1-90.7c0-21-14.4-42.3-43.1-42.3h-48v133h19V91h29.1c16.1 0 24 11.1 24 22.4 0 11.5-7.9 22.6-24 22.6H286v9.6l48 58.4h24.7L317 154c22.6-4 34.1-22 34.1-40.7m56.4 90.7v-1c0-6 1.7-11.7 4.5-16.6V91h39V71h-99v20h41v113h14.5z'/%3E%3Cpath fill='%23623C94' d='M458 203c0-9.9-8.1-18-18-18s-18 8.1-18 18 8.1 18 18 18 18-8.1 18-18M577.4 72h-23.2l-27.5 37.8L499.1 72h-40.4c12.1 16 33.6 46.8 47.8 66.3l-37 50.9c2 4.2 3.1 8.9 3.1 13.8v1H499l95.2-132h-16.8zm-19.7 81.5l-20.1 27.9 16.5 22.6h40.2c-9.6-13.7-24-33.3-36.6-50.5z'/%3E%3C/svg%3E",
		description: "A tool-kit for building reactive applications on the JVM.",
		metadata: {
			pipelinePlatform: "maven"
		},
		versions: [
			{
				id: "redhat",
				name: "3.5.4.redhat-00002 (RHOAR)"
			},
			{
				id: "community",
				name: "3.6.2 (Community)"
			}
		]
	},
	{
		id: "fuse",
		name: "Fuse",
		icon: "data:image/svg+xml;charset=utf8,%3Csvg%20version%3D%221.1%22%20id%3D%22logo%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%20x%3D%220px%22%20y%3D%220px%22%0A%09%20viewBox%3D%220%200%20193.84%20103.23%22%20style%3D%22enable-background%3Anew%200%200%20193.84%20103.23%3B%22%20xml%3Aspace%3D%22preserve%22%3E%0A%3Cg%3E%0A%09%3Cpath%20d%3D%22M34.85%2C41.85l-2.74-5.66h-1.88v5.66h-4.56v-16.8h7.51c0.98%2C0%2C1.87%2C0.1%2C2.68%2C0.3c0.81%2C0.2%2C1.5%2C0.52%2C2.08%2C0.95%0A%09%09c0.58%2C0.43%2C1.02%2C1%2C1.33%2C1.69c0.31%2C0.7%2C0.47%2C1.54%2C0.47%2C2.53c0%2C1.26-0.27%2C2.3-0.82%2C3.1c-0.55%2C0.8-1.28%2C1.41-2.21%2C1.82l3.37%2C6.41%0A%09%09H34.85z%20M34.63%2C29.35c-0.31-0.34-0.84-0.5-1.58-0.5h-2.82v3.67h2.75c0.77%2C0%2C1.32-0.16%2C1.64-0.48c0.32-0.32%2C0.48-0.78%2C0.48-1.39%0A%09%09C35.1%2C30.11%2C34.94%2C29.68%2C34.63%2C29.35z%22/%3E%0A%09%3Cpath%20d%3D%22M43.57%2C41.85v-16.8h12.86v3.91h-8.26v2.26h4.97v3.84h-4.97v2.88h8.42v3.91H43.57z%22/%3E%0A%09%3Cpath%20d%3D%22M74.24%2C37.35c-0.38%2C1.08-0.96%2C1.95-1.73%2C2.62s-1.72%2C1.14-2.84%2C1.44s-2.44%2C0.44-3.92%2C0.44H60.3v-16.8h5.88%0A%09%09c1.31%2C0%2C2.5%2C0.14%2C3.58%2C0.41c1.07%2C0.27%2C1.98%2C0.73%2C2.72%2C1.38c0.74%2C0.65%2C1.32%2C1.5%2C1.73%2C2.56c0.41%2C1.06%2C0.61%2C2.38%2C0.61%2C3.96%0A%09%09S74.63%2C36.27%2C74.24%2C37.35z%20M69.84%2C31.43c-0.14-0.56-0.36-1.02-0.66-1.37c-0.3-0.35-0.7-0.61-1.2-0.78s-1.1-0.25-1.82-0.25H65v8.83%0A%09%09h1.01c0.72%2C0%2C1.34-0.08%2C1.85-0.23c0.51-0.15%2C0.93-0.4%2C1.26-0.74c0.33-0.34%2C0.56-0.8%2C0.71-1.37c0.14-0.57%2C0.22-1.27%2C0.22-2.1%0A%09%09C70.04%2C32.66%2C69.97%2C31.99%2C69.84%2C31.43z%22/%3E%0A%09%3Cpath%20d%3D%22M96.97%2C41.85v-6.62h-5.23v6.62h-4.75v-16.8h4.75v6.12h5.23v-6.12h4.75v16.8H96.97z%22/%3E%0A%09%3Cpath%20d%3D%22M116.7%2C41.85l-0.91-2.95h-5.04l-0.91%2C2.95h-4.99l6.1-16.8h4.7l6.1%2C16.8H116.7z%20M114.35%2C34.1%0A%09%09c-0.14-0.54-0.27-1.02-0.38-1.42c-0.11-0.4-0.21-0.76-0.3-1.08c-0.09-0.32-0.16-0.61-0.23-0.88c-0.06-0.26-0.12-0.54-0.17-0.83%0A%09%09c-0.05%2C0.29-0.1%2C0.57-0.17%2C0.84c-0.06%2C0.27-0.14%2C0.57-0.23%2C0.89c-0.09%2C0.32-0.19%2C0.68-0.3%2C1.08c-0.11%2C0.4-0.24%2C0.86-0.38%2C1.39%0A%09%09l-0.31%2C1.1h2.78L114.35%2C34.1z%22/%3E%0A%09%3Cpath%20d%3D%22M131.24%2C29.11v12.74h-4.66V29.11h-4.7v-4.06h14.06v4.06H131.24z%22/%3E%0A%09%3Cpath%20d%3D%22M142.18%2C27.96c-0.11%2C0.26-0.26%2C0.49-0.46%2C0.69c-0.19%2C0.19-0.42%2C0.35-0.69%2C0.46c-0.26%2C0.11-0.55%2C0.17-0.86%2C0.17%0A%09%09c-0.31%2C0-0.59-0.06-0.86-0.17c-0.26-0.11-0.49-0.26-0.69-0.46c-0.19-0.19-0.35-0.42-0.46-0.69c-0.11-0.26-0.17-0.55-0.17-0.86%0A%09%09s0.05-0.59%2C0.17-0.86s0.26-0.49%2C0.46-0.69s0.42-0.35%2C0.69-0.46c0.26-0.11%2C0.55-0.17%2C0.86-0.17c0.31%2C0%2C0.59%2C0.06%2C0.86%2C0.17%0A%09%09c0.26%2C0.11%2C0.49%2C0.26%2C0.69%2C0.46c0.19%2C0.19%2C0.35%2C0.42%2C0.46%2C0.69c0.11%2C0.26%2C0.17%2C0.55%2C0.17%2C0.86S142.29%2C27.69%2C142.18%2C27.96z%0A%09%09%20M141.86%2C26.38c-0.09-0.22-0.22-0.42-0.38-0.58s-0.36-0.29-0.58-0.38c-0.22-0.09-0.46-0.14-0.72-0.14c-0.26%2C0-0.5%2C0.05-0.72%2C0.14%0A%09%09c-0.22%2C0.09-0.41%2C0.22-0.58%2C0.38s-0.29%2C0.36-0.38%2C0.58c-0.09%2C0.22-0.14%2C0.46-0.14%2C0.72c0%2C0.26%2C0.05%2C0.5%2C0.14%2C0.72%0A%09%09c0.09%2C0.22%2C0.22%2C0.41%2C0.38%2C0.58c0.16%2C0.16%2C0.36%2C0.29%2C0.58%2C0.38c0.22%2C0.09%2C0.46%2C0.14%2C0.72%2C0.14c0.26%2C0%2C0.5-0.05%2C0.72-0.14%0A%09%09c0.22-0.09%2C0.42-0.22%2C0.58-0.38c0.16-0.16%2C0.29-0.36%2C0.38-0.58c0.09-0.22%2C0.14-0.46%2C0.14-0.72C142%2C26.84%2C141.95%2C26.6%2C141.86%2C26.38z%0A%09%09%20M141.03%2C27.05c-0.09%2C0.12-0.21%2C0.2-0.37%2C0.24l0.49%2C0.95h-0.47l-0.46-0.91h-0.45v0.91h-0.4v-2.36h1.04c0.1%2C0%2C0.2%2C0.01%2C0.3%2C0.04%0A%09%09c0.09%2C0.03%2C0.18%2C0.07%2C0.25%2C0.13s0.13%2C0.13%2C0.17%2C0.22c0.04%2C0.09%2C0.06%2C0.2%2C0.06%2C0.32C141.17%2C26.78%2C141.12%2C26.93%2C141.03%2C27.05z%0A%09%09%20M140.66%2C26.35c-0.07-0.06-0.16-0.08-0.27-0.08h-0.62v0.67h0.62c0.11%2C0%2C0.2-0.03%2C0.27-0.08c0.07-0.05%2C0.11-0.14%2C0.11-0.26%0A%09%09C140.76%2C26.49%2C140.73%2C26.41%2C140.66%2C26.35z%22/%3E%0A%09%3Cpath%20d%3D%22M28.47%2C49.21v8.35h6.91v2.56h-6.91v11.74h-2.81v-25.2h14.8v2.56H28.47z%22/%3E%0A%09%3Cpath%20d%3D%22M61.13%2C69.53c-1.49%2C1.81-3.76%2C2.72-6.8%2C2.72c-3.02%2C0-5.3-0.89-6.82-2.68c-1.52-1.79-2.29-4.43-2.29-7.94V46.65h2.81v14.9%0A%09%09c0%2C5.42%2C2.15%2C8.14%2C6.44%2C8.14c2.18%2C0%2C3.74-0.66%2C4.68-1.98c0.94-1.32%2C1.4-3.35%2C1.4-6.08V46.65h2.81v14.9%0A%09%09C63.36%2C65.06%2C62.61%2C67.72%2C61.13%2C69.53z%22/%3E%0A%09%3Cpath%20d%3D%22M84.72%2C68c-0.37%2C0.86-0.92%2C1.61-1.64%2C2.23c-0.72%2C0.62-1.6%2C1.12-2.63%2C1.48s-2.21%2C0.54-3.53%2C0.54%0A%09%09c-1.73%2C0-3.32-0.33-4.77-0.99c-1.45-0.66-2.68-1.49-3.69-2.5l1.87-2.09c0.96%2C0.91%2C1.99%2C1.64%2C3.1%2C2.2c1.1%2C0.55%2C2.3%2C0.83%2C3.6%2C0.83%0A%09%09c1.68%2C0%2C3.01-0.38%2C3.98-1.15c0.97-0.77%2C1.46-1.82%2C1.46-3.17c0-0.58-0.1-1.1-0.29-1.58c-0.19-0.48-0.52-0.92-0.99-1.33%0A%09%09c-0.47-0.41-1.09-0.81-1.85-1.21c-0.77-0.4-1.73-0.8-2.88-1.21c-1.37-0.48-2.51-0.97-3.44-1.46c-0.92-0.49-1.67-1.02-2.23-1.58%0A%09%09c-0.56-0.56-0.97-1.19-1.22-1.89c-0.25-0.7-0.38-1.5-0.38-2.41c0-1.01%2C0.19-1.91%2C0.58-2.7c0.38-0.79%2C0.92-1.47%2C1.6-2.03%0A%09%09c0.68-0.56%2C1.51-0.99%2C2.48-1.28c0.97-0.29%2C2.05-0.43%2C3.22-0.43c1.68%2C0%2C3.11%2C0.24%2C4.3%2C0.72c1.19%2C0.48%2C2.31%2C1.14%2C3.37%2C1.98l-1.8%2C2.2%0A%09%09c-0.91-0.77-1.83-1.35-2.75-1.75c-0.92-0.4-2.02-0.59-3.29-0.59c-0.86%2C0-1.61%2C0.1-2.23%2C0.31c-0.62%2C0.2-1.13%2C0.47-1.53%2C0.81%0A%09%09c-0.4%2C0.34-0.68%2C0.73-0.86%2C1.17C72.09%2C51.54%2C72%2C52.01%2C72%2C52.52c0%2C0.53%2C0.07%2C1%2C0.22%2C1.42c0.14%2C0.42%2C0.43%2C0.83%2C0.86%2C1.22%0A%09%09s1.04%2C0.79%2C1.82%2C1.17c0.78%2C0.38%2C1.81%2C0.8%2C3.08%2C1.26c1.39%2C0.5%2C2.56%2C1.01%2C3.49%2C1.51s1.69%2C1.06%2C2.25%2C1.66%0A%09%09c0.56%2C0.6%2C0.97%2C1.26%2C1.21%2C1.98c0.24%2C0.72%2C0.36%2C1.55%2C0.36%2C2.48C85.28%2C66.21%2C85.1%2C67.13%2C84.72%2C68z%22/%3E%0A%09%3Cpath%20d%3D%22M91.11%2C71.85v-25.2h15.23v2.56H93.92v7.92h7.2v2.56h-7.2v9.61h12.96v2.56H91.11z%22/%3E%0A%3C/g%3E%0A%3C/svg%3E",
		description: "The Fuse runtime enables you to deploy Spring Boot applications on OpenShift while leveraging the Fuse technology stack for middleware integration. The core technology provided by Fuse is Apache Camel for application integration including Spring Boot starters for the Camel components. The technology stack also provides transactions, Web services, security, management, and messaging clients.",
		metadata: {
			pipelinePlatform: "maven"
		},
		versions: [
			{
				id: "community",
				name: "2.21.2 (Community)"
			},
			{
				id: "redhat",
				name: "7.2.0 (Red Hat Fuse)"
			}
		]
	},
	{
		id: "golang",
		name: "Golang",
		icon: "data:image/svg+xml;charset=utf8,%3Csvg%20version%3D%221.1%22%20id%3D%22%E3%83%AC%E3%82%A4%E3%83%A4%E3%83%BC_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%0A%09%20y%3D%220px%22%20width%3D%22401.98px%22%20height%3D%22559.472px%22%20viewBox%3D%220%200%20401.98%20559.472%22%20enable-background%3D%22new%200%200%20401.98%20559.472%22%0A%09%20xml%3Aspace%3D%22preserve%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22%23F6D2A2%22%20stroke%3D%22%23000000%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20d%3D%22%0A%09M10.634%2C300.493c0.764%2C15.751%2C16.499%2C8.463%2C23.626%2C3.539c6.765-4.675%2C8.743-0.789%2C9.337-10.015%0A%09c0.389-6.064%2C1.088-12.128%2C0.744-18.216c-10.23-0.927-21.357%2C1.509-29.744%2C7.602C10.277%2C286.542%2C2.177%2C296.561%2C10.634%2C300.493%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22%23C6B198%22%20stroke%3D%22%23000000%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20d%3D%22%0A%09M10.634%2C300.493c2.29-0.852%2C4.717-1.457%2C6.271-3.528%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22%236AD7E5%22%20stroke%3D%22%23000000%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20d%3D%22%0A%09M46.997%2C112.853C-13.3%2C95.897%2C31.536%2C19.189%2C79.956%2C50.74L46.997%2C112.853z%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22%236AD7E5%22%20stroke%3D%22%23000000%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20d%3D%22%0A%09M314.895%2C44.984c47.727-33.523%2C90.856%2C42.111%2C35.388%2C61.141L314.895%2C44.984z%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22%23F6D2A2%22%20stroke%3D%22%23000000%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20d%3D%22%0A%09M325.161%2C494.343c12.123%2C7.501%2C34.282%2C30.182%2C16.096%2C41.18c-17.474%2C15.999-27.254-17.561-42.591-22.211%0A%09C305.271%2C504.342%2C313.643%2C496.163%2C325.161%2C494.343z%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22none%22%20stroke%3D%22%23000000%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20d%3D%22%0A%09M341.257%2C535.522c-2.696-5.361-3.601-11.618-8.102-15.939%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22%23F6D2A2%22%20stroke%3D%22%23000000%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20d%3D%22%0A%09M108.579%2C519.975c-14.229%2C2.202-22.238%2C15.039-34.1%2C21.558c-11.178%2C6.665-15.454-2.134-16.461-3.92%0A%09c-1.752-0.799-1.605%2C0.744-4.309-1.979c-10.362-16.354%2C10.797-28.308%2C21.815-36.432C90.87%2C496.1%2C100.487%2C509.404%2C108.579%2C519.975z%22%0A%09%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22none%22%20stroke%3D%22%23000000%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20d%3D%22%0A%09M58.019%2C537.612c0.542-6.233%2C5.484-10.407%2C7.838-15.677%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M49.513%2C91.667c-7.955-4.208-13.791-9.923-8.925-19.124%0A%09c4.505-8.518%2C12.874-7.593%2C20.83-3.385L49.513%2C91.667z%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M337.716%2C83.667c7.955-4.208%2C13.791-9.923%2C8.925-19.124%0A%09c-4.505-8.518-12.874-7.593-20.83-3.385L337.716%2C83.667z%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22%23F6D2A2%22%20stroke%3D%22%23000000%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20d%3D%22%0A%09M392.475%2C298.493c-0.764%2C15.751-16.499%2C8.463-23.626%2C3.539c-6.765-4.675-8.743-0.789-9.337-10.015%0A%09c-0.389-6.064-1.088-12.128-0.744-18.216c10.23-0.927%2C21.357%2C1.509%2C29.744%2C7.602C392.831%2C284.542%2C400.932%2C294.561%2C392.475%2C298.493%22%0A%09%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22%23C6B198%22%20stroke%3D%22%23000000%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20d%3D%22%0A%09M392.475%2C298.493c-2.29-0.852-4.717-1.457-6.271-3.528%22%2F%3E%0A%3Cg%3E%0A%09%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22%236AD7E5%22%20stroke%3D%22%23000000%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20d%3D%22%0A%09%09M195.512%2C13.124c60.365%2C0%2C116.953%2C8.633%2C146.452%2C66.629c26.478%2C65.006%2C17.062%2C135.104%2C21.1%2C203.806%0A%09%09c3.468%2C58.992%2C11.157%2C127.145-16.21%2C181.812c-28.79%2C57.514-100.73%2C71.982-160%2C69.863c-46.555-1.666-102.794-16.854-129.069-59.389%0A%09%09c-30.826-49.9-16.232-124.098-13.993-179.622c2.652-65.771-17.815-131.742%2C3.792-196.101%0A%09%09C69.999%2C33.359%2C130.451%2C18.271%2C195.512%2C13.124%22%2F%3E%0A%3C%2Fg%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22%23FFFFFF%22%20stroke%3D%22%23000000%22%20stroke-width%3D%222.9081%22%20stroke-linecap%3D%22round%22%20d%3D%22%0A%09M206.169%2C94.16c10.838%2C63.003%2C113.822%2C46.345%2C99.03-17.197C291.935%2C19.983%2C202.567%2C35.755%2C206.169%2C94.16%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22%23FFFFFF%22%20stroke%3D%22%23000000%22%20stroke-width%3D%222.8214%22%20stroke-linecap%3D%22round%22%20d%3D%22%0A%09M83.103%2C104.35c14.047%2C54.85%2C101.864%2C40.807%2C98.554-14.213C177.691%2C24.242%2C69.673%2C36.957%2C83.103%2C104.35%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22%23FFFFFF%22%20stroke%3D%22%23000000%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20d%3D%22%0A%09M218.594%2C169.762c0.046%2C8.191%2C1.861%2C17.387%2C0.312%2C26.101c-2.091%2C3.952-6.193%2C4.37-9.729%2C5.967c-4.89-0.767-9.002-3.978-10.963-8.552%0A%09c-1.255-9.946%2C0.468-19.576%2C0.785-29.526L218.594%2C169.762z%22%2F%3E%0A%3Cg%3E%0A%09%3Cellipse%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20cx%3D%22107.324%22%20cy%3D%2295.404%22%20rx%3D%2214.829%22%20ry%3D%2216.062%22%2F%3E%0A%09%3Cellipse%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22%23FFFFFF%22%20cx%3D%22114.069%22%20cy%3D%2299.029%22%20rx%3D%223.496%22%20ry%3D%224.082%22%2F%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%09%3Cellipse%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20cx%3D%22231.571%22%20cy%3D%2291.404%22%20rx%3D%2214.582%22%20ry%3D%2216.062%22%2F%3E%0A%09%3Cellipse%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22%23FFFFFF%22%20cx%3D%22238.204%22%20cy%3D%2295.029%22%20rx%3D%223.438%22%20ry%3D%224.082%22%2F%3E%0A%3C%2Fg%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22%23FFFFFF%22%20stroke%3D%22%23000000%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20d%3D%22%0A%09M176.217%2C168.87c-6.47%2C15.68%2C3.608%2C47.035%2C21.163%2C23.908c-1.255-9.946%2C0.468-19.576%2C0.785-29.526L176.217%2C168.87z%22%2F%3E%0A%3Cg%3E%0A%09%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22%23F6D2A2%22%20stroke%3D%22%23231F20%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20d%3D%22%0A%09%09M178.431%2C138.673c-12.059%2C1.028-21.916%2C15.366-15.646%2C26.709c8.303%2C15.024%2C26.836-1.329%2C38.379%2C0.203%0A%09%09c13.285%2C0.272%2C24.17%2C14.047%2C34.84%2C2.49c11.867-12.854-5.109-25.373-18.377-30.97L178.431%2C138.673z%22%2F%3E%0A%09%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M176.913%2C138.045c-0.893-20.891%2C38.938-23.503%2C43.642-6.016%0A%09%09C225.247%2C149.475%2C178.874%2C153.527%2C176.913%2C138.045C175.348%2C125.682%2C176.913%2C138.045%2C176.913%2C138.045z%22%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E",
		description: "The Golang runtime enables you to deploy GoLang applications on OpenShift.",
		metadata: {
			pipelinePlatform: "golang"
		},
		versions: [
			{
				id: "redhat",
				name: "Red Hat Golang"
			}
		]
	},
	{
		id: "nodejs",
		name: "Node.js",
		icon: "data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Cpath d='M0 600h600V0H0z'/%3E%3C/clipPath%3E%3CclipPath id='b'%3E%3Cpath d='M239.032 373.393l-42.134-24.315a5.085 5.085 0 0 1-2.545-4.407v-48.666c0-1.818.969-3.497 2.544-4.408l42.133-24.334a5.093 5.093 0 0 1 5.091 0l42.124 24.334a5.093 5.093 0 0 1 2.543 4.408v48.668a5.084 5.084 0 0 1-2.545 4.405l-42.123 24.315a5.088 5.088 0 0 1-5.088 0'/%3E%3C/clipPath%3E%3ClinearGradient id='c' x2='1' gradientTransform='scale(-86.48019 86.48019) rotate(-63.886 1.799 4.453)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23687e67'/%3E%3Cstop offset='.529' stop-color='%23687e67'/%3E%3Cstop offset='1' stop-color='%2383a178'/%3E%3C/linearGradient%3E%3CclipPath id='d'%3E%3Cpath d='M195.4 292.914a5.09 5.09 0 0 1 1.497-1.317l36.143-20.874 6.017-3.46a5.127 5.127 0 0 1 2.936-.665c.337.028.673.09 1.001.185l44.43 81.357a5.06 5.06 0 0 1-1.181.938l-27.588 15.925-14.579 8.39c-.417.24-.864.413-1.323.526z'/%3E%3C/clipPath%3E%3ClinearGradient id='e' x2='1' gradientTransform='scale(132.79816 -132.79816) rotate(-36.459 -2.712 -3.873)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23687e67'/%3E%3Cstop offset='.138' stop-color='%23687e67'/%3E%3Cstop offset='.697' stop-color='%239bb48f'/%3E%3Cstop offset='.908' stop-color='%239bb48f'/%3E%3Cstop offset='1' stop-color='%239bb48f'/%3E%3C/linearGradient%3E%3CclipPath id='f'%3E%3Cpath d='M239.032 373.393l-42.134-24.315a5.087 5.087 0 0 1-2.545-4.407v-48.666c0-1.818.97-3.497 2.544-4.408l42.133-24.334a5.093 5.093 0 0 1 5.091 0l42.124 24.334a5.093 5.093 0 0 1 2.543 4.408v48.668a5.084 5.084 0 0 1-2.545 4.405l-42.123 24.315a5.09 5.09 0 0 1-5.088 0'/%3E%3C/clipPath%3E%3CclipPath id='g'%3E%3Cpath d='M237.627 382.331l-.58-.331h.774z'/%3E%3C/clipPath%3E%3ClinearGradient id='h' x2='1' gradientTransform='matrix(97.417 0 0 -97.417 192.862 382.166)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%239bb48f'/%3E%3Cstop offset='.092' stop-color='%239bb48f'/%3E%3Cstop offset='.303' stop-color='%239bb48f'/%3E%3Cstop offset='.862' stop-color='%23687e67'/%3E%3Cstop offset='1' stop-color='%23687e67'/%3E%3C/linearGradient%3E%3CclipPath id='i'%3E%3Cpath d='M241.065 374.048a5.072 5.072 0 0 1-2.033-.655l-42.014-24.245 45.293-82.513a5.081 5.081 0 0 1 1.81.628l42.124 24.334a5.096 5.096 0 0 1 2.458 3.477l-46.178 78.89a5.295 5.295 0 0 1-1.035.102c-.142 0-.284-.006-.425-.018'/%3E%3C/clipPath%3E%3ClinearGradient id='j' x2='1' gradientTransform='matrix(97.417 0 0 -97.417 192.862 320.348)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%239bb48f'/%3E%3Cstop offset='.092' stop-color='%239bb48f'/%3E%3Cstop offset='.303' stop-color='%239bb48f'/%3E%3Cstop offset='.862' stop-color='%23687e67'/%3E%3Cstop offset='1' stop-color='%23687e67'/%3E%3C/linearGradient%3E%3CclipPath id='k'%3E%3Cpath d='M239.032 373.393l-42.134-24.315a5.087 5.087 0 0 1-2.545-4.407v-48.666c0-1.818.97-3.497 2.544-4.408l42.133-24.334a5.093 5.093 0 0 1 5.091 0l42.124 24.334a5.093 5.093 0 0 1 2.543 4.408v48.668a5.084 5.084 0 0 1-2.545 4.405l-42.123 24.315a5.09 5.09 0 0 1-5.088 0'/%3E%3C/clipPath%3E%3CclipPath id='l'%3E%3Cpath d='M290.279 292.38l-.279.477v-.639z'/%3E%3C/clipPath%3E%3ClinearGradient id='m' x2='1' gradientTransform='matrix(97.417 0 0 -97.417 192.862 292.538)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%239bb48f'/%3E%3Cstop offset='.092' stop-color='%239bb48f'/%3E%3Cstop offset='.303' stop-color='%239bb48f'/%3E%3Cstop offset='.862' stop-color='%23687e67'/%3E%3Cstop offset='1' stop-color='%23687e67'/%3E%3C/linearGradient%3E%3CclipPath id='n'%3E%3Cpath d='M239.032 373.393l-42.134-24.315a5.087 5.087 0 0 1-2.545-4.407v-48.666c0-1.818.97-3.497 2.544-4.408l42.133-24.334a5.093 5.093 0 0 1 5.091 0l42.124 24.334a5.093 5.093 0 0 1 2.543 4.408v48.668a5.084 5.084 0 0 1-2.545 4.405l-42.123 24.315a5.09 5.09 0 0 1-5.088 0'/%3E%3C/clipPath%3E%3CclipPath id='o'%3E%3Cpath d='M286.351 291.597l-42.177-24.333a5.084 5.084 0 0 0-1.861-.633l.84-1.53L290 292.218v.639l-1.158 1.979c-.347-1.348-1.263-2.528-2.491-3.239'/%3E%3C/clipPath%3E%3ClinearGradient id='p' x2='1' gradientTransform='matrix(97.417 0 0 -97.417 192.862 279.968)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%239bb48f'/%3E%3Cstop offset='.092' stop-color='%239bb48f'/%3E%3Cstop offset='.303' stop-color='%239bb48f'/%3E%3Cstop offset='.862' stop-color='%23687e67'/%3E%3Cstop offset='1' stop-color='%23687e67'/%3E%3C/linearGradient%3E%3CclipPath id='q'%3E%3Cpath d='M239.032 373.393l-42.134-24.315a5.087 5.087 0 0 1-2.545-4.407v-48.666c0-1.818.97-3.497 2.544-4.408l42.133-24.334a5.093 5.093 0 0 1 5.091 0l42.124 24.334a5.093 5.093 0 0 1 2.543 4.408v48.668a5.084 5.084 0 0 1-2.545 4.405l-42.123 24.315a5.09 5.09 0 0 1-5.088 0'/%3E%3C/clipPath%3E%3CclipPath id='r'%3E%3Cpath d='M286.351 291.597l-42.177-24.333a5.084 5.084 0 0 0-1.861-.633l.84-1.53L290 292.218v.639l-1.158 1.979c-.347-1.348-1.263-2.528-2.491-3.239'/%3E%3C/clipPath%3E%3ClinearGradient id='s' x2='1' gradientTransform='scale(-136.49806 136.49806) rotate(-63.886 .986 3.099)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23687e67'/%3E%3Cstop offset='.529' stop-color='%23687e67'/%3E%3Cstop offset='1' stop-color='%2383a178'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg clip-path='url(%23a)' transform='matrix(1.33333 0 0 -1.33333 0 800)'%3E%3Cpath fill='%23689f63' d='M296.953 165.056c-1.46 0-2.912.38-4.19 1.12l-13.338 7.893c-1.99 1.114-1.019 1.509-.362 1.738 2.657.922 3.195 1.135 6.031 2.743.295.167.687.103.992-.076l10.247-6.083c.371-.206.895-.206 1.237 0l39.95 23.058c.372.212.61.64.61 1.08v46.105c0 .45-.238.872-.62 1.1l-39.933 23.039a1.25 1.25 0 0 1-1.23 0l-39.924-23.045a1.285 1.285 0 0 1-.634-1.094V196.53c0-.441.246-.86.63-1.068l10.944-6.323c5.938-2.97 9.574.528 9.574 4.04v45.52c0 .644.517 1.15 1.161 1.15h5.065c.634 0 1.158-.506 1.158-1.15v-45.52c0-7.924-4.316-12.47-11.829-12.47-2.309 0-4.127 0-9.202 2.502l-10.476 6.03a8.437 8.437 0 0 0-4.19 7.289v46.104c0 2.995 1.602 5.792 4.19 7.28L292.764 273c2.527 1.429 5.887 1.429 8.395 0l39.947-23.085a8.434 8.434 0 0 0 4.196-7.281V196.53a8.457 8.457 0 0 0-4.196-7.288l-39.947-23.065a8.375 8.375 0 0 0-4.206-1.121'/%3E%3Cpath fill='%23689f63' d='M309.293 196.818c-17.482 0-21.144 8.024-21.144 14.755 0 .64.514 1.151 1.154 1.151h5.165c.577 0 1.058-.415 1.148-.978.78-5.258 3.105-7.912 13.677-7.912 8.416 0 12 1.904 12 6.37 0 2.573-1.017 4.484-14.096 5.765-10.93 1.081-17.692 3.496-17.692 12.24 0 8.061 6.794 12.868 18.186 12.868 12.798 0 19.131-4.442 19.933-13.972a1.17 1.17 0 0 0-.305-.889 1.178 1.178 0 0 0-.846-.369h-5.185a1.15 1.15 0 0 0-1.12.903c-1.245 5.533-4.27 7.301-12.477 7.301-9.189 0-10.257-3.2-10.257-5.6 0-2.906 1.26-3.75 13.667-5.393 12.277-1.623 18.11-3.92 18.11-12.55 0-8.704-7.259-13.69-19.918-13.69m48.646 48.882h1.343c1.098 0 1.304.773 1.304 1.22 0 1.184-.816 1.184-1.264 1.184h-1.383zm-1.632 3.789h2.975c1.019 0 3.016 0 3.016-2.283 0-1.59-1.02-1.914-1.632-2.118 1.184-.081 1.264-.856 1.426-1.955.083-.692.206-1.875.448-2.281h-1.831c-.043.406-.33 2.607-.33 2.728-.118.49-.284.733-.894.733h-1.506v-3.461h-1.672zm-3.563-4.298c0-3.586 2.893-6.48 6.436-6.48 3.586 0 6.478 2.955 6.478 6.48 0 3.584-2.932 6.436-6.478 6.436-3.503 0-6.436-2.81-6.436-6.436m14.155-.022c0-4.236-3.464-7.7-7.7-7.7-4.196 0-7.7 3.423-7.7 7.7 0 4.359 3.587 7.7 7.7 7.7 4.157 0 7.7-3.341 7.7-7.7'/%3E%3Cpath fill='%23333' fill-rule='evenodd' d='M173.243 345.433a5.108 5.108 0 0 1-2.558 4.445l-42.355 24.375a4.977 4.977 0 0 1-2.331.674h-.438a5.052 5.052 0 0 1-2.34-.674l-42.354-24.375a5.132 5.132 0 0 1-2.561-4.445l.093-65.635c0-.913.474-1.762 1.277-2.21a2.461 2.461 0 0 1 2.54 0l25.173 14.414c1.592.945 2.56 2.614 2.56 4.439v30.664c0 1.828.969 3.52 2.555 4.429l10.718 6.173a5.092 5.092 0 0 0 2.564.687c.873 0 1.768-.226 2.544-.687l10.715-6.173a5.1 5.1 0 0 0 2.558-4.43v-30.663c0-1.825.982-3.504 2.564-4.44l25.165-14.413a2.49 2.49 0 0 1 2.557 0 2.556 2.556 0 0 1 1.27 2.21zm199.867-34.176c0-.456-.245-.88-.64-1.106l-14.549-8.386a1.282 1.282 0 0 0-1.277 0l-14.548 8.386c-.397.227-.64.65-.64 1.106v16.799c0 .456.243.879.64 1.108l14.546 8.402a1.28 1.28 0 0 0 1.281 0l14.547-8.402c.395-.23.64-.652.64-1.108zm3.93 124.403a2.56 2.56 0 0 1-3.805-2.235v-65a1.79 1.79 0 0 0-2.685-1.551l-10.609 6.112a5.115 5.115 0 0 1-5.112-.001l-42.37-24.453a5.115 5.115 0 0 1-2.56-4.431v-48.916c0-1.828.975-3.516 2.557-4.432l42.37-24.471a5.12 5.12 0 0 1 5.118 0l42.377 24.47a5.122 5.122 0 0 1 2.558 4.433V417.12a5.118 5.118 0 0 1-2.624 4.468zm141.091-107.165a5.116 5.116 0 0 1 2.546 4.424v11.854c0 1.823-.97 3.51-2.548 4.425l-42.099 24.443a5.117 5.117 0 0 1-5.127.007l-42.356-24.453a5.115 5.115 0 0 1-2.558-4.43v-48.903c0-1.84.987-3.537 2.584-4.446l42.093-23.985a5.112 5.112 0 0 1 5.017-.028l25.46 14.151a2.557 2.557 0 0 1 .032 4.455l-42.625 24.465a2.559 2.559 0 0 0-1.286 2.219v15.326c0 .914.488 1.76 1.281 2.216l13.266 7.648a2.555 2.555 0 0 0 2.554 0l13.272-7.648a2.556 2.556 0 0 0 1.28-2.216v-12.058a2.56 2.56 0 0 1 3.844-2.213z'/%3E%3Cpath fill='%23689f63' fill-rule='evenodd' d='M472.842 330.786a.98.98 0 0 0 .982 0l8.13-4.69a.983.983 0 0 0 .491-.851v-9.388a.982.982 0 0 0-.49-.851l-8.13-4.691a.98.98 0 0 0-.983 0l-8.124 4.69a.982.982 0 0 0-.49.852v9.388c0 .35.186.675.49.85z'/%3E%3C/g%3E%3Cg clip-path='url(%23b)' transform='matrix(1.33333 0 0 -1.33333 0 800)'%3E%3Cpath fill='url(%23c)' d='M239.032 373.393l-42.134-24.315a5.085 5.085 0 0 1-2.545-4.407v-48.666c0-1.818.969-3.497 2.544-4.408l42.133-24.334a5.093 5.093 0 0 1 5.091 0l42.124 24.334a5.093 5.093 0 0 1 2.543 4.408v48.668a5.084 5.084 0 0 1-2.545 4.405l-42.123 24.315a5.088 5.088 0 0 1-5.088 0'/%3E%3C/g%3E%3Cg clip-path='url(%23d)' transform='matrix(1.33333 0 0 -1.33333 0 800)'%3E%3Cpath fill='url(%23e)' d='M195.4 292.914a5.09 5.09 0 0 1 1.497-1.317l36.143-20.874 6.017-3.46a5.127 5.127 0 0 1 2.936-.665c.337.028.673.09 1.001.185l44.43 81.357a5.06 5.06 0 0 1-1.181.938l-27.588 15.925-14.579 8.39c-.417.24-.864.413-1.323.526z'/%3E%3C/g%3E%3Cg clip-path='url(%23f)' transform='matrix(1.33333 0 0 -1.33333 0 800)'%3E%3Cg clip-path='url(%23g)'%3E%3Cpath fill='url(%23h)' d='M237.627 382.331l-.58-.331h.774z'/%3E%3C/g%3E%3C/g%3E%3Cg clip-path='url(%23i)' transform='matrix(1.33333 0 0 -1.33333 0 800)'%3E%3Cpath fill='url(%23j)' d='M241.065 374.048a5.072 5.072 0 0 1-2.033-.655l-42.014-24.245 45.293-82.513a5.081 5.081 0 0 1 1.81.628l42.124 24.334a5.096 5.096 0 0 1 2.458 3.477l-46.178 78.89a5.295 5.295 0 0 1-1.035.102c-.142 0-.284-.006-.425-.018'/%3E%3C/g%3E%3Cg clip-path='url(%23k)' transform='matrix(1.33333 0 0 -1.33333 0 800)'%3E%3Cg clip-path='url(%23l)'%3E%3Cpath fill='url(%23m)' d='M290.279 292.38l-.279.477v-.639z'/%3E%3C/g%3E%3C/g%3E%3Cg clip-path='url(%23n)' transform='matrix(1.33333 0 0 -1.33333 0 800)'%3E%3Cg clip-path='url(%23o)'%3E%3Cpath fill='url(%23p)' d='M286.351 291.597l-42.177-24.333a5.084 5.084 0 0 0-1.861-.633l.84-1.53L290 292.218v.639l-1.158 1.979c-.347-1.348-1.263-2.528-2.491-3.239'/%3E%3C/g%3E%3C/g%3E%3Cg clip-path='url(%23q)' transform='matrix(1.33333 0 0 -1.33333 0 800)'%3E%3Cg clip-path='url(%23r)'%3E%3Cpath fill='url(%23s)' d='M286.351 291.597l-42.177-24.333a5.084 5.084 0 0 0-1.861-.633l.84-1.53L290 292.218v.639l-1.158 1.979c-.347-1.348-1.263-2.528-2.491-3.239'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
		description: "A JavaScript runtime built on Chrome's V8 JavaScript engine, using an event-driven, non-blocking I/O model for lightweight efficiency.",
		metadata: {
			pipelinePlatform: "node"
		},
		versions: [
			{
				id: "v10-community",
				name: "10.x (Community)"
			},
			{
				id: "v10-redhat",
				name: "10.x (RHOAR)"
			},
			{
				id: "v8-community",
				name: "8.x (Community)"
			},
			{
				id: "v8-redhat",
				name: "8.x (RHOAR)"
			}
		]
	},
	{
		id: "spring-boot",
		name: "Spring Boot",
		description: "Create stand-alone, production-grade Spring based Applications that you can \"just run\".",
		metadata: {
			pipelinePlatform: "maven"
		},
		versions: [
			{
				id: "current-community",
				name: "1.5.17.RELEASE (Community)"
			},
			{
				id: "current-redhat",
				name: "1.5.17.RELEASE (RHOAR)"
			}
		]
	},
	{
		id: "thorntail",
		name: "Thorntail",
		icon: "data:image/svg+xml;charset=utf8,%3Csvg%20id%3D%22Layer_1%22%20data-name%3D%22Layer%201%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill%3A%23656565%3B%7D.cls-2%7Bfill%3A%233f9c35%3B%7D.cls-3%7Bfill%3A%230088ce%3B%7D.cls-4%7Bfill%3A%2392d400%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%3Ctitle%3Ethorntail_icon_rgb_512px%3C%2Ftitle%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M444.32%2C406.46a59.28%2C59.28%2C0%2C0%2C0-6.67%2C4.37c-2.32%2C1.7-4.52%2C3.57-6.8%2C5.33-1.08.84-2.22%2C1.59-3.33%2C2.38.07.21.14.42.22.63%2C2.9%2C1.22%2C5.81%2C2.4%2C8.7%2C3.66%2C3.7%2C1.63%2C7.36%2C3.4%2C11.08%2C5%2C3%2C1.27%2C6.2%2C2.14%2C9.2%2C3.51a48.31%2C48.31%2C0%2C0%2C0%2C22%2C4.61c1.77-.07%2C2.45-1.45%2C2.87-2.74.2-.61-.68-2.08-1.4-2.66a76.52%2C76.52%2C0%2C0%2C0-9.33-6.92%2C64%2C64%2C0%2C0%2C1-11.81-9%2C37.32%2C37.32%2C0%2C0%2C0-11.83-7.76C446.32%2C406.47%2C445%2C406.08%2C444.32%2C406.46Z%22%2F%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M373.53%2C423c-1.39-1-2.89-1.75-4.21-2.8-2-1.58-3.82-3.38-5.81-5-1.75-1.38-3.62-2.57-5.73-4a45.31%2C45.31%2C0%2C0%2C0-9.23%2C8.39c-.74.92-1.37%2C1.94-2.14%2C2.82-1.16%2C1.34-1.17%2C1.9.5%2C2.85%2C4.47%2C2.55%2C9%2C5%2C13.5%2C7.5%2C5.38%2C3%2C10.86%2C5.7%2C16.13%2C8.89a18.59%2C18.59%2C0%2C0%2C0%2C10.4%2C3%2C32.32%2C32.32%2C0%2C0%2C1%2C7.49.18%2C4.31%2C4.31%2C0%2C0%2C0%2C4.74-1.51l-2.62-2.78c-.6-.64-1.2-1.28-1.77-2a14.16%2C14.16%2C0%2C0%2C0-1.77-2.17c-1.39-1.07-2.93-1.9-4.37-2.9C383.6%2C430.07%2C378.57%2C426.53%2C373.53%2C423Z%22%2F%3E%3Cpath%20d%3D%22M347.45%2C122.88a46.74%2C46.74%2C0%2C0%2C0%2C3%2C4.72c1.09%2C1.45%2C2.58%2C2.58%2C3.63%2C4%2C2.41%2C3.36%2C6%2C3.35%2C9.16%2C4.57.5.19%2C1.5-.74%2C1.94-1.4a2.18%2C2.18%2C0%2C0%2C0-.58-1.84%2C23.63%2C23.63%2C0%2C0%2C0-3.69-2.25c-4-2.05-6.42-5.72-8.56-9.48a54.9%2C54.9%2C0%2C0%2C1-4.09-9.78c-.71-2.14-1.55-4.44-.66-7%2C1.89%2C3.33%2C3.63%2C6.36%2C5.32%2C9.41%2C3.37%2C6%2C8.92%2C9.57%2C13.94%2C13.68a4.8%2C4.8%2C0%2C0%2C0%2C3.24%2C1.16%2C3.85%2C3.85%2C0%2C0%2C0%2C2.42-2.12c.26-.55-.33-2-.92-2.6-2.27-2.37-4.88-4.39-7-6.87a96.58%2C96.58%2C0%2C0%2C1-6.52-9%2C63.32%2C63.32%2C0%2C0%2C1-4.48-7.51A21.54%2C21.54%2C0%2C0%2C1%2C351%2C89.38a16.54%2C16.54%2C0%2C0%2C0-.3-4.19%2C13.4%2C13.4%2C0%2C0%2C0-1-2.58c-.78.53-1.57%2C1-2.34%2C1.59a.9.9%2C0%2C0%2C0-.26.47c-1.3%2C4.11-2.42%2C8.28-1.79%2C12.86.49%2C3.58.54%2C3.58-1.63%2C6.11%2C0-1.37%2C1.19-2.68-.31-4.12-.24.3-.49.49-.57.75A21%2C21%2C0%2C0%2C0%2C345%2C118.44C345.87%2C119.88%2C346.59%2C121.42%2C347.45%2C122.88Z%22%2F%3E%3Cpath%20d%3D%22M360.19%2C87.75c.24%2C1.55.12%2C3.16.51%2C4.67.65%2C2.56.88%2C5.34%2C3.1%2C7.33a2%2C2%2C0%2C0%2C1%2C.54%2C1.42c-.14%2C1.73.89%2C2.9%2C1.84%2C4.13a17.5%2C17.5%2C0%2C0%2C1%2C2.44%2C3.27c2%2C4.49%2C5.3%2C7.82%2C8.89%2C10.84a39.56%2C39.56%2C0%2C0%2C0%2C5.75%2C3.9c1.77%2C1%2C3.1.44%2C3.91-1.4.74-1.65-.36-2.94-1.47-3.82a38.83%2C38.83%2C0%2C0%2C1-8.56-9.6c-1.8-2.83-3.21-5.92-4.81-8.89a23.57%2C23.57%2C0%2C0%2C1-1.73-3c-1.57-4.37-2.94-8.81-4.55-13.17-1-2.82-2.37-5.53-3.7-8.58a13.33%2C13.33%2C0%2C0%2C0-1.7%2C1.24c-1.54%2C1.63-1.77%2C3.83-1.54%2C6.08C359.3%2C84%2C359.89%2C85.87%2C360.19%2C87.75Z%22%2F%3E%3Cpath%20d%3D%22M359.17%2C230.84a7.61%2C7.61%2C0%2C0%2C0-.33%2C2.85c-.18%2C2.68-.32%2C5.37-.48%2C8.05l.28%2C0%2C.06.58c.41%2C3.79.42%2C3.79%2C3.91%2C4.83.28.08.52.4.79.45a3.17%2C3.17%2C0%2C0%2C0%2C1.63.09c2.75-1.12%2C3-4%2C3.13-6.59.13-3.4-1.3-6.65-3.07-9.66C363.68%2C229.06%2C360.34%2C228.68%2C359.17%2C230.84Z%22%2F%3E%3Cpath%20d%3D%22M437.84%2C227.32a2.69%2C2.69%2C0%2C0%2C1%2C.53%2C1.41c.23%2C1.76%2C1.34%2C2.67%2C2.73%2C1.92%2C3-1.62%2C3.93-2.49%2C3.52-6.27-.07-.7-.13-1.4-.2-2.1%2C0-2.53-.41-4.72-3.25-5.78-1.7-.63-2.42-.62-2.34%2C1.17.09%2C2.26-.93%2C3.9-1.71%2C5.69A3.22%2C3.22%2C0%2C0%2C0%2C437.84%2C227.32Z%22%2F%3E%3Cpath%20class%3D%22cls-2%22%20d%3D%22M305.16%2C349.53c1.28-1.92%2C2.63-3.78%2C3.81-5.77a24.55%2C24.55%2C0%2C0%2C0%2C1.81-4.08c.78-2.09%2C1.37-4.27%2C2.19-6.34%2C1-2.43%2C2.48-4.73%2C0-7.49-.15-.18-.16-.5-.29-.72-2.32-4-4.78-8-8.38-10.87-2.77-2.23-5.66-4.31-8.6-6.24a35.56%2C35.56%2C0%2C0%2C1-10.9-11.23c-1.31-2.11-2.91-4-4.38-6.05l-.46.08c0%2C.66%2C0%2C1.31.1%2C2a24.25%2C24.25%2C0%2C0%2C1%2C.47%2C3.33c-.05%2C1.52-.44%2C3-.53%2C4.52-.13%2C2.19-.1%2C4.4-.16%2C6.61-.05%2C2-.28%2C4-.14%2C5.95.26%2C3.6.84%2C7.2%2C1.1%2C10.81.39%2C5.6.63%2C11.2.9%2C16.79.13%2C2.85%2C0%2C5.7.29%2C8.54.54%2C4.67%2C1.36%2C9.33%2C2.12%2C14%2C.26%2C1.57.72%2C3.12%2C1.05%2C4.69.91%2C4.28%2C1.79%2C8.56%2C2.77%2C13.25.23-.57.31-.73.36-.9a62.67%2C62.67%2C0%2C0%2C1%2C12.39-24.22A72%2C72%2C0%2C0%2C0%2C305.16%2C349.53Z%22%2F%3E%3Cpath%20class%3D%22cls-2%22%20d%3D%22M474.64%2C305.11c-.19%2C4.23-.35%2C8.19-.55%2C12.14-.15%2C2.8-.43%2C5.58-.51%2C8.39s-1.32%2C5.46-.87%2C8.45c.09.57-.32%2C1.17-.4%2C1.78a12.33%2C12.33%2C0%2C0%2C0%2C0%2C1.72l.95.26c.6-1.45%2C1.13-2.93%2C1.8-4.33a52.78%2C52.78%2C0%2C0%2C0%2C2.71-5.36c.9-2.64%2C1.46-5.44%2C2.11-8.19a12.29%2C12.29%2C0%2C0%2C0-1.22-8.05c-.74-1.61-1.68-3.13-2.57-4.66C475.68%2C306.57%2C475.2%2C305.94%2C474.64%2C305.11Z%22%2F%3E%3Cpath%20class%3D%22cls-3%22%20d%3D%22M281.52%2C378q-1.72-7.81-3.33-15.66c-.7-3.4-1.43-6.81-1.93-10.22-.34-2.41-.33-4.83-.44-7.25-.24-5.38-.38-10.75-.73-16.14-.23-3.61-.72-7.24-1.12-10.86a20.94%2C20.94%2C0%2C0%2C1-.49-4.15c.65-5.75-.54-11.52-1-17.29-.38-4.53-.59-9.07-1-13.6a7.64%2C7.64%2C0%2C0%2C0-1.11-3.51c-3.54-5.09-7.21-10.1-10.88-15.11-2.37-3.24-4.87-6.39-7.22-9.64-1.32-1.82-2.38-3.85-3.72-5.65-3.48-4.72-6.94-9.47-10.63-14s-6.35-9.56-10.49-13.55c-.81-.78-1.37-1.84-2.14-2.69-1.52-1.66-3.15-3.21-4.63-4.92-1.13-1.3-2-2.83-3.15-4.13-2-2.25-4.14-4.33-6.09-6.6-3.32-3.89-6.5-7.91-9.82-11.8-2.46-2.89-5.12-5.58-7.56-8.48-2.18-2.58-4.08-5.43-6.3-8-3.42-3.95-7.2-7.58-10.46-11.66-2.86-3.57-5.47-7.3-9-10.28-2.67-2.29-5.25-4.71-7.82-7.14-3.41-3.21-5.7-7.55-9.64-10.29-2-1.41-3.71-3.46-5.54-5.22.51%2C3.47%2C3.89%2C4.11%2C5.3%2C6.94S155.29%2C141%2C157%2C144s4.61%2C5.17%2C6.58%2C8c4.34%2C6.27%2C8.71%2C12.56%2C12.53%2C19.15%2C4.19%2C7.23%2C7.76%2C14.81%2C11.61%2C22.24%2C2.17%2C4.18%2C4.2%2C8.34%2C7.63%2C11.83a185.5%2C185.5%2C0%2C0%2C1%2C12.76%2C14.88%2C18.82%2C18.82%2C0%2C0%2C1%2C4%2C9.63c-1.4-.06-2.62-.12-3.84-.16-4-.13-6.57-2.79-8.86-6.09a56.85%2C56.85%2C0%2C0%2C0-5.13-6.58c-3.11-3.27-6.64-6.12-9.62-9.5a186.6%2C186.6%2C0%2C0%2C0-13.56-14.56c-6.58-6.05-12.79-12.57-19.87-18A89.47%2C89.47%2C0%2C0%2C1%2C138.86%2C164a65.66%2C65.66%2C0%2C0%2C0-6.54-6.49c-3.3-2.75-6.86-5.11-9.53-8.67a17.65%2C17.65%2C0%2C0%2C0-3-2.91%2C100.15%2C100.15%2C0%2C0%2C1-8.32-6.93c-2.73-2.75-6.13-4.74-9.21-7.1-4.17-3.2-8.27-6.54-12.52-9.61-4.06-2.94-8.17-5.86-12.46-8.36-6.78-4-14-6.36-21.45-8.51%2C2%2C1.68%2C3.92%2C3.4%2C5.93%2C5%2C1.44%2C1.16%2C3%2C2.11%2C4.45%2C3.26%2C2.22%2C1.77%2C4.37%2C3.65%2C6.58%2C5.44.74.59%2C1.63%2C1%2C2.38%2C1.54%2C2.54%2C1.93%2C5.07%2C3.87%2C7.55%2C5.89%2C1%2C.82%2C1.77%2C2%2C2.78%2C2.75s2.45%2C1.24%2C3.47%2C2.14c4.43%2C3.9%2C8.81%2C7.88%2C13.16%2C11.88%2C3.92%2C3.63%2C7.9%2C7.21%2C11.66%2C11%2C3.27%2C3.32%2C7.07%2C6%2C9.84%2C10%2C2.06%2C2.94%2C4.76%2C5.41%2C7.07%2C8.18%2C1.29%2C1.56%2C2.29%2C3.36%2C3.54%2C5%2C1.6%2C2%2C3.4%2C3.91%2C5%2C6%2C4.74%2C6.22%2C9.48%2C12.45%2C14.08%2C18.78%2C2.85%2C3.93%2C5.42%2C8.07%2C8.18%2C12.08a77.13%2C77.13%2C0%2C0%2C0%2C5.06%2C6.82c1.2%2C1.39%2C3%2C2.24%2C4.2%2C3.61a26.64%2C26.64%2C0%2C0%2C1%2C3.44%2C4.88%2C1.68%2C1.68%2C0%2C0%2C1-1.65%2C2.55%2C61.45%2C61.45%2C0%2C0%2C1-7.86-2.53c-1.92-.78-3.67-2.09-5.55-3.05-6.88-3.52-13.77-7-20.68-10.47-3.65-1.82-7.33-3.57-11.06-5.13s-7.32-2.52-10.88-4.07c-5.59-2.43-11.11-5.08-16.62-7.73-3.15-1.51-6.21-3.24-9.34-4.8-4.58-2.29-9.15-4.66-13.8-6.75-6.76-3-13.55-6.06-20.42-8.72C50.91%2C176.81%2C45.64%2C174.15%2C40%2C173A24.94%2C24.94%2C0%2C0%2C1%2C36.9%2C172l-.1.45c2%2C.78%2C4.11%2C1.44%2C6.09%2C2.38%2C3.59%2C1.71%2C7.13%2C3.57%2C10.67%2C5.41%2C4.16%2C2.17%2C8.28%2C4.41%2C12.43%2C6.59%2C2%2C1.06%2C4.08%2C2%2C6%2C3.12q6.45%2C3.83%2C12.78%2C7.87c6.13%2C3.89%2C12.14%2C8%2C18.36%2C11.73%2C4%2C2.37%2C7.52%2C5.39%2C11.46%2C7.76%2C2.58%2C1.55%2C5%2C3.35%2C7.52%2C5.11%2C4.08%2C2.9%2C8.18%2C5.77%2C12.18%2C8.81%2C5.74%2C4.36%2C11.47%2C8.75%2C17.08%2C13.32%2C4.36%2C3.55%2C8.54%2C7.37%2C12.76%2C11.11q8.29%2C7.36%2C16.53%2C14.8c1.28%2C1.15%2C2.41%2C2.5%2C3.75%2C3.55s2.84%2C1.71%2C4.16%2C2.72c5.75%2C4.45%2C11.57%2C8.82%2C17.17%2C13.49a154%2C154%2C0%2C0%2C1%2C14.64%2C13.22%2C208.52%2C208.52%2C0%2C0%2C1%2C13.71%2C17.1c4%2C5.33%2C7.52%2C11%2C11.52%2C16.35%2C3.41%2C4.54%2C7.27%2C8.72%2C10.79%2C13.18%2C3%2C3.88%2C6%2C7.82%2C8.77%2C11.93%2C3.6%2C5.41%2C6.84%2C11.08%2C10.41%2C16.53%2C2.27%2C3.47%2C4.83%2C6.73%2C7.27%2C10.08.9%2C1.24%2C1.82%2C2.47%2C2.73%2C3.7-.46-1.71-1.35-3.19-1.81-4.77C282.91%2C384.35%2C282.21%2C381.15%2C281.52%2C378Z%22%2F%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M495.3%2C259.58c-3.76-.66-7.64-.9-11.23-2.26-4-1.5-7.94-1.74-11.9-2.47-3.32-.62-6.67-.84-10-1.46s-6.79-1.6-10.19-2.32a33.23%2C33.23%2C0%2C0%2C0-5-.74c-4.39-.25-8.79-.56-13.14-.48-2.23%2C0-3%2C1.62-2.76%2C4%2C.2%2C1.78.49%2C3.55.74%2C5.32l-.26.15c.7%2C1.48%2C1.51%2C2.92%2C2.08%2C4.44.86%2C2.33%2C2.5%2C1.55%2C3.95%2C1.65.18%2C0%2C.36.11.54.11%2C3.65.13%2C7.31.38%2C10.95.36%2C5.15%2C0%2C10.27-.31%2C15.42-.37%2C4.23-.06%2C8.46.54%2C12.67-.49s9-1%2C13.54-1.46a29.4%2C29.4%2C0%2C0%2C0%2C4.92-.51c1.12-.32%2C2.93-1.38%2C2.84-2C498.2%2C259.57%2C496.54%2C259.8%2C495.3%2C259.58Z%22%2F%3E%3Cpath%20d%3D%22M503.54%2C256.9a15.8%2C15.8%2C0%2C0%2C0-3.7-1.11c-3.67-.87-7.35-1.69-11-2.53l-6.62-1.54a23.12%2C23.12%2C0%2C0%2C1%2C.47-4.06%2C20%2C20%2C0%2C0%2C0%2C1.16-7.68c-.2-2.81.84-5.57%2C1.06-8.47.5-6.57%2C1.12-13.09.07-19.8-.31-2-.56-4-1-6a37.83%2C37.83%2C0%2C0%2C0-4.07-11c-1.74-2.86-3.56-5.67-5.41-8.46-.85-1.29-1.9-2.45-2.81-3.71-2.73-3.79-5.19-7.83-8.21-11.34-4.32-5-9.11-9.58-13.56-14.48-3.29-3.62-6.32-7.5-9.56-11.18-1.61-1.82-3.4-3.49-5.18-5.14-1-.92-2.28-1.5-3.15-2.51-2.54-3-3.84-7.15-7.74-8.85-.24-.1-.4-.5-.56-.78-2.5-4.42-6.18-7.86-9.74-11.12a42.46%2C42.46%2C0%2C0%2C1-6.28-7.92c-2.24-3.31-4.3-6.76-6.32-10.21a58.49%2C58.49%2C0%2C0%2C1-3.73-7.2c-1.16-2.88-1.93-5.89-2.87-8.84-.61-1.9-1.34-3.78-1.77-5.7-1-4.58-1.89-9.18-2.9-13.76-.12-.57-.84-1.54-1.11-1.5a2.43%2C2.43%2C0%2C0%2C0-1.66%2C1.1%2C9.82%2C9.82%2C0%2C0%2C0-.66%2C2.56l-.24-.07c0-.72%2C0-1.44%2C0-2.16l-.59-.16a29.76%2C29.76%2C0%2C0%2C0-1.28%2C4.49c-.54%2C4-.85%2C8.11-1.31%2C12.15-.08.7-.67%2C1.32-.64%2C2%2C.08%2C1.75.36%2C3.52.58%2C5.28.07.56.48%2C1.37.27%2C1.63-1.05%2C1.28-.82%2C3-.61%2C4.37a105.93%2C105.93%2C0%2C0%2C0%2C2.48%2C11A3.2%2C3.2%2C0%2C0%2C0%2C386.8%2C106a2.22%2C2.22%2C0%2C0%2C1%2C1.6%2C2.09%2C11.84%2C11.84%2C0%2C0%2C0%2C.77%2C2.68c1.15%2C3%2C2.3%2C5.9%2C3.56%2C8.8a12.66%2C12.66%2C0%2C0%2C0%2C1.83%2C2.67%2C9.15%2C9.15%2C0%2C0%2C0%2C1.71%2C1.64c1.05.79.57%2C2.06%2C1%2C2.73a26.88%2C26.88%2C0%2C0%2C0%2C3.83%2C4.54c.2.23.73.33.75.5.27%2C2%2C2.11%2C3%2C3.16%2C3.72%2C4.3%2C2.88%2C7.69%2C6.78%2C11.41%2C10.31a9.1%2C9.1%2C0%2C0%2C0%2C3.49%2C2.16c2%2C.6%2C2.28.86%2C1.15%2C2.56%2C1.38%2C1%2C2.8%2C2%2C4.13%2C3.08%2C3.05%2C2.48%2C6.66%2C4.19%2C9%2C7.66a2.57%2C2.57%2C0%2C0%2C0%2C1.22.88%2C14.29%2C14.29%2C0%2C0%2C1%2C6.88%2C5.51%2C15.68%2C15.68%2C0%2C0%2C0%2C3.11%2C3.14c2.27%2C1.78%2C4.66%2C3.39%2C7%2C5.14a9%2C9%2C0%2C0%2C1%2C1.18%2C1.5%2C11.77%2C11.77%2C0%2C0%2C0%2C2%2C2.27c3.36%2C2.2%2C5.94%2C5.26%2C8.42%2C8.42%2C1%2C1.26%2C1.65%2C2.8%2C2.57%2C4.13%2C2.4%2C3.48%2C4.89%2C6.89%2C7.3%2C10.37a16.28%2C16.28%2C0%2C0%2C1%2C2.41%2C4c1.3%2C4.06%2C2.49%2C8.16%2C3.41%2C12.29a36.25%2C36.25%2C0%2C0%2C1%2C.54%2C7c.1%2C3.87.08%2C7.72.13%2C11.59a27.06%2C27.06%2C0%2C0%2C1-2.2%2C11.94%2C1.61%2C1.61%2C0%2C0%2C1-1.27.88c-3.16-.29-6.33-.63-9.5-1.11-2.79-.43-5.57-1.17-8.36-1.6s-5.84-.65-8.76-1c-1.25-.15-2.51-.4-3.75-.64-5-.91-9.94-2.49-14.49.71-3.43%2C2.42-6.67%2C5-6.91%2C9.69-.19%2C3.73.8%2C7.65%2C1.29%2C11.48a1.72%2C1.72%2C0%2C0%2C0%2C.49%2C1c2.48%2C1.91%2C4.8%2C4.19%2C8.1%2C4.05%2C5.28-.23%2C10.58-.34%2C15.87-.46%2C5.54-.12%2C11.07-.2%2C16.61-.29%2C1.77%2C0%2C3.55%2C0%2C5.48-.06a6%2C6%2C0%2C0%2C1%2C.28%2C1.77c-1%2C7.2-2%2C14.43-3.21%2C21.58-.73%2C4.27-2%2C8.4-2.8%2C12.65-.47%2C2.42-.55%2C5-.89%2C7.42-.57%2C4.21-1.2%2C8.4-1.84%2C12.59-.15%2C1-.58%2C2-.63%2C3.06-.27%2C4.79-.41%2C9.6-.67%2C14.39-.22%2C3.95-.35%2C7.92-.87%2C11.8-.44%2C3.32-1.41%2C6.51-2%2C9.79-.57%2C2.9-1%2C5.84-1.47%2C8.78-.27%2C1.77-.3%2C3.62-.63%2C5.37-.45%2C2.36-1.25%2C4.62-1.59%2C7-.73%2C5.12-1.24%2C10.3-1.92%2C15.44a5.61%2C5.61%2C0%2C0%2C1-1%2C1.84c-3.4-2.21-6.13-5.63-10.19-3.55-1.77.9-4%2C1.08-5.55%2C2.19-3.08%2C2.16-5.61%2C5.09-9.11%2C6.74-1.13.53-1.86%2C1.89-2.8%2C2.85-.57.58-1.09%2C1.44-1.8%2C1.62-4.25%2C1.09-8.53%2C2.11-12.85%2C3-2.9.57-5.87.87-8.83%2C1.2-2.28.25-4.58.44-6.9.49-3.2.08-6.41.06-9.63%2C0-2-.06-4.12-.32-6.18-.51-.89-.08-1.77-.2-2.66-.35a4.81%2C4.81%2C0%2C0%2C1-1.92-.47c-1.77-1.22-3.43-2.64-5.17-3.89-2.38-1.7-4.82-3.29-7.19-5a2.33%2C2.33%2C0%2C0%2C1-.79-1.36c-.28-1.88-.89-2.16-2.51-1.4-4.57%2C2.14-8.08%2C5.75-11.94%2C8.88-1.17%2C1-1.86%2C2.81-4%2C2.45-.38-.07-1.31%2C1.13-1.18%2C1.52.56%2C1.73-.64%2C2.43-1.14%2C3.6-.74%2C1.71-1.94%2C1.87-3.47%2C1.64-.66-.1-1.31-.3-2-.37l-13.59-1.39a6.84%2C6.84%2C0%2C0%2C0-1.6-.16c-4.11.53-7.71-1.88-11.43-3.37a37.78%2C37.78%2C0%2C0%2C1-6.77-4c-1.81-1.22-4-2-4.87-4.45-1.31-3.8-2.53-7.63-3.75-11.45a2.4%2C2.4%2C0%2C0%2C1%2C0-1.13c.56-3.29.92-6.67%2C1.77-9.85%2C1.37-5.08%2C2.72-10.12%2C5.43-14.64%2C3.08-5.13%2C6.07-10.23%2C10.05-14.62%2C2.32-2.54%2C4.22-5.52%2C6.33-8.28a5.17%2C5.17%2C0%2C0%2C1%2C1.26-1.21c2.83-1.86%2C3.61-5.25%2C4.71-8.26.69-1.89.34-4.29.53-6.44.36-4.15.39-8.31-1.18-12.42a13.42%2C13.42%2C0%2C0%2C0-1.7-2.76%2C21.23%2C21.23%2C0%2C0%2C0-1.39-1.62%2C86.06%2C86.06%2C0%2C0%2C0-5.75-6.69c-2.59-2.48-5.49-4.59-8.23-6.89q-4.38-3.69-8.72-7.43c-1-.86-2-1.73-2.91-2.64-1.92-1.86-3.95-3.63-5.7-5.66-2.44-2.82-5.59-5.15-6.54-9.12-.07-.27-.34-.72-.51-.74-2.09-.22-1.7-1.89-1.82-3.17-.18-1.84-.12-3.68-.35-5.51s-.77-3.74-1.06-5.61c-.13-.88.33-2%2C0-2.62-1.78-3.07-.18-6.17-1.26-9.45-1.25-3.82-.87-8.11-1.08-12.2-.14-2.68-.1-5.37%2C0-8%2C0-1.24.45-2.44.45-3.68%2C0-2.13-.47-4.32-.3-6.4a58.06%2C58.06%2C0%2C0%2C1%2C1.35-7c.84-4%2C1.59-8.06%2C2.59-12%2C.58-2.28%2C1.64-4.37%2C2.39-6.59a60.91%2C60.91%2C0%2C0%2C1%2C3-7.24c2.26-4.63%2C5.7-8.13%2C8.67-12.08a8.35%2C8.35%2C0%2C0%2C1%2C2.05-1.61c1.54-1.06%2C3.07-2.13%2C4.64-3.12a20.58%2C20.58%2C0%2C0%2C1%2C3.6-1.95c2.15-.79%2C4.33-1.4%2C5.79-3.4%2C2.72-3.72%2C6.83-5.61%2C10.44-8.1%2C3.06-2.11%2C6.5-3.61%2C9.68-5.54%2C2.78-1.69%2C5.39-3.64%2C8.14-5.39%2C1.67-1.05%2C3.44-1.94%2C5.18-2.88%2C2.19-1.19%2C4.39-2.36%2C6.27-3.37a8.24%2C8.24%2C0%2C0%2C1%2C1.43-1.69%2C27.5%2C27.5%2C0%2C0%2C1%2C3-1.39l5.07-2.27-.17-.47-3.86-1.36c.18-.6-.34-1.28-1.35-1.26-.53%2C0-1%2C.24-1.57.23-3.65-.06-7.26%2C0-10.26%2C2.28-.19.15-.54.1-.83.09a8.54%2C8.54%2C0%2C0%2C0-2.65-.11c-3.57%2C1.09-7.12%2C2.26-10.62%2C3.54-4.07%2C1.48-8.27%2C2.75-12.06%2C4.77a151.29%2C151.29%2C0%2C0%2C0-13.25%2C8.45c-3.23%2C2.18-6.34%2C4.54-9.48%2C6.86-1.95%2C1.43-3.85%2C2.93-5.78%2C4.39-3.35%2C2.52-5.6%2C6.07-7.47%2C9.86-.8%2C1.62-.66%2C3.84-2.64%2C4.66-.14.07-.15.43-.24.65a13.77%2C13.77%2C0%2C0%2C1-.92%2C2.15c-.68%2C1.08-1.55%2C2-2.21%2C3.11a16.41%2C16.41%2C0%2C0%2C0-1%2C2.47%2C15.47%2C15.47%2C0%2C0%2C0-1.09%2C2.39c-.44%2C1.3-.47%2C2.95-1.26%2C3.9-2%2C2.36-1.2%2C5.47-1.71%2C8.21-.38%2C2-.05%2C4.17-.26%2C6.22-.29%2C2.89-1.14%2C5.6-.46%2C8.75.51%2C2.31-.05%2C4.76.16%2C7.15.41%2C4.42%2C1.09%2C8.84%2C1.55%2C13.26.22%2C2.12.21%2C4.25.28%2C6.37a38.29%2C38.29%2C0%2C0%2C1%2C.07%2C4.41c-.29%2C3.48-1.07%2C6.82-.16%2C10.52.67%2C2.75.63%2C5.64.9%2C8.47l-.45.14c-1.86-2.86-3.77-5.7-5.57-8.6-2.06-3.3-4-6.67-6-10s-4.22-6.81-6.28-10.25c-1.35-2.24-2.29-4.88-4-6.73-2.31-2.51-3.95-5.52-6.28-8-1.19-1.28-2.59-2.41-3.7-3.8-.56-.7-1.11-1.42-1.6-2.17-1.18-1.79-2.2-3.7-3.51-5.39-2.39-3.09-5-6.06-7.44-9.08-.45-.55-.89-1.13-1.39-1.63-1.56-1.58-3.25-3-4.7-4.71-1.21-1.39-2-3.17-3.24-4.52-2.12-2.31-4.49-4.37-6.66-6.63-1.2-1.24-2.24-2.66-3.34-4a21.45%2C21.45%2C0%2C0%2C0-3-3.6%2C4.7%2C4.7%2C0%2C0%2C1-2-2.36c-.23-.66-1.25-1.07-1.92-1.59a3.62%2C3.62%2C0%2C0%2C1-.72-.62c-1.44-2-2.77-4-4.3-5.92-1.92-2.35-4.14-4.45-6-6.86-1.63-2.12-3.05-4.37-5.46-5.62-.28-.14-.41-.63-.62-1-1.15-1.73-1.71-3.83-3.67-5.07a25%2C25%2C0%2C0%2C1-3.65-3.49c-.63.29-1.48.4-1.61-1.26a1.54%2C1.54%2C0%2C0%2C0-.54-.94c-1.67-1.36-3.46-2.58-5-4-2.23-2-4.19-4.42-6.5-6.33s-5.13-3.62-7.73-5.38c-1.43-1-2.89-1.92-4.36-2.81-1.25-.76-2.56-2-3.81-2a5.1%2C5.1%2C0%2C0%2C1-4.08-2.57%2C3.27%2C3.27%2C0%2C0%2C0-3.46-1.43%2C3.49%2C3.49%2C0%2C0%2C1-1.26-.22c-.86-.27-1.71-.6-2.57-.9l.74-.73c-.84-.31-1.71-.57-2.53-.93-1.36-.61-2.69-1.32-4.05-1.91-2.13-.92-4-2.83-6.52-2.17l-1.21.33a4.76%2C4.76%2C0%2C0%2C0%2C.67%2C1.29c.89.84%2C1.94%2C1.5%2C2.78%2C2.38%2C2.85%2C2.94%2C5.63%2C6%2C8.45%2C8.92%2C3%2C3.16%2C6.36%2C6%2C8.81%2C9.72.55.84.86%2C1.86%2C1.45%2C2.65%2C2.34%2C3.1%2C4.76%2C6.13%2C7.12%2C9.21q5.13%2C6.71%2C10.23%2C13.44c2.68%2C3.52%2C5.64%2C6.86%2C7.95%2C10.61%2C2.94%2C4.78%2C5.36%2C9.89%2C8%2C14.86a8.38%2C8.38%2C0%2C0%2C1%2C.43%2C1.19c-2.41-1.8-4.85-3.49-7.15-5.38q-7.8-6.37-15.49-12.93c-3.07-2.61-6.05-5.37-9.06-8.07-5.21-4.68-10.39-9.39-15.63-14-3.68-3.27-7.36-6.56-11.19-9.62-5-4-10.07-7.8-15.16-11.59-4.09-3-8.13-6.19-12.42-8.84a129.79%2C129.79%2C0%2C0%2C0-22-11.11c-3.19-1.22-6.35-2.54-9.57-3.63s-6.14-2.07-9.2-3.15c-2.76-1-5.73-1.14-8-3.65-.16-.18-.56-.14-.85-.18-1.75-.24-3.59-.16-5.24-.79-2.53-1-4.93-2.46-7.41-3.68-1.06-.52-2.18-.93-3.27-1.39l-.34.59a8.68%2C8.68%2C0%2C0%2C0%2C1.7%2C1.85c4.07%2C2.38%2C8.16%2C4.73%2C12.31%2C6.95%2C3.44%2C1.85%2C7.08%2C2.94%2C10.07%2C6.1%2C3.21%2C3.4%2C7.17%2C6%2C10.74%2C9%2C2.35%2C2%2C4.58%2C4.16%2C6.91%2C6.16%2C4%2C3.4%2C8%2C6.67%2C12%2C10.13%2C4.15%2C3.68%2C8.25%2C7.43%2C12.21%2C11.34%2C2.52%2C2.5%2C4.62%2C5.49%2C7.12%2C8%2C4%2C4%2C8.14%2C7.78%2C12.13%2C11.76%2C3.13%2C3.12%2C6.23%2C6.28%2C9.1%2C9.65%2C1.93%2C2.26%2C3.32%2C5%2C5.17%2C7.39%2C2.31%2C2.94%2C4.9%2C5.65%2C7.26%2C8.54%2C4.81%2C5.89%2C9.94%2C11.51%2C14%2C18.05%2C1.37%2C2.22%2C2.88%2C4.36%2C4.57%2C6.9l-8.84-3.7c-5.16-2.16-10.36-4.24-15.48-6.52-3.87-1.72-7.63-3.8-11.5-5.55-4.19-1.89-8.48-3.53-12.69-5.39-7.41-3.27-14.83-6.53-22.19-10-5.52-2.59-11.29-4.2-16.82-6.86-4.49-2.16-9.36-3.32-14.1-4.62-4.21-1.16-8.48-1.92-12.73-2.79a27.17%2C27.17%2C0%2C0%2C0-3.2-.29l.44-.36c-2.72%2C0-5.45.11-8.18.07a27.59%2C27.59%2C0%2C0%2C1-4.61-.39%2C36.08%2C36.08%2C0%2C0%2C1-4-1.25c-3.1-1-6.19-2.19-9.41-2a18.41%2C18.41%2C0%2C0%2C0-2.55.58%2C52.23%2C52.23%2C0%2C0%2C0%2C4.76%2C3.47c4.47%2C2.53%2C9%2C5%2C13.51%2C7.33%2C6.62%2C3.37%2C13.32%2C6.5%2C19.94%2C9.87%2C7%2C3.58%2C14%2C7.3%2C21%2C11%2C3.17%2C1.67%2C6.41%2C3.22%2C9.47%2C5.14%2C5.38%2C3.37%2C10.67%2C6.94%2C16%2C10.49q5.92%2C4%2C11.76%2C8.1c3.94%2C2.78%2C7.8%2C5.69%2C11.73%2C8.48%2C3.31%2C2.34%2C6.73%2C4.51%2C10%2C6.9%2C2.74%2C2%2C5.36%2C4.17%2C8%2C6.31%2C4.41%2C3.58%2C8.86%2C7.11%2C13.19%2C10.81%2C6.06%2C5.19%2C12%2C10.5%2C18%2C15.78%2C5.35%2C4.72%2C10.66%2C9.5%2C16%2C14.17%2C2.61%2C2.26%2C5.34%2C4.36%2C8.07%2C6.45%2C3.88%2C3%2C7.81%2C5.85%2C11.7%2C8.8a57.21%2C57.21%2C0%2C0%2C1%2C5.63%2C4.53c2.73%2C2.68%2C5.27%2C5.56%2C7.86%2C8.39a96.12%2C96.12%2C0%2C0%2C1%2C6.43%2C7.26c2.4%2C3.23%2C4.39%2C6.78%2C6.69%2C10.1%2C2.92%2C4.21%2C5.91%2C8.38%2C9%2C12.47%2C1.89%2C2.52%2C3.92%2C4.94%2C6%2C7.29%2C3.44%2C3.88%2C7.13%2C7.53%2C10.4%2C11.55%2C3%2C3.69%2C5.62%2C7.75%2C8.42%2C11.64a29.59%2C29.59%2C0%2C0%2C1%2C2.66%2C3.63%2C60.86%2C60.86%2C0%2C0%2C0%2C8.32%2C12.28c2.33%2C2.69%2C4.56%2C5.47%2C6.81%2C8.23%2C1.34%2C1.65%2C2.57%2C3.41%2C4%2C5%2C3.93%2C4.34%2C8%2C8.53%2C11.87%2C12.95%2C2.24%2C2.57%2C4.18%2C5.43%2C6.18%2C8.22%2C3.3%2C4.6%2C8.06%2C6.89%2C12.59%2C9.38s9.74%2C3.26%2C14.77%2C3.78a27.69%2C27.69%2C0%2C0%2C0%2C2.84.31c3.65%2C0%2C7.28-.19%2C10.93%2C0%2C2.88.17%2C4.67-1.57%2C7-3%2C.22.12.74.33%2C1.21.63%2C4.07%2C2.6%2C7.86%2C5.67%2C12.25%2C7.68%2C5.38%2C2.47%2C10.59%2C5.45%2C16%2C7.93%2C3.71%2C1.72%2C7%2C4.48%2C11.35%2C4.7%2C4%2C.2%2C7.69%2C0%2C11.23-1.56%2C3.21-1.39%2C5.29-5.43%2C3.64-8.72-1.75-3.47-3.55-7.22-7.36-9.14a39.87%2C39.87%2C0%2C0%2C1-4.62-3.21l.21-.64c2.67%2C0%2C5.34-.09%2C8-.07a38.28%2C38.28%2C0%2C0%2C0%2C4.12.21%2C49.35%2C49.35%2C0%2C0%2C0%2C6.77-1.16c2.82-.7%2C5.54-1.76%2C8.37-2.44s5.48-2.21%2C8.65-.89c5.17%2C2.15%2C10.36%2C4.29%2C15.52%2C6.49%2C4.64%2C2%2C9.23%2C4.15%2C13.89%2C6%2C3.62%2C1.45%2C7.3%2C2.69%2C11%2C3.77a27.73%2C27.73%2C0%2C0%2C0%2C12.61.67c1.52-.26%2C2.83-1.47%2C4.17-2.35a15.78%2C15.78%2C0%2C0%2C0%2C2.38-2%2C1.66%2C1.66%2C0%2C0%2C0%2C.55-1.23c-.27-1.3-.39-2.84-1.14-3.82a32.66%2C32.66%2C0%2C0%2C0-7.56-7.37c-6.11-4.18-12.87-7.35-18.15-13.1%2C2-1.16%2C2-1.31%2C2.31-3.83a7.11%2C7.11%2C0%2C0%2C1%2C.2-.89c.75-3.08%2C1.6-6.13%2C2.23-9.26s.89-6.37%2C1.58-9.48c1.16-5.29%2C2.64-10.47%2C3.78-15.77a88.3%2C88.3%2C0%2C0%2C0%2C1.38-9.38c.42-4%2C.63-8.07%2C1-12.08.09-.93.31-2.36.87-2.57%2C2.25-.83%2C3.19-2.9%2C4.66-4.52%2C2.3-2.53%2C4.62-4.84%2C5.48-8.49.51-2.2%2C1.71-4.15%2C2.24-6.35.64-2.65.71-5.52%2C1.36-8.17.84-3.47-.9-6.48-2.07-9.54-.59-1.54-2.14-2.72-3.07-4.18-1.41-2.22-2.66-4.53-4-6.82a1.69%2C1.69%2C0%2C0%2C1-.23-.87c.15-2.31.34-4.62.52-6.93.43-5.93%2C2-11.66%2C1.15-17.8-.17-1.22.45-1.47%2C1.39-1.62%2C4-.66%2C8-1.24%2C12-2.12%2C2.79-.61%2C5.45-1.65%2C8.18-2.47.45-.14.95-.07%2C1.41-.18a37.82%2C37.82%2C0%2C0%2C0%2C5.08-1.3c1.76-.68%2C2.54-3.91%2C1.25-5.22A14.53%2C14.53%2C0%2C0%2C0%2C503.54%2C256.9ZM282.88%2C388.57c-2.44-3.35-5-6.61-7.27-10.08C272%2C373%2C268.8%2C367.37%2C265.2%2C362c-2.73-4.11-5.73-8-8.77-11.93-3.52-4.46-7.38-8.64-10.79-13.18-4-5.32-7.52-11-11.52-16.35a208.52%2C208.52%2C0%2C0%2C0-13.71-17.1%2C154%2C154%2C0%2C0%2C0-14.64-13.22c-5.6-4.67-11.42-9-17.17-13.49-1.32-1-2.86-1.69-4.16-2.72s-2.47-2.4-3.75-3.55q-8.25-7.43-16.53-14.8c-4.22-3.74-8.4-7.56-12.76-11.11-5.61-4.57-11.34-9-17.08-13.32-4-3-8.1-5.91-12.18-8.81-2.48-1.76-4.94-3.56-7.52-5.11-3.94-2.37-7.5-5.39-11.46-7.76-6.22-3.71-12.23-7.84-18.36-11.73q-6.33-4-12.78-7.87c-2-1.16-4-2.06-6-3.12-4.15-2.18-8.27-4.42-12.43-6.59-3.54-1.84-7.08-3.7-10.67-5.41-2-.94-4.06-1.6-6.09-2.38l.1-.45A24.94%2C24.94%2C0%2C0%2C0%2C40%2C173c5.63%2C1.11%2C10.9%2C3.77%2C16.29%2C5.85%2C6.87%2C2.66%2C13.66%2C5.68%2C20.42%2C8.72%2C4.65%2C2.09%2C9.22%2C4.46%2C13.8%2C6.75%2C3.13%2C1.56%2C6.19%2C3.29%2C9.34%2C4.8%2C5.51%2C2.65%2C11%2C5.3%2C16.62%2C7.73%2C3.56%2C1.55%2C7.29%2C2.58%2C10.88%2C4.07s7.41%2C3.31%2C11.06%2C5.13c6.91%2C3.43%2C13.8%2C6.95%2C20.68%2C10.47%2C1.88%2C1%2C3.63%2C2.27%2C5.55%2C3.05a61.45%2C61.45%2C0%2C0%2C0%2C7.86%2C2.53%2C1.68%2C1.68%2C0%2C0%2C0%2C1.65-2.55%2C26.64%2C26.64%2C0%2C0%2C0-3.44-4.88c-1.24-1.37-3-2.22-4.2-3.61a77.13%2C77.13%2C0%2C0%2C1-5.06-6.82c-2.76-4-5.33-8.15-8.18-12.08-4.6-6.33-9.34-12.56-14.08-18.78-1.57-2.06-3.37-3.93-5-6-1.25-1.6-2.25-3.4-3.54-5-2.31-2.77-5-5.24-7.07-8.18-2.77-4-6.57-6.64-9.84-10-3.76-3.81-7.74-7.39-11.66-11-4.35-4-8.73-8-13.16-11.88-1-.9-2.39-1.31-3.47-2.14s-1.79-1.93-2.78-2.75c-2.48-2-5-4-7.55-5.89-.75-.58-1.64-1-2.38-1.54-2.21-1.79-4.36-3.67-6.58-5.44-1.44-1.15-3-2.1-4.45-3.26-2-1.62-4-3.34-5.93-5%2C7.4%2C2.15%2C14.67%2C4.56%2C21.45%2C8.51%2C4.29%2C2.5%2C8.4%2C5.42%2C12.46%2C8.36%2C4.25%2C3.07%2C8.35%2C6.41%2C12.52%2C9.61%2C3.08%2C2.36%2C6.48%2C4.35%2C9.21%2C7.1a100.15%2C100.15%2C0%2C0%2C0%2C8.32%2C6.93%2C17.65%2C17.65%2C0%2C0%2C1%2C3%2C2.91c2.67%2C3.56%2C6.23%2C5.92%2C9.53%2C8.67a65.66%2C65.66%2C0%2C0%2C1%2C6.54%2C6.49%2C89.47%2C89.47%2C0%2C0%2C0%2C12.43%2C10.88c7.08%2C5.42%2C13.29%2C11.94%2C19.87%2C18a186.6%2C186.6%2C0%2C0%2C1%2C13.56%2C14.56c3%2C3.38%2C6.51%2C6.23%2C9.62%2C9.5a56.85%2C56.85%2C0%2C0%2C1%2C5.13%2C6.58c2.29%2C3.3%2C4.85%2C6%2C8.86%2C6.09%2C1.22%2C0%2C2.44.1%2C3.84.16a18.82%2C18.82%2C0%2C0%2C0-4-9.63%2C185.5%2C185.5%2C0%2C0%2C0-12.76-14.88c-3.43-3.49-5.46-7.65-7.63-11.83-3.85-7.43-7.42-15-11.61-22.24-3.82-6.59-8.19-12.88-12.53-19.15-2-2.84-4.88-5.06-6.58-8s-5-4.18-6.42-6.94-4.79-3.47-5.3-6.94c1.83%2C1.76%2C3.51%2C3.81%2C5.54%2C5.22%2C3.94%2C2.74%2C6.23%2C7.08%2C9.64%2C10.29%2C2.57%2C2.43%2C5.15%2C4.85%2C7.82%2C7.14%2C3.48%2C3%2C6.09%2C6.71%2C9%2C10.28%2C3.26%2C4.08%2C7%2C7.71%2C10.46%2C11.66%2C2.22%2C2.56%2C4.12%2C5.41%2C6.3%2C8%2C2.44%2C2.9%2C5.1%2C5.59%2C7.56%2C8.48%2C3.32%2C3.89%2C6.5%2C7.91%2C9.82%2C11.8%2C2%2C2.27%2C4.11%2C4.35%2C6.09%2C6.6%2C1.14%2C1.3%2C2%2C2.83%2C3.15%2C4.13%2C1.48%2C1.71%2C3.11%2C3.26%2C4.63%2C4.92.77.85%2C1.33%2C1.91%2C2.14%2C2.69%2C4.14%2C4%2C6.88%2C9.12%2C10.49%2C13.55s7.15%2C9.28%2C10.63%2C14c1.34%2C1.8%2C2.4%2C3.83%2C3.72%2C5.65%2C2.35%2C3.25%2C4.85%2C6.4%2C7.22%2C9.64%2C3.67%2C5%2C7.34%2C10%2C10.88%2C15.11a7.64%2C7.64%2C0%2C0%2C1%2C1.11%2C3.51c.42%2C4.53.63%2C9.07%2C1%2C13.6.49%2C5.77%2C1.68%2C11.54%2C1%2C17.29a20.94%2C20.94%2C0%2C0%2C0%2C.49%2C4.15c.4%2C3.62.89%2C7.25%2C1.12%2C10.86.35%2C5.39.49%2C10.76.73%2C16.14.11%2C2.42.1%2C4.84.44%2C7.25.5%2C3.41%2C1.23%2C6.82%2C1.93%2C10.22q1.62%2C7.84%2C3.33%2C15.66c.69%2C3.19%2C1.39%2C6.39%2C2.28%2C9.54.46%2C1.58%2C1.35%2C3.06%2C1.81%2C4.77C284.7%2C391%2C283.78%2C389.81%2C282.88%2C388.57Zm5.44-8.21c-.05.17-.13.33-.36.9-1-4.69-1.86-9-2.77-13.25-.33-1.57-.79-3.12-1.05-4.69-.76-4.65-1.58-9.31-2.12-14-.33-2.84-.16-5.69-.29-8.54-.27-5.59-.51-11.19-.9-16.79-.26-3.61-.84-7.21-1.1-10.81-.14-2%2C.09-4%2C.14-5.95.06-2.21%2C0-4.42.16-6.61.09-1.52.48-3%2C.53-4.52a24.25%2C24.25%2C0%2C0%2C0-.47-3.33c-.08-.66-.07-1.31-.1-2l.46-.08c1.47%2C2%2C3.07%2C3.94%2C4.38%2C6.05A35.56%2C35.56%2C0%2C0%2C0%2C295.73%2C308c2.94%2C1.93%2C5.83%2C4%2C8.6%2C6.24%2C3.6%2C2.91%2C6.06%2C6.85%2C8.38%2C10.87.13.22.14.54.29.72%2C2.45%2C2.76.93%2C5.06%2C0%2C7.49-.82%2C2.07-1.41%2C4.25-2.19%2C6.34a24.55%2C24.55%2C0%2C0%2C1-1.81%2C4.08c-1.18%2C2-2.53%2C3.85-3.81%2C5.77a72%2C72%2C0%2C0%2C1-4.45%2C6.61A62.67%2C62.67%2C0%2C0%2C0%2C288.32%2C380.36ZM393%2C436.48a14.16%2C14.16%2C0%2C0%2C1%2C1.77%2C2.17c.57.67%2C1.17%2C1.31%2C1.77%2C2l2.62%2C2.78a4.31%2C4.31%2C0%2C0%2C1-4.74%2C1.51%2C32.32%2C32.32%2C0%2C0%2C0-7.49-.18%2C18.59%2C18.59%2C0%2C0%2C1-10.4-3c-5.27-3.19-10.75-5.94-16.13-8.89-4.51-2.48-9-4.95-13.5-7.5-1.67-.95-1.66-1.51-.5-2.85.77-.88%2C1.4-1.9%2C2.14-2.82a45.31%2C45.31%2C0%2C0%2C1%2C9.23-8.39c2.11%2C1.48%2C4%2C2.67%2C5.73%2C4%2C2%2C1.57%2C3.82%2C3.37%2C5.81%2C5%2C1.32%2C1%2C2.82%2C1.83%2C4.21%2C2.8%2C5%2C3.51%2C10.07%2C7.05%2C15.11%2C10.56C390.08%2C434.58%2C391.62%2C435.41%2C393%2C436.48Zm66.08-21.88a64%2C64%2C0%2C0%2C0%2C11.81%2C9%2C76.52%2C76.52%2C0%2C0%2C1%2C9.33%2C6.92c.72.58%2C1.6%2C2.05%2C1.4%2C2.66-.42%2C1.29-1.1%2C2.67-2.87%2C2.74a48.31%2C48.31%2C0%2C0%2C1-22-4.61c-3-1.37-6.16-2.24-9.2-3.51-3.72-1.56-7.38-3.33-11.08-5-2.89-1.26-5.8-2.44-8.7-3.66-.08-.21-.15-.42-.22-.63%2C1.11-.79%2C2.25-1.54%2C3.33-2.38%2C2.28-1.76%2C4.48-3.63%2C6.8-5.33a59.28%2C59.28%2C0%2C0%2C1%2C6.67-4.37c.71-.38%2C2%2C0%2C2.94.38A37.32%2C37.32%2C0%2C0%2C1%2C459.09%2C414.6Zm19.55-102.68a12.29%2C12.29%2C0%2C0%2C1%2C1.22%2C8.05c-.65%2C2.75-1.21%2C5.55-2.11%2C8.19a52.78%2C52.78%2C0%2C0%2C1-2.71%2C5.36c-.67%2C1.4-1.2%2C2.88-1.8%2C4.33l-.95-.26a12.33%2C12.33%2C0%2C0%2C1%2C0-1.72c.08-.61.49-1.21.4-1.78-.45-3%2C.79-5.59.87-8.45s.36-5.59.51-8.39c.2-3.95.36-7.91.55-12.14.56.83%2C1%2C1.46%2C1.43%2C2.15C477%2C308.79%2C477.9%2C310.31%2C478.64%2C311.92Zm17-48.83a29.4%2C29.4%2C0%2C0%2C1-4.92.51c-4.53.44-9.2.4-13.54%2C1.46s-8.44.43-12.67.49c-5.15.06-10.27.34-15.42.37-3.64%2C0-7.3-.23-10.95-.36-.18%2C0-.36-.1-.54-.11-1.45-.1-3.09.68-3.95-1.65-.57-1.52-1.38-3-2.08-4.44l.26-.15c-.25-1.77-.54-3.54-.74-5.32-.28-2.42.53-4%2C2.76-4%2C4.35-.08%2C8.75.23%2C13.14.48a33.23%2C33.23%2C0%2C0%2C1%2C5%2C.74c3.4.72%2C6.79%2C1.68%2C10.19%2C2.32s6.67.84%2C10%2C1.46c4%2C.73%2C7.93%2C1%2C11.9%2C2.47%2C3.59%2C1.36%2C7.47%2C1.6%2C11.23%2C2.26%2C1.24.22%2C2.9%2C0%2C3.16%2C1.55C498.55%2C261.71%2C496.74%2C262.77%2C495.62%2C263.09Z%22%2F%3E%3Cpath%20class%3D%22cls-4%22%20d%3D%22M353.73%2C134c1%2C0%2C1.53.66%2C1.35%2C1.26l3.86%2C1.36.17.47L354%2C139.35a27.5%2C27.5%2C0%2C0%2C0-3%2C1.39%2C8.24%2C8.24%2C0%2C0%2C0-1.43%2C1.69c-1.88%2C1-4.08%2C2.18-6.27%2C3.37-1.74.94-3.51%2C1.83-5.18%2C2.88-2.75%2C1.75-5.36%2C3.7-8.14%2C5.39-3.18%2C1.93-6.62%2C3.43-9.68%2C5.54-3.61%2C2.49-7.72%2C4.38-10.44%2C8.1-1.46%2C2-3.64%2C2.61-5.79%2C3.4a20.58%2C20.58%2C0%2C0%2C0-3.6%2C1.95c-1.57%2C1-3.1%2C2.06-4.64%2C3.12a8.35%2C8.35%2C0%2C0%2C0-2.05%2C1.61c-3%2C4-6.41%2C7.45-8.67%2C12.08a60.91%2C60.91%2C0%2C0%2C0-3%2C7.24c-.75%2C2.22-1.81%2C4.31-2.39%2C6.59-1%2C4-1.75%2C8-2.59%2C12a58.06%2C58.06%2C0%2C0%2C0-1.35%2C7c-.17%2C2.08.28%2C4.27.3%2C6.4%2C0%2C1.24-.42%2C2.44-.45%2C3.68-.06%2C2.67-.1%2C5.36%2C0%2C8%2C.21%2C4.09-.17%2C8.38%2C1.08%2C12.2%2C1.08%2C3.28-.52%2C6.38%2C1.26%2C9.45.38.65-.08%2C1.74%2C0%2C2.62.29%2C1.87.82%2C3.73%2C1.06%2C5.61s.17%2C3.67.35%2C5.51c.12%2C1.28-.27%2C3%2C1.82%2C3.17.17%2C0%2C.44.47.51.74.95%2C4%2C4.1%2C6.3%2C6.54%2C9.12%2C1.75%2C2%2C3.78%2C3.8%2C5.7%2C5.66.95.91%2C1.92%2C1.78%2C2.91%2C2.64q4.35%2C3.73%2C8.72%2C7.43c2.74%2C2.3%2C5.64%2C4.41%2C8.23%2C6.89a86.06%2C86.06%2C0%2C0%2C1%2C5.75%2C6.69%2C21.23%2C21.23%2C0%2C0%2C1%2C1.39%2C1.62%2C13.42%2C13.42%2C0%2C0%2C1%2C1.7%2C2.76c1.57%2C4.11%2C1.54%2C8.27%2C1.18%2C12.42-.19%2C2.15.16%2C4.55-.53%2C6.44-1.1%2C3-1.88%2C6.4-4.71%2C8.26a5.17%2C5.17%2C0%2C0%2C0-1.26%2C1.21c-2.11%2C2.76-4%2C5.74-6.33%2C8.28-4%2C4.39-7%2C9.49-10.05%2C14.62-2.71%2C4.52-4.06%2C9.56-5.43%2C14.64-.85%2C3.18-1.21%2C6.56-1.77%2C9.85a2.4%2C2.4%2C0%2C0%2C0%2C0%2C1.13c1.22%2C3.82%2C2.44%2C7.65%2C3.75%2C11.45.83%2C2.41%2C3.06%2C3.23%2C4.87%2C4.45a37.78%2C37.78%2C0%2C0%2C0%2C6.77%2C4c3.72%2C1.49%2C7.32%2C3.9%2C11.43%2C3.37a6.84%2C6.84%2C0%2C0%2C1%2C1.6.16l13.59%2C1.39c.66.07%2C1.31.27%2C2%2C.37%2C1.53.23%2C2.73.07%2C3.47-1.64.5-1.17%2C1.7-1.87%2C1.14-3.6-.13-.39.8-1.59%2C1.18-1.52%2C2.1.36%2C2.79-1.49%2C4-2.45%2C3.86-3.13%2C7.37-6.74%2C11.94-8.88%2C1.62-.76%2C2.23-.48%2C2.51%2C1.4a2.33%2C2.33%2C0%2C0%2C0%2C.79%2C1.36c2.37%2C1.71%2C4.81%2C3.3%2C7.19%2C5%2C1.74%2C1.25%2C3.4%2C2.67%2C5.17%2C3.89a4.81%2C4.81%2C0%2C0%2C0%2C1.92.47c.89.15%2C1.77.27%2C2.66.35%2C2.06.19%2C4.13.45%2C6.18.51%2C3.22.1%2C6.43.12%2C9.63%2C0%2C2.32-.05%2C4.62-.24%2C6.9-.49%2C3-.33%2C5.93-.63%2C8.83-1.2%2C4.32-.85%2C8.6-1.87%2C12.85-3%2C.71-.18%2C1.23-1%2C1.8-1.62.94-1%2C1.67-2.32%2C2.8-2.85%2C3.5-1.65%2C6-4.58%2C9.11-6.74%2C1.59-1.11%2C3.78-1.29%2C5.55-2.19%2C4.06-2.08%2C6.79%2C1.34%2C10.19%2C3.55a5.61%2C5.61%2C0%2C0%2C0%2C1-1.84c.68-5.14%2C1.19-10.32%2C1.92-15.44.34-2.38%2C1.14-4.64%2C1.59-7%2C.33-1.75.36-3.6.63-5.37.44-2.94.9-5.88%2C1.47-8.78.64-3.28%2C1.61-6.47%2C2-9.79.52-3.88.65-7.85.87-11.8.26-4.79.4-9.6.67-14.39.05-1%2C.48-2%2C.63-3.06.64-4.19%2C1.27-8.38%2C1.84-12.59.34-2.46.42-5%2C.89-7.42.83-4.25%2C2.07-8.38%2C2.8-12.65%2C1.22-7.15%2C2.18-14.38%2C3.21-21.58a6%2C6%2C0%2C0%2C0-.28-1.77c-1.93%2C0-3.71%2C0-5.48.06-5.54.09-11.07.17-16.61.29-5.29.12-10.59.23-15.87.46-3.3.14-5.62-2.14-8.1-4.05a1.72%2C1.72%2C0%2C0%2C1-.49-1c-.49-3.83-1.48-7.75-1.29-11.48.24-4.64%2C3.48-7.27%2C6.91-9.69%2C4.55-3.2%2C9.51-1.62%2C14.49-.71%2C1.24.24%2C2.5.49%2C3.75.64%2C2.92.36%2C5.84.57%2C8.76%2C1s5.57%2C1.17%2C8.36%2C1.6c3.17.48%2C6.34.82%2C9.5%2C1.11a1.61%2C1.61%2C0%2C0%2C0%2C1.27-.88%2C27.06%2C27.06%2C0%2C0%2C0%2C2.2-11.94c-.05-3.87%2C0-7.72-.13-11.59a36.25%2C36.25%2C0%2C0%2C0-.54-7c-.92-4.13-2.11-8.23-3.41-12.29a16.28%2C16.28%2C0%2C0%2C0-2.41-4c-2.41-3.48-4.9-6.89-7.3-10.37-.92-1.33-1.58-2.87-2.57-4.13-2.48-3.16-5.06-6.22-8.42-8.42a11.77%2C11.77%2C0%2C0%2C1-2-2.27%2C9%2C9%2C0%2C0%2C0-1.18-1.5c-2.31-1.75-4.7-3.36-7-5.14a15.68%2C15.68%2C0%2C0%2C1-3.11-3.14%2C14.29%2C14.29%2C0%2C0%2C0-6.88-5.51%2C2.57%2C2.57%2C0%2C0%2C1-1.22-.88c-2.34-3.47-5.95-5.18-9-7.66-1.33-1.09-2.75-2.06-4.13-3.08%2C1.13-1.7.88-2-1.15-2.56a9.1%2C9.1%2C0%2C0%2C1-3.49-2.16c-3.72-3.53-7.11-7.43-11.41-10.31-1-.7-2.89-1.76-3.16-3.72%2C0-.17-.55-.27-.75-.5a26.88%2C26.88%2C0%2C0%2C1-3.83-4.54c-.38-.67.1-1.94-1-2.73a9.15%2C9.15%2C0%2C0%2C1-1.71-1.64%2C12.66%2C12.66%2C0%2C0%2C1-1.83-2.67c-1.26-2.9-2.41-5.85-3.56-8.8a11.84%2C11.84%2C0%2C0%2C1-.77-2.68%2C2.22%2C2.22%2C0%2C0%2C0-1.6-2.09%2C3.2%2C3.2%2C0%2C0%2C1-1.56-1.88%2C105.93%2C105.93%2C0%2C0%2C1-2.48-11c-.21-1.35-.44-3.09.61-4.37.21-.26-.2-1.07-.27-1.63-.22-1.76-.5-3.53-.58-5.28%2C0-.68.56-1.3.64-2%2C.24-2.11.44-4.23.65-6.35-8.69.1-15.24%2C1.73-20.2%2C4.1.89%2C2%2C1.74%2C3.83%2C2.44%2C5.75%2C1.61%2C4.36%2C3%2C8.8%2C4.55%2C13.17a23.57%2C23.57%2C0%2C0%2C0%2C1.73%2C3c1.6%2C3%2C3%2C6.06%2C4.81%2C8.89a38.83%2C38.83%2C0%2C0%2C0%2C8.56%2C9.6c1.11.88%2C2.21%2C2.17%2C1.47%2C3.82-.81%2C1.84-2.14%2C2.41-3.91%2C1.4a39.56%2C39.56%2C0%2C0%2C1-5.75-3.9c-3.59-3-6.87-6.35-8.89-10.84a17.5%2C17.5%2C0%2C0%2C0-2.44-3.27c-.95-1.23-2-2.4-1.84-4.13a2%2C2%2C0%2C0%2C0-.54-1.42c-2.22-2-2.45-4.77-3.1-7.33-.39-1.51-.27-3.12-.51-4.67-.3-1.88-.89-3.74-1.08-5.61a14%2C14%2C0%2C0%2C1-.06-1.82A25.94%2C25.94%2C0%2C0%2C0%2C351%2C89.48a21.7%2C21.7%2C0%2C0%2C0%2C2.55%2C11.18%2C63.32%2C63.32%2C0%2C0%2C0%2C4.48%2C7.51%2C96.58%2C96.58%2C0%2C0%2C0%2C6.52%2C9c2.13%2C2.48%2C4.74%2C4.5%2C7%2C6.87.59.61%2C1.18%2C2.05.92%2C2.6a3.85%2C3.85%2C0%2C0%2C1-2.42%2C2.12%2C4.8%2C4.8%2C0%2C0%2C1-3.24-1.16c-5-4.11-10.57-7.63-13.94-13.68-1.69-3.05-3.43-6.08-5.32-9.41-.89%2C2.56-.05%2C4.86.66%2C7a54.9%2C54.9%2C0%2C0%2C0%2C4.09%2C9.78c2.14%2C3.76%2C4.6%2C7.43%2C8.56%2C9.48a23.63%2C23.63%2C0%2C0%2C1%2C3.69%2C2.25%2C2.18%2C2.18%2C0%2C0%2C1%2C.58%2C1.84c-.44.66-1.44%2C1.59-1.94%2C1.4-2.92-1.14-6.24-1.21-8.63-3.9a21%2C21%2C0%2C0%2C1-1.32%2C1.74A2.42%2C2.42%2C0%2C0%2C1%2C353.73%2C134Zm83.39%2C89.37c.78-1.79%2C1.8-3.43%2C1.71-5.69-.08-1.79.64-1.8%2C2.34-1.17%2C2.84%2C1.06%2C3.23%2C3.25%2C3.25%2C5.78.07.7.13%2C1.4.2%2C2.1.41%2C3.78-.5%2C4.65-3.52%2C6.27-1.39.75-2.5-.16-2.73-1.92a2.69%2C2.69%2C0%2C0%2C0-.53-1.41A3.22%2C3.22%2C0%2C0%2C1%2C437.12%2C223.36Zm-72%2C8.12c1.77%2C3%2C3.2%2C6.26%2C3.07%2C9.66-.1%2C2.59-.38%2C5.47-3.13%2C6.59a3.17%2C3.17%2C0%2C0%2C1-1.63-.09c-.27%2C0-.51-.37-.79-.45-3.49-1-3.5-1-3.91-4.83l-.06-.58-.28%2C0c.16-2.68.3-5.37.48-8.05a7.61%2C7.61%2C0%2C0%2C1%2C.33-2.85C360.34%2C228.68%2C363.68%2C229.06%2C365.09%2C231.48Z%22%2F%3E%3C%2Fsvg%3E",
		description: "An innovative approach to packaging and running Java EE applications, packaging them with just enough of the server runtime to \"java -jar\" your application.",
		metadata: {
			pipelinePlatform: "maven"
		},
		versions: [
			{
				id: "redhat",
				name: "2.2.0.Final-redhat-00021 (RHOAR)"
			},
			{
				id: "community",
				name: "2.3.0.Final (Community)"
			}
		]
	}
];
var missions = [
	{
		id: "crud",
		name: "CRUD",
		description: "Expand on the REST API Level 0 to perform CRUD operations on a PostgreSQL database using a simple HTTP REST API",
		metadata: {
			level: "foundational"
		}
	},
	{
		id: "cache",
		name: "Cache",
		description: "Use a cache to improve the response time of applications",
		metadata: {
			level: "advanced"
		}
	},
	{
		id: "circuit-breaker",
		name: "Circuit Breaker",
		description: "Report the failure of a service and then limit access to the failed service until it becomes available to handle requests",
		metadata: {
			level: "foundational"
		}
	},
	{
		id: "configmap",
		name: "Externalized Configuration",
		description: "Use a ConfigMap to externalize configuration. ConfigMap is an object used by OpenShift to inject configuration data as simple key and value pairs into one or more Linux containers while keeping the containers independent of OpenShift",
		metadata: {
			level: "foundational"
		}
	},
	{
		id: "health-check",
		name: "Health Check",
		description: "Monitor an application's ability to service requests",
		metadata: {
			level: "foundational"
		}
	},
	{
		id: "istio-circuit-breaker",
		name: "Istio - Circuit Breaker",
		description: "The Istio Circuit Breaker mission demonstrates limiting access to a degraded service until it becomes available to handle requests. This helps prevent cascading failures in other services that depend on the failed services for functionality.",
		metadata: {
			level: "expert",
			istio: true
		}
	},
	{
		id: "istio-distributed-tracing",
		name: "Istio - Distributed Tracing",
		description: "The Istio Distributed Tracing mission demonstrates how simple distributed tracing can be integrated with an application running on an Istio-enabled cluster.",
		metadata: {
			level: "expert",
			istio: true
		}
	},
	{
		id: "istio-routing",
		name: "Istio - Routing",
		description: "The Istio Routing mission demonstrates how Istio can be used to route traffic to/from services, including load balancing traffic to different versions of the same service. This can be used to set up A/B tests, canary deployments, or simply do rolling deployments during a production release.",
		metadata: {
			level: "expert",
			istio: true
		}
	},
	{
		id: "istio-security",
		name: "Istio - Security",
		description: "Ths Istio Security mission demonstrates how Istio secures communication between microservices with Mutual TLS, and how services can be allowed or denied access to other services using ACL.",
		metadata: {
			level: "expert",
			istio: true
		}
	},
	{
		id: "messaging",
		name: "Messaging Work Queue",
		description: "This mission demonstrates how to dispatch tasks to a scalable set of worker services using a message queue. It uses the AMQP 1.0 message protocol to send and receive messages.",
		metadata: {
			level: "advanced"
		}
	},
	{
		id: "rest-http",
		name: "REST API Level 0",
		description: "Map business operations to a remote procedure call endpoint over HTTP using a REST framework",
		metadata: {
			level: "foundational"
		}
	},
	{
		id: "rest-http-secured",
		name: "Secured",
		description: "Expands on REST API Level 0 to secure the REST endpoint using Red Hat SSO which adds security to your applications while centralizing the security configuration",
		metadata: {
			level: "advanced"
		}
	}
];
var exampleCatalog = {
	boosters: boosters,
	runtimes: runtimes,
	missions: missions
};

var id = "registry.access.redhat.com/redhat-openjdk-18/openjdk18-openshift";
var name = "Java Code Builder";
var metadata = {
	language: "java",
	isBuilder: true
};
var analyzeResult = {
	id: id,
	name: name,
	metadata: metadata
};

var progressDef = {
    success: [
        {
            statusMessage: 'GITHUB_CREATE',
            data: {
                location: 'https://github.com/fabric8-launcher/launcher-backend'
            }
        },
        { statusMessage: 'GITHUB_PUSHED' },
        {
            statusMessage: 'OPENSHIFT_CREATE'
        },
        {
            statusMessage: 'OPENSHIFT_CREATE',
            data: {
                location: 'https://console.starter-us-east-2.openshift.com/console/projects'
            }
        },
        { statusMessage: 'OPENSHIFT_PIPELINE' },
        { statusMessage: 'GITHUB_WEBHOOK' },
    ],
};
var MockLauncherClient = /** @class */ (function () {
    function MockLauncherClient() {
    }
    MockLauncherClient.prototype.exampleCatalog = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, exampleCatalog];
            });
        });
    };
    MockLauncherClient.prototype.findExampleApps = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = filter;
                        _b = [query];
                        return [4 /*yield*/, this.exampleCatalog()];
                    case 1: return [2 /*return*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                }
            });
        });
    };
    MockLauncherClient.prototype.capabilities = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, capabilities];
            });
        });
    };
    MockLauncherClient.prototype.enum = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, enums[id]];
            });
        });
    };
    MockLauncherClient.prototype.enums = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, enums];
            });
        });
    };
    MockLauncherClient.prototype.importAnalyze = function (gitImportUrl) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, analyzeResult];
            });
        });
    };
    MockLauncherClient.prototype.download = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var output;
            return __generator(this, function (_a) {
                output = {
                    downloadLink: "http://mock/result.zip"
                };
                return [2 /*return*/, Promise.resolve(output)
                        .then(function (d) { return new Promise(function (resolve) { return setTimeout(function () { return resolve(d); }, 1000); }); })];
            });
        });
    };
    MockLauncherClient.prototype.launch = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var output;
            return __generator(this, function (_a) {
                console.info("calling launch with projectile: " + JSON.stringify(payload));
                output = {
                    id: "success",
                    events: [
                        { name: 'GITHUB_CREATE', message: 'Creating your new GitHub repository' },
                        { name: 'GITHUB_PUSHED', message: 'Pushing your customized Booster code into the repo' },
                        { name: 'OPENSHIFT_CREATE', message: 'Creating your project on OpenShift Online' },
                        { name: 'OPENSHIFT_PIPELINE', message: 'Setting up your build pipeline' },
                        { name: 'GITHUB_WEBHOOK', message: 'Configuring to trigger builds on Git pushes' }
                    ]
                };
                return [2 /*return*/, Promise.resolve(output)
                        .then(function (d) { return new Promise(function (resolve) { return setTimeout(function () { return resolve(d); }, 1000); }); })];
            });
        });
    };
    MockLauncherClient.prototype.follow = function (id, events, listener) {
        var progress = progressDef[id];
        if (!progress) {
            throw new Error("invalid id " + id);
        }
        var i = 0;
        var interval = setInterval(function (value) {
            if (i < progress.length) {
                listener.onMessage(progress[i++]);
            }
            else {
                clearInterval(interval);
                listener.onComplete();
            }
        }, 2500);
    };
    MockLauncherClient.prototype.gitRepositoryExists = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { exists: false }];
            });
        });
    };
    MockLauncherClient.prototype.gitInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, gitUser];
            });
        });
    };
    MockLauncherClient.prototype.ocClusters = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, clusters.map(function (c) { return (__assign({}, c.cluster, { connected: c.connected })); })];
            });
        });
    };
    MockLauncherClient.prototype.ocExistsProject = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { exists: false }];
            });
        });
    };
    return MockLauncherClient;
}());

function defaultLauncherClient(config) {
    var injector = injectionJs.ReflectiveInjector.resolveAndCreate([HttpService]);
    return new DefaultLauncherClient(injector.get(HttpService), config);
}
function mockLauncherClient() {
    return new MockLauncherClient();
}

/*
 * Public API
 */

exports.defaultLauncherClient = defaultLauncherClient;
exports.mockLauncherClient = mockLauncherClient;
exports.ExampleAppDescriptor = ExampleAppDescriptor;
exports.toRuntime = toRuntime;
exports.fillPropsValuesWithEnums = fillPropsValuesWithEnums;
exports.propsWithValuesMapper = propsWithValuesMapper;
exports.filterExample = filterExample;
exports.filterExampleMission = filterExampleMission;
exports.filterExampleRuntime = filterExampleRuntime;
exports.filter = filter;
exports.filterExamples = filterExamples;
exports.checkNotNull = checkNotNull;
