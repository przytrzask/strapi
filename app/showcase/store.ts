import { proxy } from "valtio";

const colors = [
  "#ccc",
  "#EFBD4E",
  "#80C670",
  "#726DE8",
  "#EF674E",
  "#353934",
  "Purple",
] as const;

type Store = {
  variant: "intro" | "customizer";
  color: (typeof colors)[number];
  decal: string;
};

export const store = proxy<Store>({
  variant: "intro",
  color: "#726DE8",
  decal: "brainly",
});
