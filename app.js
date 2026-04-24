function init() {
  const callbackName = 'jsonpCallback_' + Date.now();
  const apiUrl = `https://script.google.com/macros/s/AKfycby1z28_2maJXN0n7oJsXGltUWaTCYQTb4-fC1CIG2psZ7YYzpd1CGAzyFVv3YMWVYXB6w/exec?callback=${callbackName}`;

  // 定義回傳後的處理函數
  window[callbackName] = function(result) {
    if (result.status === 'success') {
      PORTAL_DATA = result.data;
      renderAll(); // 執行你原本的渲染函數
      document.getElementById('loading-mask').style.display = 'none';
      document.getElementById('content-area').style.display = 'block';
    } else {
      alert('資料格式錯誤：' + result.message);
    }
    // 清理殘留標籤
    delete window[callbackName];
    document.getElementById('jsonp-script').remove();
  };

  // 注入 Script 標籤
  const script = document.createElement('script');
  script.id = 'jsonp-script';
  script.src = apiUrl;
  script.onerror = () => {
    alert('連線失敗！這通常是因為瀏覽器未登入 Google 帳號，或是帳號權限不足。');
  };
  document.body.appendChild(script);
}
