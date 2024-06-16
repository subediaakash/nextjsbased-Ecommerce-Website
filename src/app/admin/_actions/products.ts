"use server";
import { z } from "zod";
import fs from "fs/promises";
import crypto from "crypto";
import db from "@/db/db";
import { redirect } from "next/navigation";

const fileSchema = z.instanceof(File, { message: "Required" });

const imageSchema = fileSchema.refine(
  (file) => file.size > 0 && file.type.startsWith("image/"),
  { message: "Invalid image file" }
);

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  file: fileSchema.refine((file) => file.size > 0, { message: "Required" }),
  image: imageSchema.refine((file) => file.size > 0, { message: "Required" }),
});

export async function addProduct(formData: FormData) {
  const result = productSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await fs.mkdir("products", { recursive: true });
  await fs.mkdir("public/products", { recursive: true });

  const fileId = crypto.randomUUID();
  const filePath = `products/${fileId}-${data.file.name}`;
  const imagePath = `public/products/${fileId}-${data.image.name}`;

  const fileBuffer = Buffer.from(await data.file.arrayBuffer());
  const imageBuffer = Buffer.from(await data.image.arrayBuffer());

  await Promise.all([
    fs.writeFile(filePath, fileBuffer),
    fs.writeFile(imagePath, imageBuffer),
  ]);

  await db?.product.create({
    data: {
      name: data.name,
      description: data.description,
      priceinCents: data.priceInCents,
      filePath: filePath,
      imagePath: imagePath,
    },
  });

  redirect("/admin/products");
}
