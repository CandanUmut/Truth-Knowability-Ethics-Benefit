import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

export interface TetradPoint {
  axis: 'truth' | 'ethics' | 'benefit' | 'intention';
  value: number; // 0..1
}

interface Props {
  data: TetradPoint[];
  filtered?: boolean;
}

export function TetradRadar({ data, filtered }: Props) {
  const { t } = useTranslation('deliberate');
  const chartData = data.map((d) => ({
    subject: t(`output.tetrad.${d.axis}`),
    value: Math.max(0, Math.min(1, d.value)),
    full: 1,
  }));

  return (
    <div className={'h-56 w-full ' + (filtered ? 'opacity-50' : '')}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
          />
          <PolarRadiusAxis domain={[0, 1]} tick={false} axisLine={false} />
          <Radar
            name="value"
            dataKey="value"
            stroke="hsl(var(--accent))"
            fill="hsl(var(--accent))"
            fillOpacity={0.18}
            strokeWidth={1.5}
            isAnimationActive={false}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
