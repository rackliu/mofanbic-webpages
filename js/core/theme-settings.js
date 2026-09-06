/**
 * 主題設定管理器
 * 提供主題切換的設定介面和持久化儲存
 */

export class ThemeSettings {
    constructor() {
        // 先定義預設設定
        this.defaultSettings = {
            currentTheme: 'default',
            autoTheme: false,
            rememberTheme: true,
            showIndicator: true,
            animationDuration: 500,
            enableDecorations: true
        };
        
        // 然後載入設定
        this.settings = this.loadSettings();
        console.log('⚙️ ThemeSettings 初始化完成:', this.settings);
    }

    /**
     * 載入設定
     */
    loadSettings() {
        try {
            const stored = localStorage.getItem('mofanbic-theme-settings');
            const loadedSettings = stored ? { ...this.defaultSettings, ...JSON.parse(stored) } : { ...this.defaultSettings };
            console.log('📂 載入主題設定:', loadedSettings);
            return loadedSettings;
        } catch (error) {
            console.warn('無法載入主題設定，使用預設設定:', error);
            return { ...this.defaultSettings };
        }
    }

    /**
     * 儲存設定
     */
    saveSettings() {
        try {
            localStorage.setItem('mofanbic-theme-settings', JSON.stringify(this.settings));
        } catch (error) {
            console.warn('無法儲存主題設定:', error);
        }
    }

    /**
     * 更新設定
     */
    updateSetting(key, value) {
        this.settings[key] = value;
        this.saveSettings();
    }

    /**
     * 取得設定值
     */
    getSetting(key) {
        return this.settings[key];
    }

    /**
     * 檢查是否啟用自動主題
     */
    isAutoThemeEnabled() {
        return this.settings.autoTheme;
    }

    /**
     * 檢查是否記住主題選擇
     */
    shouldRememberTheme() {
        return this.settings.rememberTheme;
    }

    /**
     * 檢查是否顯示主題切換指示器
     */
    shouldShowIndicator() {
        return this.settings.showIndicator;
    }

    /**
     * 取得動畫持續時間
     */
    getAnimationDuration() {
        return this.settings.animationDuration;
    }

    /**
     * 檢查是否啟用裝飾元素
     */
    areDecorationsEnabled() {
        return this.settings.enableDecorations;
    }

    /**
     * 重設為預設設定
     */
    resetToDefaults() {
        this.settings = { ...this.defaultSettings };
        this.saveSettings();
    }

    /**
     * 匯出設定（開發用）
     */
    exportSettings() {
        return { ...this.settings };
    }

    /**
     * 匯入設定（開發用）
     */
    importSettings(newSettings) {
        try {
            this.settings = { ...this.defaultSettings, ...newSettings };
            this.saveSettings();
            return true;
        } catch (error) {
            console.error('匯入設定失敗:', error);
            return false;
        }
    }
}

export default ThemeSettings;