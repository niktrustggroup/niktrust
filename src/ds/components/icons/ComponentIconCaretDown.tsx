// @ts-nocheck
// figma node: 15:3500 Component / Icon / Caret Down
export function ComponentIconCaretDown(_p = {}) {
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
        <svg width={8.400} height={4.400} viewBox="0 0 8.400 4.400" fill="none" style={{
          position: "absolute",
          left: 3.8,
          top: 6,
          width: 8.4,
          height: 4.4,
        }}>
          <path d={"M 0.615 -0.587 C 0.291 -0.926 -0.247 -0.939 -0.587 -0.615 C -0.926 -0.291 -0.939 0.247 -0.615 0.587 L 0 0 L 0.615 -0.587 Z M 4.2 4.4 L 3.585 4.987 C 3.746 5.155 3.968 5.25 4.2 5.25 C 4.432 5.25 4.654 5.155 4.815 4.987 L 4.2 4.4 Z M 9.015 0.587 C 9.339 0.247 9.326 -0.291 8.987 -0.615 C 8.647 -0.939 8.109 -0.926 7.785 -0.587 L 8.4 0 L 9.015 0.587 Z M 0 0 L -0.615 0.587 L 3.585 4.987 L 4.2 4.4 L 4.815 3.813 L 0.615 -0.587 L 0 0 Z M 4.2 4.4 L 4.815 4.987 L 9.015 0.587 L 8.4 0 L 7.785 -0.587 L 3.585 3.813 L 4.2 4.4 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
      </div>
    </div>
  );
}
export default ComponentIconCaretDown;
