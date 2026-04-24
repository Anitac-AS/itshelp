const CONFIG = {
  API_URL: 'https://script.google.com/macros/s/AKfycby1z28_2maJXN0n7oJsXGltUWaTCYQTb4-fC1CIG2psZ7YYzpd1CGAzyFVv3YMWVYXB6w/exec'
};

let PORTAL_DATA = null;

async function init() {
  try {
    const response = await fetch(CONFIG.API_URL);
    const result = await response.json();
    
    if (result.status === 'success') {
      PORTAL_DATA = result.data;
      renderAll();
      document.getElementById('loading-mask').style.display = 'none';
      document.getElementById('content-area').style.display = 'block';
    } else {
      throw new Error(result.message);
    }
  } catch (err) {
    console.error('Fetch error:', err);
    alert('無法載入資料。請確認是否已登入 Google 帳號，或檢查網路連線。');
  }
}

// 渲染邏輯 (將原本 HTML 內的 renderTools, renderDash 等函數移入此處)
// 修改變數來源，例如將 TOOLS 改為 PORTAL_DATA.tools
function renderTools() {
  const tools = PORTAL_DATA.tools;
  // ... 原本的渲染邏輯 ...
}

init();
