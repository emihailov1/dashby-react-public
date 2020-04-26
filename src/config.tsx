const config = {
  api: {
      SCOPE: process.env.REACT_APP_API_SCOPE !== undefined ? process.env.REACT_APP_API_SCOPE : "",
      CLIENT_SECRET: process.env.REACT_APP_API_CLIENT_SECRET !== undefined ? process.env.REACT_APP_API_CLIENT_SECRET : "",
      CLIENT_ID: process.env.REACT_APP_API_CLIENT_ID !== undefined ? process.env.REACT_APP_API_CLIENT_ID : "",
      GRANT_TYPE: process.env.REACT_APP_API_GRANT_TYPE !== undefined ? process.env.REACT_APP_API_GRANT_TYPE : "",
      GRANT_TYPE_REFRESH: process.env.REACT_APP_API_GRANT_TYPE_REFRESH !== undefined ? process.env.REACT_APP_API_GRANT_TYPE_REFRESH : ""
  },
  url: {
    LOGIN: process.env.REACT_APP_API_URL_LOGIN !== undefined ? process.env.REACT_APP_API_URL_LOGIN : "",
    REFRESH: process.env.REACT_APP_API_URL_REFRESH !== undefined ? process.env.REACT_APP_API_URL_REFRESH : "",
    BASE: process.env.REACT_APP_API_URL_BASE !== undefined ? process.env.REACT_APP_API_URL_BASE : ""
  }
};
export default {
  ...config
};