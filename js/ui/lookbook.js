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
            
            // 結構：僅包含主圖、滑鼠懸停細節圖，不顯示下方文字說明
            itemElement.innerHTML = `
                <div class="lookbook-media">
                    <img src="${item.primaryImage}" alt="${item.title}" class="lookbook-img img-primary" loading="lazy">
                    <img src="${item.detailImage}" alt="${item.title} - 細節圖" class="lookbook-img img-detail" loading="lazy">
                    <div class="lookbook-border-overlay"></div>
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
