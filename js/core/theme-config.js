/**
 * 主題設定系統
 * 管理網站主題配置與切換
 */

import { ThemeSettings } from './theme-settings.js';

export class ThemeConfig {
    constructor() {
        this.themes = this.initializeThemes();
        this.settings = new ThemeSettings();
        this.currentTheme = this.determineInitialTheme();
        this.init();
    }

    /**
     * 決定初始主題
     */
    determineInitialTheme() {
        const storedTheme = this.getStoredTheme();
        
        // 檢查是否啟用自動主題
        const autoThemeEnabled = this.settings.isAutoThemeEnabled();
        console.log(`⚙️ 自動主題設定: ${autoThemeEnabled ? '啟用' : '停用'}`);
        
        if (autoThemeEnabled) {
            const now = new Date();
            const month = now.getMonth() + 1;
            
            // 根據月份決定自動主題
            let autoTheme = 'default';
            if (month === 9 || month === 10) {
                autoTheme = 'mid-autumn';
            } else if (month === 12) {
                autoTheme = 'christmas';
            } else if (month === 1 || month === 2) {
                autoTheme = 'lunar-new-year';
            }
            
            if (autoTheme !== 'default') {
                console.log(`🎯 自動主題已啟用: ${autoTheme} (當前月份: ${month}月)`);
                return autoTheme;
            }
            
            console.log(`📅 當前月份 ${month}月 無對應節日主題，使用儲存的主題或預設主題`);
        } else {
            console.log('⚙️ 自動主題已停用，使用儲存的主題');
        }
        
        // 使用儲存的主題或預設主題
        const finalTheme = storedTheme || 'default';
        console.log(`📌 最終使用主題: ${finalTheme}`);
        return finalTheme;
    }

    /**
     * 初始化主題系統
     */
    init() {
        this.applyTheme(this.currentTheme);
        console.log(`🎨 主題系統已載入，目前主題: ${this.currentTheme}`);
    }

    /**
     * 初始化所有主題配置
     */
    initializeThemes() {
        return {
            'default': {
                name: '預設主題',
                description: '莫凡比精品服飾標準主題',
                colors: {
                    primary: '#33A8C4',
                    secondary: '#8B7355',
                    accent: '#E8B4B8',
                    background: '#FCFCF9',
                    surface: '#FFFEF7',
                    text: '#13323C',
                    textSecondary: '#627082',
                    border: '#E8B4B8',
                    roseGold: '#E8B4B8',
                    roseGoldLight: '#F5D5D7',
                    roseGoldDark: '#D4969A'
                },
                gradients: {
                    primary: 'linear-gradient(135deg, #E8B4B8 0%, #F7E7CE 100%)',
                    hero: 'linear-gradient(135deg, rgba(232, 180, 184, 0.8) 0%, rgba(247, 231, 206, 0.8) 100%)',
                    card: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 246, 244, 0.9) 100%)'
                },
                animations: {
                    enabled: true,
                    duration: '0.3s',
                    easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
                },
                elements: {
                    showDecorations: false,
                    decorationOpacity: 0.1
                }
            },

            'mid-autumn': {
                name: '中秋主題',
                description: '月圓人團圓，溫馨中秋時節',
                colors: {
                    primary: '#C9A961',
                    secondary: '#1a3a52',
                    accent: '#b8c5d6',
                    background: '#FFF8DC',
                    surface: '#F5DEB3',
                    text: '#8B4513',
                    textSecondary: '#A0522D',
                    border: '#DEB887',
                    roseGold: '#D4A574',
                    roseGoldLight: '#FFE4B5',
                    roseGoldDark: '#CD853F',
                    amber: '#D4A574'
                },
                gradients: {
                    primary: 'linear-gradient(135deg, #FFE4B5 0%, #DEB887 100%)',
                    hero: 'linear-gradient(135deg, rgba(255, 228, 181, 0.8) 0%, rgba(222, 184, 135, 0.8) 100%)',
                    card: 'linear-gradient(145deg, rgba(245, 222, 179, 0.9) 0%, rgba(222, 184, 135, 0.9) 100%)'
                },
                animations: {
                    enabled: true,
                    duration: '0.4s',
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                },
                elements: {
                    showDecorations: true,
                    decorationOpacity: 0.15,
                    decorationType: 'lanterns',
                    moonPhase: 'full',
                    rabbitAnimation: true,
                    cloudAnimation: true
                }
            },

