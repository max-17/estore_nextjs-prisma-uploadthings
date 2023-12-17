export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import Chart, { Pie } from '@/app/components/chart';
import { formatPrice } from '@/lib/utils';
import ProductForm from '@/app/components/ProductForm';

async function getData() {
  const data = await prisma.product.findMany({ orderBy: { sold: 'desc' }, take: 7 });
  const categories = await prisma.category.findMany();
  return {data, categories};
}
export default async function Dashboard() {
  // response comes as an array
  const res = await getData();
  const data = res.data;
  const categories = res.categories;


  if (!data.length)
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className=''>
          <h1 className='text-2xl'>No Data</h1>

          <ProductForm classes='relative btn btn-success rounded-full px-3 bottom-1/2' categories={categories} />

        </div>
      </div>
    );

  const totalRevenue = data.reduce((previous, current) => {
    return previous + current.price * current.sold;
  }, 0);

  const totalItemsSold = data.reduce((previous, current) => {
    return previous + current.sold;
  }, 0);
  const pieChartData = data.map((p, id) => ({ value: p.price * p.sold, label: p.name, id }));
  return (
    <div className='relative'>
      <div className='flex flex-row w-full justify-between - shadow-lg bg-black p-2 '>
        <h1>
          Total revenue: <span className='text-green-400'>{formatPrice(totalRevenue)}</span>
        </h1>
        <h1>
          <span className='text-green-400'>{totalItemsSold}</span> Items sold!
        </h1>
      </div>
      <div className='flex justify-center items-center'>
        <Chart columns={data.map((p) => p.name)} values={data.map((p) => p.sold)} title='Sales' />
      </div>
      <div className='flex justify-center items-center '>
        <Pie data={pieChartData} title='Revenue' />
      </div>
      <ProductForm classes='fixed btn btn-success rounded-full px-3 bottom-14 right-12' categories={categories}/>
    </div>
  );
}
