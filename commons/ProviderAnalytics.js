/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    @team         GAPSI
    @project      Tagging Analytics
    @author       leonardo torres ochoa
    @dateTime     29/03/2020 00:14
    @desc
    @observations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
const LogicGoogleAnalytics = require('../providers/LogicGoogleAnalytics');
const LogicAdobeAnalytics = require('../providers/LogicAdobeAnalytics');
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
    this.logicGoogle = new LogicGoogleAnalytics(this.configurations.getGoogleKey());
    this.logicAdobe = new LogicAdobeAnalytics();
    this.dataApplication = this.configurations.getApplication();
  }

  publish(dataAnalytics) {
    let liverpoolLayer = dataAnalytics;
    let stringJson = '';

    // Get data Event
    const dataEvent = this.configurations.getEvent(liverpoolLayer.event);
    console.log('publish::dataEvent:{}', dataEvent);

    // Get data for Layer
    const dataLayer = this.configurations.getLayer(dataEvent[0].id);
    console.log('publish::dataLayer:{}', dataLayer);

    /** Step 1: Iterate over each provider from this application */
    for (let index = 0; index < this.dataApplication.providers.length; index += 1) {
      /** Step 2: evaluate if provider is active */
      if (this.dataApplication.providers[index].enabled) {
        stringJson = '';

        /** Step 3: set name event y dataLayer for object liverpoolLayer */
        switch (this.dataApplication.providers[index].name) {
          case 'Google':
            liverpoolLayer.event = dataEvent[0].providers[0].google;
            stringJson = dataLayer[0].providers[0].data;
            break;
          default:
            liverpoolLayer.event = dataEvent[0].providers[1].adobe;
            stringJson = dataLayer[0].providers[1].data;
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
          case 'Google': this.logicGoogle.execute(jsonToSend); break;
          default: this.logicAdobe.execute(jsonToSend);
        }
      }
    }
  }
};
