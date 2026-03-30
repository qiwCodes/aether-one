export const PRODUCT_FINISHES = [
  { id: "obsidian", name: "Obsidian", note: "Matte black" },
  {
    id: "ivory_gilt",
    name: "Ivory Gilt",
    note: "White & gold accents",
  },
] as const;

export type ProductFinishId = (typeof PRODUCT_FINISHES)[number]["id"];
