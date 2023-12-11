import { prisma } from '@/lib/prisma';
import Chart, { Pie } from '../components/chart';
import { formatPrice } from '@/lib/utils';
import ProductForm from '../components/ProductForm';

export default async function Dashboard() {
  // response comes as an array
  const data = await prisma.product.findMany({ orderBy: { sold: 'desc' }, take: 10 });

  const totalRevenue = data.reduce((previous, current) => {
    return previous + current.price * current.sold;
  }, 0);

  const totalItemsSold = data.reduce((previous, current) => {
    return previous + current.sold;
  }, 0);

  const pieChartData = data.map((p, id) => ({ value: p.price * p.sold, label: p.name, id }));

  return (
    <div className=''>
      <div className='flex flex-row justify-around shadow-lg bg-black p-2'>
        <h1>
          Total revenue: <span className='text-green-400'>{formatPrice(totalRevenue)}</span>
        </h1>
        <h1>
          <span className='text-green-400'>{totalItemsSold}</span> Items sold!
        </h1>
      </div>
      <Chart columns={data.map((p) => p.name)} values={data.map((p) => p.sold)} title='Sales' />

      {/* <Chart title='Revenue' columns={data.map((p) => p.name)} values={data.map((p) => p.price * p.sold)} /> */}
      <Pie data={pieChartData} title='Revenue' />
      <ProductForm />
    </div>
  );
}