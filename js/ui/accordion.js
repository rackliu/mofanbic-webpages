/**
 * 摺疊面板 (Accordion) UI 模組
 * 負責處理 FAQ 或其他摺疊區塊的動態收合與展開，並藉由 scrollHeight 提供平滑過渡動畫
 */

export class Accordion {
    constructor(containerSelector = '.faq-list') {
        this.container = document.querySelector(containerSelector);
        
        if (!this.container) {
            console.warn(`摺疊面板容器 '${containerSelector}' 未找到，跳過初始化`);
            return;
        }

        this.items = [];
        this.init();
    }

    /**
     * 初始化摺疊面板
     */
    init() {
        console.log('🔌 初始化 FAQ 摺疊面板...');
        
        // 取得容器下的所有子項目
        const rawItems = this.container.querySelectorAll('.faq-item');
        
        rawItems.forEach(item => {
            const header = item.querySelector('.faq-header') || item.querySelector('h3');
            const content = item.querySelector('.faq-content') || item.querySelector('p');
            
            if (!header || !content) return;

            // 為標頭加上可點擊的輔助外觀與無障礙設計
            header.style.cursor = 'pointer';
            if (!header.hasAttribute('role')) {
                header.setAttribute('role', 'button');
            }
            if (!header.hasAttribute('tabindex')) {
                header.setAttribute('tabindex', '0');
            }

            // 初始化時將內容高度設為 0
            content.style.maxHeight = '0px';
            content.style.overflow = 'hidden';
            content.style.transition = 'max-height 0.4s cubic-bezier(0.25, 1, 0.5, 1), padding 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
            
            const accordionItem = {
                element: item,
                header: header,
                content: content,
                isOpen: false
            };

            this.items.push(accordionItem);

            // 綁定點擊事件
            header.addEventListener('click', () => {
                this.toggleItem(accordionItem);
            });

            // 綁定鍵盤 Enter 與 Space 鍵事件
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleItem(accordionItem);
                }
            });
        });

        console.log(`✅ FAQ 摺疊面板初始化完成，共載入 ${this.items.length} 個摺疊項目`);
    }

    /**
     * 切換單個摺疊項目的狀態
     * @param {object} itemObj - 摺疊項目物件
     */
    toggleItem(itemObj) {
        if (itemObj.isOpen) {
            this.closeItem(itemObj);
        } else {
            // 如需點擊一個、收起其他項目，可在此呼叫 closeAllItems()，但精品常見問題通常允許同時展開多個
            this.openItem(itemObj);
        }
    }

    /**
     * 展開摺疊項目
     * @param {object} itemObj - 摺疊項目物件
     */
    openItem(itemObj) {
        itemObj.element.classList.add('active');
        
        // 使用 scrollHeight 動態計算內容真實高度，確保動畫流暢
        const height = itemObj.content.scrollHeight;
        itemObj.content.style.maxHeight = `${height}px`;
        itemObj.isOpen = true;
        
        // 更新無障礙屬性
        itemObj.header.setAttribute('aria-expanded', 'true');
    }

    /**
     * 收折摺疊項目
     * @param {object} itemObj - 摺疊項目物件
     */
    closeItem(itemObj) {
        itemObj.element.classList.remove('active');
        itemObj.content.style.maxHeight = '0px';
        itemObj.isOpen = false;
        
        // 更新無障礙屬性
        itemObj.header.setAttribute('aria-expanded', 'false');
    }

    /**
     * 收折所有項目
     */
    closeAllItems() {
        this.items.forEach(item => {
            if (item.isOpen) {
                this.closeItem(item);
            }
        });
    }

    /**
     * 銷毀摺疊面板實例
     */
    destroy() {
        this.items.forEach(item => {
            // 複製並替換 header 以移除事件監聽器
            const newHeader = item.header.cloneNode(true);
            item.header.parentNode.replaceChild(newHeader, item.header);
        });
        this.items = [];
        console.log('🧹 FAQ 摺疊面板模組已清理');
    }
}

export default Accordion;
