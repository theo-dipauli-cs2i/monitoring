import { createContext } from 'preact';
import { useState, useEffect } from 'preact/hooks';

export interface ChartVisibilityContextType {
  chartVisibility: Record<string, boolean>;
  setChartVisibility: (key: string, value: boolean) => void;
}

export const ChartVisibilityContext = createContext<
  ChartVisibilityContextType | undefined
>(undefined);

export function ChartVisibilityProvider({ children }: { children: any }) {
  const [chartVisibility, setChartVisibilityState] = useState<
    Record<string, boolean>
  >({
    clientChart: true,
    commandeChart: true,
    chiffreAffaireChart: true,
    httpStatusChart: true,
    logsList: true,
    cpuChart: true,
    memoryChart: true,
    diskChart: true,
  });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('chartVisibility');
    if (stored) {
      try {
        setChartVisibilityState(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse chartVisibility from localStorage', e);
      }
    }
  }, []);

  const setChartVisibility = (key: string, value: boolean) => {
    setChartVisibilityState((prev) => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem('chartVisibility', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <ChartVisibilityContext.Provider
      value={{ chartVisibility, setChartVisibility }}
    >
      {children}
    </ChartVisibilityContext.Provider>
  );
}
