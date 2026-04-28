function SliderTrackVisual({ value, min, max, marker }) {
  const isRange = Array.isArray(value) && value.length === 2;
  const IN_RANGE = "#d7e3eb";
  const OUT_RANGE = "#f9e5dd";

  const TICK_PADDING = 12;
  const OFFSET = 12;

  const toGradientStop = (val) => {
    const pct = ((val - min) / (max - min)) * 100;
    return `calc(${OFFSET}px + ${pct}% * (100% - ${OFFSET * 2}px) / 100%)`;
  };

  let background;

  if (isRange) {
    const stop1 = toGradientStop(value[0]);
    const stop2 = toGradientStop(value[1]);

    background = `linear-gradient(to right,
      ${OUT_RANGE} 0%,
      ${OUT_RANGE} ${stop1},
      ${IN_RANGE} ${stop1},
      ${IN_RANGE} ${stop2},
      ${OUT_RANGE} ${stop2},
      ${OUT_RANGE} 100%)`;
  } else {
    const stop = toGradientStop(value);

    background = `linear-gradient(to right,
      ${IN_RANGE} 0%,
      ${IN_RANGE} ${stop},
      ${OUT_RANGE} ${stop},
      ${OUT_RANGE} 100%)`;
  }

  const tickInterval = (max - min) <= 10 ? 1 : 10;
  const ticks = [];
  const firstTick = Math.ceil(min / tickInterval) * tickInterval;

  for (let v = firstTick; v <= max; v += tickInterval) {
    ticks.push({
      pct: ((v - min) / (max - min)) * 100,
      major: v % (tickInterval * 5) === 0,
    });
  }

  return (
    <div
      className="Slider"
      style={{
        background,
        position: "relative",
        overflow: "visible",
      }}
    >
      {/* MIN LABEL */}
      <span
        style={{
          position: "absolute",
          bottom: 8,
          left: 4,
          fontSize: 13,
          color: "#333",
          fontWeight: "bold",
        }}
      >
        {min}
      </span>

      {/* MAX LABEL */}
      <span
        style={{
          position: "absolute",
          bottom: 8,
          right: 0,
          fontSize: 13,
          color: "#333",
          fontWeight: "bold",
        }}
      >
        {max}
      </span>

      {/* TICKS */}
      {ticks.map((tick, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: 0,
            left: `calc(${TICK_PADDING}px + ${tick.pct}% * (100% - ${
              TICK_PADDING * 2
            }px) / 100%)`,
            width: 1,
            height: tick.major ? 12 : 6,
            backgroundColor: "rgba(0,0,0,0.8)",
            transform: "translateX(-50%)",
          }}
        />
      ))}

      {/* MARKER */}
      <div
        style={{
          position: "absolute",
          left: toGradientStop(marker),
          top: 0,
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}
      >
        {/* TEXT ABOVE TRIANGLE */}
        <div
          style={{
            position: "absolute",
            top: -20,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 14,
            fontWeight: "bold",
            color: "#000",
            whiteSpace: "nowrap",
          }}
        >
          {marker}
        </div>

        {/* TRIANGLE */}
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderTop: "10px solid black",
          }}
        />

        {/* LINE */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: 1,
            height: 40,
            backgroundColor: "black",
          }}
        />
      </div>
    </div>
  );
}

export default SliderTrackVisual;