import data from 'utils/data';

import Layout from 'components/layout';
import Products from 'components/products';

export default function Home() {
  return (
    <Layout>
      <section>
        <div className="container">
          <Products products={data.products} />
        </div>
      </section>
    </Layout>
  )
}
