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
    this.key = key;
    this.tagManagerArgs = {};
    this.init();
  }

  init() {
    this.tagManagerArgs.gtmId = this.key;
    this.isInitTgm = false;
    if (!this.isInitTgm) {
      console.log('LogicGoogleAnalytics::init-1');
      if (typeof window !== 'undefined' && window) {
        console.log('LogicGoogleAnalytics::init-2');
        TagManager.initialize(this.tagManagerArgs);
        this.isInitTgm = true;
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  execute(datatAnalytics) {
    console.log('LogicGoogleAnalytics::execute-1');
    if (typeof window !== 'undefined' && window) {
      console.log('LogicGoogleAnalytics::execute-2');
      const vTagManagerArgs = {};
      vTagManagerArgs.dataLayerName = 'dataLayer';
      vTagManagerArgs.dataLayer = datatAnalytics;

      TagManager.dataLayer(vTagManagerArgs);
    }
  }
};
