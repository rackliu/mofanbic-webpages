# 莫凡比精品服飾網站

## 專案概述

莫凡比精品服飾是一個現代化的精品女裝網站，採用響應式設計和模組化 JavaScript 架構，提供優雅的用戶體驗。

## 🚀 重構改善

### CSS 優化
- ✅ **移除重複檔案**: 刪除了重複的 `style_1.css`，統一使用 `style.css`
- ✅ **統一樣式系統**: 採用一致的設計系統和 CSS 變數
- ✅ **響應式設計**: 完整的行動裝置適配

### JavaScript 模組化架構

重構前的單體架構已改為模組化設計，提高程式碼的可維護性和可擴展性。

#### 🏗️ 新架構結構

```
js/
├── core/
│   └── app.js              # 核心應用程式，整合所有模組
├── ui/
│   ├── navigation.js       # 導航和選單功能
│   ├── form-handler.js     # 表單處理和驗證
│   ├── notification.js     # 通知系統
│   └── animations.js       # 動畫和視覺效果
├── utils/
│   └── helpers.js          # 通用工具函數
└── main.js                 # 主入口檔案
```

#### 📦 模組說明

**核心模組 (Core)**
- `app.js`: 應用程式主控制器，負責整合所有功能模組

**UI 模組 (User Interface)**
- `navigation.js`: 處理導航欄、手機版選單、平滑滾動
- `form-handler.js`: 表單驗證、提交處理、輸入增強
- `notification.js`: 通知訊息系統，支援多種類型和位置
- `animations.js`: 滾動動畫、視差效果、交互動畫

**工具模組 (Utils)**
- `helpers.js`: 防抖、節流、驗證等通用工具函數

## 🎯 功能特色

### 用戶體驗
- **響應式設計**: 完美適配桌面、平板、手機
- **平滑滾動**: 優雅的頁面導航體驗
- **動畫效果**: 滾動觸發的進場動畫
- **表單驗證**: 即時驗證和友善錯誤提示
- **通知系統**: 多樣化的訊息通知

### 無障礙設計
- **鍵盤導航**: 完整的鍵盤操作支援
- **跳至主要內容**: 無障礙導航連結
- **焦點管理**: 清晰的焦點指示
- **語意標記**: 正確的 HTML 語意結構

### 效能優化
- **模組化載入**: ES6 模組系統
- **防抖節流**: 優化滾動和調整大小事件
- **圖片預載**: 重要圖片預先載入
- **錯誤處理**: 完整的錯誤捕獲和報告

## 🛠️ 技術規格

### 前端技術
- **HTML5**: 語意化標記
- **CSS3**: 現代 CSS 特性，自定義屬性
- **ES6+ JavaScript**: 模組化、類別、async/await
- **響應式設計**: Mobile-first 設計理念

### 瀏覽器支援
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- iOS Safari 14+
- Android Chrome 88+

## 📂 檔案結構

```
mofanbic_webpages/
├── index.html              # 主頁面
├── style.css               # 主要樣式表
├── js/                     # JavaScript 模組
│   ├── core/
│   ├── ui/
│   ├── utils/
│   └── main.js
├── images/                 # 圖片資源
├── app.js.backup          # 原始檔案備份
└── README.md              # 專案說明
```

## 🚀 使用方式

### 本地開發

1. **啟動本地服務器**（由於使用 ES6 模組，需要 HTTP 伺服器）:
   ```bash
   # 使用 Python
   python -m http.server 8000
   
   # 使用 Node.js
   npx http-server
   
   # 使用 Live Server (VS Code 擴充套件)
   ```

2. **開啟瀏覽器**: 訪問 `http://localhost:8000`

### 生產部署

1. 將所有檔案上傳至網頁伺服器
2. 確保伺服器支援正確的 MIME 類型設定
3. 建議啟用 gzip 壓縮和瀏覽器快取

## 🔧 開發工具

### 主題系統 API
開發環境下可透過全域函數控制主題：

```javascript
// 在瀏覽器控制台輸入
window.setTheme('mid-autumn');      // 中秋主題
window.setTheme('christmas');       // 聖誕主題
window.setTheme('lunar-new-year');  // 新年主題
window.setTheme('default');         // 預設主題

window.getCurrentTheme();           // 取得當前主題
window.getAvailableThemes();        // 取得所有可用主題
window.getThemeConfig();            // 取得完整主題配置

window.setAutoTheme();              // 根據月份自動選擇主題
```

