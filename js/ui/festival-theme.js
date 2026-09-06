/**
 * 節日主題模組
 * 處理節日主題的切換與顯示
 */

export class FestivalTheme {
    constructor() {
        this.currentFestival = 'none';
        this.festivalData = {
            'none': {
                title: '歡迎來到莫凡比精品服飾',
                subtitle: '專為現代女性打造的時尚天堂',
                message: '選擇上方節日主題，體驗不同的祝福氛圍',
                backgroundColor: '#f8f9fa',
                textColor: '#333'
            },
            'mid-autumn': {
                title: '中秋節快樂 🏮',
                subtitle: '月圓人團圓，時尚也團圓',
                message: '在中秋佳節，莫凡比祝您闔家團圓，幸福美滿！讓我們一起穿上最美的服飾，慶祝這個溫馨的時刻。',
                backgroundColor: '#FFF8DC',
                textColor: '#8B4513',
                emoji: '🏮',
                blessing: '祝您月圓人團圓，幸福美滿！'
            },
            'christmas': {
                title: '聖誕快樂 🎄',
                subtitle: '時尚聖誕，溫暖你的心',
                message: '聖誕佳節，莫凡比祝您聖誕快樂，心想事成！讓我們一起穿上節慶的服飾，感受聖誕的溫暖與喜悅。',
                backgroundColor: '#FFF5F5',
                textColor: '#C53030',
                emoji: '🎄',
                blessing: '願您聖誕平安喜樂，心想事成！'
            },
            'lunar-new-year': {
                title: '新春大吉 🧧',
                subtitle: '新年新氣象，新裝新開始',
                message: '農曆新年，莫凡比祝您恭喜發財，萬事如意！讓我們一起穿上嶄新的服飾，迎接充滿希望的新一年。',
                backgroundColor: '#FFF5F5',
                textColor: '#C53030',
                emoji: '🧧',
                blessing: '恭喜發財，萬事如意！'
            }
        };

        this.init();
    }

    init() {
        // 暫停節日主題功能，直接返回
        console.log('🔒 舊版節日主題已停用');
        return;
    }

