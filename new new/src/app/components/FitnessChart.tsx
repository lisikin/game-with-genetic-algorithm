import { useEffect, useRef } from 'react';
import { GAGenerationLog } from '../utils/geneticAlgorithm';

interface FitnessChartProps {
  logs: GAGenerationLog[];
}

export function FitnessChart({ logs }: FitnessChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || logs.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Find max values
    const maxGen = logs[logs.length - 1].generation;
    const maxFitness = Math.max(...logs.map(l => l.bestFitness));

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (height - 2 * padding) * (i / 5);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw best fitness line
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    logs.forEach((log, idx) => {
      const x = padding + ((width - 2 * padding) * log.generation) / maxGen;
      const y = height - padding - ((height - 2 * padding) * log.bestFitness) / (maxFitness || 1);
      
      if (idx === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw average fitness line
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    logs.forEach((log, idx) => {
      const x = padding + ((width - 2 * padding) * log.generation) / maxGen;
      const y = height - padding - ((height - 2 * padding) * log.avgFitness) / (maxFitness || 1);
      
      if (idx === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw labels
    ctx.fillStyle = '#374151';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Поколение', width / 2, height - 5);
    
    ctx.save();
    ctx.translate(10, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Приспособленность', 0, 0);
    ctx.restore();

    // Draw legend
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#10b981';
    ctx.fillRect(width - 140, 15, 15, 3);
    ctx.fillStyle = '#374151';
    ctx.textAlign = 'left';
    ctx.fillText('Лучшая', width - 120, 20);
    
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(width - 140, 30, 15, 3);
    ctx.fillStyle = '#374151';
    ctx.fillText('Средняя', width - 120, 35);

  }, [logs]);

  if (logs.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-3 rounded-lg shadow">
      <h3 className="font-semibold text-sm mb-2 text-gray-700">Сходимость приспособленности:</h3>
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        className="w-full"
      />
    </div>
  );
}