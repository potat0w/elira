export function formatBDT(price: number): string {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatBDTSimple(price: number): string {
  return `৳ ${price.toLocaleString('en-BD')}`;
}
