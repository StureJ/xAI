import { Range, getTrackBackground } from "react-range";

function RangeSlider({ value, onChange, onAfterChange, min, max, step = 1 }) {
  return (
    <Range
      step={step}
      min={min}
      max={max}
      values={value}

      // Fires continuously while dragging
      onChange={onChange}

      // ✅ Fires once when user releases thumb
      onFinalChange={(vals) => {
        onChange(vals); // keep state synced
        if (onAfterChange) {
          onAfterChange(vals);
        }
      }}

      renderTrack={({ props, children }) => {
        const { key, ...trackProps } = props;

        return (
          <div
            key={key}
            {...trackProps}
            style={{
              ...trackProps.style,
              height: 4,
              width: "100%",
              background: getTrackBackground({
                values: value,
                colors:
                  value.length === 1
                    ? ["#8CC8EB", "#ccc"]           // single thumb
                    : ["#ccc", "#8CC8EB", "#ccc"], // range slider
                min,
                max,
              }),
            }}
          >
            {children}
          </div>
        );
      }}

      renderThumb={({ props, index }) => {
        const { key, ...thumbProps } = props;
        const val = value[index];

        return (
          <div
            key={key}
            {...thumbProps}
            style={{
              ...thumbProps.style,
              width: 24,
              height: 24,
              background: "#FFFFFF",
              borderRadius: "50%",
              border: "1px solid #8CC8EB",
              outline: "none",
            }}
          >
            {/* Value label */}
            <div
              style={{
                position: "absolute",
                top: 28,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: 16,
                padding: "2px 6px",
                fontWeight: "bold",
                borderRadius: 4,
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              {val}
            </div>
          </div>
        );
      }}
    />
  );
}

export default RangeSlider;