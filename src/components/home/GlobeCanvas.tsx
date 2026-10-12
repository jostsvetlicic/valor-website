"use client";

import { useEffect, useRef, useState } from "react";
import type { GlobeInstance } from "globe.gl";
import { clsx } from "@/lib/clsx";

import type { Dict, Locale } from "@/i18n";

type Location = { name: string; lat: number; lng: number; hq?: boolean };

// Tooltip names in Slovenian, keyed by the English name.
const SL_NAMES: Record<string, string> = {
  "Bali, Indonesia (HQ)": "Bali, Indonezija (sedež)",
  Croatia: "Hrvaška",
  Slovenia: "Slovenija",
  "Hong Kong": "Hongkong",
  Singapore: "Singapur",
  "United Arab Emirates": "Združeni arabski emirati",
  Australia: "Avstralija",
  "United Kingdom": "Združeno kraljestvo",
  "South Africa": "Južna Afrika",
};

const ARIA: Dict = {
  en: "A spinning globe with gold arcs from VALOR's headquarters in Bali to clients in Croatia, Slovenia, Hong Kong, Singapore, the United Arab Emirates, Australia, the United Kingdom and South Africa.",
  sl: "Vrteči se globus z zlatimi loki od sedeža VALOR na Baliju do strank na Hrvaškem, v Sloveniji, Hongkongu, Singapurju, Združenih arabskih emiratih, Avstraliji, Združenem kraljestvu in Južni Afriki.",
};

const HQ: Location = { name: "Bali, Indonesia (HQ)", lat: -8.41, lng: 115.19, hq: true };

const LOCATIONS: Location[] = [
  HQ,
  { name: "Croatia", lat: 45.1, lng: 15.2 },
  { name: "Slovenia", lat: 46.15, lng: 14.99 },
  { name: "Hong Kong", lat: 22.32, lng: 114.17 },
  { name: "Singapore", lat: 1.35, lng: 103.82 },
  { name: "United Arab Emirates", lat: 25.2, lng: 55.27 },
  { name: "Australia", lat: -25.27, lng: 133.78 },
  { name: "United Kingdom", lat: 52.5, lng: -1.5 },
  { name: "South Africa", lat: -30.56, lng: 22.94 },
];

const ARCS = LOCATIONS.filter((l) => !l.hq).map((l, i) => ({
  startLat: HQ.lat,
  startLng: HQ.lng,
  endLat: l.lat,
  endLng: l.lng,
  delay: i * 350,
}));

const GOLD = "#c9a84c";


/**
 * WebGL globe (globe.gl / three.js). Nothing heavy loads until the container
 * is near the viewport; rendering pauses whenever it scrolls off-screen.
 */
