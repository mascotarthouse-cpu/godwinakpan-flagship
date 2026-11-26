import Link from "next/link";
import type { Metadata } from "next";
import Colons from "@/components/Colons";
import OrderForm from "@/components/OrderForm";
import SampleTag from "@/components/SampleTag";
import { products } from "@/lib/seed";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

/** Sample checkout until a payment provider (Paystack or Flutterwave) is connected. Orders land in /admin → Inquiries. */
export default async function Checkout({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const { product } = await searchParams;
  const p = products.find((x) => x.slug === product) ?? products.find((x) => x.kind !== "Free") ?? products[0];
  return (
    <section className="wrap grid gap-14 pb-28 pt-32 sm:pt-44 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <p><Link href={`/shop/${p.slug}`} className="link-u text-sm text-ash">← {p.title}</Link></p>
        <Colons label="Checkout" className="mb-6 mt-10 text-red" />
        <h1 className="display text-h2">Complete your order. <SampleTag className="ml-1" /></h1>
        <p className="mt-4 max-w-md text-ash">Secure card and bank payments open soon. Place your order now and we&apos;ll send a payment link and your copy.</p>
        <OrderForm product={p.title} />
      </div>
      <aside className="lg:col-span-5 lg:col-start-8">
        <div className="rounded-[28px] bg-paper p-8">
          <p className="eyebrow text-ash">Order summary</p>
          <div className="mt-6 flex items-start justify-between gap-6 border-b border-eagle/10 pb-6">
            <div><p className="display text-2xl">{p.title}</p><p className="mt-1 text-ash">{p.kind}</p></div>
            <p className="font-semibold">{p.price || "Free"}</p>
          </div>
          <div className="mt-6 flex justify-between text-lg"><span>Total</span><b>{p.price || "Free"}</b></div>
          <p className="mt-6 text-sm text-ash">Pay by card, bank transfer or USSD once payments open.</p>
        </div>
      </aside>
    </section>
  );
}
