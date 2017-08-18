import * as qs from 'querystring';
import {Indicator} from 'mint-ui';
import router from './router';

function noop() {}

let count = 0;

export function jsonp(url,body = {},config = {},fn){

  let target = document.getElementsByTagName('script')[0] || document.head;

  let prefix = config.prefix || 'jsonp';
  let timeout = config.timer || 30000;
  let timer = null;

  let id = config.name || (prefix + (count++) + +new Date());

  body.callback = id;
  body._ = +new Date();

  url += url.indexOf('?') >-1 ? '&' : '?';
  url += qs.stringify(body);

  let script = document.createElement('script');
  script.src = url;
  target.parentNode.insertBefore(script, target);

  function cleanup(){
    if (script.parentNode) script.parentNode.removeChild(script);
    window[id] = noop;
    if (timer) clearTimeout(timer);
  }
  Indicator.open({text: '', spinnerType: 'fading-circle'});
  return new Promise((resolve, reject) => {
    window[id] = function(data){
      console.info(data);
      Indicator.close();
      if(data.status_code == 200 || data.status_code == 204){
        resolve(data);
      }else if(data.status_code == 201){
        router.replace({name:'login'});
        reject("not login")
      }else if(data.status_code == 203){
        reject(data)
      }else{
        reject(data.error_message)
      }
      fn && fn(data);
      cleanup();
    };

    if (timeout) {
      timer = setTimeout(function(){
        Indicator.close();
        reject(new Error('Timeout'));
        timer = 0;
        cleanup();
      }, timeout);
    }
  })

}
