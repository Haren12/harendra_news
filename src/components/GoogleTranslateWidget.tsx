import React, { useEffect } from 'react';
import { Globe } from 'lucide-react';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export const GoogleTranslateWidget: React.FC = () => {
  useEffect(() => {
    // Check if script already exists
    if (!document.getElementById('google-translate-script')) {
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'ne,en,hi,es,fr,zh,ja,ar,de,ru,ko,it,pt,bn,ur,fa,vi,th,id,tr,pl,uk,nl,el,sv,ro,hu,cs,da,fi,no,sk,vi',
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            'google_translate_element'
          );
        }
      };

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google && window.google.translate && !document.querySelector('.goog-te-combo')) {
      try {
        window.googleTranslateElementInit?.();
      } catch (e) {
        console.warn('Google translate init error', e);
      }
    }
  }, []);

  return (
    <div id="google_translate_element" className="hidden" aria-hidden="true"></div>
  );
};
