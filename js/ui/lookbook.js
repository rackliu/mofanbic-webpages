/**
 * 當季風尚 (Lookbook) UI 模組
 * 負責從設定檔動態載入商品資訊，並渲染極簡的雜誌感展示版面
 */

import { LOOKBOOK_ITEMS } from '../core/lookbook-config.js';

export class Lookbook {
    constructor(containerSelector = '#lookbookTrack') {
        this.container = document.querySelector(containerSelector);
        
        if (!this.container) {
            console.warn(`Lookbook 容器 '${containerSelector}' 未找到，跳過初始化`);
            return;
        }

        this.init();
    }

    /**
     * 初始化 Lookbook
     */
    init() {
        console.log('🖼️ 初始化當季風尚 (Lookbook)...');
        this.render();
        this.bindEvents();
    }

    /**
     * 綁定點擊事件以支援放大查看
     */
    bindEvents() {
        this.container.addEventListener('click', (e) => {
            const media = e.target.closest('.lookbook-media');
            if (!media) return;

            // 優先抓取點擊的圖片，若點到文字或邊框等遮罩，則抓取該卡片的主圖
            let clickedImg = e.target.closest('img');
            if (!clickedImg) {
                clickedImg = media.querySelector('.img-primary');
            }
            if (!clickedImg) return;

            const imgSrc = clickedImg.src;
            const imgAlt = clickedImg.alt;
            
            this.showLightbox(imgSrc, imgAlt);
        });
    }

    /**
     * 顯示高質感滿版圖片燈箱 (Lightbox)
     */
    showLightbox(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lookbook-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${src}" alt="${alt}">
                <div class="lightbox-close">✕</div>
            </div>
        `;

        document.body.appendChild(lightbox);

        // 強制 Reflow 觸行動畫
        lightbox.offsetHeight;
        lightbox.classList.add('active');

        // 鎖定網頁背景滾動
        document.body.style.overflow = 'hidden';

        // 點擊燈箱內任意處即關閉
        lightbox.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                lightbox.remove();
            }, 300);
        });
    }

    /**
     * 渲染 Lookbook DOM
     */
    render() {
        if (!this.container) return;

        // 清空容器
        this.container.innerHTML = '';

        // 生成每個 Lookbook 項目
        LOOKBOOK_ITEMS.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'lookbook-item';
            
            // 檢查是否有設定標題或描述
            const hasMeta = item.title || item.description;
            let metaHtml = '';
            
            if (hasMeta) {
                metaHtml = `
                    <div class="lookbook-meta">
                        ${item.title ? `<h3 class="lookbook-title">${item.title}</h3>` : ''}
                        ${item.description ? `<p class="lookbook-desc">${item.description}</p>` : ''}
                    </div>
                `;
            }
            
            // 結構：主圖、滑鼠懸停細節圖，並將文字說明以絕對定位疊在圖片底端（若有設定的話）
            itemElement.innerHTML = `
                <div class="lookbook-media">
                    <img src="${item.primaryImage}" alt="${item.title || '當季風尚'}" class="lookbook-img img-primary" loading="lazy">
                    <img src="${item.detailImage}" alt="${item.title || '當季風尚'} - 細節圖" class="lookbook-img img-detail" loading="lazy">
                    <div class="lookbook-border-overlay"></div>
                    ${metaHtml}
                </div>
            `;
            
            this.container.appendChild(itemElement);
        });

        console.log(`✅ Lookbook 渲染完成，共載入 ${LOOKBOOK_ITEMS.length} 個穿搭項目`);
    }

    /**
     * 銷毀實例
     */
    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
        console.log('🧹 Lookbook 模組已清理');
    }
}

export default Lookbook;
