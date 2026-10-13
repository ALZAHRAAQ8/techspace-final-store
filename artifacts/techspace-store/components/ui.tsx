import Link from 'next/link';
import { ArrowLeft, PackageOpen, RefreshCw } from 'lucide-react';
import type { Product } from '@workspace/api-client-react';

export function PageTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-8 page-enter">
      <p className="mb-3 text-xs font-bold tracking-[0.18em] text-[#078e83]">{eyebrow}</p>
      <h1 className="text-3xl font-extrabold tracking-[-0.05em] text-[#10263e] sm:text-4xl">{title}</h1>
      {description && <p className="mt-3 max-w-2xl text-sm leading-7 text-[#647784]">{description}</p>}
    </div>
  );
}

export function ProductCard({ product, onAdd }: { product: Product; onAdd: (id: string) => void }) {
  return (
    <article className="group overflow-hidden rounded-[24px] border border-[#dce8e8] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(24,56,73,.11)]" dir="rtl" data-testid={`card-product-${product.id}`}>
      <Link href={`/products/${product.id}`} className="block text-inherit no-underline" data-testid={`link-product-${product.id}`}>
        <div className="relative aspect-[1.18/1] overflow-hidden bg-[#e8f2f1]">
          {product.tag && <span className="absolute right-4 top-4 z-10 rounded-full bg-[#e54591] px-3 py-1.5 text-[11px] font-bold text-white">{product.tag}</span>}
          <img src={product.image} alt={product.nameAr || product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} data-testid={`img-product-${product.id}`} />
          <div className="absolute inset-0 -z-0 grid place-items-center bg-[radial-gradient(circle_at_30%_25%,#c7f4eb,transparent_45%),linear-gradient(135deg,#e8f2f1,#d5e4e8)]">
            <span className="text-5xl font-bold tracking-[-0.1em] text-[#0b8b83]/25">TS</span>
          </div>
        </div>
        <div className="p-5">
          <p className="mb-2 text-[11px] font-bold tracking-[0.12em] text-[#078e83]">{product.category}</p>
          <h3 className="line-clamp-1 text-base font-bold text-[#18344a]" data-testid={`text-product-name-${product.id}`}>{product.nameAr || product.name}</h3>
          <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-[#71828d]">{product.description}</p>
        </div>
      </Link>
      <div className="flex items-center justify-between border-t border-[#edf1f1] px-5 py-4">
        <p className="font-bold text-[#10263e]" data-testid={`text-product-price-${product.id}`}><span className="text-[10px] text-[#83939d]">د.ك</span> {product.price.toFixed(3)}</p>
        <button type="button" onClick={() => onAdd(product.id)} className="rounded-full bg-[#e6f5f2] px-4 py-2 text-xs font-bold text-[#087e76] transition hover:bg-[#078e83] hover:text-white" data-testid={`button-add-${product.id}`}>أضف للسلة</button>
      </div>
    </article>
  );
}

export function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="جاري تحميل المنتجات" data-testid="loading-products">
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="overflow-hidden rounded-[24px] border border-[#dce8e8] bg-white">
          <div className="aspect-[1.18/1] animate-pulse bg-[#e2eeee]" />
          <div className="space-y-3 p-5">
            <div className="h-3 w-1/3 animate-pulse rounded bg-[#e2eeee]" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-[#e2eeee]" />
            <div className="h-4 w-full animate-pulse rounded bg-[#e2eeee]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ title, description, actionHref, actionLabel }: { title: string; description: string; actionHref?: string; actionLabel?: string }) {
  return (
    <div className="rounded-[28px] border border-dashed border-[#bcd5d5] bg-[#f0f8f7] px-6 py-16 text-center" data-testid="empty-state">
      <span className="mx-auto mb-5 grid size-14 place-items-center rounded-2xl bg-white text-[#078e83] shadow-sm"><PackageOpen size={24} /></span>
      <h2 className="text-xl font-bold text-[#17344a]">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#71828d]">{description}</p>
      {actionHref && actionLabel && <Link href={actionHref} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#078e83] px-5 py-3 text-sm font-bold text-white" data-testid="link-empty-action">{actionLabel}<ArrowLeft size={16} /></Link>}
    </div>
  );
}

export function ErrorState({ onRetry, message = 'لم نتمكن من تحميل البيانات الآن.' }: { onRetry: () => void; message?: string }) {
  return (
    <div className="rounded-[24px] border border-[#f0c9d9] bg-[#fff5f8] px-6 py-10 text-center" role="alert" data-testid="status-error">
      <p className="font-bold text-[#9c3766]">{message}</p>
      <button type="button" onClick={onRetry} className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#e8b4cc] px-4 py-2 text-sm font-bold text-[#95335f]" data-testid="button-retry"><RefreshCw size={15} />حاول مرة أخرى</button>
    </div>
  );
}

export function formatKwd(value: number) {
  return new Intl.NumberFormat('ar-KW', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(value);
}
