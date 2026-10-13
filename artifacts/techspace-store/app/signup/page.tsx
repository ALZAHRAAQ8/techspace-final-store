'use client';

import { useState, type FormEvent } from 'react';
import { useSignUp, getGetCurrentUserQueryKey } from '@workspace/api-client-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Eye, EyeOff, LockKeyhole, UserRound } from 'lucide-react';

export default function SignUpPage() {
  const signup = useSignUp();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (name.trim().length < 1 || name.trim().length > 100) return setError('اكتب اسمك (حتى ١٠٠ حرف).');
    if (password.length < 8 || password.length > 128) return setError('كلمة المرور يجب أن تكون ٨ أحرف على الأقل.');
    signup.mutate({ data: { name: name.trim(), email: email.trim(), password } }, {
      onSuccess: (response) => {
        queryClient.setQueryData(getGetCurrentUserQueryKey(), response.user);
        router.push('/');
      },
      onError: () => setError('تعذر إنشاء الحساب. قد يكون البريد مستخدماً أو توجد مشكلة مؤقتة.'),
    });
  }

  return (
    <main className="container-shop grid min-h-[75vh] items-center gap-10 py-12 md:grid-cols-[.9fr_1.1fr]" dir="rtl">
      <section className="page-enter">
        <p className="text-xs font-bold tracking-[0.18em] text-[#078e83]">مسافر مع TechSpace</p>
        <h1 className="mt-4 max-w-md text-4xl font-extrabold leading-tight tracking-[-0.06em] text-[#10263e] sm:text-5xl">حسابك،<br /><span className="text-[#078e83]">ورحلتك القادمة.</span></h1>
        <p className="mt-5 max-w-md text-sm leading-7 text-[#647784]">أنشئ حسابك وخلّ طلباتك محفوظة بمكان واحد، جاهزة ترجع لها بأي وقت.</p>
        <div className="mt-9 flex items-center gap-3 text-sm text-[#647784]"><span className="grid size-10 place-items-center rounded-xl bg-[#e5f4f1] text-[#078e83]"><LockKeyhole size={19} /></span>بياناتك تبقى آمنة مع جلسة تسجيل دخول خاصة.</div>
      </section>
      <section className="rounded-[28px] border border-[#dce8e8] bg-white p-6 shadow-[0_18px_54px_rgba(20,51,68,.06)] sm:p-9">
        <div className="mb-7">
          <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-[#17344a]">إنشاء حساب</h2>
          <p className="mt-2 text-sm text-[#71828d]">خطوة بسيطة وتكون جاهز.</p>
        </div>
        <form onSubmit={submit} className="space-y-5">
          <label className="block text-sm font-bold text-[#415867]">
            الاسم
            <span className="relative mt-2 block">
              <UserRound className="absolute right-4 top-1/2 -translate-y-1/2 text-[#91a1aa]" size={17} />
              <input required autoComplete="name" maxLength={100} value={name} onChange={(event) => setName(event.target.value)} className="h-12 w-full rounded-xl border border-[#dce8e8] bg-[#f8fbfb] pr-11 pl-4 text-sm outline-none focus:border-[#078e83] focus:ring-2 focus:ring-[#078e83]/15" placeholder="اسمك الكامل" data-testid="input-signup-name" />
            </span>
          </label>
          <label className="block text-sm font-bold text-[#415867]">
            البريد الإلكتروني
            <input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#dce8e8] bg-[#f8fbfb] px-4 text-left text-sm outline-none focus:border-[#078e83] focus:ring-2 focus:ring-[#078e83]/15" placeholder="you@example.com" dir="ltr" data-testid="input-signup-email" />
          </label>
          <label className="block text-sm font-bold text-[#415867]">
            كلمة المرور
            <span className="relative mt-2 block">
              <input required minLength={8} maxLength={128} type={visible ? 'text' : 'password'} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-12 w-full rounded-xl border border-[#dce8e8] bg-[#f8fbfb] px-4 pl-12 text-left text-sm outline-none focus:border-[#078e83] focus:ring-2 focus:ring-[#078e83]/15" placeholder="٨ أحرف على الأقل" dir="ltr" data-testid="input-signup-password" />
              <button type="button" onClick={() => setVisible((current) => !current)} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#71828d]" aria-label={visible ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'} data-testid="button-toggle-password">{visible ? <EyeOff size={17} /> : <Eye size={17} />}</button>
            </span>
          </label>
          {error && <p role="alert" className="rounded-xl bg-[#fff1f5] p-3 text-sm leading-6 text-[#9c3766]" data-testid="status-signup-error">{error}</p>}
          <button type="submit" disabled={signup.isPending} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#10263e] px-5 py-4 text-sm font-extrabold text-white transition hover:bg-[#1c3c56] disabled:opacity-60" data-testid="button-signup-submit">{signup.isPending ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}<ArrowLeft size={17} /></button>
        </form>
        <p className="mt-6 text-center text-sm text-[#71828d]">عندك حساب؟ <Link href="/login" className="font-bold text-[#078e83]" data-testid="link-signup-login">سجّل دخولك</Link></p>
      </section>
    </main>
  );
}
