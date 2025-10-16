/**
 * 動畫和視覺效果模組
 * 處理滾動動畫、視差效果、交互動畫等
 * 包含主題特定的動畫配置
 */

import { Helpers } from '../utils/helpers.js';

/**
 * 主題動畫配置
 */
export const themeAnimations = {
    'mid-autumn': {
        name: '中秋主題動畫',
        animations: [
            { name: 'rabbitHop', duration: '4s', description: '玉兔跳躍動畫' },
            { name: 'cloudDrift', duration: '5s', description: '雲層漂浮動畫' },
            { name: 'moonGlow', duration: '3s', description: '月亮微光閃爍' },
            { name: 'lanternFloat', duration: '4s', description: '燈籠漂浮動畫' }
        ]
    },
    'christmas': {
        name: '聖誕主題動畫',
        animations: [
            { name: 'snowfall', duration: '8s', description: '雪花飄落動畫' },
            { name: 'twinkle', duration: '2s', description: '聖誕燈串微閃' },
            { name: 'shine', duration: '3s', description: '聖誕球反光效果' }
        ]
    },
    'lunar-new-year': {
        name: '農曆新年主題動畫',
        animations: [
            { name: 'fireworkExplode', duration: '1.5s', description: '鞭炮煙火動畫' },
            { name: 'curtainOpen', duration: '2s', description: '紅包門簾開場' },
            { name: 'scrollUnroll', duration: '2s', description: '春聯捲軸展開' }
        ]
    }
};

export class AnimationSystem {
    constructor() {
        this.observer = null;
        this.isAnimationsPaused = false;
        this.parallaxElements = [];
        
        this.init();
    }

    init() {
        this.initScrollObserver();
        this.initParallaxEffects();
        this.initBackToTop();
        this.setupKeyboardControls();
        this.preloadImages();
    }

