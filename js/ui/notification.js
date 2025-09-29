/**
 * 通知系統模組
 * 處理各種類型的通知訊息顯示
 */

export class NotificationSystem {
    constructor() {
        this.activeNotifications = new Set();
    }

    /**
     * 顯示通知
     * @param {string} message - 通知訊息
     * @param {string} type - 通知類型 (success, error, warning, info)
     * @param {number} duration - 顯示持續時間（毫秒）
     * @param {Object} options - 額外選項
     */
    show(message, type = 'info', duration = 5000, options = {}) {
        // 移除現有相同類型的通知（避免重複）
        if (options.unique !== false) {
            this.removeByType(type);
        }

        const notification = this.createNotification(message, type, duration, options);
        this.displayNotification(notification, duration);
        
        return notification;
    }

    /**
     * 創建通知元素
     * @param {string} message - 訊息內容
     * @param {string} type - 通知類型
     * @param {number} duration - 顯示時間
     * @param {Object} options - 額外選項
     * @returns {HTMLElement} 通知元素
     */
    createNotification(message, type, duration, options) {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.setAttribute('data-type', type);
        
        // 設置通知樣式
        const styles = this.getNotificationStyles(type, options);
        notification.style.cssText = styles;

        // 設置通知內容
        this.setNotificationContent(notification, message, type, options);
        
        // 添加關閉功能
        this.addCloseHandler(notification);
        
        // 添加無障礙支援
        this.enhanceAccessibility(notification, type);
        
        return notification;
    }

    /**
     * 獲取通知樣式
     * @param {string} type - 通知類型
     * @param {Object} options - 額外選項
     * @returns {string} CSS樣式字串
     */
    getNotificationStyles(type, options) {
        const colors = {
            success: { bg: '#10b981', icon: '✓' },
            error: { bg: '#ef4444', icon: '✕' },
            warning: { bg: '#f59e0b', icon: '⚠' },
            info: { bg: '#3b82f6', icon: 'ℹ' }
        };

        const position = options.position || 'top-right';
        const positionStyles = this.getPositionStyles(position);

        return `
            position: fixed;
            ${positionStyles}
            background: ${colors[type].bg};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            z-index: 10001;
            max-width: 400px;
            min-width: 300px;
            word-wrap: break-word;
            opacity: 0;
            transform: ${this.getInitialTransform(position)};
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            font-weight: 500;
            font-size: 0.95rem;
            line-height: 1.5;
            cursor: pointer;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        `;
    }

    /**
     * 獲取位置樣式
     * @param {string} position - 位置
     * @returns {string} 位置CSS
     */
    getPositionStyles(position) {
        const positions = {
            'top-right': 'top: 120px; right: 20px;',
            'top-left': 'top: 120px; left: 20px;',
            'top-center': 'top: 120px; left: 50%; transform: translateX(-50%);',
            'bottom-right': 'bottom: 20px; right: 20px;',
            'bottom-left': 'bottom: 20px; left: 20px;',
            'bottom-center': 'bottom: 20px; left: 50%; transform: translateX(-50%);'
        };
        
        return positions[position] || positions['top-right'];
    }

    /**
     * 獲取初始變換效果
     * @param {string} position - 位置
     * @returns {string} 變換CSS
     */
    getInitialTransform(position) {
        if (position.includes('right')) return 'translateX(100%)';
        if (position.includes('left')) return 'translateX(-100%)';
        if (position.includes('top')) return 'translateY(-100%)';
        if (position.includes('bottom')) return 'translateY(100%)';
        return 'scale(0.8)';
    }

    /**
     * 設置通知內容
     * @param {HTMLElement} notification - 通知元素
     * @param {string} message - 訊息
     * @param {string} type - 類型
     * @param {Object} options - 選項
     */
    setNotificationContent(notification, message, type, options) {
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };

        const content = document.createElement('div');
        content.style.cssText = 'display: flex; align-items: flex-start; gap: 0.75rem;';

        // 圖示
        const iconElement = document.createElement('div');
        iconElement.textContent = options.icon || icons[type];
        iconElement.style.cssText = `
            font-size: 1.2rem;
            flex-shrink: 0;
            margin-top: 0.1rem;
        `;

        // 訊息內容
        const messageElement = document.createElement('div');
        messageElement.style.cssText = 'flex: 1;';
        
        if (options.title) {
            const titleElement = document.createElement('div');
            titleElement.style.cssText = 'font-weight: 600; margin-bottom: 0.25rem;';
            titleElement.textContent = options.title;
            messageElement.appendChild(titleElement);
        }
        
