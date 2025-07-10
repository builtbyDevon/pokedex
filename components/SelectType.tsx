"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Adjust the import path if needed
import Types from "@/components/Types";

interface SelectTypeProps {
    type?: string;
}

const types = [
  { value: "All", label: "All" },
  { value: "normal", label: "Normal" },
  { value: "fire", label: "Fire" },
  { value: "water", label: "Water" },
  { value: "electric", label: "Electric" },
  { value: "grass", label: "Grass" },
  { value: "ice", label: "Ice" },
  { value: "fighting", label: "Fighting" },
  { value: "poison", label: "Poison" },
  { value: "ground", label: "Ground" },
  { value: "flying", label: "Flying" },
  { value: "psychic", label: "Psychic" },
  { value: "bug", label: "Bug" },
  { value: "rock", label: "Rock" },
  { value: "ghost", label: "Ghost" },
  { value: "dragon", label: "Dragon" },
  { value: "dark", label: "Dark" },
  { value: "steel", label: "Steel" },
  { value: "fairy", label: "Fairy" },
];

export default function SelectType(type: SelectTypeProps) {
  const router = useRouter();
  return (
    <div className="container px-4 mx-auto">
      <label htmlFor="type-select" className="inline-block font-bold mb-2">
        Filter:
      </label>
      <Select
        value={type.type || "All"}
        onValueChange={(value) => {
          router.push(`/page/1${value === "All" ? "" : `?type=${value}`}`);
        }}
      >
        <SelectTrigger id="type-select" className="w-[200px]">
          <SelectValue placeholder="Filter by Type" />
        </SelectTrigger>
        <SelectContent className="relative z-200">
          {types.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.value === "All" ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-gray-400 rounded-full"></span>
                  {type.label}
                </span>
              ) : (
                <div className="flex pointer-events-none items-center gap-2">
                  <Types asLink={false} type={type.value} />
                </div>
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}