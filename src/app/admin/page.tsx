import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import db from "@/db/db";

async function getSalesData() {
  const data = await db?.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });
  return {
    amount: (data?._sum.pricePaidInCents || 0) / 100, // Fixed division for cents to dollars
    numberofsales: data?._count,
  };
}
export default async function page() {
  const salesdata = await getSalesData();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="sales"
        subtitle={"orders : " + salesdata.numberofsales}
        body={"$" + salesdata.amount}
      />
    </div>
  );
}

type DashBoardCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

export function DashboardCard({ title, subtitle, body }: DashBoardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
