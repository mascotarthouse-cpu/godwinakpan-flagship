import { desc } from "drizzle-orm";
import { db, schema } from "@/db";
import { setInquiryStatus } from "../../actions";
import { Card, Title } from "../ui";

export default async function Inquiries() {
  const rows = db ? await db.select().from(schema.inquiries).orderBy(desc(schema.inquiries.createdAt)).limit(200) : [];
  return (
    <>
      <Title>Inquiries</Title>
      {rows.length ? (
        <div className="space-y-3">
          {rows.map((r) => (
            <Card key={r.id} className={r.status === "new" ? "border-red/40" : ""}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-red">{r.intent}</p>
                  <p className="display mt-1 text-xl">{r.name}{r.organisation && <span className="text-ash"> · {r.organisation}</span>}</p>
                  <a href={`mailto:${r.email}?subject=${encodeURIComponent(`Re: ${r.intent}`)}`} className="text-sm underline">{r.email}</a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-ash">{r.createdAt.toLocaleString("en-GB")}</span>
                  <div className="flex gap-1">
                    {["new", "replied", "archived"].map((s) => (
                      <form key={s} action={setInquiryStatus}>
                        <input type="hidden" name="id" value={r.id} />
                        <input type="hidden" name="status" value={s} />
                        <button className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${r.status === s ? "bg-eagle text-sky" : "bg-paper text-ash"}`}>{s}</button>
                      </form>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-graphite">{r.message}</p>
            </Card>
          ))}
        </div>
      ) : <Card><p className="text-sm text-ash">No inquiries yet. They arrive here from the contact page.</p></Card>}
    </>
  );
}
