function LoadingOverlay({ message }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "rgba(255,255,255,0.95)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 12, borderRadius: 10, zIndex: 10,
    }}>
      <div style={{
        width: 62, height: 62, borderRadius: "75%",
        border: "4px solid #E6F1FB",
        borderTopColor: "#378ADD",
        animation: "spin 0.9s linear infinite",
      }} />
      {message && (
        <span style={{
          fontSize: 16, color: "#888",
          animation: "pulse-text 1.6s ease-in-out infinite",
        }}>
          {message}
        </span>
      )}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse-text { 0%,100%{opacity:.8} 50%{opacity:1} }
      `}</style>
    </div>
  );
}

export default LoadingOverlay;