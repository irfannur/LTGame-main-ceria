import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('app_token') || '',
    email: localStorage.getItem('app_email') || '',
    isValidated: !!localStorage.getItem('app_token') && !!localStorage.getItem('app_email'),
    appsScriptUrl: import.meta.env.VITE_API_URL || '',
    buyTokenUrl: 'https://tokopedia.com' // Ganti link toko kamu
  }),

  getters: {
    isAuthorized: (state) => state.isValidated && !!state.token && !!state.email,
    isDemoAccount: (state) => state.token.trim().toLowerCase() === 'demo2026',
  },

  actions: {
    async validateToken(inputToken, inputEmail) {
      if (!inputToken || !inputEmail) return false;
      const formattedToken = inputToken.trim().toLowerCase();
      const formattedEmail = inputEmail.trim().toLowerCase();

      // Mode Demo Bypass
      if (formattedToken === "demo2026") {
        this.setAuth(formattedToken, formattedEmail);
        return true;
      }

      // Validasi via Backend / Apps Script JSONP
      return new Promise((resolve) => {
        const callbackName = 'jsonp_auth_' + Math.random().toString(36).substring(2, 11);

        window[callbackName] = (data) => {
          if (document.body.contains(script)) document.body.removeChild(script);
          delete window[callbackName];

          if (data && data.isValid) {
            this.setAuth(formattedToken, formattedEmail);
            resolve(true);
          } else {
            resolve(false);
          }
        };

        const script = document.createElement('script');
        const sheetName = import.meta.env.VITE_SHEET_NAME || '';
        
        // Menambahkan parameter email ke URL request
        script.src = `${this.appsScriptUrl}?token=${encodeURIComponent(formattedToken)}&email=${encodeURIComponent(formattedEmail)}&sheetName=${encodeURIComponent(sheetName)}&callback=${callbackName}`;
        
        script.onerror = () => {
          if (document.body.contains(script)) document.body.removeChild(script);
          delete window[callbackName];
          resolve(false);
        };

        document.body.appendChild(script);
      });
    },

    setAuth(token, email) {
      this.token = token;
      this.email = email;
      this.isValidated = true;
      localStorage.setItem('app_token', token);
      localStorage.setItem('app_email', email);
    },

    logout() {
      this.token = '';
      this.email = '';
      this.isValidated = false;
      localStorage.removeItem('app_token');
      localStorage.removeItem('app_email');
    }
  }
});