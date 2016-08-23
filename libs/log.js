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
                    type: 'pattern',
                    pattern: "[%d] - %m%n"
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
                    type: 'pattern',
                    pattern: "[%d] - %m%n"
                }
            }
        },
        {
            category: 'wa',
            type: 'file',
            level:"ALL",
            filename: appRoot + '/libs/logs/wa_allLogs.log',
            layout: {
                type: 'pattern',
                pattern: "[%d] - %m%n"
            }
        }
    ]
});

module.exports = log4js.getLogger('wa');