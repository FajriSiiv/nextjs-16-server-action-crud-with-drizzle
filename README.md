✅ LATIHAN PROJECT: "Product Catalog Manager"

Ini project admin sederhana untuk mengelola data produk.

Fitur yang akan kamu kerjakan (step-by-step latihan)

1. Dashboard – List Produk

Tampilkan list produk dalam table

Kolom:

Name

Price

Category

Created At

Actions (Edit, Delete)

Pagination (opsional)

2. Create Product

Button Add Product

Membuka Modal Form

Input:

Name (text)

Price (number)

Category (select)

Description (textarea)

Slug (text)

Validasi:

Name wajib

Price wajib > 0

Toast success/error

Optimistic update (opsional)

3. Edit Product

Klik tombol edit → membuka modal pre-filled

User bisa ubah:

Name

Price

Category

Description

Toast success/error

4. Delete Product

Klik delete → tampilkan confirmation dialog

Setelah confirm:

Delete data

Toast success/error

5. Detail Page (optional tapi real world)

Klik nama produk → masuk ke halaman /product/[slug]

Tampilkan detail lengkap produk

(Slug boleh kita skip dulu kalau kamu belum mau)

🧱 Struktur Halaman
app/
├── products/
│ ├── page.tsx → list product
│ ├── create/
│ │ └── actions.ts → server action create
│ ├── edit/
│ │ └── actions.ts → server action edit
│ ├── delete/
│ │ └── actions.ts → server action delete
│ └── [id]/page.tsx → detail page (optional)
└── components/
├── ProductForm.tsx
├── ProductModal.tsx
├── ProductTable.tsx

📚 Skill yang kamu latih dari project ini

✔ Next.js 16 Server Actions
✔ CRUD lengkap (Create, Read, Update, Delete)
✔ Modal Form dengan Shadcn UI
✔ Toast dengan Sonner
✔ Validasi Form
✔ Server Component + Client Component
✔ Optimistic Update
✔ Reusable Component
✔ Folder structuring yang rapih
✔ Real-world use logic

🔥 Tantangan Tambahan (kalau sudah selesai basic)

Tambah search bar

Tambah filter category

Tambah sorting harga

Upload image untuk product

Tambah pagination

Tambah role-based access (admin/user)

contoh data
export const products = [
{
id: 1,
name: "Laptop Gaming",
slug: "laptop-gaming",
price: 15000000,
category: "Electronics",
description: "Laptop gaming dengan GPU terbaru.",
createdAt: new Date(),
},
];
