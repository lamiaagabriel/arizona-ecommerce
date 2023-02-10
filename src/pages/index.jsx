import axios from 'axios';

import Layout from 'components/layout';
import Products from 'components/products';
export default function Home({ docs }) {
  return (
    <Layout>
      <section>
        <div className="container">
          <Products products={docs} />
        </div>
      </section>
    </Layout>
  )
}

export async function getServerSideProps() {
  const { data: { docs } } = await axios.get('http://localhost:3000/api/products');
  return {
    props: { docs }
  }
}