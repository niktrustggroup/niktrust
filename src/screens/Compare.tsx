import { useCatalog } from '@/api/client';
import { canCompare } from '@/api/rules';
import { ComponentButton, ComponentCompareColumnHeader } from '@/ds';
import { PageHead } from './Shared';
import { Attribute, EmptyState, SampleNotice } from './product/Primitives';
export function CompareScreen({ go, compare, setCompare }: { go: (id: string, arg?: string) => void; compare: string[]; setCompare: (ids: string[]) => void }) {
  const { platforms } = useCatalog(); const cols = compare.flatMap(id => platforms.find(p => p.id === id) ?? []);
  const valid = canCompare(cols); const labels = [...new Set(cols.flatMap(p => p.key_attributes.map(a => a.label)))];
  return <main><PageHead go={go} crumbs={[{ label:'نیک‌تراست',id:'home' },'مقایسه']} title="مقایسهٔ پلتفرم‌ها" desc="دو تا چهار پلتفرم همدسته؛ ترتیب ستون‌ها همان ترتیب انتخاب شماست."/>
    <div className="nt-container nt-section nt-stack"><SampleNotice/><div className="nt-cluster">{cols.map(p => <ComponentButton key={p.id} type="secondary" iconLeading="ComponentIconClose" ariaLabel={'حذف ' + p.name_fa} onClick={() => setCompare(compare.filter(id => id !== p.id))}>{p.name_fa}</ComponentButton>)}</div>
    {!valid ? <EmptyState title={cols.length < 2 ? 'حداقل دو پلتفرم انتخاب کنید' : 'فقط پلتفرم‌های همدسته قابل مقایسه‌اند'} text="هزینهٔ چالش پراپ‌فرم و حداقل واریز بروکر معیارهای یکسانی نیستند."/> : <div className="nt-ctable-wrap"><table className="nt-ctable nt-comparison"><caption className="nt-visually-hidden">مقایسهٔ مشخصات ساختگی</caption><thead><tr><th scope="col">معیار</th>{cols.map(p => <th key={p.id} scope="col"><ComponentCompareColumnHeader name={p.name_fa} category={p.category_fa} onRemove={() => setCompare(compare.filter(id => id !== p.id))}/></th>)}</tr></thead><tbody>
    <tr><th scope="row">امتیاز</th>{cols.map(p => <td key={p.id}>امتیازدهی در دست بررسی</td>)}</tr>
    {labels.map(label => <tr key={label}><th scope="row">{label}</th>{cols.map(p => { const a = p.key_attributes.find(a => a.label === label); return <td key={p.id}>{a ? <Attribute attribute={a}/> : 'اعلام نشده'}</td>; })}</tr>)}
    <tr><th scope="row">دسترسی از ایران</th>{cols.map(p => <td key={p.id}>نامشخص · اطمینان نامشخص</td>)}</tr><tr><th scope="row">بررسی کامل</th>{cols.map(p => <td key={p.id}><ComponentButton type="tertiary" onClick={() => go('review',p.id)}>مشاهدهٔ بررسی</ComponentButton></td>)}</tr></tbody></table></div>}
    <section className="nt-stack"><h2 className="nt-h3">انتخاب پلتفرم</h2><div className="nt-cluster">{platforms.filter(p => !compare.includes(p.id)).map(p => <ComponentButton key={p.id} type="secondary" disabled={compare.length >= 4 || (cols.length > 0 && p.category !== cols[0]?.category)} onClick={() => setCompare([...compare,p.id])}>{p.name_fa}</ComponentButton>)}</div><p className="nt-caption">گزینه‌های سایر دسته‌ها تا پاک کردن انتخاب فعلی غیرفعال‌اند.</p></section>
    </div></main>;
}