export default function GlobeCanvas({ className, locale = "en" }: { className?: string; locale?: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let globe: GlobeInstance | null = null;
    let cancelled = false;
    let visibilityObserver: IntersectionObserver | null = null;
    let resizeObserver: ResizeObserver | null = null;
    const disposers: Array<() => void> = [];

    async function init() {
      const [{ default: Globe }, THREE, { feature }, worldModule] = await Promise.all([
        import("globe.gl"),
        import("three"),
        import("topojson-client"),
        import("world-atlas/countries-110m.json"),
      ]);
      if (cancelled || !el) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- untyped TopoJSON payload
      const world = ((worldModule as any).default ?? worldModule) as any;
      type Ring = number[][];
      type Geo = { type: string; coordinates: Ring[][] };
      // Drop degenerate slivers (e.g. a 4-identical-point ring in North Korea's
      // shape), h3 throws on them and the whole hex layer fails.
      const valid = (poly: Ring[]) => new Set(poly[0].map((p) => p.join())).size >= 3;
      const countries = (
        feature(world, world.objects.countries) as unknown as { features: { geometry: Geo }[] }
      ).features.map((f) =>
        f.geometry.type === "MultiPolygon"
          ? { ...f, geometry: { ...f.geometry, coordinates: f.geometry.coordinates.filter(valid) } }
          : f,
      );

      globe = new Globe(el, { rendererConfig: { antialias: true, alpha: true } })
        .width(el.clientWidth)
        .height(el.clientHeight)
        .backgroundColor("rgba(0,0,0,0)")
        .showAtmosphere(true)
        .atmosphereColor("#3fc1d0")
        .atmosphereAltitude(0.18)
        .hexPolygonsData(countries)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.4)
        .hexPolygonUseDots(true)
        .hexPolygonColor(() => "rgba(150, 205, 215, 0.38)")
        .pointsData(LOCATIONS)
        .pointLat("lat")
        .pointLng("lng")
        .pointColor(() => "#ffffff")
        .pointAltitude(0.015)
        .pointRadius((d) => ((d as Location).hq ? 1.3 : 1))
        .pointLabel(() => "")
        .onPointHover((d) => setHovered(d ? (d as Location).name : null))
        .arcsData(ARCS)
        .arcColor(() => ["rgba(201,168,76,0.25)", GOLD])
        .arcStroke(0.55)
        .arcAltitudeAutoScale(0.45)
        .arcDashLength(0.5)
        .arcDashGap(0.35)
        .arcDashInitialGap((d) => (d as { delay: number }).delay / 1000)
        .arcDashAnimateTime(reduce ? 4200 : 2800)
        .ringsData([HQ])
        .ringLat("lat")
        .ringLng("lng")
        .ringColor(() => (t: number) => `rgba(201,168,76,${1 - t})`)
        .ringMaxRadius(5)
        .ringPropagationSpeed(2.5)
        .ringRepeatPeriod(1600)
        .pointOfView({ lat: 12, lng: 80, altitude: 1.75 });

      const material = globe.globeMaterial() as InstanceType<typeof THREE.MeshPhongMaterial>;
      material.color = new THREE.Color("#0b1117");
      material.emissive = new THREE.Color("#04070a");
      material.shininess = 6;

      const controls = globe.controls();
      controls.enableZoom = false;
      controls.enablePan = false;
      // Keeps turning under the OS "reduce motion" setting, just slower.
      controls.autoRotate = true;
      controls.autoRotateSpeed = reduce ? 0.3 : 0.55;
      controls.minPolarAngle = Math.PI * 0.3;
      controls.maxPolarAngle = Math.PI * 0.7;

      // Tooltip follows the pointer (positioned directly, no re-render per move).
      const move = (e: PointerEvent) => {
        const tip = tooltipRef.current;
        if (!tip) return;
        const r = el.getBoundingClientRect();
        tip.style.transform = `translate(${e.clientX - r.left + 14}px, ${e.clientY - r.top + 14}px)`;
      };
      el.addEventListener("pointermove", move);
      disposers.push(() => el.removeEventListener("pointermove", move));

      // Hold still while the pointer is over the globe so the dots are hoverable.
      const pause = () => (controls.autoRotate = false);
      const resume = () => (controls.autoRotate = true);
      el.addEventListener("pointerenter", pause);
      el.addEventListener("pointerleave", resume);
      disposers.push(() => {
        el.removeEventListener("pointerenter", pause);
        el.removeEventListener("pointerleave", resume);
      });

      // Star field: a shell of points far behind the globe (radius 100).
      const count = 1400;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 700 + Math.random() * 400;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      const starGeometry = new THREE.BufferGeometry();
      starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1.4,
        sizeAttenuation: false,
        transparent: true,
        opacity: 0.55,
      });
      globe.scene().add(new THREE.Points(starGeometry, starMaterial));
      disposers.push(() => {
        starGeometry.dispose();
        starMaterial.dispose();
      });

      resizeObserver = new ResizeObserver(() => {
        globe?.width(el.clientWidth).height(el.clientHeight);
      });
      resizeObserver.observe(el);

      visibilityObserver = new IntersectionObserver(([entry]) => {
        if (!globe) return;
        if (entry.isIntersecting) globe.resumeAnimation();
        else globe.pauseAnimation();
      });
      visibilityObserver.observe(el);

      setReady(true);
    }

    // Lazy: only load three.js + map data once the globe is close to view.
    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        loadObserver.disconnect();
        init();
      },
      { rootMargin: "300px 0px" },
    );
    loadObserver.observe(el);

    return () => {
      cancelled = true;
      loadObserver.disconnect();
      visibilityObserver?.disconnect();
      resizeObserver?.disconnect();
      disposers.forEach((d) => d());
      globe?._destructor();
      el.replaceChildren();
    };
  }, []);

  return (
    <div className={clsx("relative", className)}>
      {/* Placeholder sphere while the globe loads, no layout shift. */}
      <div
        aria-hidden="true"
        className={clsx(
          "absolute inset-[16%] rounded-full border border-[#3fc1d0]/15 bg-[#0b1117] transition-opacity duration-700",
          ready ? "opacity-0" : "opacity-100",
        )}
      />
      <div
        ref={containerRef}
        role="img"
        aria-label={ARIA[locale]}
        className={clsx(
          "absolute inset-0 cursor-grab transition-opacity duration-700 active:cursor-grabbing [&_.float-tooltip-kap]:!hidden [&_.scene-nav-info]:!hidden",
          ready ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        ref={tooltipRef}
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute left-0 top-0 z-10 whitespace-nowrap rounded-lg border border-gold/55 bg-charcoal px-2.5 py-1.5 text-xs font-medium text-cream shadow-lg",
          hovered ? "block" : "hidden",
        )}
      >
        {hovered && locale === "sl" ? (SL_NAMES[hovered] ?? hovered) : hovered}
      </div>
    </div>
  );
}