    /**
     * 初始化滾動觀察器
     */
    initScrollObserver() {
        const observerOptions = {
            threshold: [0.1, 0.3, 0.5],
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isAnimationsPaused) {
                    this.triggerAnimation(entry.target, entry.intersectionRatio);
                }
            });
        }, observerOptions);

        // 觀察需要動畫的元素
        this.observeAnimatedElements();
    }

    /**
     * 觀察需要動畫的元素
     */
    observeAnimatedElements() {
        const selectors = [
            '.service-card',
            '.contact-card', 
            '.transport-card', 
            '.stat-item', 
            '.announcement-card',
            '.brand-description',
            '.form-card'
        ];

        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.classList.add('animate-on-scroll');
                this.observer.observe(el);
            });
        });
    }

    /**
     * 觸發動畫
     * @param {HTMLElement} target - 目標元素
     * @param {number} ratio - 交集比例
     */
    triggerAnimation(target, ratio) {
        // 重置動畫以確保每次都能觸發
        target.classList.remove('animated');
        target.style.animation = 'none';
        // 强制浏览器重新计算样式
        void target.offsetWidth;

        // 為不同類型的元素添加不同的動畫
        if (target.classList.contains('service-card')) {
            this.animateServiceCard(target);
        } else if (target.classList.contains('stat-item')) {
            this.animateStatItem(target);
        } else if (target.classList.contains('contact-card')) {
            this.animateContactCard(target);
        } else {
            this.animateDefault(target);
        }

        target.classList.add('animated');
    }

    /**
     * 服務卡片動畫
     * @param {HTMLElement} card - 卡片元素
     */
    animateServiceCard(card) {
        const cards = document.querySelectorAll('.service-card');
        const index = Array.from(cards).indexOf(card);
        
        card.style.animationDelay = `${index * 0.15}s`;
        card.classList.add('animated');
        
        // 圖示特殊動畫
        const icon = card.querySelector('.service-icon');
        if (icon) {
            setTimeout(() => {
                icon.style.animation = 'bounceIn 0.8s ease-out forwards';
            }, (index * 150) + 300);
        }
    }

    /**
     * 統計項目動畫
     * @param {HTMLElement} statItem - 統計項目
     */
    animateStatItem(statItem) {
        const numberElement = statItem.querySelector('.stat-number');
        if (numberElement) {
            const finalNumber = parseInt(numberElement.textContent);
            this.animateCounter(numberElement, 0, finalNumber, 1500);
        }
        
        statItem.classList.add('animated');
        // 强制使用 scaleIn 动画
        statItem.style.animationName = 'scaleIn';
    }

    /**
     * 聯繫卡片動畫
     * @param {HTMLElement} card - 聯繫卡片
     */
    animateContactCard(card) {
        const cards = document.querySelectorAll('.contact-card');
        const index = Array.from(cards).indexOf(card);
        
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animated');
        // 强制使用 slideInUp 动画
        card.style.animationName = 'slideInUp';
    }

    /**
     * 預設動畫
     * @param {HTMLElement} element - 元素
     */
    animateDefault(element) {
        element.classList.add('animated');
    }

    /**
     * 數字計數動畫
     * @param {HTMLElement} element - 數字元素
     * @param {number} start - 起始值
     * @param {number} end - 結束值
     * @param {number} duration - 持續時間
     */
    animateCounter(element, start, end, duration) {
        const startTime = performance.now();
        const isNumber = !isNaN(end);
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 使用緩動函數
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = start + (end - start) * easeOutCubic;
            
            if (isNumber) {
                element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = element.textContent.replace(/\d+/, end);
            }
        };
        
        requestAnimationFrame(animate);
    }

    /**
     * 初始化視差效果
     */
    initParallaxEffects() {
        const heroImage = document.querySelector('.hero-bg-image');
        if (heroImage) {
            this.parallaxElements.push({
                element: heroImage,
                speed: -0.5,
                type: 'translateY'
            });
        }

        // 其他視差元素
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || -0.3;
            this.parallaxElements.push({
                element: el,
                speed,
                type: 'translateY'
            });
        });

        // 滾動時更新視差效果
        window.addEventListener('scroll', Helpers.throttle(() => {
            this.updateParallaxEffects();
        }, 16));
    }

    /**
     * 更新視差效果
     */
    updateParallaxEffects() {
        if (this.isAnimationsPaused) return;

        const scrolled = window.pageYOffset;
        
        this.parallaxElements.forEach(({ element, speed, type }) => {
            const rate = scrolled * speed;
            
            if (type === 'translateY') {
                element.style.transform = `translateY(${rate}px)`;
            } else if (type === 'translateX') {
                element.style.transform = `translateX(${rate}px)`;
            } else if (type === 'scale') {
                const scale = 1 + (rate / 1000);
                element.style.transform = `scale(${scale})`;
            }
        });
    }

    /**
     * 初始化回到頂部按鈕
     */
    initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        
        if (backToTopBtn) {
            // 滾動顯示/隱藏
            window.addEventListener('scroll', Helpers.throttle(() => {
                const scrolled = window.pageYOffset;
                
                if (scrolled > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            }, 100));

            // 點擊回到頂部
            backToTopBtn.addEventListener('click', () => {
                this.smoothScrollToTop();
            });
        }
    }

    /**
     * 平滑滾動到頂部
     */
    smoothScrollToTop() {
        const scrollToTop = () => {
            const c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                window.requestAnimationFrame(scrollToTop);
                window.scrollTo(0, c - c / 8);
            }
        };
        
        scrollToTop();
    }

    /**
     * 設置鍵盤控制
     */
    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            // 空格鍵暫停/恢復動畫
            if (e.key === ' ' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                this.toggleAnimations();
            }
            
            // 減號鍵降低動畫速度
            if (e.key === '-' && e.ctrlKey) {
                e.preventDefault();
                this.adjustAnimationSpeed(0.5);
            }
            
            // 加號鍵提高動畫速度
            if (e.key === '=' && e.ctrlKey) {
                e.preventDefault();
                this.adjustAnimationSpeed(2);
            }
        });
    }

    /**
     * 切換動畫狀態
     */
    toggleAnimations() {
        this.isAnimationsPaused = !this.isAnimationsPaused;
        document.body.classList.toggle('animations-paused', this.isAnimationsPaused);
        
        // 通知用戶動畫狀態
        const status = this.isAnimationsPaused ? '已暫停' : '已恢復';
        console.log(`動畫${status}`);
        
        // 可選：顯示視覺反饋
        this.showAnimationStatus(status);
    }

    /**
     * 顯示動畫狀態
     * @param {string} status - 狀態文字
     */
    showAnimationStatus(status) {
        const statusElement = document.createElement('div');
        statusElement.textContent = `動畫${status}`;
        statusElement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            z-index: 10002;
            font-weight: 500;
            pointer-events: none;
        `;
        
        document.body.appendChild(statusElement);
        
        setTimeout(() => {
            statusElement.remove();
        }, 1500);
    }

    /**
     * 調整動畫速度
     * @param {number} multiplier - 速度倍數
     */
    adjustAnimationSpeed(multiplier) {
        document.documentElement.style.setProperty('--animation-duration', `${1 / multiplier}s`);
        console.log(`動畫速度調整為 ${multiplier}x`);
    }

    /**
     * 預載重要圖片
     */
    preloadImages() {
        const importantImages = [
            'images/home.jpg',
            'images/home.png'
        ];

        Helpers.preloadImages(importantImages);
    }

    /**
     * 重新計算動畫
     */
    recalculateAnimations() {
        if (!this.observer) return;

        // 重新觀察所有動畫元素
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !el.classList.contains('animated')) {
                this.triggerAnimation(el, 0.3);
            }
        });
    }

    /**
     * 添加 CSS 動畫類別
     */
    addAnimationStyles() {
        if (document.getElementById('animation-styles')) return;

        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            @keyframes tada {
                from {
                    transform: scale3d(1, 1, 1);
                }
                10%, 20% {
                    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
                }
                30%, 50%, 70%, 90% {
                    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
                }
                40%, 60%, 80% {
                    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
                }
                to {
                    transform: scale3d(1, 1, 1);
                }
            }
            @keyframes gentle-swing {
                0%, 100% {
                    transform: rotate(0);
                }
                50% {
                    transform: rotate(2deg);
                }
            }
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes scaleIn {
                from {
                    opacity: 0;
                    transform: scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            @keyframes bounceIn {
                0% {
                    opacity: 0;
                    transform: scale(0.3);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.05);
                }
                70% {
                    transform: scale(0.9);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            .animate-on-scroll {
                opacity: 0;
            }

            .animated {
                animation-name: var(--animation-name, fadeInUp);
                animation-duration: var(--animation-duration, 0.6s);
                animation-timing-function: var(--animation-easing, ease-out);
                animation-fill-mode: forwards;
            }
            
            .animations-paused * {
                animation-play-state: paused !important;
            }
        `;
        
        document.head.appendChild(style);
    }

    /**
     * 初始化時添加動畫樣式
     */
    static init() {
        const instance = new AnimationSystem();
        instance.addAnimationStyles();
        return instance;
    }

    /**
     * 更新主題樣式
     * @param {object} themeConfig - 主題配置
     */
    updateThemeStyles(themeConfig) {
        if (!themeConfig || !themeConfig.colors) return;

        const root = document.documentElement;

        // 更新動畫風格
        const animationStyle = themeConfig.animations?.animationStyle || 'fadeInUp';
        root.style.setProperty('--animation-name', animationStyle);

        console.log('🎨 AnimationSystem: 正在更新主題樣式...', {
            colors: themeConfig.colors,
            animationStyle: animationStyle
        });

        // 更新返回頂部按鈕的顏色
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            backToTopBtn.style.setProperty('--button-bg-color', themeConfig.colors.primary);
            backToTopBtn.style.setProperty('--button-hover-bg-color', themeConfig.colors.roseGoldDark);
        }

        // 可選：更新其他動畫相關的顏色
        root.style.setProperty('--animation-accent-color', themeConfig.colors.accent);
    }

    /**
     * 清理資源
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        
        // 移除事件監聽器
        // 注意：實際使用中可能需要保存監聽器引用以便正確移除
    }
}