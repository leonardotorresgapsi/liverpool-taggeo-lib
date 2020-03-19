/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    @team         GAPSI
    @project      Tagging Analytics
    @author       leonardo torres ochoa
    @dateTime     14/03/2020 18:13
    @desc
    @observations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
const LogicGoogleAnalytics = require('./LogicGoogleAnalytics');
const LogicAdobeAnalytics = require('./LogicAdobeAnalytics');

module.exports = class LiverpoolAnalytics {
    constructor() {
    }
    initialize(dataProviders) {
        this.dataProviders = dataProviders;
        configure();
    }
    healthCheck() {
        return new Date().toLocaleString();
    }
    configure() {
        this.logicGoogle = new LogicGoogleAnalytics();
        this.logicAdobe = new LogicAdobeAnalytics();
        for (var index = 0; index < this.dataProviders.length; index++) {
            switch (item.name) {
                case "google" : this.logicGoogle.init(item.key); break;
            }
        }
    }
    publish(datatAnalytics) {
        let ga = this.logicGoogle;
        let ad = this.logicAdobe;
        this.dataProviders.forEach(function(item){
            if (item.active) {
                switch (item.name) {
                    case "google" : ga.execute(datatAnalytics); break;
                    case "adobe" : ad.execute(datatAnalytics); break;
                }
            }
        });
    }
}
