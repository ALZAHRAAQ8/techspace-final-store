'use client';

import { useState } from 'react';
import { useGetProduct, getGetProductQueryKey } from '@workspace/api-client-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowRight, Check, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useCart } from '../../../components/cart-store';
import { ErrorState, formatKwd } from '../../../components/ui';

export default function ProductDetailPage() {
  const params = useParams<{ productId: string }>();
  const productId = params.productId ?? '';
  const productQuery = useGetProduct(productId, { query: { enabled: Boolean(productId), queryKey: getGetProductQueryKey(productId) } });
  const cart = useCart();
  const [added, setAdded] = useState(false);

  if (productQuery.isLoading) {
    return <main className="container-shop min-h-[65vh] py-12" aria-label="جاري تحميل المنتج" data-testid="loading-product"><div className="grid animate-pulse gap-10 md:grid-cols-2"><div className="aspect-square rounded-[30px] bg-[#e1eeee]" /><div className="space-y-5 pt-10"><div className="h-4 w-1/4 rounded bg-[#e1eeee]" /><div className="h-10 w-3/4 rounded bg-[#e1eeee]" /><div className="h-24 rounded bg-[#e1eeee]" /></div></div></main>;
  }
  if (productQuery.isError || !productQuery.data) {
    return <main className="container-shop min-h-[65vh] py-12"><ErrorState onRetry={() => productQuery.refetch()} message="لم نتمكن من العثور على هذا المنتج." /></main>;
  }

  const product = productQuery.data;
  return (
    <main className="container-shop min-h-[65vh] py-8 sm:py-12" dir="rtl">
      <Link href="/products" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#647784] hover:text-[#078e83]" data-testid="link-back-products"><ArrowRight size={17} />العودة للمنتجات</Link>
      <div className="grid gap-9 md:grid-cols-[1fr_1fr] md:gap-14">
        <div className="relative aspect-square overflow-hidden rounded-[30px] bg-[radial-gradient(circle_at_35%_25%,#d6faf0,transparent_50%),linear-gradient(135deg,#e8f2f1,#d4e5e8)]">
          {product.tag && <span className="absolute right-5 top-5 z-10 rounded-full bg-[#e54591] px-4 py-2 text-xs font-bold text-white">{product.tag}</span>}
          <img src={product.image} alt={product.nameAr || product.name} className="h-full w-full object-cover" onError={(event) => { event.currentTarget.style.display = 'none'; }} data-testid={`img-product-detail-${product.id}`} />
          <span className="pointer-events-none absolute inset-0 -z-0 grid place-items-center text-8xl font-extrabold tracking-[-0.12em] text-[#078e83]/20">TS</span>
        </div>
        <div className="py-2 md:py-8">
          <p className="text-xs font-bold tracking-[0.16em] text-[#078e83]">{product.category}</p>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.05em] text-[#10263e] sm:text-4xl" data-testid="text-detail-name">{product.nameAr || product.name}</h1>
          {product.nameAr && product.name && <p className="mt-2 text-sm text-[#82919a]">{product.name}</p>}
          <p className="mt-6 text-sm leading-8 text-[#647784]" data-testid="text-detail-description">{product.description}</p>
          <div className="mt-8 border-y border-[#dce8e8] py-5">
            <p className="text-xs text-[#80909a]">السعر</p>
            <p className="mt-1 text-3xl font-extrabold tracking-[-0.04em] text-[#10263e]" data-testid="text-detail-price">{formatKwd(product.price)} <span className="text-sm font-bold text-[#078e83]">د.ك</span></p>
          </div>
          <button type="button" onClick={() => { cart.add(product.id); setAdded(true); window.setTimeout(() => setAdded(false), 2500); }} className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-[#078e83] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[#08776f]" data-testid="button-add-detail">
            {added ? <Check size={18} /> : <ShoppingBag size={18} />}{added ? 'تمت الإضافة للسلة' : 'أضف إلى السلة'}
          </button>
          <div className="mt-5 flex items-center gap-2 text-xs text-[#71828d]"><ShieldCheck size={16} className="text-[#078e83]" />لا يوجد دفع إلكتروني في هذه الخطوة. الطلب للتأكيد فقط.</div>
          {added && <Link href="/cart" className="mt-4 block text-center text-sm font-bold text-[#087f76]" data-testid="link-view-cart">انتقل إلى السلة</Link>}
        </div>
      </div>
    </main>
  );
}
