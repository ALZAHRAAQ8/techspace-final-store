'use client';

import { getListMyOrdersQueryKey, useGetCurrentUser, useListMyOrders } from '@workspace/api-client-react';
import Link from 'next/link';
import { ArrowLeft, ClipboardList, PackageCheck } from 'lucide-react';
import { EmptyState, ErrorState, formatKwd, PageTitle } from '../../components/ui';

export default function OrdersPage() {
  const userQuery = useGetCurrentUser();
  const ordersQuery = useListMyOrders({
    query: {
      enabled: Boolean(userQuery.data),
      queryKey: getListMyOrdersQueryKey(),
    },
  });

  if (userQuery.isLoading) {
    return <main className="container-shop min-h-[65vh] py-12" aria-label="جاري التحقق من الحساب" data-testid="loading-account"><div className="h-36 animate-pulse rounded-[24px] bg-[#e1eeee]" /></main>;
  }

  if (!userQuery.data || userQuery.isError) {
    return (
      <main className="container-shop min-h-[65vh] py-12 sm:py-16" dir="rtl">
        <PageTitle eyebrow="منطقة خاصة" title="طلباتك، بمكان واحد" description="سجّل دخولك عشان تشوف تفاصيل طلباتك السابقة." />
        <div className="rounded-[28px] bg-[#10263e] px-6 py-10 text-white sm:px-10">
          <span className="grid size-12 place-items-center rounded-2xl bg-[#32e0c4] text-[#10263e]"><ClipboardList size={22} /></span>
          <h2 className="mt-5 text-2xl font-bold">هذي الصفحة لك وحدك</h2>
          <p className="mt-2 max-w-md text-sm leading-7 text-[#b8c9d3]">سجّل دخولك ونرجعك مباشرة لطلباتك. معلومات الطلبات خاصة بحسابك.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/login?returnTo=%2Forders" className="inline-flex items-center gap-2 rounded-full bg-[#32e0c4] px-5 py-3 text-sm font-extrabold text-[#10263e]" data-testid="link-orders-login">تسجيل الدخول<ArrowLeft size={16} /></Link>
            <Link href="/signup" className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white" data-testid="link-orders-signup">إنشاء حساب</Link>
          </div>
        </div>
      </main>
    );
  }

  if (ordersQuery.isLoading) {
    return <main className="container-shop min-h-[65vh] py-12" aria-label="جاري تحميل الطلبات" data-testid="loading-orders"><div className="space-y-4">{[0, 1, 2].map((item) => <div key={item} className="h-32 animate-pulse rounded-[24px] bg-[#e1eeee]" />)}</div></main>;
  }

  if (ordersQuery.isError) {
    return <main className="container-shop min-h-[65vh] py-12"><ErrorState onRetry={() => ordersQuery.refetch()} message="تعذر تحميل طلباتك الآن." /></main>;
  }

  const orders = ordersQuery.data ?? [];
  return (
    <main className="container-shop min-h-[65vh] py-12 sm:py-16" dir="rtl">
      <PageTitle eyebrow="حسابك" title={`طلباتك يا ${userQuery.data.name}`} description="هنا تلقى سجل طلباتك وحالتها الحالية." />
      {orders.length === 0 ? (
        <EmptyState title="ما عندك طلبات للحين" description="لما تأكد طلبك من المتجر، راح يظهر لك هني." actionHref="/products" actionLabel="اكتشف المنتجات" />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <article key={order.id} className="rounded-[24px] border border-[#dce8e8] bg-white p-5 sm:p-7" data-testid={`card-order-${order.id}`}>
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#edf1f1] pb-5">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.14em] text-[#078e83]">رقم الطلب</p>
                  <h2 className="mt-1 break-all text-base font-bold text-[#17344a]" data-testid={`text-order-id-${order.id}`}>{order.id}</h2>
                  <p className="mt-2 text-xs text-[#80909a]" data-testid={`text-order-date-${order.id}`}>{new Intl.DateTimeFormat('ar-KW', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(order.createdAt))}</p>
                </div>
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold ${order.status === 'paid' ? 'bg-[#e6f5ef] text-[#16815f]' : 'bg-[#fff2e3] text-[#a26416]'}`} data-testid={`status-order-${order.id}`}>
                  <span className="size-1.5 rounded-full bg-current" />{order.status === 'paid' ? 'مدفوع' : 'قيد التأكيد'}
                </span>
              </div>
              <div className="space-y-3 py-5">
                {order.items.map((item, index) => (
                  <div key={`${item.productId}-${index}`} className="flex items-start justify-between gap-3 text-sm">
                    <p className="font-semibold text-[#4e6472]">{item.nameAr || item.name}<span className="mr-2 text-xs text-[#8b9aa2]">× {item.quantity}</span></p>
                    <p className="shrink-0 font-bold text-[#425b6a]">{formatKwd(item.price * item.quantity, order.currency)} {order.currency}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-[#edf1f1] pt-4">
                <span className="flex items-center gap-2 text-xs text-[#80909a]"><PackageCheck size={15} />إجمالي الطلب</span>
                <p className="text-lg font-extrabold text-[#10263e]" data-testid={`text-order-total-${order.id}`}>{formatKwd(order.total, order.currency)} <small className="text-xs text-[#078e83]">{order.currency}</small></p>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
