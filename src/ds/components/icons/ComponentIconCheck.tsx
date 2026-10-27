// @ts-nocheck
// figma node: 15:3465 Component / Icon / Check
export function ComponentIconCheck(_p = {}) {
  const props = _p;
  return (
    <div className={props.className} style={{
      width: 16,
      height: 16,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      color: "var(--text-primary)",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        width: 16,
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <svg width={10} height={7.500} viewBox="0 0 10 7.500" fill="none" style={{
          position: "absolute",
          left: 3,
          top: 4.4,
          width: 10,
          height: 7.5,
        }}>
          <path d={"M 0.601 3.599 C 0.269 3.267 -0.269 3.267 -0.601 3.599 C -0.933 3.931 -0.933 4.469 -0.601 4.801 L 0 4.2 L 0.601 3.599 Z M 3.3 7.5 L 2.699 8.101 C 2.864 8.266 3.09 8.356 3.324 8.35 C 3.558 8.343 3.778 8.241 3.934 8.066 L 3.3 7.5 Z M 10.634 0.566 C 10.947 0.216 10.916 -0.321 10.566 -0.634 C 10.216 -0.947 9.679 -0.916 9.366 -0.566 L 10 0 L 10.634 0.566 Z M 0 4.2 L -0.601 4.801 L 2.699 8.101 L 3.3 7.5 L 3.901 6.899 L 0.601 3.599 L 0 4.2 Z M 3.3 7.5 L 3.934 8.066 L 10.634 0.566 L 10 0 L 9.366 -0.566 L 2.666 6.934 L 3.3 7.5 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
      </div>
    </div>
  );
}
export default ComponentIconCheck;
