'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { getListMyOrdersQueryKey } from '@workspace/api-client-react';
import { useCart } from '../../../components/cart-store';

export default function CheckoutSuccess() {
  const [message, setMessage] = useState('جاري التحقق من الدفع…');
  const queryClient = useQueryClient();
  const cart = useCart();
  useEffect(() => {
    if (!cart.ready) return;
    let active = true;
    const id = new URLSearchParams(window.location.search).get('session_id');
    fetch(`/api/checkout?session_id=${encodeURIComponent(id || '')}`, { cache: 'no-store' })
      .then(async response => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'تعذر التحقق من الدفع.');
        if (!active) return;
        setMessage(result.paid ? 'تم تأكيد الدفع بنجاح. شكراً لطلبك!' : 'لم يتم تأكيد الدفع بعد. أعد تحميل الصفحة للتحقق.');
        if (result.paid) {
          try {
            const pending = JSON.parse(sessionStorage.getItem('techspace-pending-order') || 'null');
            if (pending?.id === result.orderId && Array.isArray(pending.items)) {
              for (const item of pending.items) {
                if (cart.items.some(current => current.productId === item.productId && current.quantity === item.quantity))
                  cart.remove(item.productId);
              }
            }
          } catch { /* Payment remains verified even if browser storage is unavailable. */ }
          sessionStorage.removeItem('techspace-pending-order');
          queryClient.invalidateQueries({ queryKey: getListMyOrdersQueryKey() });
        }
      }).catch(error => { if (active) setMessage(error.message); });
    return () => { active = false; };
  }, [cart.ready, queryClient]);
  return <main className="container-shop min-h-[65vh] py-20 text-center" dir="rtl">
    <h1 className="text-3xl font-bold">حالة الدفع</h1>
    <p role="status" className="my-8">{message}</p>
    <p className="mb-8 text-sm">لا تُحذف المنتجات من سلتك إلا بعد تأكيد الدفع، وتبقى المنتجات الجديدة محفوظة.</p>
    <Link href="/orders" className="rounded-full bg-[#078e83] px-6 py-3 text-white">عرض طلباتي</Link>
  </main>;
}
