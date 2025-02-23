"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCache = exports.setCache = exports.invalidateCache = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default({ stdTTL: 3600, checkperiod: 600 });
// Helper functions to manage the cache
const invalidateCache = (cacheKey) => {
    cache.del(cacheKey); // Invalidate cache
};
exports.invalidateCache = invalidateCache;
const setCache = (cacheKey, data) => {
    cache.set(cacheKey, data); // Set data to cache
};
exports.setCache = setCache;
const getCache = (cacheKey) => {
    return cache.get(cacheKey); // Retrieve data from cache
};
exports.getCache = getCache;
