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
  execute(dataLayer) {
    console.log('Adobe[1]::execute:{}', dataLayer);
    // TODO:1Mar2020 window.digitalData.event = window.digitalData.event || [];
    // TODO:1Mar2020 window.digitalData.event.push(dataLayer);
    // TODO:1Mar2020 se implemento mejora de envio (correcion de error trim())
    window.digitalData = window.digitalData || {};
    const eventCustom = dataLayer.event;
    // eslint-disable-next-line no-param-reassign
    delete dataLayer.event;
    Object.assign(window.digitalData, dataLayer);
    window.digitalData.event = window.digitalData.event || [];
    window.digitalData.event.push(eventCustom);
  }
};
