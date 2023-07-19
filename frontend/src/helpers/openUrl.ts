export default function openURL(url: string) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      // http veya https ön eki olmadan gelen URL için otomatik düzeltme yap
      url = "http://" + url;
    }
  
    window.open(url, "_blank");
  }