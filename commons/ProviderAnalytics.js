/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    @team         GAPSI
    @project      Tagging Analytics
    @author       leonardo torres ochoa
    @dateTime     29/03/2020 00:14
    @desc
    @observations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
module.exports = class ProviderAnalytics {
  constructor(name, key, enviroment, active) {
    this.name = name;
    this.key = key;
    this.enviroment = enviroment;
    this.active = active;
  }
}
