/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    @team         GAPSI
    @project      Tagging Analytics
    @author       leonardo torres ochoa
    @dateTime     29/03/2020 00:14
    @desc
    @observations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
const TagManager = require('react-gtm-module');

module.exports = class LogicGoogleAnalytics {
  constructor(key) {
    this.isInitTgm = false;
    this.key = key;
    this.tagManagerArgs = {};
    this.tagManagerArgs.gtmId = this.key;
    this.init();
  }

  init() {
    if (!this.isInitTgm) {
      console.log('LogicGoogleAnalytics::init is false');
      if (typeof window !== 'undefined' && window) {
        console.log('LogicGoogleAnalytics::init window');
        TagManager.initialize(this.tagManagerArgs);
        this.isInitTgm = true;
      }
    } else {
      console.log('LogicGoogleAnalytics::init is true');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  execute(datatAnalytics) {
    console.log('LogicGoogleAnalytics::execute:{}',datatAnalytics);
    if (typeof window !== 'undefined' && window) {
      const vTagManagerArgs = {};
      vTagManagerArgs.dataLayerName = 'dataLayer';
      vTagManagerArgs.dataLayer = datatAnalytics;

      TagManager.dataLayer(vTagManagerArgs);
    }
  }
};
