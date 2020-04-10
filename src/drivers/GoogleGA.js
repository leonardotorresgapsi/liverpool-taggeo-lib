/**
 * Copyright (c) 2020 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2020
 */

/**
 * @author: Leonardo Ivan Torres Ochoa [30/03/2020]
 * @updated: 09/04/2020
 * @description: library for Liverpool Analytics Tagging
 * @since-version: 1.0
 */
import ReactGA from 'react-ga';

module.exports = class GoogleGA {
  // eslint-disable-next-line class-methods-use-this
  static init(key) {
    ReactGA.initialize(key);
  }

  // eslint-disable-next-line class-methods-use-this
  static setPageView(context) {
    ReactGA.pageview(context);
  }

  // eslint-disable-next-line class-methods-use-this
  static setEvent(dataLayer) {
    ReactGA.event(dataLayer);
  }
};
