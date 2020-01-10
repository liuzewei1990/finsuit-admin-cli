import http from '@common/finsuit-http/index.js'
import config from '../config/config.index.js'

/**
 * API统一管理规范
 * @param {Obj} params  私有域参数
 * @param {Obj} head    公共域参数
 * @returns Promise
 */

/* 用户管理 */
export const getUserManages = (params) => http.get(config.baseUrlHost, "/user/page", params);
export const postAddUser = (params) => http.post(config.baseUrlHost, "/user", params);
export const patchEditUser = (params) => http.patch(config.baseUrlHost, "/user", params);
export const getRolesTree = (params) => http.get(config.baseUrlHost, "/user/role/tree", params);
export const patchConfigRole = (params) => http.patch(config.baseUrlHost, "/user/role", params);
export const deleteUserManage = (username = "") => http.delete(config.baseUrlHost, "/user/delete/" + username);
