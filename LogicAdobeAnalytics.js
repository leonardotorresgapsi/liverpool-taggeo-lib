/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    @team         GAPSI
    @project      Tagging Analytics
    @author       leonardo torres ochoa
    @dateTime     14/03/2020 18:13
    @desc
    @observations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
class LogicAdobeAnalytics {
    constructor() {
    }
    init() {
    }
    execute(datatAnalytics) {
        console.log('LogicAdobeAnalytics::execute: ' + datatAnalytics);
        window.digitalData.event = window.digitalData.event || [];
        window.digitalData.event.push(datatAnalytics);
    }
}
