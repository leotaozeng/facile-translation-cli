import { IncomingMessage } from 'http';
import https from 'https';
import md5 from 'md5';
import querystring from 'querystring';

type BaiduResult = {
  from: string;
  to: string;
  trans_result: { src: string; dst: string }[];
  error_code?: string;
  error_msg?: string;
};

const errorMap = {
  52003: 'UNAUTHORIZED USER',
  54001: 'Invalid Sign',
  unknown: 'Internal Server Error'
}

const baiduTranslate = (word: string) => {
  const salt = Math.random();
  const appId = process.env.BAIDU_APP_ID + '1';
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
    port: 443, // * 443 - https
    path: `/api/trans/vip/translate?${parsedQuery}`,
    method: 'GET'
  };

  const request = https.request(options, (response: IncomingMessage) => {
    let chunks = [];

    response.on('data', (chunk) => {
      chunks.push(chunk);
    });

    response.on('end', () => {
      const string = Buffer.concat(chunks).toString();
      const object: BaiduResult = JSON.parse(string);
      const { error_code, error_msg } = object

      if (error_code) {
        console.log('Error:', errorMap[error_code] || error_msg);
        process.exit(2); // * 退出当前进程
      } else {
        object.trans_result.forEach((item) => {
          console.log(item);
        });
        process.exit(0);
      }
    });
  });

  request.on('error', (e) => {
    console.log(e);
  });

  request.end();
};

const youdaoTranslate = (word: string) => {
  console.log(word);
};

const googleTranslate = (word: string) => {
  console.log(word);
};

export { baiduTranslate, youdaoTranslate, googleTranslate };
