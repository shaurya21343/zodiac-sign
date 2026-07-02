'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Compass } from 'lucide-react';

// 1. Updated Zodiac Data mapping with elements and traits
const ZODIAC_DATA = [
  { id: 'capricorn', name: 'Capricorn', icon: '♑', startMonth: 11, startDay: 22, angle: 0, element: 'Earth', traits: 'Ambitious, disciplined, and patient' },
  { id: 'sagittarius', name: 'Sagittarius', icon: '♐', startMonth: 10, startDay: 22, angle: 30, element: 'Fire', traits: 'Adventurous, optimistic, and independent' },
  { id: 'scorpio', name: 'Scorpio', icon: '♏', startMonth: 9, startDay: 23, angle: 60, element: 'Water', traits: 'Passionate, intuitive, and determined' },
  { id: 'libra', name: 'Libra', icon: '♎', startMonth: 8, startDay: 23, angle: 90, element: 'Air', traits: 'Diplomatic, fair, and social' },
  { id: 'virgo', name: 'Virgo', icon: '♍', startMonth: 7, startDay: 23, angle: 120, element: 'Earth', traits: 'Analytical, practical, and diligent' },
  { id: 'leo', name: 'Leo', icon: '♌', startMonth: 6, startDay: 23, angle: 150, element: 'Fire', traits: 'Confident, generous, and loyal' },
  { id: 'cancer', name: 'Cancer', icon: '♋', startMonth: 5, startDay: 21, angle: 180, element: 'Water', traits: 'Compassionate, protective, and intuitive' },
  { id: 'gemini', name: 'Gemini', icon: '♊', startMonth: 4, startDay: 21, angle: 210, element: 'Air', traits: 'Versatile, curious, and communicative' },
  { id: 'taurus', name: 'Taurus', icon: '♉', startMonth: 3, startDay: 20, angle: 240, element: 'Earth', traits: 'Reliable, patient, and devoted' },
  { id: 'aries', name: 'Aries', icon: '♈', startMonth: 2, startDay: 21, angle: 270, element: 'Fire', traits: 'Bold, energetic, and courageous' },
  { id: 'pisces', name: 'Pisces', icon: '♓', startMonth: 1, startDay: 19, angle: 300, element: 'Water', traits: 'Empathetic, artistic, and gentle' },
  { id: 'aquarius', name: 'Aquarius', icon: '♒', startMonth: 0, startDay: 20, angle: 330, element: 'Air', traits: 'Innovative, independent, and humanitarian' },
];

