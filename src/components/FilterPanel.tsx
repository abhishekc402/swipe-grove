import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export const FilterPanel = () => {
  const [distance, setDistance] = useState(50);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="rounded-full hover:bg-muted"
        >
          <SlidersHorizontal className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="py-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Age Range</label>
              <div className="flex items-center gap-4 mt-2">
                <input type="number" placeholder="18" className="w-20 px-3 py-2 border rounded-md" />
                <span>to</span>
                <input type="number" placeholder="35" className="w-20 px-3 py-2 border rounded-md" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Distance ({distance} km)</label>
              <Slider
                value={[distance]}
                onValueChange={([value]) => setDistance(value)}
                max={100}
                step={1}
                className="mt-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Looking for</label>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" className="rounded-full">Men</Button>
                <Button variant="outline" className="rounded-full">Women</Button>
                <Button variant="outline" className="rounded-full">Everyone</Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};