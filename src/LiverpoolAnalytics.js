/**
 * Copyright (c) 2020 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2020
 */

/**
 * @author: Leonardo Ivan Torres Ochoa [30/03/2020]
 * @updated: 03/04/2020
 * @description: library for Liverpool Analytics Tagging
 * @since-version: 1.0
 */
const ProviderAnalytics = require('./commons/ProviderAnalytics');
const ProviderGoogleGA = require('./drivers/GoogleGACustom');

module.exports = class LiverpoolAnalytics {
  constructor(appKeyId) {
    console.log('(LIV)LiverpoolAnalytics::constructor ', appKeyId);
    this.providers = new ProviderAnalytics(appKeyId);
  }

  publish(dataAnalytics, isEvent) {
    this.providers.publish(dataAnalytics, isEvent);
  }

  // eslint-disable-next-line class-methods-use-this
  setPageView(context) {
    ProviderGoogleGA.setPageView(context);
  }

  // eslint-disable-next-line class-methods-use-this
  healthCheck() {
    return new Date().toLocaleString();
  }
};
