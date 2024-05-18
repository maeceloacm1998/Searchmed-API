/**
 * Enum for status code
 * @enum {string} StatusCode - Enum for status code of HTTP response
 * @property {string} Success - 200
 * @property {string} notFound - 404
 * @example StatusCode.Success or StatusCode.notFound
 */
export enum StatusCode {
  Success = "200",
  notFound = "404",
}
