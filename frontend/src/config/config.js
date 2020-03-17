export const isDev = __MODE__ === 'development'
export const apiPrefix = isDev ? 'http://localhost:8002' : ''