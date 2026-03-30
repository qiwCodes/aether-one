import { ProductFinishProvider } from "@/components/providers/ProductFinishProvider";
import { ResponsiveHome } from "@/components/home/ResponsiveHome";

export default function Home() {
  return (
    <ProductFinishProvider>
      <ResponsiveHome />
    </ProductFinishProvider>
  );
}
