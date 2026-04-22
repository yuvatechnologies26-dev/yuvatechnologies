import { ReactNode } from "react";

export const AdminTable = ({ headers, children }: { headers: string[]; children: ReactNode }) => (
  <div className="overflow-x-auto rounded-xl border border-border bg-card">
    <table className="w-full text-sm">
      <thead className="bg-muted/60">
        <tr>
          {headers.map((h) => (
            <th key={h} className="text-left text-xs uppercase tracking-wider text-muted-foreground font-semibold px-4 py-3">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-border">{children}</tbody>
    </table>
  </div>
);

export const AdminCard = ({ title, children }: { title?: string; children: ReactNode }) => (
  <div className="rounded-xl border border-border bg-card p-5 shadow-card">
    {title && <h3 className="font-display font-bold text-foreground mb-4">{title}</h3>}
    {children}
  </div>
);

export const ConfirmDelete = ({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) => (
  <span className="inline-flex items-center gap-2 text-xs">
    <span className="text-muted-foreground">Sure?</span>
    <button onClick={onConfirm} className="px-2 py-0.5 rounded bg-destructive text-destructive-foreground font-semibold">Yes</button>
    <button onClick={onCancel} className="px-2 py-0.5 rounded border border-border">No</button>
  </span>
);
