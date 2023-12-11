'use client';

import { prisma } from '@/lib/prisma';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BarChart, PieChart, ResponsiveChartContainer } from '@mui/x-charts';
// import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';

export default function Chart({
  columns,
  values,
  title,
}: {
  columns: number[] | string[];
  values: number[];
  title: string;
}) {
  const newTheme = createTheme({ palette: { mode: 'dark' } });
  return (
    <ThemeProvider theme={newTheme}>
      <div>
        <br />

        <h1 className='text-center text-xl'> {title} </h1>
        <p className='text-center -m-4 p-0'>{'_'.repeat(title.length * 2)}</p>

        <BarChart
          xAxis={[
            {
              id: 'barCategories',
              data: columns,
              scaleType: 'band',
            },
          ]}
          series={[
            {
              type: 'bar',
              data: values,
            },
          ]}
          width={500}
          height={300}
        />

        <br />
      </div>
    </ThemeProvider>
  );
}

export function Pie({ data, title }: { data: { id: number; value: number; label: string }[]; title: string }) {
  const newTheme = createTheme({ palette: { mode: 'dark' } });
  return (
    <ThemeProvider theme={newTheme}>
      <div>
        <br />
        <h1 className='text-center text-xl'> {title} </h1>
        <p className='text-center -m-4 p-0'>{'_'.repeat(title.length * 2)}</p>

        <PieChart
          series={[
            {
              type: 'pie',
              data,
              innerRadius: 70,
              outerRadius: 150,
              paddingAngle: 1,
              cornerRadius: 3,
              startAngle: 60,
              endAngle: 9999,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              highlighted: { innerRadius: 0 },
              arcLabel: (params) => params.formattedValue ?? '',
            },
          ]}
          width={500}
          height={500}
        />

        <br />
      </div>
    </ThemeProvider>
  );
}
