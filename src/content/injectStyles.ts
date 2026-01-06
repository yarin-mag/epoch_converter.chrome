function injectCSS(css: string): void {
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
}

const MODAL_CSS = `
.epoch-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.epoch-modal-content {
  position: relative;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  color: #f1f5f9;
  padding: 0;
  border-radius: 24px;
  z-index: 10001;
  display: flex;
  flex-direction: column;
  min-width: 600px;
  max-width: 700px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(99, 102, 241, 0.2);
  animation: slideUp 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform-origin: center;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.epoch-modal-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #6366f1 100%);
  background-size: 200% 100%;
  animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.epoch-modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  font-size: 28px;
  color: #cbd5e1;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  padding: 8px 12px;
  line-height: 1;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
}

.epoch-modal-close:hover {
  color: #ffffff;
  background: rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 102, 241, 0.4);
  transform: rotate(90deg) scale(1.1);
}

.epoch-modal-close:active {
  transform: rotate(90deg) scale(0.95);
}

.epoch-modal-form {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 32px;
  padding-top: 48px;
}

.epoch-modal-header {
  text-align: center;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(99, 102, 241, 0.2);
}

.epoch-modal-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.epoch-modal-subtitle {
  font-size: 14px;
  color: #94a3b8;
  font-weight: 500;
}

.epoch-modal-inputs-row {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.epoch-modal-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 70px;
}

.epoch-modal-label {
  font-size: 11px;
  font-weight: 600;
  color: #cbd5e1;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.epoch-modal-input {
  width: 100%;
  padding: 12px 8px;
  text-align: center;
  background: rgba(30, 41, 59, 0.6);
  color: #f1f5f9;
  border: 2px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Courier New', monospace;
  transition: all 0.2s ease;
}

.epoch-modal-input:focus {
  outline: none;
  border-color: #6366f1;
  background: rgba(30, 41, 59, 0.8);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  transform: translateY(-2px);
}

.epoch-modal-input:hover {
  border-color: rgba(99, 102, 241, 0.4);
}

.epoch-modal-select-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
}

.epoch-modal-select {
  padding: 12px 16px;
  background: rgba(30, 41, 59, 0.6);
  color: #f1f5f9;
  border: 2px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
}

.epoch-modal-select:focus {
  outline: none;
  border-color: #6366f1;
  background: rgba(30, 41, 59, 0.8);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.epoch-modal-select:hover {
  border-color: rgba(99, 102, 241, 0.4);
}

.epoch-modal-button {
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.epoch-modal-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.epoch-modal-button:hover::before {
  width: 300px;
  height: 300px;
}

.epoch-modal-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.6);
}

.epoch-modal-button:active {
  transform: translateY(0);
}

.epoch-modal-button-text {
  position: relative;
  z-index: 1;
}
`;

const NOTIFICATIONS_CSS = `
.epoch-notification {
  position: fixed;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  color: #f1f5f9;
  padding: 0;
  border-radius: 16px;
  z-index: 10000;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(99, 102, 241, 0.2);
  font-size: 15px;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
  display: flex;
  flex-direction: column;
  min-width: 320px;
  max-width: 400px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  animation: slideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.epoch-notification.top-right {
  top: 24px;
  right: 24px;
}

.epoch-notification.bottom-right {
  bottom: 24px;
  right: 24px;
}

.epoch-notification::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #6366f1 100%);
  background-size: 200% 100%;
  animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.epoch-notification-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 24px 16px 24px;
  background: rgba(99, 102, 241, 0.1);
  border-bottom: 1px solid rgba(99, 102, 241, 0.2);
}

.epoch-notification-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  padding: 8px;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  flex-shrink: 0;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.6);
  }
}

.epoch-notification-title {
  font-size: 16px;
  font-weight: 700;
  color: #f1f5f9;
  letter-spacing: 0.3px;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.epoch-notification-title::after {
  content: '⏱️';
  font-size: 18px;
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.epoch-notification-content {
  color: #cbd5e1;
  padding: 16px 24px 20px 24px;
  line-height: 1.6;
  font-size: 14px;
  font-weight: 500;
}

.epoch-notification.fade-out {
  animation: slideOut 0.3s ease-in forwards;
}

@keyframes slideOut {
  to {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
}
`;

export function injectStyles(): void {
  injectCSS(MODAL_CSS);
  injectCSS(NOTIFICATIONS_CSS);
}
