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
const fetch = require('node-fetch');

const TAGGING_URL = 'http://localhost:8090/getDataByApplication?';
const TAGGING_KEY = Symbol.for('Liverpool.Tagging.equivalences');

module.exports = class ConfigurationAnalytics {
  constructor(appKeyId) {
    this.appKeyId = appKeyId;
    console.log('(LIV)ConfigurationAnalytics::constructor');
  }

  // eslint-disable-next-line class-methods-use-this,consistent-return
  async configure() {
    console.log('(LIV)ConfigurationAnalytics::configure {}', global[TAGGING_KEY]);
    if (global[TAGGING_KEY] === undefined) {
      console.log('(LIV)ConfigurationAnalytics::configure hasTagging');
      const url = `${TAGGING_URL}appKeyId=${this.appKeyId}`;
      const response = await fetch(url);
      const dataJson = await response.json();
      console.log('(LIV)ConfigurationAnalytics::configure DataEquivalences:{}', dataJson);
      global[TAGGING_KEY] = dataJson;
      console.log('(LIV)ConfigurationAnalytics::configure DataEquivalences in CACHE!');
      return dataJson;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getGoogleKey() {
    let result = '';
    const equivalences = global[TAGGING_KEY];
    const rta = equivalences.applications[0];
    if (rta != null) {
      if (rta.providers != null) {
        for (let index = 0; index < rta.providers.length; index += 1) {
          // eslint-disable-next-line default-case
          switch (rta.providers[index].name) {
            case 'Google': result = rta.providers[index].key; break;
          }
        }
      }
    }
    console.log('(LIV)ConfigurationAnalytics::getGoogleKey:{}', result);
    return result;
  }

  // eslint-disable-next-line class-methods-use-this
  getApplication() {
    const equivalences = global[TAGGING_KEY];
    return equivalences.applications[0];
  }

  // eslint-disable-next-line class-methods-use-this
  getEvent(eventName) {
    const equivalences = global[TAGGING_KEY];
    return equivalences.events.filter((it) => it.event === eventName);
  }

  // eslint-disable-next-line class-methods-use-this
  getLayer(eventId) {
    const equivalences = global[TAGGING_KEY];
    return equivalences.layers.filter((it) => it.eventId === eventId);
  }

  // eslint-disable-next-line class-methods-use-this
  getAttributes(eventId) {
    const equivalences = global[TAGGING_KEY];
    return equivalences.attributes.filter((it) => it.eventId === eventId);
  }
};
