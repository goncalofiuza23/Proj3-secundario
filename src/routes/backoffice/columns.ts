import type { Payment } from "$lib/types/menu.js";
import type { ColumnDef } from "@tanstack/table-core";
export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
];