'use client';

import React, { useState, useEffect } from 'react';
import { useT } from '@gitroom/react/translation/get.transation.service.client';
import { useToaster } from '@gitroom/react/toaster/toaster';

export const BrandSettingsComponent = () => {
  const t = useT();
  const toast = useToaster();
  const [logoType, setLogoType] = useState('amanaflow');
  const [customUrl, setCustomUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLogoType(localStorage.getItem('af_logo_type') || 'amanaflow');
      setCustomUrl(localStorage.getItem('af_custom_logo_url') || '');
    }
  }, []);

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('af_logo_type', logoType);
      localStorage.setItem('af_custom_logo_url', customUrl);
      window.dispatchEvent(new Event('af_logo_updated'));
      toast.show(t('brand_settings_saved', 'Brand & logo settings updated successfully!'));
    }
  };

  return (
    <div className="border border-tableBorder rounded-[8px] p-[20px] flex flex-col gap-[16px] mt-[20px] bg-newBgColorInner">
      <div className="flex flex-col gap-[4px]">
        <h4 className="text-[16px] font-semibold text-newTextColor">
          {t('brand_settings_title', 'Brand Logo & Theme Customization')}
        </h4>
        <p className="text-[13px] text-textColorOpac">
          {t('brand_settings_desc', 'Choose the official logo displayed on your application header, navigation bar, and login portal.')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px]">
        {/* Preset 1: AmanaFlow Official */}
        <div
          onClick={() => setLogoType('amanaflow')}
          className={`cursor-pointer p-[14px] rounded-[8px] border transition-all flex flex-col items-center gap-[8px] text-center ${
            logoType === 'amanaflow'
              ? 'border-[#00A3FF] bg-[#00A3FF]/10 text-white'
              : 'border-tableBorder hover:border-[#00A3FF]/50 text-textColorOpac'
          }`}
        >
          <div className="w-[38px] h-[38px] rounded-[6px] bg-gradient-to-br from-[#00A3FF] to-[#00FF9D] flex items-center justify-center font-black text-black text-[18px]">
            AF
          </div>
          <span className="text-[13px] font-medium">AmanaFlow Gradient</span>
          <span className="text-[11px] opacity-75">Electric Cyan & Mint</span>
        </div>

        {/* Preset 2: Postiz Default */}
        <div
          onClick={() => setLogoType('postiz')}
          className={`cursor-pointer p-[14px] rounded-[8px] border transition-all flex flex-col items-center gap-[8px] text-center ${
            logoType === 'postiz'
              ? 'border-[#612BD3] bg-[#612BD3]/10 text-white'
              : 'border-tableBorder hover:border-[#612BD3]/50 text-textColorOpac'
          }`}
        >
          <div className="w-[38px] h-[38px] rounded-[6px] bg-[#612BD3] flex items-center justify-center font-black text-white text-[18px]">
            P
          </div>
          <span className="text-[13px] font-medium">Postiz Original</span>
          <span className="text-[11px] opacity-75">Classic Violet</span>
        </div>

        {/* Preset 3: Custom Brand URL */}
        <div
          onClick={() => setLogoType('custom')}
          className={`cursor-pointer p-[14px] rounded-[8px] border transition-all flex flex-col items-center gap-[8px] text-center ${
            logoType === 'custom'
              ? 'border-green-500 bg-green-500/10 text-white'
              : 'border-tableBorder hover:border-green-500/50 text-textColorOpac'
          }`}
        >
          <div className="w-[38px] h-[38px] rounded-[6px] border border-dashed border-gray-400 flex items-center justify-center text-[18px]">
            🌐
          </div>
          <span className="text-[13px] font-medium">Custom Logo URL</span>
          <span className="text-[11px] opacity-75">Upload or Image Link</span>
        </div>
      </div>

      {logoType === 'custom' && (
        <div className="flex flex-col gap-[8px]">
          <label className="text-[13px] font-medium text-newTextColor">
            {t('custom_logo_url_label', 'Direct Image URL (PNG, SVG, or WebP):')}
          </label>
          <input
            type="text"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="https://yourdomain.com/brand-logo.png"
            className="bg-input border border-tableBorder rounded-[8px] p-[10px] text-newTextColor text-[13px] outline-none"
          />
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="bg-gradient-to-r from-[#00A3FF] to-[#00FF9D] text-black font-semibold px-[16px] py-[8px] rounded-[6px] text-[13px] hover:opacity-90 transition-opacity cursor-pointer"
        >
          {t('save_branding', 'Save Brand Logo')}
        </button>
      </div>
    </div>
  );
};