    /**
     * 設置事件監聽器
     */
    setupEventListeners() {
        const festivalButtons = document.querySelectorAll('.festival-btn');
        const festivalMessage = document.getElementById('festivalMessage');

        if (!festivalMessage) {
            console.warn('未找到節日主題訊息容器');
            return;
        }

        festivalButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const festival = e.target.dataset.festival;
                this.setFestival(festival);

                // 更新按鈕狀態
                festivalButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // 設置鍵盤導航
        festivalButtons.forEach(button => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });
    }

    /**
     * 根據當前月份自動選擇節日主題
     */
    setAutoFestival() {
        const now = new Date();
        const month = now.getMonth() + 1; // 月份從 0 開始
        const day = now.getDate();

        let autoFestival = 'none';

        // 中秋節（農曆 8 月 15 日，約在陽曆 9-10 月）
        if ((month === 9 && day >= 15) || (month === 10 && day <= 15)) {
            autoFestival = 'mid-autumn';
        }
        // 聖誕節（12 月）
        else if (month === 12) {
            autoFestival = 'christmas';
        }
        // 農曆新年（陽曆 1-2 月）
        else if (month === 1 || month === 2) {
            autoFestival = 'lunar-new-year';
        }

        if (autoFestival !== 'none') {
            this.setFestival(autoFestival);

            // 自動選中對應的按鈕
            const autoButton = document.querySelector(`[data-festival="${autoFestival}"]`);
            if (autoButton) {
                document.querySelectorAll('.festival-btn').forEach(btn => btn.classList.remove('active'));
                autoButton.classList.add('active');
            }
        }
    }

    /**
     * 設置節日主題
     * @param {string} festival - 節日名稱
     */
    setFestival(festival) {
        if (!this.festivalData[festival]) {
            console.warn(`未知的節日主題: ${festival}`);
            return;
        }

        this.currentFestival = festival;
        const data = this.festivalData[festival];

        // 更新顯示內容
        this.updateFestivalDisplay(data);

        // 更新樣式
        this.updateFestivalStyles(data);

        // 儲存用戶選擇
        localStorage.setItem('mofanbic-festival-theme', festival);

        console.log(`🎉 已切換到 ${data.title} 主題`);
    }

    /**
     * 更新節日顯示內容
     * @param {object} data - 節日資料
     */
    updateFestivalDisplay(data) {
        const festivalMessage = document.getElementById('festivalMessage');
        if (!festivalMessage) return;

        festivalMessage.innerHTML = `
            <h2>${data.title}</h2>
            <p class="festival-subtitle">${data.subtitle}</p>
            <p class="festival-description">${data.message}</p>
            ${data.blessing ? `<div class="festival-blessing">${data.blessing}</div>` : ''}
        `;

        // 添加動畫效果
        festivalMessage.style.opacity = '0';
        festivalMessage.style.transform = 'translateY(20px)';

        setTimeout(() => {
            festivalMessage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            festivalMessage.style.opacity = '1';
            festivalMessage.style.transform = 'translateY(0)';
        }, 100);
    }

    /**
     * 更新節日樣式
     * @param {object} data - 節日資料
     */
    updateFestivalStyles(data) {
        const festivalSection = document.getElementById('festival-theme');
        if (!festivalSection) return;

        // 更新背景顏色
        festivalSection.style.backgroundColor = data.backgroundColor;

        // 更新文字顏色
        const title = festivalSection.querySelector('h2');
        const paragraphs = festivalSection.querySelectorAll('p');

        if (title) title.style.color = data.textColor;
        paragraphs.forEach(p => {
            p.style.color = data.textColor;
        });

        // 添加節日特效類別
        festivalSection.className = `festival-theme festival-${this.currentFestival}`;

        // 添加裝飾元素
        this.addFestivalDecorations(data);
    }

    /**
     * 添加節日裝飾元素
     * @param {object} data - 節日資料
     */
    addFestivalDecorations(data) {
        const festivalSection = document.getElementById('festival-theme');
        if (!festivalSection) return;

        // 移除現有的裝飾元素
        const existingDecorations = festivalSection.querySelectorAll('.festival-decoration');
        existingDecorations.forEach(dec => dec.remove());

        if (this.currentFestival === 'none') return;

        // 添加裝飾元素
        const decoration = document.createElement('div');
        decoration.className = 'festival-decoration';
        decoration.innerHTML = `
            <div class="decoration-bg"></div>
            <div class="decoration-elements">
                ${data.emoji} ${data.emoji} ${data.emoji}
            </div>
        `;

        festivalSection.appendChild(decoration);
    }

    /**
     * 獲取當前節日主題
     */
    getCurrentFestival() {
        return this.currentFestival;
    }

    /**
     * 獲取所有可用節日
     */
    getAvailableFestivals() {
        return Object.keys(this.festivalData);
    }

    /**
     * 恢復上次選擇的主題
     */
    restoreLastTheme() {
        const lastTheme = localStorage.getItem('mofanbic-festival-theme');
        if (lastTheme && this.festivalData[lastTheme]) {
            this.setFestival(lastTheme);

            // 更新按鈕狀態
            const lastButton = document.querySelector(`[data-festival="${lastTheme}"]`);
            if (lastButton) {
                document.querySelectorAll('.festival-btn').forEach(btn => btn.classList.remove('active'));
                lastButton.classList.add('active');
            }
        }
    }

    /**
     * 清理資源
     */
    destroy() {
        // 移除事件監聽器
        const festivalButtons = document.querySelectorAll('.festival-btn');
        festivalButtons.forEach(button => {
            button.replaceWith(button.cloneNode(true));
        });

        console.log('🧹 節日主題模組已清理');
    }
}

export default FestivalTheme;