'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '../CartProvider';

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = '923310405737'; // ← Replace with your number (no +, no spaces)
// e.g. for +92 300 1234567 → '923001234567'
// ─────────────────────────────────────────────────────────────────────────────

interface OrderForm {
    name: string;
    address: string;
    phone: string;
}

export default function CartSheet() {
    const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice, isOpen, setIsOpen } = useCart();

    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState<OrderForm>({ name: '', address: '', phone: '' });
    const [errors, setErrors] = useState<Partial<OrderForm>>({});

    const validate = () => {
        const e: Partial<OrderForm> = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.address.trim()) e.address = 'Address is required';
        if (!form.phone.trim()) e.phone = 'Phone is required';
        else if (!/^\+?[\d\s\-()]{7,}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleOrder = () => {
        if (!validate()) return;

        const itemLines = items
            .map(i => `• ${i.name} x${i.quantity} — Rs.${(i.price * i.quantity).toLocaleString()}`)
            .join('\n');

        const message =
            ` *New Order — Boom Boom*\n\n` +
            ` *Name:* ${form.name}\n` +
            ` *Address:* ${form.address}\n` +
            ` *Phone:* ${form.phone}\n\n` +
            `*Order Details:*\n${itemLines}\n\n` +
            ` *Total: Rs.${totalPrice.toLocaleString()}*`;

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');

        clearCart();
        setShowModal(false);
        setIsOpen(false);
        setForm({ name: '', address: '', phone: '' });
    };

    return (
        <>
            {/* ── CART SHEET ── */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="cart-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                        />

                        {/* Sheet */}
                        <motion.div
                            key="cart-sheet"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[420px] flex flex-col bg-white shadow-2xl"
                        >
                            {/* Top stripe */}
                            <div className="h-1.5 w-full bg-red-500 shrink-0" />

                            {/* Header */}
                            <div className="flex items-center justify-between px-5 py-4 border-b-2 border-red-100">
                                <div className="flex items-center gap-2">
                                    <ShoppingBag className="h-5 w-5 text-red-600" />
                                    <h2 className="font-heading text-xl text-gray-800">Your Cart</h2>
                                    {totalItems > 0 && (
                                        <span className="ml-1 px-2 py-0.5 rounded-full bg-red-600 text-white text-xs font-bold">
                                            {totalItems}
                                        </span>
                                    )}
                                </div>
                                <motion.button
                                    whileHover={{ rotate: 90 }}
                                    whileTap={{ scale: 0.88 }}
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-red-300 bg-red-50 text-red-600"
                                >
                                    <X className="h-4 w-4" />
                                </motion.button>
                            </div>

                            {/* Items */}
                            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                                <AnimatePresence initial={false}>
                                    {items.length === 0 ? (
                                        <motion.div
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex flex-col items-center justify-center h-64 text-center gap-4"
                                        >
                                            <span className="text-6xl">🛒</span>
                                            <p className="text-gray-500 font-body">Your cart is empty</p>
                                            <button
                                                onClick={() => setIsOpen(false)}
                                                className="text-sm text-red-600 font-semibold underline underline-offset-2"
                                            >
                                                Browse the menu
                                            </button>
                                        </motion.div>
                                    ) : (
                                        items.map(item => (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                                                transition={{ duration: 0.22 }}
                                                className="flex items-center gap-3 p-3 rounded-2xl border-2 border-red-100 bg-red-50/40 hover:border-red-200 transition-colors"
                                            >
                                                {/* Image */}
                                                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-red-100">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={64}
                                                        height={64}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-body font-semibold text-sm text-gray-800 truncate">{item.name}</p>
                                                    <p className="text-red-600 font-bold text-sm mt-0.5">
                                                        Rs.{(item.price * item.quantity).toLocaleString()}
                                                    </p>

                                                    {/* Quantity controls */}
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-6 h-6 flex items-center justify-center rounded-full bg-white border-2 border-red-300 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </button>
                                                        <span className="w-5 text-center font-bold text-sm text-gray-800">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-6 h-6 flex items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Remove */}
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-red-600 hover:bg-red-100 transition-colors shrink-0"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </motion.div>
                                        ))
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Footer */}
                            {items.length > 0 && (
                                <div className="px-4 py-5 border-t-2 border-red-100 space-y-3 bg-white">
                                    <div className="flex items-center justify-between">
                                        <span className="font-body text-gray-500 text-sm">Subtotal</span>
                                        <span className="font-body font-bold text-gray-800">Rs.{totalPrice.toLocaleString()}</span>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => setShowModal(true)}
                                        className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl bg-red-600 text-white font-body font-bold text-sm shadow-md shadow-red-300 hover:bg-red-700 transition-colors"
                                    >
                                        <span className="flex items-center gap-2">
                                            <MessageCircle className="h-4 w-4" />
                                            Order via WhatsApp
                                        </span>
                                        <ChevronRight className="h-4 w-4" />
                                    </motion.button>
                                </div>
                            )}

                            {/* Bottom stripe */}
                            <div className="h-1.5 w-full bg-orange-400 shrink-0" />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* ── ORDER MODAL ── */}
            <AnimatePresence>
                {showModal && (
                    <>
                        <motion.div
                            key="modal-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
                            onClick={() => setShowModal(false)}
                        />
                        <motion.div
                            key="modal"
                            initial={{ opacity: 0, scale: 0.92, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 20 }}
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none"
                        >
                            <div
                                className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto"
                                onClick={e => e.stopPropagation()}
                            >
                                {/* Modal top stripe */}
                                <div className="h-1.5 w-full bg-red-500" />

                                <div className="px-6 py-5">
                                    <div className="flex items-center justify-between mb-5">
                                        <h3 className="font-heading text-xl text-gray-800">Complete Your Order</h3>
                                        <button
                                            onClick={() => setShowModal(false)}
                                            className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Name */}
                                        <div>
                                            <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                value={form.name}
                                                onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: undefined })); }}
                                                placeholder="e.g. Ahmed Khan"
                                                className={`w-full px-4 py-3 rounded-xl border-2 font-body text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-red-400 bg-gray-50 focus:bg-white'}`}
                                            />
                                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                value={form.phone}
                                                onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); setErrors(er => ({ ...er, phone: undefined })); }}
                                                placeholder="e.g. 0300 1234567"
                                                className={`w-full px-4 py-3 rounded-xl border-2 font-body text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-red-400 bg-gray-50 focus:bg-white'}`}
                                            />
                                            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                                        </div>

                                        {/* Address */}
                                        <div>
                                            <label className="block font-body text-sm font-semibold text-gray-700 mb-1.5">
                                                Delivery Address
                                            </label>
                                            <textarea
                                                value={form.address}
                                                onChange={e => { setForm(f => ({ ...f, address: e.target.value })); setErrors(er => ({ ...er, address: undefined })); }}
                                                placeholder="Street, area, city..."
                                                rows={3}
                                                className={`w-full px-4 py-3 rounded-xl border-2 font-body text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors resize-none ${errors.address ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-red-400 bg-gray-50 focus:bg-white'}`}
                                            />
                                            {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                                        </div>

                                        {/* Order summary */}
                                        <div className="rounded-xl bg-red-50 border-2 border-red-100 px-4 py-3">
                                            <p className="font-body text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Order Summary</p>
                                            <div className="space-y-1">
                                                {items.map(i => (
                                                    <div key={i.id} className="flex justify-between text-sm">
                                                        <span className="text-gray-700 font-body">{i.name} × {i.quantity}</span>
                                                        <span className="text-red-600 font-bold font-body">Rs.{(i.price * i.quantity).toLocaleString()}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-2 pt-2 border-t border-red-200 flex justify-between">
                                                <span className="font-body font-bold text-gray-800 text-sm">Total</span>
                                                <span className="font-body font-bold text-red-600">Rs.{totalPrice.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={handleOrder}
                                            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-[#25D366] text-white font-body font-bold text-sm shadow-md hover:bg-[#1ebe5c] transition-colors"
                                        >
                                            <MessageCircle className="h-5 w-5" />
                                            Send Order on WhatsApp
                                        </motion.button>
                                    </div>
                                </div>

                                <div className="h-1.5 w-full bg-orange-400" />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}