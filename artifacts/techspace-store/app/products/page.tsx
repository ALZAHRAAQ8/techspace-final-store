'use client';

import { useMemo, useState } from 'react';
import { useListProducts } from '@workspace/api-client-react';
import Link from 'next/link';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useCart } from '../../components/cart-store';
import { ErrorState, LoadingGrid, PageTitle, ProductCard } from '../../components/ui';

export default function ProductsPage() {
  const productsQuery = useListProducts();
  const cart = useCart();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('الكل');
  const [notice, setNotice] = useState('');
  const categories = useMemo(() => ['الكل', ...Array.from(new Set((productsQuery.data ?? []).map((product) => product.category)))], [productsQuery.data]);
  const products = useMemo(() => (productsQuery.data ?? []).filter((product) => {
    const needle = query.trim().toLocaleLowerCase();
    const matchesQuery = !needle || `${product.name} ${product.nameAr} ${product.category} ${product.description}`.toLocaleLowerCase().includes(needle);
    return matchesQuery && (category === 'الكل' || product.category === category);
  }), [productsQuery.data, query, category]);

  function addToCart(id: string) {
    cart.add(id);
    setNotice('تمت إضافة المنتج إلى سلتك');
    window.setTimeout(() => setNotice(''), 2200);
  }

  return (
    <main className="container-shop min-h-[65vh] py-12 sm:py-16" dir="rtl">
      <PageTitle eyebrow="تسوّق TechSpace" title="كلّ اللي تحتاجه للطريق" description="اختيارات تقنية عملية للمسافر. ابحث حسب المنتج أو تصفح التصنيفات." />
      <div className="mb-8 flex flex-col gap-4 rounded-[24px] border border-[#dce8e8] bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <label className="relative block w-full sm:max-w-sm">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#71828d]" size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="ابحث عن منتج..." className="h-12 w-full rounded-full border border-[#dce8e8] bg-[#f7fbfb] pr-11 pl-4 text-sm outline-none transition focus:border-[#078e83] focus:ring-2 focus:ring-[#078e83]/15" data-testid="input-product-search" />
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <SlidersHorizontal className="shrink-0 text-[#71828d]" size={17} />
          {categories.map((item) => (
            <button key={item} type="button" onClick={() => setCategory(item)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${category === item ? 'bg-[#10263e] text-white' : 'bg-[#edf5f4] text-[#566c7b] hover:bg-[#deedeb]'}`} aria-pressed={category === item} data-testid={`button-category-${item}`}>{item}</button>
          ))}
        </div>
      </div>
      {productsQuery.isLoading ? <LoadingGrid /> : productsQuery.isError ? <ErrorState onRetry={() => productsQuery.refetch()} /> : products.length ? (
        <>
          <p className="mb-4 text-xs text-[#71828d]" data-testid="text-product-count">{products.length} منتج</p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}
          </div>
        </>
      ) : (
        <div className="rounded-[24px] border border-dashed border-[#bdd5d4] bg-[#f0f8f7] px-6 py-16 text-center" data-testid="empty-products">
          <p className="font-bold text-[#17344a]">{query ? 'ما لقينا نتيجة مطابقة' : 'ما فيه منتجات بهذا التصنيف حالياً'}</p>
          <p className="mt-2 text-sm text-[#71828d]">جرّب كلمة بحث ثانية أو اختر تصنيف مختلف.</p>
          <button type="button" onClick={() => { setQuery(''); setCategory('الكل'); }} className="mt-5 rounded-full bg-[#078e83] px-5 py-3 text-sm font-bold text-white" data-testid="button-clear-filters">عرض الكل</button>
        </div>
      )}
      {notice && <div role="status" className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#10263e] px-5 py-3 text-sm font-semibold text-white shadow-xl" data-testid="status-cart-added">{notice}</div>}
    </main>
  );
}
