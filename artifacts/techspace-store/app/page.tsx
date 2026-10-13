'use client';

import { useState } from 'react';
import { useListProducts } from '@workspace/api-client-react';
import Link from 'next/link';
import { ArrowLeft, Check, Compass, Headphones, PackageCheck, ShieldCheck, Wifi } from 'lucide-react';
import { useCart } from '../components/cart-store';
import { ErrorState, LoadingGrid, ProductCard } from '../components/ui';

export default function HomePage() {
  const productsQuery = useListProducts();
  const cart = useCart();
  const [notice, setNotice] = useState('');
  const featured = productsQuery.data?.slice(0, 3) ?? [];

  function addToCart(id: string) {
    cart.add(id);
    setNotice('تمت إضافة المنتج إلى سلتك');
    window.setTimeout(() => setNotice(''), 2500);
  }

  return (
    <main dir="rtl">
      <section className="relative isolate overflow-hidden bg-[#10263e] text-white">
        <div className="absolute inset-0 -z-10 opacity-50">
          <div className="absolute -left-24 -top-24 size-[420px] rounded-full border border-[#32e0c4]/25" />
          <div className="absolute -left-12 -top-12 size-[330px] rounded-full border border-[#32e0c4]/20" />
          <div className="absolute bottom-[-160px] right-[34%] size-[430px] rounded-full border border-[#e54591]/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_20%,rgba(0,185,164,.2),transparent_35%),radial-gradient(ellipse_at_10%_100%,rgba(229,69,145,.13),transparent_35%)]" />
        </div>
        <div className="container-shop grid min-h-[530px] items-center gap-10 py-16 lg:grid-cols-[1.1fr_.9fr] lg:py-20">
          <div className="page-enter">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.06] px-4 py-2 text-xs font-semibold tracking-wide text-[#90f4e2]"><Compass size={15} /> مختارات السفر الذكي من الكويت</p>
            <h1 className="max-w-[700px] text-[42px] font-extrabold leading-[1.2] tracking-[-0.06em] sm:text-6xl lg:text-[68px]">رحلتك تبدأ<br /><span className="text-[#32e0c4]">بتقنية أذكى.</span></h1>
            <p className="mt-6 max-w-xl text-sm leading-8 text-[#bfced7] sm:text-base">إكسسوارات سفر منتقاة بعناية — شواحن، صوتيات، وأساسيات تخلي كل رحلة أسهل من اللي قبلها.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/products" className="group inline-flex items-center gap-3 rounded-full bg-[#32e0c4] px-6 py-4 text-sm font-extrabold text-[#10263e] transition hover:bg-[#76f3df]" data-testid="link-shop-products">اكتشف المنتجات<ArrowLeft className="transition group-hover:-translate-x-1" size={17} /></Link>
              <Link href="/orders" className="inline-flex items-center rounded-full border border-white/20 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/10" data-testid="link-home-orders">تتبع طلباتي</Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-xs text-[#b2c3ce]">
              <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#32e0c4]" />اختيارات موثوقة</span>
              <span className="flex items-center gap-2"><PackageCheck size={16} className="text-[#32e0c4]" />طلب سهل وآمن</span>
            </div>
          </div>
          <div className="relative mx-auto flex h-[340px] w-full max-w-[470px] items-center justify-center lg:h-[410px]" aria-label="إلهام تقني للرحلات">
            <div className="absolute size-[285px] rounded-full border border-[#32e0c4]/20 sm:size-[350px]" />
            <div className="absolute size-[225px] rounded-full border border-dashed border-[#32e0c4]/25 sm:size-[290px]" />
            <div className="absolute right-[14%] top-[15%] flex size-16 items-center justify-center rounded-[22px] bg-[#e54591] text-white shadow-2xl shadow-[#e54591]/20"><Wifi size={28} /></div>
            <div className="absolute bottom-[16%] left-[12%] flex size-[72px] items-center justify-center rounded-[24px] border border-white/15 bg-white/[.08] text-[#32e0c4] backdrop-blur"><Headphones size={31} /></div>
            <div className="relative grid size-[205px] place-items-center rounded-[34px] border border-white/20 bg-[linear-gradient(145deg,rgba(255,255,255,.18),rgba(255,255,255,.04))] shadow-[0_30px_80px_rgba(0,0,0,.28)] backdrop-blur-xl sm:size-[245px]">
              <div className="absolute inset-3 rounded-[26px] border border-white/10" />
              <div className="text-center">
                <div className="mx-auto grid size-[82px] place-items-center rounded-[26px] bg-[#32e0c4] text-[#10263e] shadow-[0_14px_40px_rgba(50,224,196,.2)]">
                  <span className="text-3xl font-extrabold tracking-[-0.12em]">TS</span>
                </div>
                <p className="mt-5 text-sm font-bold tracking-[0.18em] text-white/85">GO LIGHT</p>
                <p className="mt-1 text-[10px] tracking-[0.24em] text-[#85a5b2]">TRAVEL TECH</p>
              </div>
            </div>
            <span className="absolute left-[9%] top-[25%] size-2 rounded-full bg-[#32e0c4]" />
            <span className="absolute bottom-[24%] right-[13%] size-2 rounded-full bg-[#e54591]" />
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="container-shop flex flex-wrap items-center justify-between gap-5 py-5 text-xs font-semibold text-[#b2c3ce]">
            <span>مصممة للمسافر اللي يعرف شنو يحتاج</span>
            <span className="flex items-center gap-3"><span className="size-1.5 rounded-full bg-[#32e0c4]" />كل الأسعار بالدينار الكويتي</span>
          </div>
        </div>
      </section>

      <section className="container-shop py-16 sm:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.18em] text-[#078e83]">اختيارات هذا الأسبوع</p>
            <h2 className="text-3xl font-extrabold tracking-[-0.05em] text-[#10263e] sm:text-4xl">أساسيات تستاهل مكانها</h2>
          </div>
          <Link href="/products" className="hidden items-center gap-2 text-sm font-bold text-[#087f76] sm:inline-flex" data-testid="link-featured-all">كل المنتجات<ArrowLeft size={16} /></Link>
        </div>
        {productsQuery.isLoading ? <LoadingGrid /> : productsQuery.isError ? <ErrorState onRetry={() => productsQuery.refetch()} /> : featured.length ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}
          </div>
        ) : (
          <div className="rounded-[24px] bg-[#edf6f5] px-6 py-10 text-center text-sm text-[#71828d]" data-testid="empty-featured">نجهّز اختيارات جديدة لك. تفقّد المتجر قريباً.</div>
        )}
        <Link href="/products" className="mt-6 flex items-center justify-center gap-2 rounded-full border border-[#c8dddd] py-3 text-sm font-bold text-[#087f76] sm:hidden" data-testid="link-featured-mobile">تصفح كل المنتجات<ArrowLeft size={16} /></Link>
      </section>

      <section className="bg-[#e7f2f1] py-16">
        <div className="container-shop">
          <div className="grid gap-8 md:grid-cols-[.85fr_1.15fr] md:items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] text-[#078e83]">تفاصيل صغيرة، فرق كبير</p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.05em] text-[#10263e]">خفّف شنطتك.<br />كبّر راحة بالك.</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[['01', 'اختيارات عملية', 'أدوات تخدمك من بوابة المغادرة إلى الرجعة.'], ['02', 'واضحة من البداية', 'سعر المنتج بالدينار الكويتي قبل ما تضيفه.'], ['03', 'كل طلب بمكانه', 'ارجع لتفاصيل طلباتك من حسابك بسهولة.']].map(([number, title, text]) => (
                <div key={number} className="rounded-2xl border border-[#d4e5e4] bg-[#f8fbfa] p-5">
                  <span className="text-xs font-bold tracking-widest text-[#e54591]">{number}</span>
                  <h3 className="mt-4 font-bold text-[#17344a]">{title}</h3>
                  <p className="mt-2 text-xs leading-6 text-[#6e808c]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {notice && <div role="status" className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#10263e] px-5 py-3 text-sm font-semibold text-white shadow-xl" data-testid="status-cart-added"><Check size={17} className="text-[#32e0c4]" />{notice}</div>}
    </main>
  );
}
