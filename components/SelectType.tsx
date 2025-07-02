"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Adjust the import path if needed

interface SelectTypeProps {
    type: string;
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
    console.log('type ', type);
  return (
    <div>
      <label htmlFor="type-select" className="block mb-2">
        Choose a type:
      </label>
      <Select
        value={type.type}
        onValueChange={(value) => {
          router.push(`/page/1${value === "All" ? "" : `?type=${value}`}`);
        }}
      >
        <SelectTrigger id="type-select" className="w-[200px]">
          <SelectValue placeholder="Filter by Type" />
        </SelectTrigger>
        <SelectContent>
          {types.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}