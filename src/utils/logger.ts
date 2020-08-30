import tracer from 'tracer'

const logger = tracer.colorConsole({
  format: '{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})',
  dateformat: 'HH:MM:ss.L'
})

export { logger }
