import { createLogger, format, transports } from 'winston'

const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
}

const DEFAULT_LOG_LEVEL = 'info'

class AppLogger {
    static #logger

    constructor(logLevel, metadata) {
        if (!AppLogger.#logger) {
            AppLogger.#logger = createLogger({
                level: logLevel || DEFAULT_LOG_LEVEL,
                levels: logLevels,
                format: format.combine(
                    format.timestamp(),
                    format.json(),
                    format.errors({ stack: true })
                ),
                defaultMeta: metadata,
                transports: [new transports.Console()],
            })
        }
    }

    #getLogger() {
        return AppLogger.#logger
    }

    fatal(log) {
        this.#getLogger().fatal(log)
    }

    error(log) {
        this.#getLogger().error(log)
    }

    warn(log) {
        this.#getLogger().warn(log)
    }

    info(log) {
        this.#getLogger().info(log)
    }

    debug(log) {
        this.#getLogger().debug(log)
    }

    trace(log) {
        this.#getLogger().trace(log)
    }
}

const appLogger = new AppLogger(DEFAULT_LOG_LEVEL, {
    service: 'todo-crud-app',
})

export default appLogger
