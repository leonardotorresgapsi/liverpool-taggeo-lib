/**
 * Copyright (c) 2020 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2020
 */

/**
 * @author: Oscar Longino [05/04/2020]
 * @updated:
 * @description: library for Access to LocalStorage
 * @since-version: 1.0
 */

const LocalStorage = require('local-storage');

module.exports = class AnalyticsStorage {
  /** put key and value into LocalStorage */
  // eslint-disable-next-line class-methods-use-this
  put(key, value) {
    return LocalStorage.set(key, value);
  }

  /** get value of key from LocalStorage */
  // eslint-disable-next-line class-methods-use-this
  get(key) {
    return LocalStorage.get(key);
  }
};
