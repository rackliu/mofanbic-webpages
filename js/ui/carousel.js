/**
 * 產品輪播組件
 * 負責處理精選服飾商品展示的輪播功能
 */

export class ProductCarousel {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' 
            ? document.querySelector(container) 
            : container;
            
        if (!this.container) {
            console.warn('輪播容器未找到');
            return;
        }

        this.options = {
            autoPlay: true,
            autoPlayInterval: 4000,
            imagePath: 'images/products/',
            imagePrefix: 'product',
            imageExtension: '.jpg',
            maxImages: 20, // 最多檢測20張圖片
            transition: 'ease-in-out',
            transitionDuration: 500,
            pauseOnHover: true,
            ...options
        };

        this.currentSlide = 0;
        this.slides = [];
        this.isPlaying = this.options.autoPlay;
        this.autoPlayTimer = null;
        this.isInitialized = false;

        this.init();
    }

    /**
     * 初始化輪播
     */
    async init() {
        try {
            console.log('🎠 初始化產品輪播...');
            
            await this.loadImages();
            this.setupDOM();
            this.bindEvents();
            this.startAutoPlay();
            
            this.isInitialized = true;
            console.log('✅ 產品輪播初始化完成');
            
        } catch (error) {
            console.error('輪播初始化失敗:', error);
            this.showError('輪播載入失敗，請稍後再試');
        }
    }

    /**
     * 載入產品圖片
     */
    async loadImages() {
        this.showLoading();
        
        const images = [];
        let consecutiveFailures = 0;
        const maxConsecutiveFailures = 3; // 連續失敗3次就停止檢測
        
        for (let i = 1; i <= this.options.maxImages; i++) {
            const imagePath = `${this.options.imagePath}${this.options.imagePrefix}${i}${this.options.imageExtension}`;
            
            try {
                const imageExists = await this.checkImageExists(imagePath);
                if (imageExists) {
                    images.push({
                        src: imagePath,
                        alt: `精選商品 ${i}`
                    });
                    consecutiveFailures = 0; // 重設失敗計數
                } else {
                    consecutiveFailures++;
                    if (consecutiveFailures >= maxConsecutiveFailures) {
                        break; // 停止檢測
                    }
                }
            } catch (error) {
                consecutiveFailures++;
                if (consecutiveFailures >= maxConsecutiveFailures) {
                    break;
                }
            }
        }

        if (images.length === 0) {
            throw new Error('未找到任何產品圖片');
        }

        this.slides = images;
        console.log(`📸 載入了 ${images.length} 張產品圖片`);
    }

    /**
     * 檢查圖片是否存在
     */
    checkImageExists(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
        });
    }

    /**
     * 設置 DOM 結構
     */
    setupDOM() {
        const track = this.container.querySelector('.carousel-track');
        const indicators = this.container.querySelector('.carousel-indicators');
        
        if (!track || !indicators) {
            throw new Error('輪播必要元素未找到');
        }

        // 清空現有內容
        track.innerHTML = '';
        indicators.innerHTML = '';

        // 創建幻燈片
        this.slides.forEach((slide, index) => {
            // 創建幻燈片元素
            const slideElement = document.createElement('div');
            slideElement.className = 'carousel-slide';
            slideElement.innerHTML = `
                <img src="${slide.src}" alt="${slide.alt}" loading="lazy">
            `;
            track.appendChild(slideElement);

            // 創建指示器
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            indicator.setAttribute('aria-label', `切換到第 ${index + 1} 張圖片`);
            indicator.addEventListener('click', () => this.goToSlide(index));
            indicators.appendChild(indicator);
        });

        // 添加播放暫停按鈕
        this.addPlayPauseButton();

        // 隱藏載入畫面
        this.hideLoading();

        // 更新顯示
        this.updateSlideDisplay();
    }

    /**
     * 添加播放暫停按鈕
     */
    addPlayPauseButton() {
        const existingBtn = this.container.querySelector('.carousel-play-pause');
        if (existingBtn) {
            existingBtn.remove();
        }

        const playPauseBtn = document.createElement('button');
        playPauseBtn.className = 'carousel-play-pause';
        playPauseBtn.setAttribute('aria-label', this.isPlaying ? '暫停輪播' : '播放輪播');
        playPauseBtn.innerHTML = this.isPlaying ? '⏸️' : '▶️';
        
        playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        
        this.container.querySelector('.carousel-container').appendChild(playPauseBtn);
    }

    /**
     * 綁定事件處理
     */
    bindEvents() {
        // 上一張按鈕
        const prevBtn = this.container.querySelector('.carousel-btn-prev');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousSlide());
        }

        // 下一張按鈕
        const nextBtn = this.container.querySelector('.carousel-btn-next');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // 鍵盤導航
        this.container.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case ' ':
                    e.preventDefault();
                    this.togglePlayPause();
                    break;
            }
        });

        // 滑鼠懸停暫停
        if (this.options.pauseOnHover) {
            this.container.addEventListener('mouseenter', () => {
                if (this.isPlaying) {
                    this.pauseAutoPlay();
                }
            });

            this.container.addEventListener('mouseleave', () => {
                if (this.isPlaying) {
                    this.startAutoPlay();
                }
            });
        }

        // 觸摸手勢支援
        this.setupTouchGestures();
    }

    /**
     * 設置觸摸手勢
     */
    setupTouchGestures() {
        let startX = 0;
        let startTime = 0;
        const minSwipeDistance = 50;
        const maxSwipeTime = 300;

        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startTime = Date.now();
        }, { passive: true });

        this.container.addEventListener('touchend', (e) => {
            if (!startX) return;

            const endX = e.changedTouches[0].clientX;
            const endTime = Date.now();
            const distance = Math.abs(endX - startX);
            const duration = endTime - startTime;

            if (distance > minSwipeDistance && duration < maxSwipeTime) {
                if (endX > startX) {
                    this.previousSlide();
                } else {
                    this.nextSlide();
                }
            }

            startX = 0;
        }, { passive: true });
    }

    /**
     * 切換到指定幻燈片
     */
    goToSlide(index) {
        if (index < 0 || index >= this.slides.length) return;

        this.currentSlide = index;
        this.updateSlideDisplay();
        
        // 重啟自動播放計時器
        if (this.isPlaying) {
            this.restartAutoPlay();
        }
    }

    /**
     * 下一張幻燈片
     */
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    /**
     * 上一張幻燈片
     */
    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    /**
     * 更新幻燈片顯示
     */
    updateSlideDisplay() {
        const track = this.container.querySelector('.carousel-track');
        const indicators = this.container.querySelectorAll('.carousel-indicator');

        if (!track) return;

        // 移動幻燈片軌道
        const offset = -this.currentSlide * 100;
        track.style.transform = `translateX(${offset}%)`;

        // 更新指示器狀態
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });

        // 更新 ARIA 狀態
        this.updateAriaLabels();
    }

    /**
     * 更新無障礙標籤
     */
    updateAriaLabels() {
        const currentSlideInfo = `第 ${this.currentSlide + 1} 張，共 ${this.slides.length} 張`;
        
        // 更新容器的 aria-label
        this.container.setAttribute('aria-label', `產品輪播，${currentSlideInfo}`);
        
        // 更新播放暫停按鈕
        const playPauseBtn = this.container.querySelector('.carousel-play-pause');
        if (playPauseBtn) {
            playPauseBtn.setAttribute('aria-label', 
                this.isPlaying ? '暫停輪播' : '播放輪播'
            );
        }
    }

    /**
     * 開始自動播放
     */
    startAutoPlay() {
        if (!this.options.autoPlay || this.autoPlayTimer) return;

        this.autoPlayTimer = setInterval(() => {
            this.nextSlide();
        }, this.options.autoPlayInterval);
    }

    /**
     * 暫停自動播放
     */
    pauseAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    }

    /**
     * 重啟自動播放
     */
    restartAutoPlay() {
        this.pauseAutoPlay();
        this.startAutoPlay();
    }

    /**
     * 切換播放暫停狀態
     */
    togglePlayPause() {
        this.isPlaying = !this.isPlaying;

        if (this.isPlaying) {
            this.startAutoPlay();
        } else {
            this.pauseAutoPlay();
        }

        // 更新按鈕顯示
        const playPauseBtn = this.container.querySelector('.carousel-play-pause');
        if (playPauseBtn) {
            playPauseBtn.innerHTML = this.isPlaying ? '⏸️' : '▶️';
            playPauseBtn.setAttribute('aria-label', 
                this.isPlaying ? '暫停輪播' : '播放輪播'
            );
        }
    }

    /**
     * 顯示載入畫面
     */
    showLoading() {
        const container = this.container.querySelector('.carousel-container');
        if (!container) return;

        const loading = document.createElement('div');
        loading.className = 'carousel-loading';
        loading.innerHTML = `
            <div class="loading-spinner"></div>
        `;
        
        container.appendChild(loading);
    }

    /**
     * 隱藏載入畫面
     */
    hideLoading() {
        const loading = this.container.querySelector('.carousel-loading');
        if (loading) {
            loading.remove();
        }
    }

    /**
     * 顯示錯誤訊息
     */
    showError(message) {
        const container = this.container.querySelector('.carousel-container');
        if (!container) return;

        container.innerHTML = `
            <div class="carousel-placeholder">
                <div class="carousel-placeholder-icon">📷</div>
                <div class="carousel-placeholder-text">載入失敗</div>
                <div class="carousel-placeholder-subtext">${message}</div>
            </div>
        `;
    }

    /**
     * 銷毀輪播實例
     */
    destroy() {
        console.log('🧹 清理產品輪播...');
        
        this.pauseAutoPlay();
        
        // 移除事件監聽器
        const buttons = this.container.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.replaceWith(btn.cloneNode(true));
        });

        // 清空內容
        if (this.container) {
            this.container.innerHTML = '';
        }

        this.isInitialized = false;
    }

    /**
     * 獲取當前狀態
     */
    getStatus() {
        return {
            isInitialized: this.isInitialized,
            currentSlide: this.currentSlide,
            totalSlides: this.slides.length,
            isPlaying: this.isPlaying
        };
    }
}

export default ProductCarousel;