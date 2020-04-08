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
module.exports = class Adobe {
  // eslint-disable-next-line class-methods-use-this
  execute(dataLayer, eventNameSource) {
    if (eventNameSource === 'pageView') {
      window.digitalData = window.digitalData || {};
      window.digitalData.page = dataLayer;
      window.digitalData.event = window.digitalData.event || [];
      window.digitalData.event.push({
        eventName: 'Custom Page View',
        eventAction: 'customPageView',
        type: 'userInteraction',
        timeStamp: new Date(),
      });
    } else {
      window.digitalData.event = window.digitalData.event || [];
      window.digitalData.event.push(dataLayer);
    }
  }
};
