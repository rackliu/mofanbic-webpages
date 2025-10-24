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
                autoTheme = 'mid-autumn';// mid-autumn
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
     * 添加鞭炮效果
     */
    addFireworkEffect() {
        // 清除之前的計時器（如果存在）
        if (this.fireworkInterval) {
            clearInterval(this.fireworkInterval);
        }

        // 設定新的鞭炮計時器 - 降低觸發頻率
        this.fireworkInterval = setInterval(() => {
            if (Math.random() < 0.25) { // 25% 機率觸發
                this.createFirecracker();
            }
        }, 4000); // 每4秒檢查一次

        // 立即創建一個鞭炮作為測試
        setTimeout(() => this.createFirecracker(), 800);
    }

    /**
     * 建立鞭炮動畫（CSS 繪製）
     */
    createFirecracker() {
        const container = document.getElementById('festival-theme-settings');
        if (!container) {
            console.warn('找不到鞭炮容器元素');
            return;
        }

        const firecracker = document.createElement('div');
        firecracker.className = 'firecracker';
        
        // 隨機位置
        const top = Math.random() * 50 + 25; // 25%-75%
        const left = Math.random() * 70 + 15; // 15%-85%
        
        // 隨機顏色（紅色系）
        const colors = ['#FF4444', '#FF6B6B', '#FF8888', '#FF3333', '#CC0000'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        firecracker.style.cssText = `
            position: fixed;
            top: ${top}%;
            left: ${left}%;
            width: 60px;
            height: 60px;
            pointer-events: none;
            z-index: 100;
            animation: firecrackerExplode 2s ease-out forwards;
        `;

        // CSS 繪製鞭炮爆炸效果
        firecracker.innerHTML = `
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%;">
                <!-- 中心爆炸點 -->
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 12px; height: 12px; background: ${color}; border-radius: 50%; box-shadow: 0 0 20px ${color}, 0 0 40px ${color};"></div>
                <!-- 爆炸光芒 - 8個方向 -->
                <div style="position: absolute; top: 50%; left: 50%; width: 30px; height: 3px; background: linear-gradient(90deg, ${color} 0%, transparent 100%); transform: translate(-50%, -50%) rotate(0deg); border-radius: 2px;"></div>
                <div style="position: absolute; top: 50%; left: 50%; width: 30px; height: 3px; background: linear-gradient(90deg, ${color} 0%, transparent 100%); transform: translate(-50%, -50%) rotate(45deg); border-radius: 2px;"></div>
                <div style="position: absolute; top: 50%; left: 50%; width: 30px; height: 3px; background: linear-gradient(90deg, ${color} 0%, transparent 100%); transform: translate(-50%, -50%) rotate(90deg); border-radius: 2px;"></div>
                <div style="position: absolute; top: 50%; left: 50%; width: 30px; height: 3px; background: linear-gradient(90deg, ${color} 0%, transparent 100%); transform: translate(-50%, -50%) rotate(135deg); border-radius: 2px;"></div>
                <div style="position: absolute; top: 50%; left: 50%; width: 30px; height: 3px; background: linear-gradient(90deg, ${color} 0%, transparent 100%); transform: translate(-50%, -50%) rotate(180deg); border-radius: 2px;"></div>
                <div style="position: absolute; top: 50%; left: 50%; width: 30px; height: 3px; background: linear-gradient(90deg, ${color} 0%, transparent 100%); transform: translate(-50%, -50%) rotate(225deg); border-radius: 2px;"></div>
                <div style="position: absolute; top: 50%; left: 50%; width: 30px; height: 3px; background: linear-gradient(90deg, ${color} 0%, transparent 100%); transform: translate(-50%, -50%) rotate(270deg); border-radius: 2px;"></div>
                <div style="position: absolute; top: 50%; left: 50%; width: 30px; height: 3px; background: linear-gradient(90deg, ${color} 0%, transparent 100%); transform: translate(-50%, -50%) rotate(315deg); border-radius: 2px;"></div>
                <!-- 金色火花點 -->
                <div style="position: absolute; top: 20%; left: 20%; width: 4px; height: 4px; background: #FFD700; border-radius: 50%; box-shadow: 0 0 8px #FFD700;"></div>
                <div style="position: absolute; top: 20%; right: 20%; width: 4px; height: 4px; background: #FFD700; border-radius: 50%; box-shadow: 0 0 8px #FFD700;"></div>
                <div style="position: absolute; bottom: 20%; left: 20%; width: 4px; height: 4px; background: #FFD700; border-radius: 50%; box-shadow: 0 0 8px #FFD700;"></div>
                <div style="position: absolute; bottom: 20%; right: 20%; width: 4px; height: 4px; background: #FFD700; border-radius: 50%; box-shadow: 0 0 8px #FFD700;"></div>
            </div>
        `;

        container.appendChild(firecracker);

        // 2秒後移除元素
        setTimeout(() => {
            firecracker.remove();
        }, 2000);
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
     * 添加玉兔跳躍動畫（使用 CSS 繪製擬真玉兔，避免 emoji 跨平台差異）
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
            width: ${60 * scale}px;
            height: ${80 * scale}px;
            opacity: 0.75;
            z-index: 10;
            animation: rabbitHop 4s ease-in-out infinite;
            pointer-events: none;
            transform: scale(${scale});
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
        `;

        // 使用 CSS 繪製擬真玉兔（強調修長的長耳朵和自然的體態）
        rabbit.innerHTML = `
            <!-- 左耳外層 -->
            <div style="position: absolute; bottom: 55px; left: 12px; width: 10px; height: 42px; background: linear-gradient(to bottom, #f8f8f8 0%, #e8e8e8 100%); border-radius: 5px 5px 2px 2px; transform: rotate(-12deg); box-shadow: inset 0 -2px 3px rgba(0,0,0,0.05);"></div>
            <!-- 右耳外層 -->
            <div style="position: absolute; bottom: 55px; right: 12px; width: 10px; height: 42px; background: linear-gradient(to bottom, #f8f8f8 0%, #e8e8e8 100%); border-radius: 5px 5px 2px 2px; transform: rotate(12deg); box-shadow: inset 0 -2px 3px rgba(0,0,0,0.05);"></div>
            <!-- 左耳內側 -->
            <div style="position: absolute; bottom: 60px; left: 14px; width: 5px; height: 28px; background: linear-gradient(to bottom, #ffd5d5 0%, #ffb8b8 100%); border-radius: 2.5px; transform: rotate(-12deg);"></div>
            <!-- 右耳內側 -->
            <div style="position: absolute; bottom: 60px; right: 14px; width: 5px; height: 28px; background: linear-gradient(to bottom, #ffd5d5 0%, #ffb8b8 100%); border-radius: 2.5px; transform: rotate(12deg);"></div>
            <!-- 頭部 -->
            <div style="position: absolute; bottom: 30px; left: 8px; width: 44px; height: 36px; background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%); border-radius: 50% 50% 48% 48%; box-shadow: 0 2px 6px rgba(0,0,0,0.08);"></div>
            <!-- 額頭亮點 -->
            <div style="position: absolute; bottom: 52px; left: 22px; width: 12px; height: 8px; background: radial-gradient(ellipse, rgba(255,255,255,0.8) 0%, transparent 70%); border-radius: 50%;"></div>
            <!-- 左眼 -->
            <div style="position: absolute; bottom: 48px; left: 18px; width: 6px; height: 7px; background: #2a2a2a; border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;"></div>
            <!-- 右眼 -->
            <div style="position: absolute; bottom: 48px; right: 16px; width: 6px; height: 7px; background: #2a2a2a; border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;"></div>
            <!-- 左眼高光 -->
            <div style="position: absolute; bottom: 51px; left: 20px; width: 2px; height: 2px; background: white; border-radius: 50%;"></div>
            <!-- 右眼高光 -->
            <div style="position: absolute; bottom: 51px; right: 18px; width: 2px; height: 2px; background: white; border-radius: 50%;"></div>
            <!-- 鼻子 -->
            <div style="position: absolute; bottom: 41px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; background: #ff9eaa; border-radius: 50% 50% 50% 0;"></div>
            <!-- 嘴巴左 -->
            <div style="position: absolute; bottom: 38px; left: 24px; width: 6px; height: 3px; border: 1.5px solid #ff9eaa; border-top: none; border-right: none; border-radius: 0 0 0 50%;"></div>
            <!-- 嘴巴右 -->
            <div style="position: absolute; bottom: 38px; right: 24px; width: 6px; height: 3px; border: 1.5px solid #ff9eaa; border-top: none; border-left: none; border-radius: 0 0 50% 0;"></div>
            <!-- 鬍鬚左上 -->
            <div style="position: absolute; bottom: 43px; left: 3px; width: 14px; height: 1px; background: rgba(100,100,100,0.3); transform: rotate(-5deg);"></div>
            <!-- 鬍鬚左下 -->
            <div style="position: absolute; bottom: 39px; left: 3px; width: 14px; height: 1px; background: rgba(100,100,100,0.3); transform: rotate(5deg);"></div>
            <!-- 鬍鬚右上 -->
            <div style="position: absolute; bottom: 43px; right: 3px; width: 14px; height: 1px; background: rgba(100,100,100,0.3); transform: rotate(5deg);"></div>
            <!-- 鬍鬚右下 -->
            <div style="position: absolute; bottom: 39px; right: 3px; width: 14px; height: 1px; background: rgba(100,100,100,0.3); transform: rotate(-5deg);"></div>
            <!-- 身體 -->
            <div style="position: absolute; bottom: 2px; left: 10px; width: 40px; height: 32px; background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%); border-radius: 50% 50% 48% 48%; box-shadow: 0 3px 8px rgba(0,0,0,0.1);"></div>
            <!-- 腹部白色區域 -->
            <div style="position: absolute; bottom: 4px; left: 18px; width: 24px; height: 24px; background: radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, transparent 70%); border-radius: 50%;"></div>
            <!-- 左前腳 -->
            <div style="position: absolute; bottom: 0; left: 16px; width: 10px; height: 12px; background: linear-gradient(to bottom, #f5f5f5 0%, #e8e8e8 100%); border-radius: 40% 40% 50% 50%;"></div>
            <!-- 右前腳 -->
            <div style="position: absolute; bottom: 0; left: 34px; width: 10px; height: 12px; background: linear-gradient(to bottom, #f5f5f5 0%, #e8e8e8 100%); border-radius: 40% 40% 50% 50%;"></div>
            <!-- 尾巴 -->
            <div style="position: absolute; bottom: 14px; right: 6px; width: 10px; height: 10px; background: radial-gradient(circle, #ffffff 0%, #e8e8e8 100%); border-radius: 50%; box-shadow: inset -1px -1px 2px rgba(0,0,0,0.05);"></div>
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
            { top: '25%', right: '40%' },
            { top: '40%', right: '25%' }
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
     * 添加金幣灑落動畫（CSS 繪製，減慢速度和頻率）
     */
    addGoldCoinRain() {
        const container = document.getElementById('festival-theme-settings');
        if (!container) return;

        // 清除之前的計時器
        if (this.goldCoinInterval) {
            clearInterval(this.goldCoinInterval);
        }

        // 降低頻率：每5.5秒創建新的金幣
        this.goldCoinInterval = setInterval(() => {
            this.createGoldCoin(container);
        }, 5500);

        // 初始只創建2個金幣，減少視覺混亂
        for (let i = 0; i < 2; i++) {
            setTimeout(() => this.createGoldCoin(container), i * 500);
        }
    }

    /**
     * 創建金幣元素（CSS 繪製）
     */
    createGoldCoin(container) {
        const coin = document.createElement('div');
        coin.className = 'gold-coin';
        
        const leftPos = Math.random() * 80 + 10; // 10%-90%
        const duration = Math.random() * 5 + 10; // 10-15秒（減慢速度）
        const size = Math.random() * 8 + 24; // 24-32px
        
        coin.style.cssText = `
            position: fixed;
            top: -50px;
            left: ${leftPos}%;
            width: ${size}px;
            height: ${size}px;
            opacity: 0.85;
            z-index: 50;
            animation: coinFall ${duration}s linear forwards;
            pointer-events: none;
        `;

        // CSS 繪製金幣（圓形，金色漸層）
        coin.innerHTML = `
            <div style="position: relative; width: 100%; height: 100%;">
                <!-- 金幣主體 -->
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at 30% 30%, #FFD700 0%, #FFA500 50%, #FF8C00 100%); border-radius: 50%; box-shadow: inset 0 -2px 4px rgba(0,0,0,0.3), 0 4px 8px rgba(255,215,0,0.5);"></div>
                <!-- 金幣高光 -->
                <div style="position: absolute; top: 15%; left: 20%; width: 40%; height: 30%; background: radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, transparent 70%); border-radius: 50%;"></div>
                <!-- 金幣符號 $ -->
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: ${size * 0.6}px; font-weight: bold; color: #8B4513; text-shadow: 0 1px 2px rgba(255,255,255,0.5);">$</div>
            </div>
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
        const firecrackers = document.querySelectorAll('.firecracker');
        firecrackers.forEach(fc => fc.remove());
        
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