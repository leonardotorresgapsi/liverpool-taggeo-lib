/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    @team         GAPSI
    @project      Tagging Analytics
    @author       leonardo torres ochoa
    @dateTime     29/03/2020 00:14
    @desc
    @observations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
module.exports = class LogicAdobeAnalytics {
  // eslint-disable-next-line class-methods-use-this
  execute(datatAnalytics) {
    console.log(`LogicAdobeAnalytics::execute: ${datatAnalytics}`);
    window.digitalData.event = window.digitalData.event || [];
    window.digitalData.event.push(datatAnalytics);
  }
};
