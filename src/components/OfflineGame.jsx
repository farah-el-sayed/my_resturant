import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const SIZE = 16;
const CELL = 20;

export default function OfflineGame() {
  const { t } = useTranslation();
  const canvasRef = useRef(null);
  const dirRef = useRef({ x: 1, y: 0 });
  const [score, setScore] = useState(0);
  const [over, setOver] = useState(false);
  const [round, setRound] = useState(0);
  const [best, setBest] = useState(() => {
    try { return Number(localStorage.getItem('snake-best')) || 0; } catch { return 0; }
  });

  const turn = (x, y) => {
    const d = dirRef.current;
    if (x === -d.x && y === -d.y) return; // منع الرجوع للخلف
    dirRef.current = { x, y };
  };

  useEffect(() => {
    const keys = {
      ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0],
    };
    const onKey = (e) => {
      if (keys[e.key]) {
        e.preventDefault();
        turn(...keys[e.key]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    let snake = [{ x: 8, y: 8 }];
    let food = { x: 4, y: 4 };
    let pts = 0;
    dirRef.current = { x: 1, y: 0 };
    setScore(0);
    setOver(false);

    const draw = () => {
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, SIZE * CELL, SIZE * CELL);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(food.x * CELL, food.y * CELL, CELL - 2, CELL - 2);
      ctx.fillStyle = '#22c55e';
      snake.forEach((p) => ctx.fillRect(p.x * CELL, p.y * CELL, CELL - 2, CELL - 2));
    };

    const id = setInterval(() => {
      const d = dirRef.current;
      const head = { x: snake[0].x + d.x, y: snake[0].y + d.y };
      const hit =
        head.x < 0 || head.y < 0 || head.x >= SIZE || head.y >= SIZE ||
        snake.some((p) => p.x === head.x && p.y === head.y);

      if (hit) {
        clearInterval(id);
        setOver(true);
        setBest((b) => {
          const nb = Math.max(b, pts);
          try { localStorage.setItem('snake-best', nb); } catch {}
          return nb;
        });
        return;
      }

      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        pts += 1;
        setScore(pts);
        food = { x: Math.floor(Math.random() * SIZE), y: Math.floor(Math.random() * SIZE) };
      } else {
        snake.pop();
      }
      draw();
    }, 130);

    draw();
    return () => clearInterval(id);
  }, [round]);

  const btn = 'h-12 w-12 rounded-lg bg-white/15 text-xl active:bg-white/30';

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-white/80">{t("score")}: {score} · {t("best")}: {best}</p>

      <canvas
        ref={canvasRef}
        width={SIZE * CELL}
        height={SIZE * CELL}
        className="rounded-lg border border-white/20"
      />

      {over && (
        <button onClick={() => setRound((r) => r + 1)} className="rounded-lg bg-green-500 px-4 py-2 font-medium">
          {t("playAgain")}
        </button>
      )}

      {/* أزرار اللمس للموبايل */}
      <div className="grid grid-cols-3 gap-1">
        <span />
        <button className={btn} onClick={() => turn(0, -1)}>↑</button>
        <span />
        <button className={btn} onClick={() => turn(-1, 0)}>←</button>
        <button className={btn} onClick={() => turn(0, 1)}>↓</button>
        <button className={btn} onClick={() => turn(1, 0)}>→</button>
      </div>
    </div>
  );
}