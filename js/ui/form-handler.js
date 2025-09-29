/**
 * 表單處理模組
 * 處理聯繫表單驗證、提交和輸入增強功能
 */

import { Helpers } from '../utils/helpers.js';
import { NotificationSystem } from './notification.js';

export class FormHandler {
    constructor() {
        this.form = null;
        this.notification = new NotificationSystem();
        
        this.init();
    }

    init() {
        this.form = document.getElementById('contactForm');
        
        if (this.form) {
            this.initFormSubmission();
            this.enhanceFormInputs();
        }
    }

    /**
     * 初始化表單提交處理
     */
    initFormSubmission() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });
    }

    /**
     * 處理表單提交
     */
    async handleFormSubmission() {
        const formData = new FormData(this.form);
        const data = Helpers.formatFormData(formData);

        // 表單驗證
        const validation = this.validateForm(data);
        if (!validation.isValid) {
            this.notification.show(validation.message, 'error');
            this.highlightInvalidFields(validation.invalidFields);
            return;
        }

        // 顯示載入狀態
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        this.setSubmitButtonState(submitBtn, true, '發送中...');

        try {
            // 模擬API請求
            await this.simulateFormSubmission(data);
            
            // 成功處理
            this.notification.show(
                `感謝您的預約，${data.name}！我們會在24小時內與您聯繫。`, 
                'success'
            );
            
            this.form.reset();
            this.clearFieldValidation();
            
            // Google Analytics 事件追蹤
            this.trackFormSubmission();

        } catch (error) {
            this.notification.show('發送失敗，請稍後再試或直接來電聯繫。', 'error');
            console.error('Form submission error:', error);
        } finally {
            // 恢復按鈕狀態
            setTimeout(() => {
                this.setSubmitButtonState(submitBtn, false, originalText);
            }, 2000);
        }
    }

    /**
     * 驗證表單數據
     * @param {Object} data - 表單數據
     * @returns {Object} 驗證結果
     */
    validateForm(data) {
        const errors = [];
        const invalidFields = [];

        // 必填欄位檢查
        if (!data.name) {
            errors.push('請填寫姓名');
            invalidFields.push('name');
        } else if (data.name.length < 2) {
            errors.push('姓名至少需要2個字符');
            invalidFields.push('name');
        }

        if (!data.phone) {
            errors.push('請填寫電話號碼');
            invalidFields.push('phone');
        } else if (!Helpers.isValidPhone(data.phone)) {
            errors.push('請輸入有效的電話號碼');
            invalidFields.push('phone');
        }

        // Email格式檢查（選填）
        if (data.email && !Helpers.isValidEmail(data.email)) {
            errors.push('請輸入有效的電子郵件地址');
            invalidFields.push('email');
        }

        // 訊息長度檢查
        if (data.message && data.message.length > 1000) {
            errors.push('留言內容不能超過1000字符');
            invalidFields.push('message');
        }

        return {
            isValid: errors.length === 0,
            message: errors.join('、'),
            invalidFields
        };
    }

    /**
     * 增強表單輸入體驗
     */
    enhanceFormInputs() {
        const inputs = this.form.querySelectorAll('.form-control');
        
        inputs.forEach(input => {
            // 焦點效果
            input.addEventListener('focus', () => {
                input.parentElement?.classList.add('focused');
                this.clearInputError(input);
            });

            input.addEventListener('blur', () => {
                input.parentElement?.classList.remove('focused');
                
                // 即時驗證
                if (input.value.trim()) {
                    this.validateInput(input);
                }
            });

            // 輸入時清除錯誤狀態
            input.addEventListener('input', () => {
                this.clearInputError(input);
                
                // 即時字數統計（針對textarea）
                if (input.tagName === 'TEXTAREA') {
                    this.updateCharacterCount(input);
                }
            });

            // 電話號碼格式化
            if (input.type === 'tel') {
                input.addEventListener('input', () => {
                    this.formatPhoneNumber(input);
                });
            }
        });
    }

    /**
     * 驗證單個輸入欄位
     * @param {HTMLElement} input - 輸入欄位
     * @returns {boolean} 驗證結果
     */
    validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        // 根據輸入類型進行驗證
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = '此欄位為必填';
        } else if (input.type === 'email' && value && !Helpers.isValidEmail(value)) {
            isValid = false;
            errorMessage = '請輸入有效的電子郵件地址';
        } else if (input.type === 'tel' && value && !Helpers.isValidPhone(value)) {
            isValid = false;
            errorMessage = '請輸入有效的電話號碼';
        } else if (input.name === 'name' && value && value.length < 2) {
            isValid = false;
            errorMessage = '姓名至少需要2個字符';
        }

        // 顯示/隱藏錯誤狀態
        if (!isValid) {
            this.showInputError(input, errorMessage);
        } else {
            this.clearInputError(input);
        }

        return isValid;
    }

    /**
     * 顯示輸入錯誤
     * @param {HTMLElement} input - 輸入欄位
     * @param {string} message - 錯誤訊息
     */
    showInputError(input, message) {
        input.classList.add('error');
        
        // 移除現有錯誤訊息
        const existingError = input.parentElement?.querySelector('.error-message');
        existingError?.remove();
        
        // 添加新錯誤訊息
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: var(--color-error);
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: block;
        `;
        
        input.parentElement?.appendChild(errorElement);
    }

    /**
     * 清除輸入錯誤狀態
     * @param {HTMLElement} input - 輸入欄位
     */
    clearInputError(input) {
        input.classList.remove('error');
        const errorMessage = input.parentElement?.querySelector('.error-message');
        errorMessage?.remove();
    }

    /**
     * 高亮顯示無效欄位
     * @param {string[]} fieldNames - 欄位名稱陣列
     */
    highlightInvalidFields(fieldNames) {
        fieldNames.forEach(fieldName => {
            const input = this.form.querySelector(`[name="${fieldName}"]`);
            if (input) {
                this.showInputError(input, '請檢查此欄位');
                input.focus();
            }
        });
    }

    /**
     * 清除所有欄位驗證狀態
     */
    clearFieldValidation() {
        const inputs = this.form.querySelectorAll('.form-control');
        inputs.forEach(input => {
            this.clearInputError(input);
        });
    }

    /**
     * 設置提交按鈕狀態
     * @param {HTMLElement} button - 按鈕元素
     * @param {boolean} loading - 是否為載入狀態
     * @param {string} text - 按鈕文字
     */
    setSubmitButtonState(button, loading, text) {
        button.disabled = loading;
        button.textContent = text;
        
        if (loading) {
            button.style.opacity = '0.7';
            button.style.cursor = 'not-allowed';
        } else {
            button.style.opacity = '';
            button.style.cursor = '';
        }
    }

    /**
     * 格式化電話號碼
     * @param {HTMLElement} input - 電話輸入欄位
     */
    formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, '');
        
        // 台灣手機號碼格式化 (09XX-XXX-XXX)
        if (value.startsWith('09') && value.length >= 10) {
            value = value.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3');
        }
        // 台灣市話格式化 (02-XXXX-XXXX)
        else if (value.startsWith('02') && value.length >= 9) {
            value = value.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
        }
        
        input.value = value;
    }

    /**
     * 更新字數統計
     * @param {HTMLElement} textarea - 文字區域
     */
    updateCharacterCount(textarea) {
        const maxLength = 1000;
        const currentLength = textarea.value.length;
        
        let counter = textarea.parentElement?.querySelector('.character-count');
        
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'character-count';
            counter.style.cssText = `
                text-align: right;
                font-size: 0.75rem;
                color: var(--color-text-secondary);
                margin-top: 0.25rem;
            `;
            textarea.parentElement?.appendChild(counter);
        }
        
        counter.textContent = `${currentLength}/${maxLength}`;
        
        if (currentLength > maxLength) {
            counter.style.color = 'var(--color-error)';
        } else {
            counter.style.color = 'var(--color-text-secondary)';
        }
    }

    /**
     * 模擬表單提交
     * @param {Object} data - 表單數據
     * @returns {Promise} 提交承諾
     */
    simulateFormSubmission(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('表單數據:', data);
                resolve();
            }, 1500);
        });
    }

    /**
     * 追蹤表單提交事件
     */
    trackFormSubmission() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'engagement',
                event_label: 'contact_form'
            });
        }
    }
}