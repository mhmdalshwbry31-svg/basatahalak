"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  Gauge,
  Maximize,
  Minimize,
  Pause,
  PictureInPicture2,
  Play,
  RotateCcw,
  RotateCw,
  Settings,
  Volume2,
  VolumeX,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function WatermarkOverlay({ name, phone }: { name: string; phone: string }) {
  const [pos, setPos] = useState({ x: 18, y: 14 });
  const [opacity, setOpacity] = useState(0.25);

  useEffect(() => {
    const id = setInterval(() => {
      setPos({
        x: 6 + Math.random() * 70,
        y: 6 + Math.random() * 70,
      });
      setOpacity(0.12 + Math.random() * 0.25);
    }, 3600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      {/* Moving watermark */}
      <div
        className="absolute whitespace-nowrap rounded-lg border border-white/10 bg-black/45 px-3 py-1 text-sm font-bold tracking-wide text-white/40 backdrop-blur-[2px] select-none"
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          opacity,
          transition: "left 3200ms ease-in-out, top 3200ms ease-in-out, opacity 1600ms ease",
        }}
        aria-hidden
      >
        {name} - {phone}
      </div>
      {/* Static corner watermark */}
      <div
        className="absolute bottom-3 start-3 rounded-md bg-black/35 px-2 py-1 text-[10px] font-bold tracking-widest text-white/25 select-none"
        aria-hidden
      >
        © {name} • {phone}
      </div>
    </div>
  );
}

