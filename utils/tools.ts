/** @format */

// 判断是否是数组1
export function isArray(str: unknown) {
    return Object.prototype.toString.call(str) === '[object Array]';
}