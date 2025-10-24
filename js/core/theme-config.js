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
                    decorationOpacity: 0.85,
                    decorationType: 'lanterns',
                    fireworkEffect: true,
                    goldCoinRain: true
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
        if (config.elements.goldCoinRain) {
            this.addGoldCoinRain();
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
    }

    /**
     * 建立燈籠裝飾
     */
    createLanternDecorations(container, config) {
        // 吉祥字陣列，輪流顯示
        const blessings = ['福', '發', '財', '春', '喜', '吉'];
        
        const positions = [
            { top: '10%', left: '10%' },
            { top: '10%', left: '90%' },
            { top: '30%', left: '5%' },
            { top: '30%', left: '95%' },
            { top: '50%', left: '8%' },
            { top: '50%', left: '92%' }
        ];

        positions.forEach((pos, i) => {
            const lantern = document.createElement('div');
            lantern.className = 'decoration-lantern';
            
            // 扁圓形燈籠造型（寬 > 高）
            const width = 55;
            const height = 40;
            
            lantern.style.cssText = `
                position: fixed;
                top: ${pos.top};
                left: ${pos.left};
                width: ${width}px;
                height: ${height}px;
                background: linear-gradient(135deg, ${config.colors.accent} 0%, ${config.colors.roseGold} 100%);
                border-radius: 50%;
                opacity: ${config.elements.decorationOpacity};
                z-index: 10;
                transform-origin: top center;
                animation: lanternSwing ${3 + i * 0.3}s ease-in-out infinite;
                animation-delay: ${i * 0.2}s;
                pointer-events: none;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            `;

            // 添加燈籠裝飾細節（吊繩、底部流蘇、吉祥字）
            lantern.innerHTML = `
                <div style="position: absolute; top: -8px; left: 50%; transform: translateX(-50%); width: 2px; height: 8px; background: ${config.colors.roseGoldDark};"></div>
                <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); width: 6px; height: 6px; background: ${config.colors.gold || config.colors.roseGoldDark}; border-radius: 50%;"></div>
                <div style="position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); width: 12px; height: 8px; background: ${config.colors.gold || config.colors.accent}; border-radius: 0 0 6px 6px;"></div>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 14px; font-weight: bold; color: ${config.colors.gold || '#FFD700'};">${blessings[i]}</div>
            `;

            container.appendChild(lantern);
        });
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
        // 清除之前的計時器（如果存在）
        if (this.fireworkInterval) {
            clearInterval(this.fireworkInterval);
        }

        // 設定新的煙火計時器
        this.fireworkInterval = setInterval(() => {
            if (Math.random() < 0.3) { // 30% 機率觸發
                this.createFirework();
            }
        }, 3000);

        // 立即創建一個煙火作為測試
        setTimeout(() => this.createFirework(), 500);
    }

    /**
     * 建立煙火動畫
     */
    createFirework() {
        const container = document.getElementById('festival-theme-settings');
        if (!container) {
            console.warn('找不到煙火容器元素');
            return;
        }

        const firework = document.createElement('div');
        firework.className = 'firework';
        
        // 隨機位置
        const top = Math.random() * 60 + 20; // 20%-80%
        const left = Math.random() * 80 + 10; // 10%-90%
        
        firework.style.cssText = `
            position: fixed;
            top: ${top}%;
            left: ${left}%;
            width: 8px;
            height: 8px;
            background: ${this.getThemeConfig().colors.accent};
            border-radius: 50%;
            pointer-events: none;
            z-index: 100;
            font-size: 0;
        `;

        container.appendChild(firework);

        // 煙火爆炸動畫
        setTimeout(() => {
            firework.style.animation = 'fireworkExplode 1.5s ease-out forwards';
            firework.style.fontSize = '32px';
            firework.innerHTML = '🎆';

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
     * 添加玉兔跳躍動畫（使用 CSS 繪製，避免 emoji 跨平台差異）
     */
    addRabbitAnimation() {
        const container = document.getElementById('festival-theme-settings');
        if (!container) return;

        // 先移除舊的兔子元素，防止 DOM 堆積
        const oldRabbit = container.querySelector('.rabbit-decoration');
        if (oldRabbit) {
            oldRabbit.remove();
        }

        // 計算響應式位置和大小
        const viewportWidth = window.innerWidth;
        
        let bottomPos = '20%';
        let leftPos = '5%';
        let scale = 1;
        
        if (viewportWidth <= 480) {
            bottomPos = '15%';
            leftPos = '3%';
            scale = 0.7;
        } else if (viewportWidth <= 768) {
            bottomPos = '18%';
            leftPos = '4%';
            scale = 0.85;
        }

        const rabbit = document.createElement('div');
        rabbit.className = 'rabbit-decoration css-rabbit';
        
        rabbit.style.cssText = `
            position: fixed;
            bottom: ${bottomPos};
            left: ${leftPos};
            width: ${50 * scale}px;
            height: ${60 * scale}px;
            opacity: 0.8;
            z-index: 10;
            animation: rabbitHop 4s ease-in-out infinite;
            pointer-events: none;
            transform: scale(${scale});
        `;

        // 使用 CSS 繪製玉兔（強調長耳朵）
        rabbit.innerHTML = `
            <!-- 左耳 -->
            <div style="position: absolute; bottom: 45px; left: 8px; width: 12px; height: 35px; background: white; border-radius: 6px 6px 0 0; border: 2px solid #E8B4B8; transform: rotate(-15deg);"></div>
            <!-- 右耳 -->
            <div style="position: absolute; bottom: 45px; right: 8px; width: 12px; height: 35px; background: white; border-radius: 6px 6px 0 0; border: 2px solid #E8B4B8; transform: rotate(15deg);"></div>
            <!-- 耳朵內側 -->
            <div style="position: absolute; bottom: 50px; left: 11px; width: 6px; height: 20px; background: #FFC0CB; border-radius: 3px; transform: rotate(-15deg);"></div>
            <div style="position: absolute; bottom: 50px; right: 11px; width: 6px; height: 20px; background: #FFC0CB; border-radius: 3px; transform: rotate(15deg);"></div>
            <!-- 頭部 -->
            <div style="position: absolute; bottom: 20px; left: 5px; width: 40px; height: 35px; background: white; border-radius: 50% 50% 45% 45%; border: 2px solid #E8B4B8;"></div>
            <!-- 眼睛 -->
            <div style="position: absolute; bottom: 35px; left: 15px; width: 4px; height: 4px; background: black; border-radius: 50%;"></div>
            <div style="position: absolute; bottom: 35px; right: 15px; width: 4px; height: 4px; background: black; border-radius: 50%;"></div>
            <!-- 鼻子 -->
            <div style="position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%); width: 3px; height: 3px; background: #FFB6C1; border-radius: 50%;"></div>
            <!-- 嘴巴 -->
            <div style="position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%); width: 8px; height: 4px; border: 1px solid #FFB6C1; border-top: none; border-radius: 0 0 50% 50%;"></div>
            <!-- 身體 -->
            <div style="position: absolute; bottom: 0; left: 8px; width: 34px; height: 25px; background: white; border-radius: 40%; border: 2px solid #E8B4B8;"></div>
            <!-- 尾巴 -->
            <div style="position: absolute; bottom: 8px; right: 3px; width: 8px; height: 8px; background: white; border-radius: 50%; border: 2px solid #E8B4B8;"></div>
        `;

        container.appendChild(rabbit);
    }

    /**
     * 添加雲層漂浮動畫（使用 CSS 繪製，避免 emoji 跨平台差異）
     */
    addCloudAnimation() {
        const container = document.getElementById('festival-theme-settings');
        if (!container) return;

        const cloudCount = 3;
        const cloudPositions = [
            { top: '10%', right: '10%' },
            { top: '30%', right: '25%' },
            { top: '50%', right: '40%' }
        ];

        cloudPositions.forEach((pos, i) => {
            const cloud = document.createElement('div');
            cloud.className = 'cloud-decoration css-cloud';
            
            cloud.style.cssText = `
                position: fixed;
                top: ${pos.top};
                right: ${pos.right};
                width: 80px;
                height: 40px;
                background: white;
                border-radius: 50px;
                opacity: 0.6;
                z-index: 1;
                animation: cloudDrift ${5 + i}s ease-in-out infinite;
                animation-delay: ${i * 0.5}s;
                pointer-events: none;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            `;

            // 添加雲朵的圓形部分，讓它更真實
            cloud.innerHTML = `
                <div style="position: absolute; top: -15px; left: 15px; width: 30px; height: 30px; background: white; border-radius: 50%;"></div>
                <div style="position: absolute; top: -20px; left: 35px; width: 35px; height: 35px; background: white; border-radius: 50%;"></div>
                <div style="position: absolute; top: -15px; right: 15px; width: 28px; height: 28px; background: white; border-radius: 50%;"></div>
            `;

            container.appendChild(cloud);
        });
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
     * 添加金幣灑落動畫
     */
    addGoldCoinRain() {
        const container = document.getElementById('festival-theme-settings');
        if (!container) return;

        // 清除之前的計時器
        if (this.goldCoinInterval) {
            clearInterval(this.goldCoinInterval);
        }

        // 每隔一段時間創建新的金幣
        this.goldCoinInterval = setInterval(() => {
            this.createGoldCoin(container);
        }, 800);

        // 立即創建幾個金幣
        for (let i = 0; i < 3; i++) {
            setTimeout(() => this.createGoldCoin(container), i * 300);
        }
    }

    /**
     * 創建金幣元素
     */
    createGoldCoin(container) {
        const coin = document.createElement('div');
        coin.className = 'gold-coin';
        coin.innerHTML = '💰';
        
        const leftPos = Math.random() * 90 + 5; // 5%-95%
        const duration = Math.random() * 2 + 3; // 3-5秒
        const size = Math.random() * 10 + 20; // 20-30px
        
        coin.style.cssText = `
            position: fixed;
            top: -50px;
            left: ${leftPos}%;
            font-size: ${size}px;
            opacity: 0.8;
            z-index: 50;
            animation: coinFall ${duration}s linear forwards;
            pointer-events: none;
        `;

        container.appendChild(coin);

        // 動畫結束後移除元素
        setTimeout(() => {
            coin.remove();
        }, duration * 1000);
    }

    /* addLanternSwing 已整合到 createLanternDecorations 中 */

    /**
     * 移除裝飾元素
     */
    removeDecorations() {
        const container = document.getElementById('festival-theme-settings');
        if (container) {
            container.innerHTML = '';
        }

        // 清除所有計時器
        if (this.fireworkInterval) {
            clearInterval(this.fireworkInterval);
            this.fireworkInterval = null;
        }
        if (this.goldCoinInterval) {
            clearInterval(this.goldCoinInterval);
            this.goldCoinInterval = null;
        }

        // 移除動畫元素
        const fireworks = document.querySelectorAll('.firework');
        fireworks.forEach(fw => fw.remove());
        
        const coins = document.querySelectorAll('.gold-coin');
        coins.forEach(c => c.remove());
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