export function VideoPlayer({
  studentName,
  studentPhone,
  posterLabel,
}: {
  studentName: string;
  studentPhone: string;
  posterLabel: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [failed, setFailed] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const video = () => videoRef.current;

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const showControls = () => {
    setControlsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (video() && !video()!.paused) {
      hideTimer.current = setTimeout(() => setControlsVisible(false), 3200);
    }
  };

  const togglePlay = () => {
    const el = video();
    if (!el) return;
    if (el.paused) {
      void el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
    showControls();
  };

  const skip = (seconds: number) => {
    const el = video();
    if (!el) return;
    el.currentTime = Math.min(
      Math.max(el.currentTime + seconds, 0),
      el.duration || 0,
    );
    showControls();
  };

  const toggleMute = () => {
    const el = video();
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    showControls();
  };

  const changeVolume = (value: number) => {
    const el = video();
    if (!el) return;
    el.volume = value;
    el.muted = value === 0;
    setVolume(value);
    setMuted(el.muted);
  };

  const changeSpeed = (value: number) => {
    const el = video();
    if (el) el.playbackRate = value;
    setSpeed(value);
  };

  const seek = (clientX: number) => {
    const el = video();
    const bar = barRef.current;
    if (!el || !bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const fraction = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    el.currentTime = fraction * duration;
    setCurrentTime(el.currentTime);
  };

  const barRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void el.requestFullscreen();
    }
  };

  const togglePip = async () => {
    const el = video();
    if (!el) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await el.requestPictureInPicture();
      }
    } catch {
      // Picture-in-Picture not supported
    }
  };

  useEffect(() => {
    const onFullscreenChange = () =>
      setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const playedPercent = duration ? (currentTime / duration) * 100 : 0;
  const bufferedPercent = duration ? (buffered / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={showControls}
      onMouseLeave={() => playing && setControlsVisible(false)}
      className="group relative aspect-video w-full overflow-hidden rounded-3xl border border-border/60 bg-black shadow-2xl shadow-black/20"
    >
      <video
        ref={videoRef}
        className="size-full object-contain"
        poster={undefined}
        playsInline
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onProgress={(e) => {
          const el = e.currentTarget;
          if (el.buffered.length > 0) {
            setBuffered(el.buffered.end(el.buffered.length - 1));
          }
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => setFailed(true)}
        onClick={togglePlay}
      >
        <source
          src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        />
      </video>

      {/* Poster fallback / failed state */}
      {(!playing || failed) && !failed && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/90 via-primary-container/80 to-black/80",
            playing && "pointer-events-none opacity-0 transition-opacity",
          )}
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <button
              type="button"
              onClick={togglePlay}
              className="flex size-20 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-transform hover:scale-110 active:scale-95 animate-pulse-ring"
              aria-label="تشغيل الدرس"
            >
              <Play className="size-9 text-white ms-1" />
            </button>
            <p className="text-sm font-bold text-white/85">{posterLabel}</p>
            <p className="text-xs text-white/60">اضغط للتشغيل</p>
          </div>
        </div>
      )}

      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/90 p-6 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-white/10 text-white">
            <Gauge className="size-6" />
          </span>
          <p className="text-sm font-bold text-white">
            تعذّر تحميل الفيديو في هذه البيئة التجريبية
          </p>
          <p className="text-xs text-white/60">
            سيتم بث المحاضرة هنا من خلال خادم الفيديو في النسخة الإنتاجية.
          </p>
        </div>
      )}

      <WatermarkOverlay name={studentName} phone={studentPhone} />

      {/* Controls */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-40 flex flex-col gap-2 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-4 pb-3 pt-10 transition-all duration-300",
          controlsVisible || !playing
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0",
        )}
      >
        {/* Seek bar */}
        <div
          ref={barRef}
          className="group/bar relative flex h-5 cursor-pointer items-center"
          onClick={(e) => seek(e.clientX)}
          role="slider"
          aria-label="شريط التقدم"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(currentTime)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") skip(5);
            if (e.key === "ArrowLeft") skip(-5);
          }}
        >
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/25 transition-all group-hover/bar:h-2.5">
            <div
              className="absolute inset-y-0 right-0 rounded-full bg-white/25"
              style={{ width: `${bufferedPercent}%` }}
            />
            <div
              className="absolute inset-y-0 right-0 rounded-full bg-energy"
              style={{ width: `${playedPercent}%` }}
            >
              <span className="absolute -end-1 top-1/2 size-3.5 -translate-y-1/2 scale-0 rounded-full bg-white shadow-md transition-transform group-hover/bar:scale-100" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-white">
          <Button
            variant="ghost"
            size="icon-sm"
            className="rounded-full text-white hover:bg-white/15"
            onClick={togglePlay}
            aria-label={playing ? "إيقاف مؤقت" : "تشغيل"}
          >
            {playing ? <Pause className="size-5" /> : <Play className="size-5 ms-0.5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            className="hidden rounded-full text-white hover:bg-white/15 sm:inline-flex"
            onClick={() => skip(-10)}
            aria-label="رجوع 10 ثوان"
          >
            <RotateCcw className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="hidden rounded-full text-white hover:bg-white/15 sm:inline-flex"
            onClick={() => skip(10)}
            aria-label="تقدم 10 ثوان"
          >
            <RotateCw className="size-4" />
          </Button>

          <div className="hidden items-center gap-1.5 sm:flex">
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-full text-white hover:bg-white/15"
              onClick={toggleMute}
              aria-label={muted ? "إلغاء كتم الصوت" : "كتم الصوت"}
            >
              {muted || volume === 0 ? (
                <VolumeX className="size-4" />
              ) : (
                <Volume2 className="size-4" />
              )}
            </Button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={(e) => changeVolume(Number(e.target.value))}
              className="h-1 w-16 cursor-pointer accent-white"
              aria-label="مستوى الصوت"
            />
          </div>

          <span className="text-xs font-bold tabular-nums">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div className="ms-auto flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-full text-white hover:bg-white/15"
                  aria-label="سرعة التشغيل"
                >
                  <Settings className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel>سرعة التشغيل</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {SPEEDS.map((s) => (
                  <DropdownMenuItem
                    key={s}
                    className="cursor-pointer"
                    onClick={() => changeSpeed(s)}
                  >
                    {s}x
                    {speed === s && <Check className="ms-auto size-4 text-primary" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon-sm"
              className="hidden rounded-full text-white hover:bg-white/15 md:inline-flex"
              onClick={togglePip}
              aria-label="صورة داخل صورة"
            >
              <PictureInPicture2 className="size-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-full text-white hover:bg-white/15"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "إنهاء ملء الشاشة" : "ملء الشاشة"}
            >
              {isFullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Center play/pause overlay */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-20 flex items-center justify-center transition-opacity",
          controlsVisible && playing ? "opacity-0" : "opacity-100",
        )}
      >
        {playing && (
          <span className="flex size-16 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm">
            <Pause className="size-7" />
          </span>
        )}
      </div>
    </div>
  );
}
