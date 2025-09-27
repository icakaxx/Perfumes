"use client";

import { useState, useEffect } from "react";
import { CheckCircle, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CartPopupProps {
  isVisible: boolean;
  productName: string;
  quantity: number;
  volume: number;
  onClose: () => void;
}

export function CartPopup({ isVisible, productName, quantity, volume, onClose }: CartPopupProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.3 
          }}
          className="fixed bottom-6 right-6 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm"
        >
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
              className="flex-shrink-0"
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </motion.div>
            
            <div className="flex-1">
              <motion.h3
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="font-semibold text-gray-900 text-sm"
              >
                Добавено в количката!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 text-xs mt-1"
              >
                {quantity}x {productName} ({volume}ml)
              </motion.p>
            </div>
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={onClose}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
          
          {/* Progress bar */}
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 3, ease: "linear" }}
            className="absolute bottom-0 left-0 h-1 bg-green-500 rounded-b-lg"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}