        const textElement = document.createElement('div');
        textElement.textContent = message;
        messageElement.appendChild(textElement);

        // 關閉按鈕
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '×';
        closeButton.style.cssText = `
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.8);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            margin-left: 0.5rem;
            flex-shrink: 0;
            transition: color 0.2s ease;
            line-height: 1;
        `;
        
        closeButton.addEventListener('mouseenter', () => {
            closeButton.style.color = 'white';
        });
        
        closeButton.addEventListener('mouseleave', () => {
            closeButton.style.color = 'rgba(255, 255, 255, 0.8)';
        });

        content.appendChild(iconElement);
        content.appendChild(messageElement);
        content.appendChild(closeButton);
        notification.appendChild(content);
    }

    /**
     * 添加關閉處理程序
     * @param {HTMLElement} notification - 通知元素
     */
    addCloseHandler(notification) {
        const closeButton = notification.querySelector('button');
        
        const closeNotification = () => {
            this.hide(notification);
        };

        // 點擊關閉按鈕
        closeButton?.addEventListener('click', (e) => {
            e.stopPropagation();
            closeNotification();
        });

        // 點擊通知本身關閉
        notification.addEventListener('click', closeNotification);

        // ESC鍵關閉
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeNotification();
                document.removeEventListener('keydown', escHandler);
            }
        };
        
        document.addEventListener('keydown', escHandler);
    }

    /**
     * 增強無障礙支援
     * @param {HTMLElement} notification - 通知元素
     * @param {string} type - 類型
     */
    enhanceAccessibility(notification, type) {
        notification.setAttribute('role', type === 'error' ? 'alert' : 'status');
        notification.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
        notification.setAttribute('tabindex', '0');
        
        // 鍵盤導航支援
        notification.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.hide(notification);
            }
        });
    }

    /**
     * 顯示通知動畫
     * @param {HTMLElement} notification - 通知元素
     * @param {number} duration - 顯示時間
     */
    displayNotification(notification, duration) {
        document.body.appendChild(notification);
        this.activeNotifications.add(notification);

        // 入場動畫
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0) translateY(0) scale(1)';
        });

        // 自動隱藏
        if (duration > 0) {
            setTimeout(() => {
                if (this.activeNotifications.has(notification)) {
                    this.hide(notification);
                }
            }, duration);
        }

        // 焦點管理
        notification.focus();
    }

    /**
     * 隱藏通知
     * @param {HTMLElement} notification - 通知元素
     */
    hide(notification) {
        if (!this.activeNotifications.has(notification)) return;

        const position = this.getNotificationPosition(notification);
        
        notification.style.opacity = '0';
        notification.style.transform = this.getInitialTransform(position);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
            this.activeNotifications.delete(notification);
        }, 300);
    }

    /**
     * 獲取通知位置
     * @param {HTMLElement} notification - 通知元素
     * @returns {string} 位置
     */
    getNotificationPosition(notification) {
        const style = notification.style;
        
        if (style.right && style.top) return 'top-right';
        if (style.left && style.top) return 'top-left';
        if (style.right && style.bottom) return 'bottom-right';
        if (style.left && style.bottom) return 'bottom-left';
        
        return 'top-right';
    }

    /**
     * 移除指定類型的通知
     * @param {string} type - 通知類型
     */
    removeByType(type) {
        const notifications = document.querySelectorAll(`[data-type="${type}"]`);
        notifications.forEach(notification => {
            this.hide(notification);
        });
    }

    /**
     * 清除所有通知
     */
    clearAll() {
        this.activeNotifications.forEach(notification => {
            this.hide(notification);
        });
    }

    /**
     * 快捷方法：成功通知
     * @param {string} message - 訊息
     * @param {Object} options - 選項
     */
    success(message, options = {}) {
        return this.show(message, 'success', 4000, options);
    }

    /**
     * 快捷方法：錯誤通知
     * @param {string} message - 訊息
     * @param {Object} options - 選項
     */
    error(message, options = {}) {
        return this.show(message, 'error', 6000, options);
    }

    /**
     * 快捷方法：警告通知
     * @param {string} message - 訊息
     * @param {Object} options - 選項
     */
    warning(message, options = {}) {
        return this.show(message, 'warning', 5000, options);
    }

    /**
     * 快捷方法：資訊通知
     * @param {string} message - 訊息
     * @param {Object} options - 選項
     */
    info(message, options = {}) {
        return this.show(message, 'info', 4000, options);
    }
}