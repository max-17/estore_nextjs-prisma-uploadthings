export function formatPrice(price: number): string {
  return price.toLocaleString('de-KR', { style: 'currency', currency: 'KRW' });
}
