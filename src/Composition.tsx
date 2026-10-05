import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const tacoData = [
  {name: "Pastor", emoji: "🌮", value: 48, color: "#ff5d3b"},
  {name: "Asada", emoji: "🥩", value: 35, color: "#f7a928"},
  {name: "Suadero", emoji: "🍖", value: 29, color: "#7ccf68"},
  {name: "Campechano", emoji: "🔥", value: 22, color: "#39b8a5"},
  {name: "Veggie", emoji: "🥑", value: 16, color: "#8e73d4"},
];

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const Background = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 15% 15%, rgba(255,93,59,.2), transparent 28%), radial-gradient(circle at 85% 80%, rgba(57,184,165,.18), transparent 30%), #fff8e8",
        overflow: "hidden",
      }}
    >
      {[0, 1, 2, 3, 4, 5].map((dot) => (
        <div
          key={dot}
          style={{
            position: "absolute",
            left: 70 + dot * 190,
            top: 120 + (dot % 3) * 330,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: dot % 2 === 0 ? "#ffb938" : "#39b8a5",
            opacity: 0.22,
            translate: `0 ${Math.sin((frame + dot * 17) / 20) * 12}px`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

const Header = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        opacity: interpolate(frame, [0, fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: ease,
        }),
        translate: `0 ${interpolate(frame, [0, fps], [-45, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: ease,
        })}px`,
      }}
    >
      <div style={{fontSize: 36, fontWeight: 800, color: "#9e3e28", letterSpacing: 3}}>
        📍 PUESTO DE DON JUAN
      </div>
      <div style={{fontSize: 76, lineHeight: 1, fontWeight: 950, color: "#2f2a26"}}>
        ¿Qué tacos compraron hoy?
      </div>
      <div style={{fontSize: 34, color: "#75675d", fontWeight: 650}}>
        150 tacos vendidos · Sábado taquero
      </div>
    </div>
  );
};

const Histogram = () => {
  const frame = useCurrentFrame();
  const chartStart = 42;
  const maxValue = 50;

  return (
    <div
      style={{
        width: 900,
        height: 480,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        padding: "0 44px 55px",
        borderLeft: "6px solid #2f2a26",
        borderBottom: "6px solid #2f2a26",
        position: "relative",
      }}
    >
      {[10, 20, 30, 40, 50].map((tick) => (
        <div
          key={tick}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 55 + (tick / maxValue) * 335,
            borderTop: "2px dashed rgba(47,42,38,.16)",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: -54,
              top: -17,
              fontSize: 25,
              color: "#75675d",
              fontWeight: 750,
            }}
          >
            {tick}
          </span>
        </div>
      ))}

      {tacoData.map((taco, index) => {
        const start = chartStart + index * 10;
        const progress = interpolate(frame, [start, start + 42], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: ease,
        });
        const shownValue = Math.round(taco.value * progress);
        const barHeight = (taco.value / maxValue) * 335 * progress;
        const tacoDrop = interpolate(frame, [start + 20, start + 44], [-70, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: ease,
        });

        return (
          <div
            key={taco.name}
            style={{
              width: 132,
              height: 335,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                fontSize: 46,
                lineHeight: 1,
                marginBottom: 8,
                opacity: progress,
                translate: `0 ${tacoDrop}px`,
              }}
            >
              {taco.emoji}
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 950,
                color: "#2f2a26",
                marginBottom: 10,
                opacity: progress,
              }}
            >
              {shownValue}
            </div>
            <div
              style={{
                width: 108,
                height: barHeight,
                minHeight: progress > 0 ? 4 : 0,
                borderRadius: "28px 28px 6px 6px",
                background: `linear-gradient(180deg, ${taco.color}, ${taco.color}cc)`,
                boxShadow: `0 12px 0 ${taco.color}55, inset 0 5px 0 rgba(255,255,255,.4)`,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 350,
                width: 140,
                textAlign: "center",
                fontSize: 21,
                fontWeight: 850,
                color: "#4e453f",
                opacity: progress,
              }}
            >
              {taco.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Result = () => {
  const frame = useCurrentFrame();
  const local = frame - 150;
  const opacity = interpolate(local, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const scale = interpolate(local, [0, 24], [0.72, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 1.35, 0.35, 1),
  });

  return (
    <div
      style={{
        position: "absolute",
        right: 72,
        bottom: 35,
        display: "flex",
        alignItems: "center",
        gap: 18,
        background: "#2f2a26",
        color: "#fff8e8",
        padding: "20px 30px",
        borderRadius: 28,
        boxShadow: "0 15px 30px rgba(47,42,38,.22)",
        opacity,
        scale,
      }}
    >
      <span style={{fontSize: 54}}>🏆🌮</span>
      <div>
        <div style={{fontSize: 25, fontWeight: 700, color: "#ffd56a"}}>EL FAVORITO</div>
        <div style={{fontSize: 34, fontWeight: 950}}>Pastor · 32%</div>
      </div>
    </div>
  );
};

export const MyComposition = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{fontFamily: "Arial, Helvetica, sans-serif"}}>
      <Background />
      <AbsoluteFill style={{padding: "55px 90px", alignItems: "center", gap: 30}}>
        <Header />
        <Sequence from={20} layout="none">
          <div
            style={{
              opacity: interpolate(frame, [20, 42], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: ease,
              }),
            }}
          >
            <Histogram />
          </div>
        </Sequence>
      </AbsoluteFill>
      <Result />
      <div
        style={{
          position: "absolute",
          left: 70,
          bottom: 34,
          fontSize: 24,
          color: "#8c7b70",
          fontWeight: 700,
          opacity: interpolate(frame, [95, 120], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Cada barra = tacos comprados 🧾
      </div>
    </AbsoluteFill>
  );
};
