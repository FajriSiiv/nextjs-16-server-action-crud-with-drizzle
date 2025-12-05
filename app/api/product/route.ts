import { db } from "@/db";
import { products } from "@/db/schema";
import {
  createSupabaseActionClient,
  createSupabaseServerClient,
} from "@/lib/supabase";
// import { createSupabaseServerClient } from "@/lib/supabase";
import { ilike } from "drizzle-orm";
import type { NextRequest } from "next/server";

const PRODUCT_IMAGE_BUCKET = "product_images";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("q");
  try {
    const results = search
      ? await db
          .select()
          .from(products)
          .where(ilike(products.name, `%${search}%`))
      : await db.select().from(products);

    return Response.json(results);
  } catch (err) {
    console.error("API ERROR:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// export async function POST(req: NextRequest) {
//   const { name, price, category, description, slug_product, image_url } =
//     await req.json();

//   // const imageFile = image_url;

//   // // Ambil data lain (misalnya nama produk) untuk membuat nama file unik
//   // const productName = name || "product";

//   // if (!(imageFile instanceof File) || imageFile.size === 0) {
//   //   return Response.json(
//   //     { message: "File gambar tidak valid atau tidak ditemukan." },
//   //     { status: 400 }
//   //   );
//   // }

//   // // 3. Buat Nama File yang Unik
//   // const safeName = productName.toLowerCase().replace(/[^a-z0-9]/g, "-");
//   // const filename = `${safeName}-${Date.now()}-${imageFile.name.replace(
//   //   /\s/g,
//   //   "_"
//   // )}`;

//   // // 4. Unggah File ke Supabase Storage
//   // // Kita mengirimkan objek File (turunan Blob) langsung tanpa konversi Buffer
//   // const supabase = await createSupabaseServerClient();
//   // const { data: uploadData, error: uploadError } = await supabase.storage
//   //   .from(PRODUCT_IMAGE_BUCKET)
//   //   .upload(filename, imageFile, {
//   //     cacheControl: "3600",
//   //     upsert: false,
//   //     contentType: imageFile.type, // Gunakan tipe file asli
//   //   });

//   // if (uploadError) {
//   //   console.error("Kesalahan Upload Supabase:", uploadError);
//   //   return Response.json(
//   //     {
//   //       message: "Gagal mengunggah gambar ke Storage.",
//   //       error: uploadError.message,
//   //     },
//   //     { status: 500 }
//   //   );
//   // }

//   // // 5. Dapatkan URL Publik
//   // // Gabungkan URL dasar Supabase dengan bucket dan path file
//   // const imageUrl = `${process.env
//   //   .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${PRODUCT_IMAGE_BUCKET}/${
//   //   uploadData.path
//   // }`;

//   // // 6. Kembalikan URL ke Frontend
//   // return Response.json({ imageUrl }, { status: 201 });

//   // // let imageUrl: string | null = null;
//   // // const PRODUCT_IMAGE_BUCKET = "product_images";
//   // // const supabase = await createSupabaseServerClient();

//   // // if (imageFile instanceof File && imageFile.size > 0) {
//   // //   // Buat nama file unik (misalnya, timestamp + nama asli)
//   // //   const filename = `${Date.now()}-${slug_product}-${imageFile.name.replace(
//   // //     /\s/g,
//   // //     "_"
//   // //   )}`;

//   // //   // Unggah File Object langsung ke Supabase Storage
//   // //   const { data: uploadData, error: uploadError } = await supabase.storage
//   // //     .from(PRODUCT_IMAGE_BUCKET)
//   // //     .upload(filename, imageFile, {
//   // //       cacheControl: "3600",
//   // //       upsert: false,
//   // //       contentType: imageFile.type,
//   // //     });

//   // //   if (uploadError) {
//   // //     console.error("Kesalahan Upload Supabase:", uploadError);
//   // //     // Penting: Jika upload gagal, hentikan operasi DB
//   // //     return Response.json(
//   // //       { message: "Gagal mengunggah gambar." },
//   // //       { status: 500 }
//   // //     );
//   // //   }

//   // //   // 3. Dapatkan URL Publik
//   // //   // Konstruksi URL harus disesuaikan dengan template Supabase Anda
//   // //   imageUrl = `${process.env
//   // //     .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${PRODUCT_IMAGE_BUCKET}/${
//   // //     uploadData.path
//   // //   }`;
//   // // }

//   console.log(image_url, "image url route.ts");

//   const results = await db
//     .insert(products)
//     .values({
//       name,
//       price,
//       category,
//       description,
//       slug_product,
//       image_url,
//     })
//     .returning();

//   return Response.json(results, { status: 201 });
// }

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createSupabaseActionClient();

// const PRODUCT_IMAGE_BUCKET = "product_images"; // Sesuaikan dengan nama bucket Anda

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    // Kunci 'image' harus sesuai dengan FormData dari frontend
    const imageFile = formData.get("image");
    const productName = (formData.get("name") as string) || "product";

    if (!(imageFile instanceof File) || imageFile.size === 0) {
      // Tidak masalah jika tidak ada file (jika upload opsional), tapi kita cek validitas
      return Response.json({ imageUrl: null }, { status: 200 });
    }

    // 1. Buat Nama File Unik dan Aman
    const safeName = productName.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const filename = `${safeName}-${Date.now()}-${imageFile.name.replace(
      /\s/g,
      "_"
    )}`;

    // 2. Unggah File Object ke Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(PRODUCT_IMAGE_BUCKET)
      .upload(filename, imageFile, {
        cacheControl: "3600",
        upsert: false,
        contentType: imageFile.type,
      });

    if (uploadError) {
      console.error("Supabase Upload Error:", uploadError);
      return Response.json(
        { message: "Gagal mengunggah gambar." },
        { status: 500 }
      );
    }

    // 3. Dapatkan URL Publik
    const imageUrl = `${supabaseUrl}/storage/v1/object/public/${PRODUCT_IMAGE_BUCKET}/${uploadData.path}`;

    // 4. Kembalikan URL string ke frontend
    return Response.json({ imageUrl }, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: "Kesalahan Server pada proses upload." },
      { status: 500 }
    );
  }
}
