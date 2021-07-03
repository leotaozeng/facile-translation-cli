import https from 'https';
import querystring from 'querystring';

const baiduTranslate = (word: string) => {
  const options = {
    hostname: 'api.fanyi.baidu.com',
    port: 443,
    path: '/api/trans/vip/translate',
    method: 'GET'
  };
  // bExKIc5Xt2eT8POA5HbA
  const parsedQuery: string = querystring.stringify({
    q: word,
    from: 'en',
    to: 'zh',
    appid: process.env.APP_ID,
    salt: '1435660288',
    sign: 'e1238192bfba8a61fb3131f6ffd77158'
  });
  console.log(parsedQuery);

  const req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });

  req.end();
};

const youdaoTranslate = (word: string) => {
  console.log(word);
};

const googleTranslate = (word: string) => {
  console.log(word);
};

export { baiduTranslate, youdaoTranslate, googleTranslate };
