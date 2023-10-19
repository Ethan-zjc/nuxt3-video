/** @format */

// 判断是否是数组
export function isArray(str: unknown) {
    return Object.prototype.toString.call(str) === '[object Array]';
}