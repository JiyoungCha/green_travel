const axiosConfig = {
  SERVICE_KEY: import.meta.env.VITE_SERVICE_KEY,
  MOBILE_OS: import.meta.env.VITE_MOBILE_OS,
  MOBILE_APP: import.meta.env.VITE_MOBILE_APP,
  TYPE: import.meta.env.VITE_TYPE,
  ARRANGE: import.meta.env.VITE_ARRANGE,
  BASE_URL: 'https://apis.data.go.kr/B551011/KorService2',
  NUMBER_OF_ROWS: 12,
}

export default axiosConfig;