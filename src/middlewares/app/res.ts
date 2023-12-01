import { Response } from "express";
import chalk from "chalk";

declare global {
  namespace Express {
    export interface Response {
      success: (
        message: string,
        data?: unknown,
        statusCode?: string
      ) => unknown;
      successfullyCreated: (
        message: string,
        data: unknown,
        statusCode?: string
      ) => unknown;
      validation: (
        message: string,
        data: unknown,
        statusCode?: string
      ) => unknown;
      badRequest: (
        message: string,
        data?: unknown,
        statusCode?: string
      ) => unknown;
      error: (message: string, data: unknown, statusCode?: string) => unknown;
      unauthorizedUser: (message: string) => unknown;
      pageNotFound: () => unknown;
    }
  }
}

export default (res: Response) => {
  const customRes = res;
  customRes.success = function (
    message: string,
    data?: unknown,
    statusCode?: string
  ) {
    console.log(chalk.greenBright(message));
    return this.status(200).send(
      ResponseClass({
        type: "success",
        message,
        data,
        statusCode: statusCode || "200",
      })
    );
  };

  customRes.successfullyCreated = function (
    message: string,
    data: unknown,
    statusCode?: string
  ) {
    console.log(chalk.greenBright(message));
    this.status(201).send(
      ResponseClass({
        type: "success",
        message,
        data,
        statusCode: statusCode || "201",
      })
    );
  };

  customRes.validation = function (
    message: string,
    data?: unknown,
    statusCode?: string
  ) {
    console.log(chalk.yellow(message));
    this.status(422).send(
      ResponseClass({
        type: "warning",
        message,
        data,
        statusCode: statusCode || "422",
      })
    );
  };

  customRes.badRequest = function (
    message: string,
    data?: unknown,
    statusCode?: string
  ) {
    console.log(chalk.yellow(message));
    this.status(400).send(
      ResponseClass({
        type: "warning",
        message,
        data,
        statusCode: statusCode || "400",
      })
    );
  };

  customRes.error = function (
    message: string,
    data?: unknown,
    statusCode?: string
  ) {
    console.log(chalk.red(message));
    if (data) {
      console.log(chalk.red(data));
    }
    message = typeof message != "string" ? "Something went wrong" : message;
    this.status(500).send(
      ResponseClass({
        type: "error",
        message,
        data,
        statusCode: statusCode || "500",
      })
    );
  };

  customRes.unauthorizedUser = function (message: string) {
    console.log(chalk.blueBright("Unauthorized User"));
    this.status(401).send(
      ResponseClass({
        type: "warning",
        message,
        statusCode: "401",
      })
    );
  };

  customRes.pageNotFound = function () {
    console.log(chalk.blueBright("Page Not Found"));
    return this.status(404).send(
      ResponseClass({
        type: "warning",
        message: "Page not found",
        statusCode: "404",
      })
    );
  };
};

/**
 *
 * @param {String} type
 * @param {String} message
 * @param {Object} data
 * @param {String} code
 * @returns {Object} Response Object {code: number, message: string, data: unknown}
 */
const ResponseClass = (resp: ResponseType) => {
  let defaultCode = resp.type == "success" ? 200 : 500;
  return {
    code: resp.statusCode || defaultCode,
    message: resp.message,
    data: resp?.data,
  };
};

interface ResponseType {
  type?: string;
  message: string;
  data?: unknown;
  statusCode?: string;
}
