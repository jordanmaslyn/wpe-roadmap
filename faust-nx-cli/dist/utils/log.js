import chalk from 'chalk';
export const log = (logLevel, message, ...args) => {
    let logLevelMessage = chalk.whiteBright('faustnx: ');
    switch (logLevel) {
        case 'notice': {
            logLevelMessage += chalk.yellow('notice');
            break;
        }
        case 'error': {
            logLevelMessage += chalk.red('error');
            break;
        }
        default: {
            break;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, no-console
    console.log(`${logLevelMessage} - ${message}`, ...args);
};
export const noticeLog = (message, ...args) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    log('notice', message, ...args);
};
export const errorLog = (message, ...args) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    log('error', message, ...args);
};
