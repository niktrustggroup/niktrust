export function persianDate(value: string | null) {
  if (!value) return 'تاریخ اعلام نشده';
  return new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium', timeZone: 'Asia/Tehran' }).format(new Date(value));
}
export function persianValue(value: string) { return value.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'.charAt(Number(d))).replace(/\./g, '٫'); }
export function rialToToman(value: string) {
  if (!/^\d+$/.test(value)) return 'اعلام نشده';
  const rial = BigInt(value); const whole = rial / 10n; const decimal = rial % 10n;
  return `${whole.toLocaleString('fa-IR')}${decimal ? '٫' + persianValue(decimal.toString()) : ''} تومان`;
}