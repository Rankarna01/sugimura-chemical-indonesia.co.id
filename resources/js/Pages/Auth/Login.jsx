// resources/js/Pages/Auth/Login.jsx
import React, { useState } from "react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    post(route("login"), { onFinish: () => reset("password") });
  };

  return (
    <GuestLayout>
      <Head title="Masuk" />

      <div className="min-h-[90vh] grid place-items-center bg-gradient-to-b from-emerald-50/50 via-white to-white relative overflow-hidden">
        {/* dekor tipis */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 blur-3xl bg-[radial-gradient(700px_300px_at_10%_-10%,#34d399,transparent),radial-gradient(600px_260px_at_90%_10%,#a7f3d0,transparent)]" />

        <div className="w-full max-w-md mx-auto">
          {/* Header: logo + nama perusahaan */}
          <div className="text-center mb-6">
            <img
              src="/images/logo/logo-1.png"
              alt="Logo PT Sugimura Chemical Indonesia"
              className="mx-auto h-14 w-auto"
            />
            <h1 className="mt-3 text-lg font-semibold text-gray-900">
              PT Sugimura Chemical Indonesia
            </h1>
            <p className="text-sm text-gray-600">Administrator Login</p>
          </div>

          {/* Kartu form */}
          <div className="rounded-2xl bg-white/80 backdrop-blur border border-emerald-100 shadow-xl p-6 sm:p-7">
            {status && (
              <div className="mb-4 rounded-lg bg-emerald-50 text-emerald-700 px-3 py-2 text-sm font-medium">
                {status}
              </div>
            )}

            <form onSubmit={submit} className="space-y-4">
              {/* Email */}
              <div>
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full"
                  autoComplete="username"
                  isFocused
                  onChange={(e) => setData("email", e.target.value)}
                  placeholder="nama@perusahaan.com"
                />
                <InputError message={errors.email} className="mt-2" />
              </div>

              {/* Password dengan toggle show/hide */}
              <div>
                <InputLabel htmlFor="password" value="Password" />
                <div className="relative mt-1">
                  <TextInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={data.password}
                    className="block w-full pr-12"
                    autoComplete="current-password"
                    onChange={(e) => setData("password", e.target.value)}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-2 inline-flex items-center px-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    tabIndex={-1}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <InputError message={errors.password} className="mt-2" />
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <Checkbox
                    name="remember"
                    checked={data.remember}
                    onChange={(e) => setData("remember", e.target.checked)}
                  />
                  <span className="text-sm text-gray-600">Ingat saya</span>
                </label>

                {canResetPassword && (
                  <Link
                    href={route("password.request")}
                    className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
                  >
                    Lupa password?
                  </Link>
                )}
              </div>

              {/* Submit */}
              <PrimaryButton className="w-full justify-center" disabled={processing}>
                {processing ? "Memproses..." : "Masuk"}
              </PrimaryButton>
            </form>
          </div>

          {/* Footer kecil */}
          <p className="mt-4 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} PT Sugimura Chemical Indonesia. All rights reserved.
          </p>
        </div>
      </div>
    </GuestLayout>
  );
}
