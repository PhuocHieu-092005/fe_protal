import React from "react";

export default function Footer() {
  return (
    <footer className="footer footer-vertical lg:footer-horizontal bg-[#182837] text-neutral-content px-5 md:px-8 lg:px-10 py-8 md:py-10 gap-8">
      {/* Logo + Giới thiệu */}
      <aside className="max-w-full">
        <img
          src="/logo-hitc.png"
          alt="HITU Logo"
          className="h-10 md:h-12 mb-3"
        />

        <p className="text-sm leading-relaxed max-w-xs">
          <strong>Trường Cao đẳng Công Thương TP.HCM (HITU)</strong>
          <br />
          Đào tạo nguồn nhân lực chất lượng cao trong lĩnh vực công nghệ và kỹ
          thuật.
        </p>
      </aside>

      {/* Thông tin liên hệ */}
      <nav>
        <h6 className="footer-title opacity-100 font-bold text-white text-base">
          Liên hệ
        </h6>

        <div className="space-y-2 mt-2">
          <p className="text-sm flex items-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-400 mt-0.5 shrink-0"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            20 Tăng Nhơn Phú, Phường Phước Long B,
            <br />
            TP. Thủ Đức, TP.HCM
          </p>

          <p className="text-sm flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-400 shrink-0"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            (028) 3897 0023
          </p>

          <p className="text-sm flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-400 shrink-0"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            contact@hitu.edu.vn
          </p>
        </div>
      </nav>

      {/* Website chính thức */}
      <nav className="space-y-2">
        <h6 className="footer-title opacity-100 font-bold text-white text-base">
          Hệ thống Website
        </h6>

        <a
          href="https://hitu.edu.vn/"
          target="_blank"
          rel="noreferrer"
          className="link link-hover text-sm break-words"
        >
          Trang chủ HITU
        </a>

        <a
          href="https://hitu.edu.vn/tuyen-sinh/"
          target="_blank"
          rel="noreferrer"
          className="link link-hover text-sm break-words"
        >
          Thông tin tuyển sinh
        </a>

        <a
          href="https://fit-hitu.edu.vn/"
          target="_blank"
          rel="noreferrer"
          className="link link-hover text-sm break-words"
        >
          Khoa Công nghệ thông tin
        </a>
      </nav>

      {/* Mạng xã hội */}
      <nav>
        <h6 className="footer-title opacity-100 font-bold text-white text-base">
          Kết nối với chúng tôi
        </h6>

        <div className="flex gap-5 mt-2">
          <a href="#" aria-label="Twitter">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current hover:text-sky-400 transition-colors"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>

          <a href="#" aria-label="YouTube">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current hover:text-red-500 transition-colors"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>

          <a href="#" aria-label="Facebook">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current hover:text-blue-600 transition-colors"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>
        </div>
      </nav>
    </footer>
  );
}
