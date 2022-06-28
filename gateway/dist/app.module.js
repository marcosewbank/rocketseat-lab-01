"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const gateway_1 = require("@apollo/gateway");
const apollo_1 = require("@nestjs/apollo");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloGatewayDriver,
                server: {
                    cors: true,
                    context: ({ req }) => {
                        return { headers: req.headers };
                    },
                },
                gateway: {
                    supergraphSdl: new gateway_1.IntrospectAndCompose({
                        subgraphs: [
                            { name: 'purchases', url: 'http://localhost:3333/graphql' },
                            { name: 'classroom', url: 'http://localhost:3334/graphql' },
                        ],
                    }),
                    buildService: ({ url }) => {
                        return new gateway_1.RemoteGraphQLDataSource({
                            url,
                            willSendRequest({ request, context }) {
                                var _a;
                                request.http.headers.set('authorization', (_a = context === null || context === void 0 ? void 0 : context['headers']) === null || _a === void 0 ? void 0 : _a['authorization']);
                            },
                        });
                    },
                },
            }),
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map