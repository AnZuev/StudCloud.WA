var log4js = require('log4js');

log4js.configure({
    appenders: [
        {
            type: 'console'
        },
        {
            category: 'wa',
            type: 'logLevelFilter',
            level: "WARN",
            appender:{
                type:'file',
                filename:appRoot + '/libs/logs/wa_warnings.log',
                layout:{
                    type: "messagePassThrough"
                }
            }
        },
        {
            category: 'wa',
            type: 'logLevelFilter',
            level: "TRACE",
            maxLevel: "DEBUG",
            appender:{
                type:'file',
                filename:appRoot + '/libs/logs/wa_debugs.log',
                layout:{
                    type: "messagePassThrough"
                }
            }
        },
        {
            category: 'wa',
            type: 'file',
            filename: appRoot + '/libs/logs/wa_allLogs.log',
            layout: {
                type: "messagePassThrough"
            }
        }
    ],
    levels: {
        wa: "TRACE"
    }
});

module.exports = log4js.getLogger('wa');