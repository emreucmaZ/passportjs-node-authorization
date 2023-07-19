export default function controlIsHttpUrl(url:string){
    const urlPattern = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);
    let string = url;

    if(urlPattern.test(string)){
      string = string.replace("https://","").replace("http://","");
      string = `https://${string}`;
      return string;
    }else{
        return `http://${string}`
    }
} 