            'christmas': {
                name: '聖誕主題',
                description: '溫暖喜悅的聖誕佳節',
                colors: {
                    primary: '#1B5E20',
                    secondary: '#8B0000',
                    accent: '#FFD700',
                    background: '#F9F9F9',
                    surface: '#E8F5E9',
                    text: '#1B5E20',
                    textSecondary: '#616161',
                    border: '#D4AF37',
                    roseGold: '#D4AF37',
                    roseGoldLight: '#FFF8E1',
                    roseGoldDark: '#B8860B',
                    silver: '#C0C0C0'
                },
                gradients: {
                    primary: 'linear-gradient(135deg, #D4AF37 0%, #2D5A27 100%)',
                    hero: 'linear-gradient(135deg, rgba(45, 90, 39, 0.8) 0%, rgba(212, 175, 55, 0.7) 100%)',
                    card: 'linear-gradient(145deg, rgba(232, 245, 233, 0.9) 0%, rgba(255, 255, 255, 0.9) 100%)'
                },
                animations: {
                    enabled: true,
                    duration: '0.5s',
                    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                    animationStyle: 'gentle-swing'
                },
                elements: {
                    showDecorations: true,
                    decorationOpacity: 0.2,
                    decorationType: 'snowflakes',
                    sparkleEffect: true,
                    lightStringAnimation: true,
                    ballShineAnimation: true
                }
            },