export default function ZodiacWebsite() {
  const [dob, setDob] = useState('');
  const [zodiac, setZodiac] = useState(null);
  const [rotation, setRotation] = useState(0);

  // 2. Exact logic translation for JavaScript 0-indexed month system
  const findZodiacSign = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth(); // 0 = January, 11 = December

    if ((month === 0 && day >= 20) || (month === 1 && day <= 18)) return 'aquarius';
    if ((month === 1 && day >= 19) || (month === 2 && day <= 20)) return 'pisces';
    if ((month === 2 && day >= 21) || (month === 3 && day <= 19)) return 'aries';
    if ((month === 3 && day >= 20) || (month === 4 && day <= 20)) return 'taurus';
    if ((month === 4 && day >= 21) || (month === 5 && day <= 20)) return 'gemini';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 22)) return 'cancer';
    if ((month === 6 && day >= 23) || (month === 7 && day <= 22)) return 'leo';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'virgo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'libra';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 21)) return 'scorpio';
    if ((month === 10 && day >= 22) || (month === 11 && day <= 21)) return 'sagittarius';
    
    return 'capricorn';
  };

  useEffect(() => {
    const signId = findZodiacSign(dob);
    if (signId) {
      const matchedSign = ZODIAC_DATA.find(z => z.id === signId);
      setZodiac(matchedSign);
      // Spin animation calculation to align target slice to the top pointer (90deg offset adjustment)
      setRotation(360 * 2 + (90 - matchedSign.angle)); 
    } else {
      setZodiac(null);
      setRotation(0);
    }
  }, [dob]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-slate-900/50 p-8 rounded-3xl border border-slate-800 backdrop-blur-sm shadow-2xl">
        
        {/* Left Side: Input Form & Results */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 text-indigo-400 mb-2">
              <Compass className="w-6 h-6 animate-pulse" />
              <span className="text-sm font-semibold tracking-widest uppercase">Zodiac Explorer</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Discover Your Sign
            </h1>
            <p className="text-slate-400 mt-2 text-sm">
              Enter your birth date and watch the interactive wheel find your zodiac sign.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-400">
              Your Birth Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-slate-500 pointer-events-none" />
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-inner [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Dynamic Result Panel */}
          <div className="min-h-[140px] flex items-center">
            {zodiac ? (
              <div className="w-full p-6 bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/20 rounded-2xl animate-fade-in">
                <div className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">Your Sign</div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl drop-shadow-md" role="img" aria-label={zodiac.name}>{zodiac.icon}</span>
                    <div>
                      <h2 className="text-3xl font-bold text-white tracking-wide">{zodiac.name}</h2>
                      <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {zodiac.element} Sign
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                    <strong className="text-slate-200">Traits:</strong> {zodiac.traits}.
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full text-center py-8 border border-dashed border-slate-800 rounded-2xl text-slate-500 text-sm">
                Please select a valid date to calculate.
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Interactive Spinning Wheel Component */}
        <div className="flex flex-col items-center justify-center relative">
          {/* Arrow element successfully removed from here */}
          
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-4 border-slate-800/80 bg-slate-950 shadow-[0_0_50px_rgba(99,102,241,0.15)] flex items-center justify-center overflow-hidden">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full transform transition-transform duration-[2500ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {/* Slices Rendering */}
              {ZODIAC_DATA.map((sign, index) => {
                const angleStep = 30;
                const startAngle = index * angleStep - 15; // Centering individual slice alignment
                const endAngle = startAngle + angleStep;
                const radStart = (Math.PI * startAngle) / 180;
                const radEnd = (Math.PI * endAngle) / 180;
                
                // Fixed SSR hydration mismatch by fixing to 3 decimal places
                const x1 = (100 + 90 * Math.cos(radStart)).toFixed(3);
                const y1 = (100 + 90 * Math.sin(radStart)).toFixed(3);
                const x2 = (100 + 90 * Math.cos(radEnd)).toFixed(3);
                const y2 = (100 + 90 * Math.sin(radEnd)).toFixed(3);

                // Label positions for inside vectors
                const textAngle = index * angleStep;
                const textRad = (Math.PI * textAngle) / 180;
                const tx = (100 + 65 * Math.cos(textRad)).toFixed(3);
                const ty = (100 + 65 * Math.sin(textRad)).toFixed(3);

                const isCurrent = zodiac?.id === sign.id;

                return (
                  <g key={sign.id}>
                    {/* Visual Segment Paths */}
                    <path
                      d={`M 100 100 L ${x1} ${y1} A 90 90 0 0 1 ${x2} ${y2} Z`}
                      fill={isCurrent ? '#1e1b4b' : '#020617'}
                      stroke={isCurrent ? '#6366f1' : '#1e293b'}
                      strokeWidth={isCurrent ? '1.5' : '0.5'}
                      className="transition-colors duration-500"
                    />
                    {/* Glyphs Injection */}
                    <text
                      x={tx}
                      y={ty}
                      transform={`rotate(${textAngle + 90}, ${tx}, ${ty})`}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="10"
                      fill={isCurrent ? '#818cf8' : '#475569'}
                      className="font-sans font-bold transition-colors duration-500 select-none"
                    >
                      {sign.icon}
                    </text>
                  </g>
                );
              })}
              {/* Inner Decorative Accent Ring */}
              <circle cx="100" cy="100" r="40" fill="#090d16" stroke="#1e293b" strokeWidth="1" />
            </svg>
            
            {/* Core Center Badge */}
            <div className="absolute w-16 h-16 rounded-full bg-slate-900 border-2 border-slate-800 flex items-center justify-center text-xl font-bold text-indigo-400 shadow-xl backdrop-blur-md transition-all duration-500">
              {zodiac ? zodiac.icon : '✨'}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}