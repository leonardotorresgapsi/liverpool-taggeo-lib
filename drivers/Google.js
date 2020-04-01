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
const TagManager = require('react-gtm-module');

module.exports = class Google {
  constructor(key) {
    this.isInitTgm = false;
    this.key = key;
    this.tagManagerArgs = {};
    this.tagManagerArgs.gtmId = this.key;
    this.init();
  }

  init() {
    if (!this.isInitTgm) {
      console.log('Google::init is false');
      if (typeof window !== 'undefined' && window) {
        console.log('LogicGoogleAnalytics::init window');
        TagManager.initialize(this.tagManagerArgs);
        this.isInitTgm = true;
      }
    } else {
      console.log('Google::init is true');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  execute(dataLayer) {
    console.log('Google::execute:{}', dataLayer);
    if (typeof window !== 'undefined' && window) {
      const vTagManagerArgs = {};
      vTagManagerArgs.dataLayerName = 'dataLayer';
      vTagManagerArgs.dataLayer = dataLayer;

      TagManager.dataLayer(vTagManagerArgs);
    }
  }
};