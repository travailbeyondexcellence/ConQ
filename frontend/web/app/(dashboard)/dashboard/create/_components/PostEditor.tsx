'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PostEditor() {
  const [caption, setCaption] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: '📷', color: 'from-pink-500 to-purple-500' },
    { id: 'twitter', name: 'Twitter', icon: '🐦', color: 'from-blue-400 to-blue-600' },
    { id: 'facebook', name: 'Facebook', icon: '👥', color: 'from-blue-500 to-blue-700' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'from-blue-600 to-blue-800' },
  ];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Platform Selection */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">
          Select Platforms
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {platforms.map((platform) => {
            const isSelected = selectedPlatforms.includes(platform.id);
            return (
              <motion.button
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-primary shadow-md'
                    : 'border-border hover:border-muted-foreground/50'
                }`}
                style={{
                  backgroundColor: isSelected ? 'rgb(var(--primary) / 0.1)' : 'rgb(var(--card))',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-3xl mb-2">{platform.icon}</div>
                <div className="text-sm font-medium text-foreground">
                  {platform.name}
                </div>
                {isSelected && (
                  <div className="mt-2">
                    <svg className="w-5 h-5 text-primary mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Media Upload */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">
          Upload Media
        </label>
        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer bg-card">
          <svg className="w-12 h-12 text-muted-foreground mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-sm font-medium text-foreground mb-1">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>

      {/* Caption */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-foreground">
            Caption
          </label>
          <span className="text-xs text-muted-foreground">
            {caption.length}/2200
          </span>
        </div>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write your caption here..."
          rows={6}
          maxLength={2200}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
        />
      </div>

      {/* Hashtags Helper */}
      <div className="p-4 rounded-lg bg-muted/50 border border-border">
        <h4 className="text-sm font-semibold text-foreground mb-2">💡 Hashtag Suggestions</h4>
        <div className="flex flex-wrap gap-2">
          {['#socialmedia', '#contentcreator', '#marketing', '#digitalmarketing', '#socialmediamarketing'].map((tag) => (
            <button
              key={tag}
              className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
              onClick={() => setCaption(prev => prev + ' ' + tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