### 主題設定檔案
- **修改預設主題**: 編輯 `js/core/theme-settings.js` 的 `DEFAULT_SETTINGS.currentTheme`
- **自訂主題配置**: 編輯 `js/core/theme-config.js` 中的 `THEME_CONFIGS` 物件
- **啟用自動切換**: 將 `js/core/theme-settings.js` 中 `autoTheme` 改為 `true`

### 自動主題月份對應邏輯

自動主題根據當前月份自動選擇對應的節日主題，程式邏輯分佈在三個檔案：

#### 1. **核心月份判斷邏輯** - `js/core/theme-config.js`

```javascript
static getAutoTheme() {
    const month = new Date().getMonth() + 1;
    if (month === 9) {
        return 'mid-autumn';      // 9月 → 中秋主題
    } else if (month === 12) {
        return 'christmas';       // 12月 → 聖誕主題
    } else if (month === 1 || month === 2) {
        return 'lunar-new-year';  // 1-2月 → 新年主題
    }
    return 'default';             // 其他月份 → 預設主題
}
```
> 修改月份對應：編輯此方法中的月份判斷條件

#### 2. **自動主題開關設定** - `js/core/theme-settings.js`

```javascript
const DEFAULT_SETTINGS = {
    currentTheme: 'default',
    autoTheme: false,           // ← 改為 true 啟用自動主題
    rememberTheme: true,
    showIndicator: true
};
```
> 啟用自動主題：將 `autoTheme` 改為 `true`

#### 3. **初始化調用** - `js/core/app.js`

```javascript
initializeThemeSystem() {
    const settings = ThemeSettings.loadSettings();
    if (settings.autoTheme) {
        // 如果啟用自動主題，就調用 getAutoTheme()
        const autoTheme = ThemeConfig.getAutoTheme();
        this.setTheme(autoTheme);
    } else {
        // 否則使用保存的主題
        this.setTheme(settings.currentTheme);
    }
}
```

**月份對應表：**

| 月份 | 主題 | 檔案位置 |
|------|------|---------|
| 1-2月 | `lunar-new-year` | js/core/theme-config.js |
| 9月 | `mid-autumn` | js/core/theme-config.js |
| 12月 | `christmas` | js/core/theme-config.js |
| 其他月份 | `default` | js/core/theme-config.js |

---

### 除錯模式
開發環境下可使用內建除錯工具：

```javascript
// 在瀏覽器控制台輸入
MofanbicDebug.help()          // 顯示可用指令
MofanbicDebug.getState()      // 取得應用狀態
MofanbicDebug.testNotification('success')  // 測試通知
```

### 效能監控
- 自動測量頁面載入時間
- 提供效能優化建議
- 錯誤自動追蹤和報告

## 📱 功能說明

### 導航系統
- 固定式導航欄，滾動時智能隱藏/顯示
- 手機版漢堡選單，支援觸控和鍵盤操作
- 平滑滾動到指定區域

### 表單處理
- 即時輸入驗證
- 台灣電話號碼格式化
- 字數統計和限制
- 表單提交狀態管理

### 動畫效果
- 滾動觸發的進場動畫
- 數字計數動畫
- 視差滾動效果
- 可切換動畫狀態（無障礙考量）

### 通知系統
- 多種通知類型（成功、錯誤、警告、資訊）
- 可自定義位置和持續時間
- 支援鍵盤關閉和點擊關閉

## 🔄 更新歷程

### v1.1.0 (2025-01-26) - 模組化重構
- ✅ 重構單體 JavaScript 為模組化架構
- ✅ 移除重複 CSS 檔案
- ✅ 增強表單驗證功能
- ✅ 改善動畫效能
- ✅ 加強無障礙設計
- ✅ 添加開發除錯工具

### v1.0.0 - 初始版本
- 基本網站功能
- 響應式設計
- 表單處理
- 基礎動畫效果

## 🤝 維護與支援

### 程式碼品質
- 模組化設計，便於維護和擴展
- 完整的錯誤處理機制
- 清晰的程式碼註解和文件

### 建議的改善項目
1. **SEO 優化**: 添加結構化資料和 meta 標籤
2. **國際化**: 多語言支援
3. **A/B 測試**: 用戶體驗優化測試
4. **Analytics**: Google Analytics 深度整合
5. **PWA**: Progressive Web App 功能

## 📞 聯絡資訊

- **電話**: 02-2754-3029
- **地址**: 台北市大安區安和路二段69巷8號
- **LINE**: @mofanbic

---

*此專案採用現代化的前端開發實務，注重用戶體驗、效能優化和可維護性。*