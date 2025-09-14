"use client";

import React from 'react';

interface SuccessAnimationProps {
  className?: string;
  size?: number;
}

const SuccessAnimation: React.FC<SuccessAnimationProps> = ({ 
  className = "", 
  size = 80 
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {/* Background Circle - smooth deformation */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: 'rgba(34, 197, 94, 0.8)',
            animation: 'circlePulse 6s ease-in-out infinite'
          }}
        />
        
        {/* Checkmark that emerges from circle */}
        <svg 
          width={size * 1.1} 
          height={size * 1.1} 
          viewBox="0 0 24 24" 
          fill="none"
          className="relative z-10 text-white"
          style={{
            animation: 'checkmarkEmerge 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
            opacity: 0,
            transform: 'scale(0)'
          }}
        >
          <path
            d="M9 12L11 14L15 10"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        
        {/* Particles */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const distance = 60;
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;
          
          // Random shapes and sizes for each particle
          const shapes = ['circle', 'square', 'triangle', 'diamond'];
          const sizes = [8, 10, 12, 14, 16];
          const colors = ['#22C55E', '#16A34A', '#10B981', '#059669'];
          
          const shape = shapes[i % shapes.length];
          const size = sizes[i % sizes.length];
          const color = colors[i % colors.length];
          
          return (
            <div
              key={i}
              className="absolute"
              style={{
                animation: `particleExplode${i} 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${1.2 + i * 0.02}s infinite`,
                opacity: 0,
                transform: shape === 'diamond' ? 'translate(0, 0) scale(0) rotate(45deg)' : 'translate(0, 0) scale(0)',
                left: '50%',
                top: '50%',
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                boxShadow: `0 0 ${size * 1.5}px ${color}, 0 0 ${size * 3}px rgba(34, 197, 94, 0.6)`,
                borderRadius: shape === 'circle' ? '50%' : 
                           shape === 'square' ? '2px' : 
                           shape === 'triangle' ? '0' : '25%',
                clipPath: shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
              }}
            />
          );
        })}
      </div>
      
      <style jsx>{`
        @keyframes checkmarkEmerge {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          20% {
            opacity: 0.3;
            transform: scale(0.3);
          }
          40% {
            opacity: 0.7;
            transform: scale(0.7);
          }
          60% {
            opacity: 1;
            transform: scale(1.1);
          }
          70% {
            opacity: 1;
            transform: scale(1.05);
          }
          80% {
            opacity: 1;
            transform: scale(0.98);
          }
          90% {
            opacity: 1;
            transform: scale(1.01);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes circlePulse {
          0% {
            transform: scale(1) scaleX(1) scaleY(1);
            border-radius: 50%;
          }
          25% {
            transform: scale(1.005) scaleX(1.01) scaleY(0.995);
            border-radius: 49.5% 50.5% 50.2% 49.8%;
          }
          50% {
            transform: scale(1.002) scaleX(0.995) scaleY(1.008);
            border-radius: 50.5% 49.5% 49.8% 50.2%;
          }
          75% {
            transform: scale(1.008) scaleX(1.003) scaleY(0.997);
            border-radius: 49.8% 50.2% 50.5% 49.5%;
          }
          100% {
            transform: scale(1) scaleX(1) scaleY(1);
            border-radius: 50%;
          }
        }
        
        ${[...Array(12)].map((_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const distance = 60 + (i % 3) * 10; // Vary distance
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;
          
          // Add random variation to movement
          const randomX = (Math.random() - 0.5) * 20;
          const randomY = (Math.random() - 0.5) * 20;
          const randomRotation = (Math.random() - 0.5) * 360;
          
          return `
            @keyframes particleExplode${i} {
              0% {
                opacity: 0;
                transform: translate(0, 0) scale(0) rotate(0deg);
              }
              20% {
                opacity: 0.8;
                transform: translate(0, 0) scale(1.1) rotate(${randomRotation * 0.15}deg);
              }
              40% {
                opacity: 1;
                transform: translate(${x * 0.2 + randomX * 0.3}px, ${y * 0.2 + randomY * 0.3}px) scale(1) rotate(${randomRotation * 0.3}deg);
              }
              70% {
                opacity: 0.9;
                transform: translate(${x * 0.7 + randomX * 0.7}px, ${y * 0.7 + randomY * 0.7}px) scale(0.9) rotate(${randomRotation * 0.6}deg);
              }
              85% {
                opacity: 0.6;
                transform: translate(${x + randomX}px, ${y + randomY}px) scale(0.7) rotate(${randomRotation * 0.8}deg);
              }
              100% {
                opacity: 0;
                transform: translate(${x * 1.1 + randomX * 1.2}px, ${y * 1.1 + randomY * 1.2}px) scale(0.3) rotate(${randomRotation}deg);
              }
            }
          `;
        }).join('')}
      `}</style>
    </div>
  );
};

export default SuccessAnimation;
