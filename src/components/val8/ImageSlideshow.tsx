"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSlideshowProps {
    images: string[];
    title?: string;
    onClose: () => void;
}

export const ImageSlideshow: React.FC<ImageSlideshowProps> = ({ images, title, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    if (images.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col"
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-white font-serif text-lg">{title || 'Gallery'}</h3>
                <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Image Container */}
            <div className="flex-1 relative flex items-center justify-center p-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full max-w-4xl max-h-[70vh]"
                    >
                        <Image
                            src={images[currentIndex]}
                            alt={`Slide ${currentIndex + 1}`}
                            fill
                            className="object-contain rounded-2xl"
                            sizes="(max-width: 1024px) 100vw, 80vw"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={goToPrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white backdrop-blur-sm"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white backdrop-blur-sm"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}
            </div>

            {/* Dot Indicators */}
            {images.length > 1 && (
                <div className="flex items-center justify-center gap-2 p-4">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                    ? 'bg-primary w-6'
                                    : 'bg-white/30 hover:bg-white/50'
                                }`}
                        />
                    ))}
                </div>
            )}

            {/* Image Counter */}
            <div className="text-center pb-4 text-white/60 text-sm">
                {currentIndex + 1} / {images.length}
            </div>
        </motion.div>
    );
};
