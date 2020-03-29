/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    @team         GAPSI
    @project      Tagging Analytics
    @author       leonardo torres ochoa
    @dateTime     29/03/2020 00:14
    @desc
    @observations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
const LogicGoogleAnalytics = require('./providers/LogicGoogleAnalytics');
const LogicAdobeAnalytics = require('./providers/LogicAdobeAnalytics');
const ConfigurationsAnalytics = require('./commons/ConfigurationAnalytics');

module.exports = class LiverpoolAnalytics {
  constructor(appKeyId) {
    console.log('LiverpoolAnalytics::constructor');
    this.appKeyId = appKeyId;
    this.configurations = new ConfigurationsAnalytics(this.appKeyId);
    // this.configure();
  }

  configure() {
    this.logicGoogle = new LogicGoogleAnalytics(this.configurations.getGoogleKey());
    this.logicAdobe = new LogicAdobeAnalytics();
  }

  publish(datatAnalytics) {
    const ga = this.logicGoogle;
    const ad = this.logicAdobe;
    this.dataProviders.forEach((item) => {
      if (item.active) {
        // eslint-disable-next-line default-case
        switch (item.name) {
          case 'google': ga.execute(datatAnalytics); break;
          case 'adobe': ad.execute(datatAnalytics); break;
        }
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  healthCheck() {
    return new Date().toLocaleString();
  }
};
