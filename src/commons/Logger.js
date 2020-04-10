/**
 * Copyright (c) 2020 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2020
 */

/**
 * @author: Leonardo Ivan Torres Ochoa [30/03/2020]
 * @updated: Oscar Longino [31/03/2020]
 * @description: library for Liverpool Analytics Tagging
 * @since-version: 1.0
 */

module.exports = class Logger {
  // eslint-disable-next-line class-methods-use-this
  constructor(debugMode, fileName) {
    this.debugMode = debugMode;
    this.fileName = fileName;
    console.log(`(LIV)Logger::constructor: ${this.debugMode}`, ` ${this.fileName}`);
  }

  /** Set de trace for operation */
  info(message, obj) {
    if (this.debugMode) {
      if (obj !== undefined) {
        console.log(`[ ${new Date()} ] - [ ${this.fileName} ] - [ INFO ] - ${message}`, obj);
      } else {
        console.log(`[ ${new Date()} ] - [ ${this.fileName} ] - [ INFO ] - ${message}`);
      }
    }
  }

  /** Set de trace for operation */
  error(message, obj) {
    if (this.debugMode) {
      if (obj !== undefined) {
        console.log(`[ ${new Date()} ] - [ ${this.fileName} ] - [ ERROR ] - ${message}`, obj);
      } else {
        console.log(`[ ${new Date()} ] - [ ${this.fileName} ] - [ ERROR ] - ${message}`);
      }
    }
  }

  /** Set de trace for operation */
  warn(message, obj) {
    if (this.debugMode) {
      if (obj !== undefined) {
        console.log(`[ ${new Date()} ] - [ ${this.fileName} ] - [ WARNING ] - ${message}`, obj);
      } else {
        console.log(`[ ${new Date()} ] - [ ${this.fileName} ] - [ WARNING ] - ${message}`);
      }
    }
  }

  /** Set de trace for operation */
  fatal(message, obj) {
    if (this.debugMode) {
      if (obj !== undefined) {
        console.log(`[ ${new Date()} ] - [ ${this.fileName} ] - [ FATAL ] - ${message}`, obj);
      } else {
        console.log(`[ ${new Date()} ] - [ ${this.fileName} ] - [ FATAL ] - ${message}`);
      }
    }
  }
};
