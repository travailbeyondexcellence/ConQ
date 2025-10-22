import {
  ProductHero,
  ProductFeatures,
  ProductShowcase,
  ProductBenefits,
  ProductCTA,
} from '@/components/product';

export default function Product() {
  return (
    <main className="min-h-screen">
      <ProductHero />
      <ProductFeatures />
      <ProductShowcase />
      <ProductBenefits />
      <ProductCTA />
    </main>
  );
}
