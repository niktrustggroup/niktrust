// @ts-nocheck
// figma node: 15:3491 Component / Icon / Dash
export function ComponentIconDash(_p = {}) {
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
        <svg width={9.600} height={1.700} viewBox="0 -0.850 9.600 1.700" fill="none" style={{
          position: "absolute",
          left: 3.2,
          top: 8,
          width: 9.6,
          height: 1.7000000476837158,
        }}>
          <path d={"M 0 -0.85 C -0.469 -0.85 -0.85 -0.469 -0.85 0 C -0.85 0.469 -0.469 0.85 0 0.85 L 0 0 L 0 -0.85 Z M 9.6 0.85 C 10.069 0.85 10.45 0.469 10.45 0 C 10.45 -0.469 10.069 -0.85 9.6 -0.85 L 9.6 0 L 9.6 0.85 Z M 0 0 L 0 0.85 L 9.6 0.85 L 9.6 0 L 9.6 -0.85 L 0 -0.85 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
      </div>
    </div>
  );
}
export default ComponentIconDash;
