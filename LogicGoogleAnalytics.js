/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    @team         GAPSI
    @project      Tagging Analytics
    @author       leonardo torres ochoa
    @dateTime     14/03/2020 18:13
    @desc
    @observations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
const TagManager = require('react-gtm-module');

class LogicGoogleAnalytics {
    constructor() {
        this.tagManagerArgs = {};
    }
    init(key) {
        this.key = key;
        tagManagerArgs.gtmId = key;
        this.isInitTgm = false;
        if (!this.isInitTgm) {
            if (typeof window !== 'undefined' && window) {
                TagManager.initialize(tagManagerArgs);
                this.isInitTgm = true;
            }
        }
    }
    execute(datatAnalytics) {
        console.log('key:'+key);
        console.log('LogicGoogleAnalytics::execute');
        if (typeof window !== 'undefined' && window) {
            const _tagManagerArgs = {};
            _tagManagerArgs.dataLayerName = 'dataLayer';
            _tagManagerArgs.dataLayer = datatAnalytics;

            TagManager.dataLayer(_tagManagerArgs);
        }
    }
}
