import https from 'https';
import querystring from 'querystring';
import md5 from 'md5';

const baiduTranslate = (word: string) => {
  const salt = Math.random();
  const appId = process.env.BAIDU_APP_ID;
  const appKey = process.env.BAIDU_APP_KEY;
  const sign = md5(`${appId}${word}${salt}${appKey}`);

  const parsedQuery: string = querystring.stringify({
    q: word,
    from: 'en',
    to: 'zh',
    appid: appId,
    salt,
    sign
  });

  const options = {
    hostname: 'api.fanyi.baidu.com',
    port: 443,
    path: `/api/trans/vip/translate?${parsedQuery}`,
    method: 'GET'
  };

  const req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (e) => {
    console.log(e);
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
