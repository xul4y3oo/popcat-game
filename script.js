document.addEventListener('DOMContentLoaded', () => {
    // 獲取 DOM 元素
    const gameArea = document.getElementById('game-area');
    const catImage = document.getElementById('cat-image');
    const counterDisplay = document.getElementById('counter');

    // 圖片路徑
    const CLOSED_CAT = 'assets/cat-closed.png';
    const OPEN_CAT = 'assets/cat-open.png';

    // 遊戲狀態變數
    let clickCount = 0;
    let isPopping = false; // 用來防止連續點擊時動畫混亂
    let popSound;

    // 嘗試建立音效 (瀏覽器可能會限制自動播放，但用戶交互後即可播放)
    try {
        popSound = new Audio('assets/pop.mp3');
    } catch (error) {
        console.error("無法載入音效：", error);
    }
    
    // --- 主要 Pop 動作函數 ---
    const popAction = () => {
        // 防止連續 Pop 造成的閃爍
        if (isPopping) return;
        isPopping = true;
        
        // 1. 播放音效
        if (popSound) {
            popSound.currentTime = 0; // 重置音效到開頭
            popSound.play().catch(e => console.log("音效播放失敗:", e)); // 捕獲可能因用戶未交互而產生的錯誤
        }
        
        // 2. 切換圖片到「張開嘴巴」狀態
        catImage.src = OPEN_CAT;
        
        // 3. 增加計數器
        clickCount++;
        counterDisplay.textContent = clickCount.toLocaleString(); // toLocaleString() 讓數字有千位分隔符

        // 4. 短暫延遲後，切換回「閉上嘴巴」狀態
        // 設置一個短暫的延時 (例如 100 毫秒)
        setTimeout(() => {
            catImage.src = CLOSED_CAT;
            isPopping = false; // 允許下一次 Pop
        }, 100); 
    };

    // --- 事件監聽器 ---

    // 1. 監聽滑鼠點擊 (在圖片或遊戲區域上)
    gameArea.addEventListener('mousedown', popAction);
    
    // 2. 監聽鍵盤事件 (按下空白鍵)
    document.addEventListener('keydown', (event) => {
        // 檢查是否是空白鍵 (Spacebar)
        if (event.code === 'Space') {
            event.preventDefault(); // 阻止頁面滾動等瀏覽器預設行為
            popAction();
        }
    });
    
    // (可選) 增加觸控事件支持
    gameArea.addEventListener('touchstart', (event) => {
        event.preventDefault(); // 阻止移動端預設行為
        popAction();
    });
});
