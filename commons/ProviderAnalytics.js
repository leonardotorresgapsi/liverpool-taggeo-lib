/**
 * Copyright (c) 2020 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2020
 */

/**
 * @author: Leonardo Ivan Torres Ochoa [30/03/2020]
 * @updated: Oscar Longino [04/04/2020]
 * @description: library for Liverpool Analytics Tagging
 * @since-version: 1.0
 */
const TAGGING_KEY = Symbol.for('Liverpool.Tagging.equivalences');
const Google = require('../drivers/Google');
const Adobe = require('../drivers/Adobe');
const Logger = require('./Logger');
const ConfigurationsAnalytics = require('./ConfigurationAnalytics');


// eslint-disable-next-line no-extend-native
String.prototype.interpolate = function (params) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  // eslint-disable-next-line no-new-func
  return new Function(...names, `return \`${this}\`;`)(...vals);
};

module.exports = class ProviderAnalytics {
  constructor(appKeyId) {
    this.appKeyId = appKeyId;
    this.configurations = new ConfigurationsAnalytics(this.appKeyId);
    this.configurations.configure().then((v) => {
      this.init(v);
    });
  }

  init(v) {
    this.google = new Google(this.configurations.getGoogleKey());
    this.adobe = new Adobe();
    this.logger = new Logger(this.configurations.getApplication().debugMode, 'ProviderAnalytics');
    this.dataApplication = this.configurations.getApplication();
    this.logger.info('init waiting for async call:{}', v);
  }

  publish(dataLayer) {
    let liverpoolLayer = dataLayer;
    let stringJson = '';

    if (global[TAGGING_KEY] === undefined) {
      this.logger.info('publish !Error, not exist data equivalences');
      return;
    }
    // Get data Event
    const dataEvent = this.configurations.getEvent(liverpoolLayer.event);
    this.logger.info('publish dataEvent:{}', dataEvent);

    // Si no se encuentra el evento en la tabla se envia a google solamente como dataLayer
    if (dataEvent.length === 0) {
      this.logger.info('publish send dataLayer for default to Google!');
      this.google.execute(liverpoolLayer);
      return;
    }
    // Get data for Layer
    const dataTemplate = this.configurations.getLayer(dataEvent[0].id);
    this.logger.info(('publish dataTemplate:{}', dataTemplate));

    /** Step 1: Iterate over each provider from this application */
    for (let index = 0; index < this.dataApplication.providers.length; index += 1) {
      /** Step 2: evaluate if provider is active */
      if (this.dataApplication.providers[index].enabled) {
        stringJson = '';

        /** Step 3: set name event y dataTemplate for object liverpoolLayer */
        switch (this.dataApplication.providers[index].name) {
          case 'Google':
            liverpoolLayer.event = dataEvent[0].providers[0].google;
            stringJson = dataTemplate[0].providers[0].data;
            break;
          default:
            liverpoolLayer.event = dataEvent[0].providers[1].adobe;
            stringJson = dataTemplate[0].providers[1].data;
            break;
        }

        /** Step 4: interpolation de template y object liverpoolLayer  */
        const result = stringJson.interpolate({ liverpoolLayer });
        const jsonToSend = JSON.parse(result);
        this.logger.info(`${this.dataApplication.providers[index].name} publish valid JSON: {}`, jsonToSend);

        /** Step 5: convert layer from Config applications > Attributes */
        // const dataAttributes = this.configurations.getAttributes(dataEvent.id);

        /** Step 6: send to dataLayer */
        switch (this.dataApplication.providers[index].name) {
          case 'Google': this.google.execute(jsonToSend); break;
          default: this.adobe.execute(jsonToSend);
        }
      }
    }
  }
};
