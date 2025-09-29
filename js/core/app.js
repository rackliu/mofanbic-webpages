/**
 * 核心應用模組
 * 整合所有功能模組，提供統一的應用入口
 */

import { Navigation } from '../ui/navigation.js';
import { FormHandler } from '../ui/form-handler.js';
import { AnimationSystem } from '../ui/animations.js';
import { NotificationSystem } from '../ui/notification.js';
import { ProductCarousel } from '../ui/carousel.js';
import { Helpers } from '../utils/helpers.js';

export class MofanbicApp {
    constructor() {
        this.modules = {};
        this.isInitialized = false;
        
        this.init();
    }

    /**
     * 初始化應用
     */
    async init() {
        try {
            // DOM 載入完成後再初始化
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initializeModules());
            } else {
                this.initializeModules();
            }
        } catch (error) {
            console.error('應用初始化失敗:', error);
            this.handleInitError(error);
        }
    }

    /**
     * 初始化所有模組
     */
    initializeModules() {
        console.log('🚀 莫凡比精品服飾網站初始化中...');

        try {
            // 初始化核心系統
            this.modules.notification = new NotificationSystem();
            
            // 初始化 UI 模組
            this.modules.navigation = new Navigation();
            this.modules.formHandler = new FormHandler();
            this.modules.animations = AnimationSystem.init();
            
            // 初始化產品輪播
            this.initializeProductCarousel();
            
            // 設置全域事件處理
            this.setupGlobalEventHandlers();
            
            // 設置無障礙功能
            this.setupAccessibility();
            
            // 設置性能監控
            this.setupPerformanceMonitoring();
            
            // 設置 Service Worker（如果支援）
            this.setupServiceWorker();
            
            // 標記為已初始化
            this.isInitialized = true;
            document.body.classList.add('app-loaded');
            
            console.log('✅ 應用初始化完成');
            
            // 顯示歡迎通知（可選）
            this.showWelcomeMessage();
            
        } catch (error) {
            console.error('模組初始化失敗:', error);
            this.handleInitError(error);
        }
    }

    /**
     * 設置全域事件處理
     */
    setupGlobalEventHandlers() {
        // 視窗大小變更
        window.addEventListener('resize', Helpers.debounce(() => {
            this.handleWindowResize();
        }, 250));

        // 網路狀態變更
        window.addEventListener('online', () => {
            this.modules.notification.success('網路連接已恢復');
        });

        window.addEventListener('offline', () => {
            this.modules.notification.warning('網路連接中斷，部分功能可能受限');
        });

        // 頁面可見性變更
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });

        // 全域錯誤處理
        window.addEventListener('error', (e) => {
            this.handleGlobalError(e);
        });

        window.addEventListener('unhandledrejection', (e) => {
            this.handleUnhandledRejection(e);
        });

        // 滾動進度追蹤
        window.addEventListener('scroll', Helpers.throttle(() => {
            this.updateScrollProgress();
        }, 100));
    }

    /**
     * 設置無障礙功能
     */
    setupAccessibility() {
        // 跳至主要內容連結
        this.addSkipLink();
        
        // 鍵盤導航增強
        this.enhanceKeyboardNavigation();
        
        // 焦點管理
        this.setupFocusManagement();
        
        // 顏色對比度檢測（開發模式）
        if (this.isDevelopmentMode()) {
            this.checkColorContrast();
        }
    }

    /**
     * 添加跳至主要內容連結
     */
    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = '跳至主要內容';
        skipLink.className = 'skip-link';
        
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--color-primary);
            color: white;
            padding: 8px 16px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            font-weight: 500;
            transition: top 0.3s ease;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    /**
     * 增強鍵盤導航
     */
    enhanceKeyboardNavigation() {
        // 為互動元素添加鍵盤支援
        const interactiveElements = document.querySelectorAll('.service-card, .contact-card, .transport-card');
        
        interactiveElements.forEach(el => {
            if (!el.hasAttribute('tabindex')) {
                el.setAttribute('tabindex', '0');
            }
            
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    el.click();
                }
            });
        });
    }

    /**
     * 設置焦點管理
     */
    setupFocusManagement() {
        // 添加焦點可見性樣式
        const style = document.createElement('style');
        style.textContent = `
            .focus-visible:focus {
                outline: 2px solid var(--color-primary);
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * 設置性能監控
     */
    setupPerformanceMonitoring() {
        // 頁面載入性能
        window.addEventListener('load', () => {
            this.measurePerformance();
        });

        // Core Web Vitals 監控
        if ('web-vital' in window) {
            this.setupWebVitalsTracking();
        }
    }

    /**
     * 測量性能指標
     */
    measurePerformance() {
        if (!performance || !performance.timing) return;

        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
        const firstPaint = performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint');

        const metrics = {
            loadTime,
            domReady,
            firstPaint: firstPaint ? firstPaint.startTime : null
        };

        console.log('📊 性能指標:', metrics);

        // 發送到分析服務（如果配置了）
        this.trackPerformanceMetrics(metrics);

        // 性能警告
        if (loadTime > 3000) {
            console.warn('⚠️ 頁面載入時間較長，考慮優化資源');
        }
    }

    /**
     * 設置 Service Worker
     */
    async setupServiceWorker() {
        if (!('serviceWorker' in navigator)) return;

        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('🔧 Service Worker 註冊成功');
            
            // 監聽更新
            registration.addEventListener('updatefound', () => {
                this.handleServiceWorkerUpdate(registration);
            });
            
        } catch (error) {
            console.log('🔧 Service Worker 註冊失敗:', error);
        }
    }

    /**
     * 處理 Service Worker 更新
     */
    handleServiceWorkerUpdate(registration) {
        const newWorker = registration.installing;
        
        newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // 有新版本可用
                this.modules.notification.info(
                    '有新版本可用，重新整理頁面以獲得最佳體驗',
                    {
                        duration: 0, // 不自動消失
                        actions: [
                            {
                                text: '重新整理',
                                action: () => window.location.reload()
                            }
                        ]
                    }
                );
            }
        });
    }

    /**
     * 處理視窗大小變更
     */
    handleWindowResize() {
        // 重新計算動畫
        if (this.modules.animations) {
            this.modules.animations.recalculateAnimations();
        }
        
        // 更新導航狀態
        if (Helpers.isMobile()) {
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
        }
    }

    /**
     * 處理頁面可見性變更
     */
    handleVisibilityChange() {
        if (document.hidden) {
            // 頁面隱藏時暫停動畫
            if (this.modules.animations) {
                this.modules.animations.toggleAnimations();
            }
        } else {
            // 頁面可見時恢復動畫
            if (this.modules.animations && this.modules.animations.isAnimationsPaused) {
                this.modules.animations.toggleAnimations();
            }
        }
    }

    /**
     * 更新滾動進度
     */
    updateScrollProgress() {
        const scrolled = window.pageYOffset;
        const maxHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxHeight) * 100;
        
        // 更新進度條（如果存在）
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = `${Math.min(progress, 100)}%`;
        }
        
        // 更新 CSS 自定義屬性
        document.documentElement.style.setProperty('--scroll-progress', progress + '%');
    }

    /**
     * 處理全域錯誤
     */
    handleGlobalError(event) {
        console.error('全域 JavaScript 錯誤:', event.error);
        
        // 開發模式下顯示詳細錯誤
        if (this.isDevelopmentMode()) {
            this.modules.notification?.error(`JavaScript 錯誤: ${event.error.message}`);
        }
        
        // 發送錯誤報告
        this.trackError(event.error);
    }

    /**
     * 處理未捕獲的 Promise 拒絕
     */
    handleUnhandledRejection(event) {
        console.error('未處理的 Promise 拒絕:', event.reason);
        
        if (this.isDevelopmentMode()) {
            this.modules.notification?.error(`Promise 錯誤: ${event.reason}`);
        }
        
        this.trackError(event.reason);
    }

    /**
     * 處理初始化錯誤
     */
    handleInitError(error) {
        console.error('應用初始化錯誤:', error);
        
        // 顯示友善的錯誤訊息
        const errorMessage = document.createElement('div');
        errorMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ef4444;
            color: white;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            z-index: 10000;
            max-width: 400px;
        `;
        errorMessage.innerHTML = `
            <h3 style="margin: 0 0 1rem 0;">載入失敗</h3>
            <p style="margin: 0 0 1.5rem 0;">網站功能可能受限，請重新整理頁面</p>
            <button onclick="window.location.reload()" 
                    style="background: white; color: #ef4444; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer;">
                重新整理
            </button>
        `;
        
        document.body.appendChild(errorMessage);
    }

    /**
     * 顯示歡迎訊息
     */
    showWelcomeMessage() {
        // 僅在首次訪問時顯示
        if (!localStorage.getItem('mofanbic-visited')) {
            setTimeout(() => {
                this.modules.notification?.info(
                    '歡迎來到莫凡比精品服飾！探索我們的時尚世界 ✨',
                    { duration: 4000 }
                );
                localStorage.setItem('mofanbic-visited', 'true');
            }, 2000);
        }
    }

    /**
     * 追蹤性能指標
     */
    trackPerformanceMetrics(metrics) {
        // 發送到 Google Analytics 或其他分析服務
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                name: 'load',
                value: metrics.loadTime
            });
        }
    }

    /**
     * 追蹤錯誤
     */
    trackError(error) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: error.toString(),
                fatal: false
            });
        }
    }

    /**
     * 檢查是否為開發模式
     */
    isDevelopmentMode() {
        return location.hostname === 'localhost' || 
               location.hostname === '127.0.0.1' ||
               location.protocol === 'file:';
    }

    /**
     * 檢查顏色對比度（開發工具）
     */
    checkColorContrast() {
        // 簡單的對比度檢查工具
        console.log('🎨 顏色對比度檢查（開發模式）');
        // 實際實現會更複雜，這裡僅作示例
    }

    /**
     * 公開 API：滾動到指定區域
     */
    scrollToSection(sectionId) {
        if (this.modules.navigation) {
            this.modules.navigation.scrollToSection(sectionId);
        } else {
            Helpers.scrollToElement(sectionId);
        }
    }

    /**
     * 公開 API：顯示通知
     */
    showNotification(message, type = 'info', options = {}) {
        if (this.modules.notification) {
            this.modules.notification.show(message, type, options.duration, options);
        }
    }

    /**
     * 獲取應用狀態
     */
    getAppState() {
        return {
            isInitialized: this.isInitialized,
            modules: Object.keys(this.modules),
            version: '1.0.0'
        };
    }

    /**
     * 清理應用資源
     */
    destroy() {
        console.log('🧹 清理應用資源...');
        
        Object.values(this.modules).forEach(module => {
            if (typeof module.destroy === 'function') {
                module.destroy();
            }
        });
        
        this.modules = {};
        this.isInitialized = false;
    }

    /**
     * 初始化產品輪播
     */
    initializeProductCarousel() {
        try {
            const carouselContainer = document.querySelector('.products-carousel');
            if (carouselContainer) {
                this.modules.productCarousel = new ProductCarousel(carouselContainer, {
                    autoPlay: true,
                    autoPlayInterval: 5000,
                    imagePath: 'images/products/',
                    imagePrefix: 'product',
                    imageExtension: '.jpg',
                    maxImages: 20,
                    pauseOnHover: true
                });
                
                console.log('🎠 產品輪播模組已載入');
            } else {
                console.log('🔍 未找到產品輪播容器，跳過初始化');
            }
        } catch (error) {
            console.error('產品輪播初始化失敗:', error);
        }
    }
}

// 全域函數供 HTML 調用
window.scrollToSection = function(sectionId) {
    if (window.mofanbicApp) {
        window.mofanbicApp.scrollToSection(sectionId);
    }
};


// 導出類別供其他模組使用
export default MofanbicApp;