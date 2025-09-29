/**
 * 導航功能模組
 * 處理導航欄行為、手機版選單、滾動效果
 */

import { Helpers } from '../utils/helpers.js';

export class Navigation {
    constructor() {
        this.navbar = null;
        this.hamburger = null;
        this.navMenu = null;
        this.lastScrollTop = 0;
        
        this.init();
    }

    init() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        
        this.initNavLinks();
        this.initScrollBehavior();
        this.initMobileMenu();
        this.initScrollIndicator();
    }

    /**
     * 初始化導航連結的平滑滾動
     */
    initNavLinks() {
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                Helpers.scrollToElement(targetId);
                this.closeMobileMenu();
            });
        });
    }

    /**
     * 初始化導航欄滾動行為
     */
    initScrollBehavior() {
        if (!this.navbar) return;

        const scrollHandler = Helpers.throttle(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // 添加/移除滾動狀態樣式
            if (scrollTop > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            // 智能隱藏/顯示導航欄
            if (scrollTop > this.lastScrollTop && scrollTop > 200) {
                // 向下滾動時隱藏
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                // 向上滾動時顯示
                this.navbar.style.transform = 'translateY(0)';
            }
            
            this.lastScrollTop = scrollTop;
        }, 16);

        window.addEventListener('scroll', scrollHandler);
    }

    /**
     * 初始化手機版選單
     */
    initMobileMenu() {
        if (!this.hamburger || !this.navMenu) return;

        // 漢堡選單點擊事件
        this.hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMobileMenu();
        });

        // 點擊外部關閉選單
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // 選單項目點擊關閉選單
        const menuLinks = this.navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // 視窗大小變更時關閉手機版選單
        window.addEventListener('resize', Helpers.debounce(() => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        }, 250));

        // ESC鍵關閉選單
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });
    }

    /**
     * 切換手機版選單狀態
     */
    toggleMobileMenu() {
        const isActive = this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        
        this.animateHamburger(isActive);
        
        // 防止背景滾動
        document.body.style.overflow = isActive ? 'hidden' : '';
    }

    /**
     * 關閉手機版選單
     */
    closeMobileMenu() {
        this.hamburger?.classList.remove('active');
        this.navMenu?.classList.remove('active');
        this.animateHamburger(false);
        document.body.style.overflow = '';
    }

    /**
     * 漢堡選單動畫
     * @param {boolean} isActive - 是否為激活狀態
     */
    animateHamburger(isActive) {
        const spans = document.querySelectorAll('.hamburger span');
        
        if (isActive) {
            spans[0]?.style.setProperty('transform', 'rotate(45deg) translate(5px, 5px)');
            spans[1]?.style.setProperty('opacity', '0');
            spans[2]?.style.setProperty('transform', 'rotate(-45deg) translate(7px, -6px)');
        } else {
            spans[0]?.style.setProperty('transform', 'none');
            spans[1]?.style.setProperty('opacity', '1');
            spans[2]?.style.setProperty('transform', 'none');
        }
    }

    /**
     * 初始化滾動指示器
     */
    initScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                Helpers.scrollToElement('brand-story');
            });
        }
    }

    /**
     * 公開方法：滾動到指定區域
     * @param {string} sectionId - 區域ID
     */
    scrollToSection(sectionId) {
        Helpers.scrollToElement(sectionId);
    }
}