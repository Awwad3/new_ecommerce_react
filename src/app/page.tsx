

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-xl">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">مرحبًا بك في متجرنا!</h1>
        <p className="text-gray-600 text-lg mb-6">
          هذا هو مشروع متجر إلكتروني مبني بـ Next.js و React و Tailwind CSS.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
          تصفح المنتجات
        </button>
      </div>
    </div>
  );
}
