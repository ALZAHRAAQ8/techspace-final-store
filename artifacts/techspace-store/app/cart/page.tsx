'use client';

import { useMemo, useState } from 'react';
import { useCreateOrder, useGetCurrentUser, getListMyOrdersQueryKey, useListProducts } from '@workspace/api-client-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Minus, Plus, Trash2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useCart } from '../../components/cart-store';
import { EmptyState, ErrorState, formatKwd } from '../../components/ui';

export default function CartPage() {
  const cart = useCart();
  const productsQuery = useListProducts();
  const userQuery = useGetCurrentUser();
  const createOrder = useCreateOrder();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [orderSuccess, setOrderSuccess] = useState('');
  const [orderError, setOrderError] = useState('');
  const products = productsQuery.data ?? [];
  const cartProducts = useMemo(() => cart.items.map((item) => ({ item, product: products.find((product) => product.id === item.productId) })).filter((entry): entry is { item: typeof cart.items[number]; product: NonNullable<typeof products[number]> } => Boolean(entry.product)), [cart.items, products]);
  const unavailable = cart.items.filter((item) => productsQuery.data && !products.some((product) => product.id === item.productId));
  const total = cartProducts.reduce((sum, entry) => sum + entry.product.price * entry.item.quantity, 0);

  function placeOrder() {
    setOrderError('');
    setOrderSuccess('');
    if (!userQuery.data) {
      router.push(`/login?returnTo=${encodeURIComponent('/cart')}`);
      return;
    }
    if (!cartProducts.length) return;
    createOrder.mutate({ data: { items: cartProducts.map(({ item }) => ({ productId: item.productId, quantity: item.quantity })) } }, {
      onSuccess: (order) => {
        cart.clear();
        setOrderSuccess(`تم تأكيد طلبك رقم ${order.id}`);
        queryClient.invalidateQueries({ queryKey: getListMyOrdersQueryKey() });
      },
      onError: () => setOrderError('تعذر إنشاء الطلب. تأكد من تسجيل الدخول ثم حاول مرة أخرى.'),
    });
  }

  if (!cart.ready || productsQuery.isLoading) {
    return <main className="container-shop min-h-[65vh] py-12" aria-label="جاري تحميل السلة" data-testid="loading-cart"><div className="grid animate-pulse gap-7 md:grid-cols-[1fr_340px]"><div className="h-72 rounded-[28px] bg-[#e1eeee]" /><div className="h-64 rounded-[28px] bg-[#e1eeee]" /></div></main>;
  }
  if (productsQuery.isError) {
    return <main className="container-shop min-h-[65vh] py-12"><ErrorState onRetry={() => productsQuery.refetch()} message="تعذر تحميل أسعار المنتجات من المتجر." /></main>;
  }

  return (
    <main className="container-shop min-h-[65vh] py-10 sm:py-14" dir="rtl">
      <div className="mb-8">
        <p className="mb-2 text-xs font-bold tracking-[0.18em] text-[#078e83]">قبل المغادرة</p>
        <h1 className="text-3xl font-extrabold tracking-[-0.05em] text-[#10263e] sm:text-4xl">سلة مشترياتك</h1>
      </div>
      {orderSuccess ? (
        <div className="rounded-[28px] border border-[#bde5db] bg-[#eefaf6] px-6 py-12 text-center" role="status" data-testid="status-order-success">
          <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-[#078e83] text-white"><Check size={28} /></span>
          <h2 className="mt-5 text-2xl font-bold text-[#17344a]">وصلنا طلبك</h2>
          <p className="mt-2 text-sm text-[#617985]">{orderSuccess}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/orders" className="rounded-full bg-[#10263e] px-5 py-3 text-sm font-bold text-white" data-testid="link-order-history">عرض طلباتي</Link>
            <Link href="/products" className="rounded-full border border-[#b9d8d4] px-5 py-3 text-sm font-bold text-[#087f76]" data-testid="link-continue-shopping">متابعة التسوق</Link>
          </div>
        </div>
      ) : !cart.items.length ? (
        <EmptyState title="سلتك فاضية للحين" description="ابدأ من أساسيات السفر واختر اللي يناسب رحلتك." actionHref="/products" actionLabel="تصفّح المنتجات" />
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_350px]">
          <section className="space-y-3" aria-label="المنتجات في السلة">
            {cartProducts.map(({ item, product }) => (
              <article key={item.productId} className="flex gap-4 rounded-[22px] border border-[#dce8e8] bg-white p-4 sm:items-center sm:p-5" data-testid={`row-cart-${item.productId}`}>
                <div className="size-24 shrink-0 overflow-hidden rounded-2xl bg-[#e8f2f1] sm:size-28">
                  <img src={product.image} alt={product.nameAr || product.name} className="h-full w-full object-cover" onError={(event) => { event.currentTarget.style.display = 'none'; }} data-testid={`img-cart-${product.id}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold tracking-widest text-[#078e83]">{product.category}</p>
                  <h2 className="mt-1 truncate font-bold text-[#17344a]">{product.nameAr || product.name}</h2>
                  <p className="mt-1 text-sm font-bold text-[#536b79]" data-testid={`text-cart-price-${product.id}`}>{formatKwd(product.price)} د.ك</p>
                  <div className="mt-3 flex items-center gap-2">
                    <button type="button" onClick={() => cart.setQuantity(product.id, item.quantity - 1)} className="grid size-8 place-items-center rounded-full bg-[#edf5f4] text-[#3c6170]" aria-label="تقليل الكمية" data-testid={`button-quantity-minus-${product.id}`}><Minus size={14} /></button>
                    <span className="min-w-6 text-center text-sm font-bold" data-testid={`text-quantity-${product.id}`}>{item.quantity}</span>
                    <button type="button" onClick={() => cart.setQuantity(product.id, item.quantity + 1)} disabled={item.quantity >= 20} className="grid size-8 place-items-center rounded-full bg-[#edf5f4] text-[#3c6170] disabled:opacity-40" aria-label="زيادة الكمية" data-testid={`button-quantity-plus-${product.id}`}><Plus size={14} /></button>
                  </div>
                </div>
                <div className="hidden flex-col items-end gap-5 sm:flex">
                  <p className="font-bold text-[#10263e]">{formatKwd(product.price * item.quantity)} د.ك</p>
                  <button type="button" onClick={() => cart.remove(product.id)} className="text-xs font-bold text-[#bc4a76] hover:text-[#8f2f5a]" data-testid={`button-remove-${product.id}`}><Trash2 className="ml-1 inline" size={14} />إزالة</button>
                </div>
                <button type="button" onClick={() => cart.remove(product.id)} className="self-start rounded-full p-2 text-[#bc4a76] sm:hidden" aria-label="إزالة المنتج" data-testid={`button-remove-mobile-${product.id}`}><Trash2 size={16} /></button>
              </article>
            ))}
            {unavailable.map((item) => (
              <div key={item.productId} className="flex items-center justify-between rounded-2xl border border-[#f0c9d9] bg-[#fff5f8] p-4 text-sm" data-testid={`status-unavailable-${item.productId}`}>
                <span className="text-[#963960]">أحد المنتجات لم يعد متوفراً.</span>
                <button type="button" onClick={() => cart.remove(item.productId)} className="font-bold text-[#963960]" data-testid={`button-remove-unavailable-${item.productId}`}>إزالة</button>
              </div>
            ))}
            <Link href="/products" className="inline-flex items-center gap-2 px-2 py-3 text-sm font-bold text-[#087f76]" data-testid="link-back-to-shop"><ArrowLeft size={16} />أضف منتجات أخرى</Link>
          </section>
          <aside className="rounded-[24px] border border-[#dce8e8] bg-white p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-bold text-[#17344a]">ملخص الطلب</h2>
            <div className="mt-5 flex justify-between text-sm text-[#71828d]"><span>المنتجات ({cartProducts.reduce((sum, entry) => sum + entry.item.quantity, 0)})</span><span>{formatKwd(total)} د.ك</span></div>
            <div className="my-5 border-t border-dashed border-[#d7e4e4]" />
            <div className="flex items-end justify-between"><span className="text-sm font-bold text-[#17344a]">الإجمالي</span><span className="text-2xl font-extrabold tracking-tight text-[#10263e]" data-testid="text-cart-total">{formatKwd(total)}<small className="mr-1 text-xs text-[#078e83]">د.ك</small></span></div>
            <p className="mt-3 text-[11px] leading-5 text-[#83919a]">يتم تأكيد طلبك فقط. لا يتم تحصيل أي مبلغ إلكترونياً.</p>
            {orderError && <p role="alert" className="mt-4 rounded-xl bg-[#fff1f5] p-3 text-xs leading-5 text-[#9c3766]" data-testid="status-order-error">{orderError}</p>}
            <button type="button" onClick={placeOrder} disabled={createOrder.isPending || !cartProducts.length} className="mt-5 w-full rounded-full bg-[#078e83] px-5 py-4 text-sm font-extrabold text-white transition hover:bg-[#08776f] disabled:cursor-not-allowed disabled:opacity-55" data-testid="button-place-order">{createOrder.isPending ? 'جاري تأكيد الطلب...' : 'تأكيد الطلب'}</button>
            {!userQuery.data && <p className="mt-3 text-center text-xs text-[#83919a]">ستحتاج لتسجيل الدخول قبل تأكيد طلبك.</p>}
          </aside>
        </div>
      )}
    </main>
  );
}
