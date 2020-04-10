/**
 * Copyright (c) 2020 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2020
 */

/**
 * @author: Leonardo Ivan Torres Ochoa [30/03/2020]
 * @updated: Oscar Longino [05/04/2020}
 * @description: library for Liverpool Analytics Tagging
 * @since-version: 1.0
 */
// const fetch = require('node-fetch');
const retus = require('retus');

const TAGGING_URL = 'http://localhost:8090/getDataByApplication?';
const TAGGING_KEY = Symbol.for('Liverpool.Tagging.equivalences');
const LIVERPOOL_TAGGING_CONFIG = 'LIVERPOOL_TAGGING_CONFIG';
const AnalyticsStorage = require('./AnalyticsStorage');

module.exports = class ConfigurationAnalytics {
  constructor(appKeyId) {
    this.appKeyId = appKeyId;
    this.analyticsStorage = new AnalyticsStorage();
    console.log('(LIV)ConfigurationAnalytics::constructor');
    this.configureSync();
  }

  configureSync() {
    const config = this.analyticsStorage.get(LIVERPOOL_TAGGING_CONFIG);
    if (config == null) {
      return this.loadConfigurationSync();
    }
    console.log('(LIV)ConfigurationAnalytics::configure loaded from LocalStorage');

    /** Step 1: It load config from LocalStorage and obtain the updatedAt value for verificated the date update */
    const dataJson = JSON.parse(config);
    const now = new Date();
    let updateAt = dataJson.applications[0].updatedAt;
    const { timeToGetConfig } = dataJson.applications[0];

    /** Step 2: It Check if property updateAt is empty, then generate the next date for reaload the configuration */
    if (updateAt === '') {
      updateAt = this.getDateToNextReload(updateAt, timeToGetConfig);
      dataJson.applications[0].updatedAt = updateAt;
      this.analyticsStorage.put(LIVERPOOL_TAGGING_CONFIG, JSON.stringify(dataJson));
    }

    console.log('(LIV)ConfigurationAnalytics::configure now: ', now);
    console.log('(LIV)ConfigurationAnalytics::configure updated at: ', updateAt);

    /** Step 3: It convert the value of updateAt to date and check if the date today is greater than updateAt */
    updateAt = new Date(updateAt);
    if (now > updateAt) {
      updateAt = this.getDateToNextReload(updateAt, timeToGetConfig);
      return this.loadConfigurationSync(updateAt);
    }

    /** Step Final: return de dataJson */
    global[TAGGING_KEY] = dataJson;
    return dataJson;
  }

  /* async configure() {
    const config = this.analyticsStorage.get(LIVERPOOL_TAGGING_CONFIG);
    if (config == null) {
      return this.loadConfiguration();
    }
    console.log('(LIV)ConfigurationAnalytics::configure loaded from LocalStorage');

    // Step 1: It load config from LocalStorage and obtain the updatedAt value for verificated the date update
    const dataJson = JSON.parse(config);
    const now = new Date();
    let updateAt = dataJson.applications[0].updatedAt;
    const { timeToGetConfig } = dataJson.applications[0];

    // Step 2: It Check if property updateAt is empty, then generate the next date for reaload the configuration
    if (updateAt === '') {
      updateAt = this.getDateToNextReload(updateAt, timeToGetConfig);
      dataJson.applications[0].updatedAt = updateAt;
      this.analyticsStorage.put(LIVERPOOL_TAGGING_CONFIG, JSON.stringify(dataJson));
    }

    console.log('(LIV)ConfigurationAnalytics::configure now: ', now);
    console.log('(LIV)ConfigurationAnalytics::configure updated at: ', updateAt);

    // Step 3: It convert the value of updateAt to date and check if the date today is greater than updateAt
    updateAt = new Date(updateAt);
    if (now > updateAt) {
      updateAt = this.getDateToNextReload(updateAt, timeToGetConfig);
      return this.loadConfiguration(updateAt);
    }

    // Step Final: return de dataJson
    global[TAGGING_KEY] = dataJson;
    return dataJson;
  } */

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
      // Si el el ID=1 eCommerce Liverpool consistencia para multisitios
      if (rta.id === 1) {
        if (rta.providers != null) {
          if (rta.providers[0].sites != null) {
            const locationHref = window.location.href;
            for (let index = 0; index < rta.providers[0].sites.length; index += 1) {
              if (locationHref.indexOf(rta.providers[0].sites[index].name) > 0) {
                result = rta.providers[0].sites[index].key;
                console.log('(LIV)ConfigurationAnalytics::getGoogleKey: Ubico Multisitio Key GTM');
                break;
              }
            }
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

  // eslint-disable-next-line class-methods-use-this
  getDateToNextReload(updateAt, timeMilliseconds) {
    let updateAtParam = Date.now();
    updateAtParam += timeMilliseconds;
    updateAtParam = new Date(updateAtParam);
    return updateAtParam;
  }

  /*  async loadConfiguration(updateAt) {
    console.log('(LIV)ConfigurationAnalytics::configure load from: ', TAGGING_URL);
    console.log('(LIV)ConfigurationAnalytics::configure hasTagging');
    const url = `${TAGGING_URL}appKeyId=${this.appKeyId}`;
    const response = await fetch(url);
    const dataJson = await response.json();
    if (updateAt != null && updateAt !== undefined) {
      dataJson.applications[0].updatedAt = updateAt;
    }
    this.analyticsStorage.put(LIVERPOOL_TAGGING_CONFIG, JSON.stringify(dataJson));
    console.log('(LIV)ConfigurationAnalytics::configure loaded put to LocalStorage');
    global[TAGGING_KEY] = dataJson;
    return dataJson;
  } */

  loadConfigurationSync(updateAt) {
    console.log('(LIV)ConfigurationAnalytics::configure load from: ', TAGGING_URL);
    console.log('(LIV)ConfigurationAnalytics::configure hasTagging');
    const url = `${TAGGING_URL}appKeyId=${this.appKeyId}`;
    const response = retus(url);
    console.log('retus:', response);
    const dataJson = JSON.parse(response.body);

    if (updateAt != null && updateAt !== undefined) {
      dataJson.applications[0].updatedAt = updateAt;
    }
    this.analyticsStorage.put(LIVERPOOL_TAGGING_CONFIG, JSON.stringify(dataJson));
    console.log('(LIV)ConfigurationAnalytics::configure loaded put to LocalStorage');
    global[TAGGING_KEY] = dataJson;
    return dataJson;
  }
};
