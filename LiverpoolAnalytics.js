/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    @team         GAPSI
    @project      Tagging Analytics
    @author       leonardo torres ochoa
    @dateTime     29/03/2020 00:14
    @desc
    @observations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
const ProviderAnalytics = require('./commons/ProviderAnalytics');

module.exports = class LiverpoolAnalytics {
  constructor(appKeyId) {
    console.log('LiverpoolAnalytics::constructor');
    this.appKeyId = appKeyId;
    this.providers = new ProviderAnalytics(this.appKeyId);
  }

  publish(dataAnalytics) {
    this.providers.publish(dataAnalytics);
  }

  // eslint-disable-next-line class-methods-use-this
  healthCheck() {
    return new Date().toLocaleString();
  }
};
