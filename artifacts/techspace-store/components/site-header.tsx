'use client';

import { useGetCurrentUser, useLogOut, getGetCurrentUserQueryKey } from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, LogOut, Menu, ShoppingBag, UserRound, X } from 'lucide-react';
import { useState } from 'react';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const userQuery = useGetCurrentUser();
  const logout = useLogOut();
  const user = userQuery.data;

  function handleLogout() {
    logout.mutate(undefined, {
      onSuccess: () => {
        queryClient.setQueryData(getGetCurrentUserQueryKey(), undefined);
        router.push('/');
      },
    });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#d8e5e7] bg-[#f7fbfb]/95 backdrop-blur-xl">
      <div className="container-shop flex h-[76px] items-center justify-between gap-5">
          <Link href="/" className="flex shrink-0 items-center gap-3 no-underline" data-testid="link-home">
          <span className="grid size-11 place-items-center rounded-2xl bg-[#10263e] text-[#32e0c4]">
            <span className="text-xl font-bold tracking-[-0.08em]">TS</span>
          </span>
          <span className="leading-tight">
            <span className="block text-[17px] font-bold tracking-[-0.04em] text-[#10263e]">TechSpace</span>
            <span className="block text-[10px] font-semibold tracking-[0.2em] text-[#71828d]">KUWAIT · TECH FOR TRAVEL</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="التنقل الرئيسي">
          <Link href="/" className="text-sm font-semibold text-[#536574] transition hover:text-[#008f84]" data-testid="link-nav-home">الرئيسية</Link>
          <Link href="/products" className="text-sm font-semibold text-[#536574] transition hover:text-[#008f84]" data-testid="link-nav-products">المنتجات</Link>
          <Link href="/orders" className="text-sm font-semibold text-[#536574] transition hover:text-[#008f84]" data-testid="link-nav-orders">طلباتي</Link>
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="max-w-28 truncate text-sm font-semibold text-[#30485c]" data-testid="text-username">{user.name}</span>
              <button type="button" onClick={handleLogout} disabled={logout.isPending} className="rounded-full p-2 text-[#536574] transition hover:bg-[#e8f2f2] hover:text-[#c14784]" aria-label="تسجيل الخروج" data-testid="button-logout">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link href="/login" className="rounded-full px-4 py-2 text-sm font-bold text-[#354e61] transition hover:bg-[#eaf3f3]" data-testid="link-login"><UserRound className="ml-2 inline" size={16} />دخول</Link>
          )}
          <Link href="/cart" className="group flex items-center gap-2 rounded-full bg-[#0e8d83] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#08776f]" data-testid="link-cart">
            <ShoppingBag size={17} />
            <span>السلة</span>
            <ArrowLeft className="transition group-hover:-translate-x-1" size={15} />
          </Link>
        </div>
        <button type="button" onClick={() => setMenuOpen((current) => !current)} className="grid size-11 place-items-center rounded-full bg-[#e7f2f1] text-[#18344a] md:hidden" aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'} aria-expanded={menuOpen} data-testid="button-mobile-menu">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {menuOpen && (
        <div className="border-t border-[#d8e5e7] bg-[#f7fbfb] px-5 py-5 md:hidden">
          <nav className="container-shop flex flex-col gap-1" aria-label="التنقل">
            <Link onClick={() => setMenuOpen(false)} href="/" className="rounded-xl px-3 py-3 font-semibold text-[#344c60]" data-testid="link-mobile-home">الرئيسية</Link>
            <Link onClick={() => setMenuOpen(false)} href="/products" className="rounded-xl px-3 py-3 font-semibold text-[#344c60]" data-testid="link-mobile-products">كل المنتجات</Link>
            <Link onClick={() => setMenuOpen(false)} href="/orders" className="rounded-xl px-3 py-3 font-semibold text-[#344c60]" data-testid="link-mobile-orders">طلباتي</Link>
            <Link onClick={() => setMenuOpen(false)} href="/cart" className="rounded-xl px-3 py-3 font-semibold text-[#087f76]" data-testid="link-mobile-cart">سلة المشتريات</Link>
            {user ? (
              <button type="button" onClick={handleLogout} className="rounded-xl px-3 py-3 text-right font-semibold text-[#a4386e]" data-testid="button-mobile-logout">تسجيل الخروج</button>
            ) : (
              <Link onClick={() => setMenuOpen(false)} href="/login" className="rounded-xl px-3 py-3 font-semibold text-[#344c60]" data-testid="link-mobile-login">تسجيل الدخول</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-[#10263e] text-white">
      <div className="container-shop flex flex-col gap-8 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-lg font-bold tracking-[-0.04em]">TechSpace</p>
          <p className="mt-2 max-w-sm text-sm leading-7 text-[#aec0ca]">تقنية ذكية لرحلات أكثر راحة. مختارة بعناية للمسافرين في الكويت.</p>
        </div>
        <p className="text-xs tracking-wide text-[#92a8b4]">© TechSpace Kuwait · الأسعار بالدينار الكويتي</p>
      </div>
    </footer>
  );
}
