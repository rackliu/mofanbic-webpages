/**
 * 主入口文件
 * 初始化莫凡比精品服飾網站應用
 */

import MofanbicApp from './core/app.js';

// 初始化應用
console.log('🌟 莫凡比精品服飾 - 載入中...');

// 創建全域應用實例
window.mofanbicApp = new MofanbicApp();

// Google Analytics 初始化（如果需要）
window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}

// 導出 gtag 供其他模組使用
window.gtag = gtag;

// 開發模式下的除錯工具
if (window.mofanbicApp.isDevelopmentMode && window.mofanbicApp.isDevelopmentMode()) {
    console.log('🔧 開發模式已啟用');
    
    // 全域除錯工具
    window.MofanbicDebug = {
        app: window.mofanbicApp,
        
        // 顯示應用狀態
        getState() {
            return window.mofanbicApp.getAppState();
        },
        
        // 重新初始化應用
        restart() {
            window.mofanbicApp.destroy();
            window.mofanbicApp = new MofanbicApp();
        },
        
        // 切換動畫
        toggleAnimations() {
            if (window.mofanbicApp.modules.animations) {
                window.mofanbicApp.modules.animations.toggleAnimations();
            }
        },
        
        // 測試通知
        testNotification(type = 'info') {
            const messages = {
                info: '這是一個資訊通知',
                success: '操作成功完成！',
                warning: '請注意這個警告',
                error: '發生了一個錯誤'
            };
            
            window.mofanbicApp.showNotification(messages[type], type);
        },
        
        // 顯示所有可用方法
        help() {
            console.log(`
🔧 莫凡比除錯工具

可用方法：
- MofanbicDebug.getState() - 取得應用狀態
- MofanbicDebug.restart() - 重新啟動應用
- MofanbicDebug.toggleAnimations() - 切換動畫
- MofanbicDebug.testNotification(type) - 測試通知
- MofanbicDebug.help() - 顯示此說明

範例：
MofanbicDebug.testNotification('success')
            `);
        }
    };
    
    // 自動顯示除錯工具說明
    setTimeout(() => {
        console.log('💡 輸入 MofanbicDebug.help() 查看可用的除錯工具');
    }, 1000);
}

// 效能測量
const startTime = performance.now();

// 當所有內容載入完成後測量效能
window.addEventListener('load', () => {
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    
    console.log(`⚡ 應用載入完成，耗時: ${Math.round(loadTime)}ms`);
    
    // 如果載入時間過長，提供優化建議
    if (loadTime > 2000) {
        console.warn('⚠️ 載入時間較長，建議優化：');
        console.log('- 壓縮圖片資源');
        console.log('- 啟用瀏覽器快取');
        console.log('- 考慮使用 CDN');
    }
});

// 導出應用實例供其他腳本使用
export default window.mofanbicApp;