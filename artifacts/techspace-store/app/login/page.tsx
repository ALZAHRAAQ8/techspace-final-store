'use client';

import { useState, type FormEvent } from 'react';
import { useLogIn, getGetCurrentUserQueryKey } from '@workspace/api-client-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Eye, EyeOff, LockKeyhole } from 'lucide-react';

export default function LoginPage() {
  const login = useLogIn();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (!email.trim() || !password || password.length > 128) return setError('اكتب البريد الإلكتروني وكلمة المرور بشكل صحيح.');
    const returnTo = new URLSearchParams(window.location.search).get('returnTo');
    const safeReturnTo = returnTo?.startsWith('/') && !returnTo.startsWith('//') ? returnTo : '/';
    login.mutate({ data: { email: email.trim(), password } }, {
      onSuccess: (response) => {
        queryClient.setQueryData(getGetCurrentUserQueryKey(), response.user);
        router.push(safeReturnTo);
      },
      onError: () => setError('البريد الإلكتروني أو كلمة المرور غير صحيحة. حاول مرة ثانية.'),
    });
  }

  return (
    <main className="container-shop grid min-h-[75vh] items-center gap-10 py-12 md:grid-cols-[.9fr_1.1fr]" dir="rtl">
      <section className="page-enter">
        <p className="text-xs font-bold tracking-[0.18em] text-[#e54591]">أهلاً برجعتك</p>
        <h1 className="mt-4 max-w-md text-4xl font-extrabold leading-tight tracking-[-0.06em] text-[#10263e] sm:text-5xl">رحلتك ما<br /><span className="text-[#078e83]">وقفت هني.</span></h1>
        <p className="mt-5 max-w-md text-sm leading-7 text-[#647784]">سجّل دخولك لمتابعة طلباتك والرجوع لاختياراتك.</p>
        <div className="mt-9 flex items-center gap-3 text-sm text-[#647784]"><span className="grid size-10 place-items-center rounded-xl bg-[#e5f4f1] text-[#078e83]"><LockKeyhole size={19} /></span>جلسة خاصة، بدون حفظ كلمة المرور على جهازك.</div>
      </section>
      <section className="rounded-[28px] border border-[#dce8e8] bg-white p-6 shadow-[0_18px_54px_rgba(20,51,68,.06)] sm:p-9">
        <div className="mb-7">
          <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-[#17344a]">تسجيل الدخول</h2>
          <p className="mt-2 text-sm text-[#71828d]">كمل من آخر نقطة.</p>
        </div>
        <form onSubmit={submit} className="space-y-5">
          <label className="block text-sm font-bold text-[#415867]">
            البريد الإلكتروني
            <input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#dce8e8] bg-[#f8fbfb] px-4 text-left text-sm outline-none focus:border-[#078e83] focus:ring-2 focus:ring-[#078e83]/15" placeholder="you@example.com" dir="ltr" data-testid="input-login-email" />
          </label>
          <label className="block text-sm font-bold text-[#415867]">
            كلمة المرور
            <span className="relative mt-2 block">
              <input required maxLength={128} type={visible ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-12 w-full rounded-xl border border-[#dce8e8] bg-[#f8fbfb] px-4 pl-12 text-left text-sm outline-none focus:border-[#078e83] focus:ring-2 focus:ring-[#078e83]/15" placeholder="كلمة المرور" dir="ltr" data-testid="input-login-password" />
              <button type="button" onClick={() => setVisible((current) => !current)} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#71828d]" aria-label={visible ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'} data-testid="button-toggle-password">{visible ? <EyeOff size={17} /> : <Eye size={17} />}</button>
            </span>
          </label>
          {error && <p role="alert" className="rounded-xl bg-[#fff1f5] p-3 text-sm leading-6 text-[#9c3766]" data-testid="status-login-error">{error}</p>}
          <button type="submit" disabled={login.isPending} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#078e83] px-5 py-4 text-sm font-extrabold text-white transition hover:bg-[#08776f] disabled:opacity-60" data-testid="button-login-submit">{login.isPending ? 'جاري تسجيل الدخول...' : 'دخول'}<ArrowLeft size={17} /></button>
        </form>
        <p className="mt-6 text-center text-sm text-[#71828d]">جديد معانا؟ <Link href="/signup" className="font-bold text-[#078e83]" data-testid="link-login-signup">أنشئ حساب</Link></p>
      </section>
    </main>
  );
}
