"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RescueHistory = void 0;
const typeorm_1 = require("typeorm");
const clients_entity_1 = require("./clients.entity");
const pubs_entity_1 = require("./pubs.entity");
let RescueHistory = class RescueHistory {
};
exports.RescueHistory = RescueHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], RescueHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['disponivel', 'resgatado'], default: 'disponivel' }),
    __metadata("design:type", String)
], RescueHistory.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'date' }),
    __metadata("design:type", String)
], RescueHistory.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 80 }),
    __metadata("design:type", String)
], RescueHistory.prototype, "reward_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], RescueHistory.prototype, "code_rescue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], RescueHistory.prototype, "rescue_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => clients_entity_1.Client, { onDelete: "CASCADE" }),
    __metadata("design:type", clients_entity_1.Client)
], RescueHistory.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pubs_entity_1.Pub, { onDelete: "CASCADE" }),
    __metadata("design:type", pubs_entity_1.Pub)
], RescueHistory.prototype, "pub", void 0);
exports.RescueHistory = RescueHistory = __decorate([
    (0, typeorm_1.Entity)('rescue_history')
], RescueHistory);
