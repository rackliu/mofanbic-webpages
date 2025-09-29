/**
 * 工具函數模組
 * 提供常用的防抖、節流和驗證函數
 */

export class Helpers {
    /**
     * 防抖函數
     * @param {Function} func - 要防抖的函數
     * @param {number} wait - 等待時間（毫秒）
     * @returns {Function} 防抖後的函數
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * 節流函數
     * @param {Function} func - 要節流的函數
     * @param {number} limit - 限制時間間隔（毫秒）
     * @returns {Function} 節流後的函數
     */
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * 驗證電子郵件格式
     * @param {string} email - 要驗證的電子郵件
     * @returns {boolean} 驗證結果
     */
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * 驗證電話號碼格式
     * @param {string} phone - 要驗證的電話號碼
     * @returns {boolean} 驗證結果
     */
    static isValidPhone(phone) {
        const phoneRegex = /^[0-9\-\(\)\s\+]{8,15}$/;
        return phoneRegex.test(phone);
    }

    /**
     * 平滑滾動到指定元素
     * @param {string} elementId - 目標元素ID
     * @param {number} offset - 偏移量（預設100px）
     */
    static scrollToElement(elementId, offset = 100) {
        const element = document.getElementById(elementId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    /**
     * 預載圖片
     * @param {string[]} imageSources - 圖片來源陣列
     */
    static preloadImages(imageSources) {
        imageSources.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    /**
     * 檢測是否為行動裝置
     * @returns {boolean} 是否為行動裝置
     */
    static isMobile() {
        return window.innerWidth <= 768;
    }

    /**
     * 格式化表單數據
     * @param {FormData} formData - 表單數據
     * @returns {Object} 格式化後的數據物件
     */
    static formatFormData(formData) {
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value.trim();
        }
        return data;
    }
}