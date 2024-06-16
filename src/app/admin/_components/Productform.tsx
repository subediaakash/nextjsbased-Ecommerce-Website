// Removed semicolon
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { addProduct } from "../_actions/products";

export default function Productform() {
  const [priceInCents, setPriceInCents] = useState<number>();
  return (
    <div>
      <form className="flex flex-col gap-8" action={addProduct}>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="priceInCents">Price in Cents</Label>
          <Input
            type="number"
            id="priceInCents"
            name="priceInCents"
            required
            value={priceInCents}
            onChange={(e) =>
              setPriceInCents(Number(e.target.value) || undefined)
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="file ">file</Label>
          <Input type="file" id="file" name="file" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="file ">Image</Label>
          <Input type="file" id="image" name="image" required />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
