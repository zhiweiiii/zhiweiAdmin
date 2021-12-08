// https://angular.io/guide/build#proxying-to-a-backend-server

const PROXY_CONFIG = {
  "/api": {
    target: 'http://119.45.24.33/',
    changeOrigin: true,
    secure: false,
    logLevel: 'info',
      // onProxyReq: (proxyReq, req, res) => {
    //   const cookieMap = {
    //     SID: '',
    //   };
    //   let cookie = '';
    //   for (const key of Object.keys(cookieMap)) {
    //     cookie += `${key}=${cookieMap[key]}; `;
    //   }
    //   proxyReq.setHeader('cookie', cookie);
    // },
  }
};

module.exports = PROXY_CONFIG;
