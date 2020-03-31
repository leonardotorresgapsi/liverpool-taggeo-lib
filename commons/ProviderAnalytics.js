/**
 * Copyright (c) 2020 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2020
 */

/**
 * @author: Leonardo Ivan Torres Ochoa [30/03/2020]
 * @updated: ---
 * @description: library for Liverpool Analytics Tagging
 * @since-version: 1.0
 */
const Google = require('../drivers/Google');
const Adobe = require('../drivers/Adobe');
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
    console.log('constructor ProviderAnalytics');
    this.configurations = new ConfigurationsAnalytics(this.appKeyId);
    this.configurations.configure().then((v) => {
      this.init(v);
    });
  }

  init(v) {
    console.log('waiting for init:{}', v);
    this.google = new Google(this.configurations.getGoogleKey());
    this.adobe = new Adobe();
    this.dataApplication = this.configurations.getApplication();
  }

  publish(dataLayer) {
    let liverpoolLayer = dataLayer;
    let stringJson = '';

    // Get data Event
    const dataEvent = this.configurations.getEvent(liverpoolLayer.event);
    console.log('publish::dataEvent:{}', dataEvent);

    // Get data for Layer
    const dataTemplate = this.configurations.getLayer(dataEvent[0].id);
    console.log('publish::dataTemplate:{}', dataTemplate);

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
        console.log('Valid Json: {}', jsonToSend);

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