            'lunar-new-year': {
                name: '新年主題',
                description: '恭喜發財，新年新氣象',
                colors: {
                    primary: '#C53030',
                    secondary: '#B7791F',
                    accent: '#FEB2B2',
                    background: '#FFF5F5',
                    surface: '#FED7D7',
                    text: '#C53030',
                    textSecondary: '#9C2E2E',
                    border: '#FC8181',
                    roseGold: '#C53030',
                    roseGoldLight: '#FEB2B2',
                    roseGoldDark: '#9C1A1C',
                    gold: '#FFD700'
                },
                gradients: {
                    primary: 'linear-gradient(135deg, #FEB2B2 0%, #FC8181 100%)',
                    hero: 'linear-gradient(135deg, rgba(254, 178, 178, 0.8) 0%, rgba(252, 129, 129, 0.8) 100%)',
                    card: 'linear-gradient(145deg, rgba(254, 215, 215, 0.9) 0%, rgba(252, 129, 129, 0.9) 100%)'
                },
                animations: {
                    enabled: true,
                    duration: '0.4s',
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    animationStyle: 'tada'
                },
                elements: {
                    showDecorations: true,
                    decorationOpacity: 0.18,
                    decorationType: 'lanterns',
                    fireworkEffect: true,
                    curtainAnimation: true,
                    scrollAnimation: true
                }
            }
        };
    }

    /**
     * 取得當前主題
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * 取得主題配置
     */
    getThemeConfig(themeName = null) {
        const theme = themeName || this.currentTheme;
        return this.themes[theme] || this.themes['default'];
    }

    /**
     * 設定主題
     */
    setTheme(themeName) {
        if (!this.themes[themeName]) {
            console.warn(`未知的主題: ${themeName}`);
            return false;
        }

        this.currentTheme = themeName;
        this.applyTheme(themeName);
        this.saveTheme(themeName);

        console.log(`🎨 已切換到主題: ${this.getThemeConfig(themeName).name}`);
        return true;
    }

    /**
     * 套用主題
     */
    applyTheme(themeName) {
        const config = this.getThemeConfig(themeName);
        const root = document.documentElement;

        // 套用顏色變數
        Object.entries(config.colors).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
        });

        // 套用漸變變數
        Object.entries(config.gradients).forEach(([key, value]) => {
            root.style.setProperty(`--gradient-${key}`, value);
        });

        // 套用動畫設定
        root.style.setProperty('--animation-duration', config.animations.duration);
        root.style.setProperty('--animation-easing', config.animations.easing);

        // 套用主題類別
        document.body.className = document.body.className
            .replace(/theme-\w+/g, '')
            .trim();
        document.body.classList.add(`theme-${themeName}`);

        // 套用裝飾元素
        this.applyDecorations(config);

        // 觸發主題變更事件
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: themeName, config: config }
        }));
    }

    /**
     * 套用裝飾元素
     */
    applyDecorations(config) {
        if (!config.elements.showDecorations) {
            this.removeDecorations();
            return;
        }

        const decorationContainer = document.getElementById('festival-theme-settings');
        if (!decorationContainer) return;

        decorationContainer.innerHTML = '';

        if (config.elements.decorationType === 'lanterns') {
            this.createLanternDecorations(decorationContainer, config);
        } else if (config.elements.decorationType === 'snowflakes') {
            this.createSnowflakeDecorations(decorationContainer, config);
        }

        // 特殊效果
        if (config.elements.sparkleEffect) {
            this.addSparkleEffect();
        }
        if (config.elements.fireworkEffect) {
            this.addFireworkEffect();
        }
        if (config.elements.moonPhase) {
            this.addMoonEffect();
        }
        if (config.elements.rabbitAnimation) {
            this.addRabbitAnimation();
        }
        if (config.elements.cloudAnimation) {
            this.addCloudAnimation();
        }
        if (config.elements.lightStringAnimation) {
            this.addLightStringAnimation();
        }
        if (config.elements.ballShineAnimation) {
            this.addBallShineAnimation();
        }
        if (config.elements.curtainAnimation) {
            this.addCurtainAnimation();
        }
        if (config.elements.scrollAnimation) {
            this.addScrollAnimation();
        }
    }

    /**
     * 建立燈籠裝飾
     */
    createLanternDecorations(container, config) {
        const lanternCount = 6;
        for (let i = 0; i < lanternCount; i++) {
            const lantern = document.createElement('div');
            lantern.className = 'decoration-lantern';
            lantern.style.cssText = `
                position: fixed;
                top: ${Math.random() * 60 + 20}%;
                left: ${Math.random() * 90 + 5}%;
                width: 40px;
                height: 60px;
                background: ${config.colors.accent};
                border-radius: 20px 20px 5px 5px;
                opacity: ${config.elements.decorationOpacity};
                z-index: 1;
                animation: lanternFloat 4s ease-in-out infinite;
                animation-delay: ${i * 0.5}s;
                pointer-events: none;
            `;

            // 添加燈籠內容
            lantern.innerHTML = `
                <div style="position: absolute; top: 8px; left: 50%; transform: translateX(-50%); width: 30px; height: 8px; background: ${config.colors.roseGoldDark}; border-radius: 4px;"></div>
                <div style="position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%); width: 8px; height: 8px; background: ${config.colors.roseGold}; border-radius: 50%;"></div>
            `;

            container.appendChild(lantern);
        }
    }

    /**
     * 建立雪花裝飾
     */
    createSnowflakeDecorations(container, config) {
        const snowflakeCount = 20;
        for (let i = 0; i < snowflakeCount; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'decoration-snowflake';
            snowflake.innerHTML = '❄';
            snowflake.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}%;
                font-size: ${Math.random() * 20 + 10}px;
                color: ${config.colors.accent};
                opacity: ${config.elements.decorationOpacity * 2};
                z-index: 1;
                animation: snowfall ${Math.random() * 3 + 5}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
                pointer-events: none;
            `;

            container.appendChild(snowflake);
        }
    }

    /**
     * 添加閃爍效果
     */
    addSparkleEffect() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes sparkle {
                0%, 100% { opacity: 0; transform: scale(0.8); }
                50% { opacity: 1; transform: scale(1.2); }
            }
            .sparkle-effect {
                animation: sparkle 2s ease-in-out infinite;
            }
        `;
        document.head.appendChild(style);

        // 為主要元素添加閃爍效果
        const elements = document.querySelectorAll('.btn-primary, .service-card, .contact-card');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('sparkle-effect');
            }, index * 200);
        });
    }

    /**
     * 添加煙火效果
     */
    addFireworkEffect() {
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% 機率觸發
                this.createFirework();
            }
        }, 3000);
    }

    /**
     * 建立煙火動畫
     */
    createFirework() {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.cssText = `
            position: fixed;
            top: ${Math.random() * 60 + 20}%;
            left: ${Math.random() * 80 + 10}%;
            width: 4px;
            height: 4px;
            background: ${this.getThemeConfig().colors.accent};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;

        document.body.appendChild(firework);

        // 煙火爆炸動畫
        setTimeout(() => {
            firework.style.animation = 'fireworkExplode 1.5s ease-out forwards';
            firework.innerHTML = '✨';

            setTimeout(() => {
                firework.remove();
            }, 1500);
        }, 100);
    }

    /**
     * 添加月亮效果
     */
    addMoonEffect() {
        const moon = document.createElement('div');
        moon.className = 'moon-decoration';
        moon.innerHTML = '🌕';
        moon.style.cssText = `
            position: fixed;
            top: 10%;
            right: 10%;
            font-size: 60px;
            opacity: 0.3;
            z-index: 1;
            animation: moonGlow 3s ease-in-out infinite alternate;
            pointer-events: none;
        `;

        const container = document.getElementById('festival-theme-settings');
        if (container) {
            container.appendChild(moon);
        }
    }

    /**
     * 添加玉兔跳躍動畫
     */
    addRabbitAnimation() {
        const container = document.getElementById('festival-theme-settings');
        if (!container) return;

        // 先移除舊的兔子元素，防止 DOM 堆積
        const oldRabbit = container.querySelector('.rabbit-decoration');
        if (oldRabbit) {
            oldRabbit.remove();
        }

        // 計算響應式位置
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        
        // 根據螢幕尺寸調整位置
        let bottomPos = '20%';
        let leftPos = '5%';
        let fontSize = '50px';
        
        if (viewportWidth <= 480) {
            // 手機
            bottomPos = '15%';
            leftPos = '3%';
            fontSize = '35px';
        } else if (viewportWidth <= 768) {
            // 平板
            bottomPos = '18%';
            leftPos = '4%';
            fontSize = '42px';
        }

        const rabbit = document.createElement('div');
        rabbit.className = 'rabbit-decoration';
        rabbit.innerHTML = '🐰';
        rabbit.style.cssText = `
            position: fixed;
            bottom: ${bottomPos};
            left: ${leftPos};
            font-size: ${fontSize};
            opacity: 0.6;
            z-index: 10;
            animation: rabbitHop 4s ease-in-out infinite;
            pointer-events: none;
        `;

        container.appendChild(rabbit);
    }

    /**
     * 添加雲層漂浮動畫
     */
    addCloudAnimation() {
        const cloudCount = 3;
        for (let i = 0; i < cloudCount; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'cloud-decoration';
            cloud.innerHTML = '☁';
            cloud.style.cssText = `
                position: fixed;
                top: ${10 + i * 20}%;
                right: ${10 + i * 15}%;
                font-size: 40px;
                opacity: 0.4;
                z-index: 1;
                animation: cloudDrift ${5 + i}s ease-in-out infinite;
                animation-delay: ${i * 0.5}s;
                pointer-events: none;
            `;

            const container = document.getElementById('festival-theme-settings');
            if (container) {
                container.appendChild(cloud);
            }
        }
    }

    /**
     * 添加聖誕燈串微閃動畫
     */
    addLightStringAnimation() {
        const lightCount = 8;
        for (let i = 0; i < lightCount; i++) {
            const light = document.createElement('div');
            light.className = 'light-string';
            light.innerHTML = '💡';
            light.style.cssText = `
                position: fixed;
                top: 5%;
                left: ${10 + i * 10}%;
                font-size: 24px;
                opacity: 0.5;
                z-index: 1;
                animation: twinkle ${2 + Math.random()}s ease-in-out infinite;
                animation-delay: ${i * 0.2}s;
                pointer-events: none;
            `;

            const container = document.getElementById('festival-theme-settings');
            if (container) {
                container.appendChild(light);
            }
        }
    }

    /**
     * 添加聖誕球反光動畫
     */
    addBallShineAnimation() {
        const ballCount = 6;
        for (let i = 0; i < ballCount; i++) {
            const ball = document.createElement('div');
            ball.className = 'christmas-ball';
            ball.innerHTML = '🎄';
            ball.style.cssText = `
                position: fixed;
                top: ${20 + Math.random() * 40}%;
                right: ${5 + i * 12}%;
                font-size: 32px;
                opacity: 0.6;
                z-index: 1;
                animation: shine ${3 + Math.random()}s ease-in-out infinite;
                animation-delay: ${i * 0.3}s;
                pointer-events: none;
            `;

            const container = document.getElementById('festival-theme-settings');
            if (container) {
                container.appendChild(ball);
            }
        }
    }

    /**
     * 添加紅包門簾開場動畫
     */
    addCurtainAnimation() {
        const curtain = document.createElement('div');
        curtain.className = 'curtain-decoration';
        curtain.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #C53030 0%, #9C1A1C 50%, #C53030 100%);
            z-index: 999;
            animation: curtainOpen 2s ease-in-out forwards;
            pointer-events: none;
        `;

        document.body.appendChild(curtain);

        setTimeout(() => {
            curtain.remove();
        }, 2000);
    }

    /**
     * 添加春聯捲軸展開動畫
     */
    addScrollAnimation() {
        const scroll = document.createElement('div');
        scroll.className = 'scroll-decoration';
        scroll.innerHTML = ''; // 吉祥如意賀新歲，迎春接福喜臨門
        scroll.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 48px;
            font-weight: bold;
            color: #FFD700;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            z-index: 998;
            animation: scrollUnroll 2s ease-in-out forwards;
            pointer-events: none;
            font-family: serif;
        `;

        document.body.appendChild(scroll);

        setTimeout(() => {
            scroll.remove();
        }, 2000);
    }

    /**
     * 移除裝飾元素
     */
    removeDecorations() {
        const container = document.getElementById('festival-theme-settings');
        if (container) {
            container.innerHTML = '';
        }

        // 移除煙火動畫樣式
        const fireworks = document.querySelectorAll('.firework');
        fireworks.forEach(fw => fw.remove());

        // 移除特殊動畫元素
        const curtains = document.querySelectorAll('.curtain-decoration');
        curtains.forEach(c => c.remove());

        const scrolls = document.querySelectorAll('.scroll-decoration');
        scrolls.forEach(s => s.remove());
    }

    /**
     * 儲存主題設定
     */
    saveTheme(themeName) {
        localStorage.setItem('mofanbic-theme', themeName);
    }

    /**
     * 取得儲存的主題
     */
    getStoredTheme() {
        return localStorage.getItem('mofanbic-theme');
    }

    /**
     * 清除主題設定
     */
    clearTheme() {
        localStorage.removeItem('mofanbic-theme');
        this.setTheme('default');
    }

    /**
     * 取得所有可用主題
     */
    getAvailableThemes() {
        return Object.keys(this.themes).map(key => ({
            id: key,
            ...this.themes[key]
        }));
    }

    /**
     * 根據月份自動選擇主題
     */
    setAutoTheme() {
        const now = new Date();
        const month = now.getMonth() + 1;

        let autoTheme = 'default';

        // 中秋節（農曆8月15日，約陽曆9-10月）
        if (month === 9 || month === 10) {
            autoTheme = 'mid-autumn';
        }
        // 聖誕節（12月）
        else if (month === 12) {
            autoTheme = 'christmas';
        }
        // 農曆新年（1-2月）
        else if (month === 1 || month === 2) {
            autoTheme = 'lunar-new-year';
        }

        this.setTheme(autoTheme);
    }
}

export default ThemeConfig;