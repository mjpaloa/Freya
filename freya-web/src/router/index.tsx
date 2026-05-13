import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/Home/HomePage';
import ProductsPage from '../pages/Products/ProductsPage';
import ProductDetailPage from '../pages/Products/ProductDetailPage';
import ServicesPage from '../pages/Services/ServicesPage';
import NewsPage from '../pages/News/NewsPage';
import NewsDetailPage from '../pages/News/NewsDetailPage';
import AboutPage from '../pages/About/AboutPage';
import ContactPage from '../pages/Contact/ContactPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'products',
        children: [
          {
            index: true,
            element: <ProductsPage />,
          },
          {
            path: ':id',
            element: <ProductDetailPage />,
          },
        ],
      },
      {
        path: 'services',
        element: <ServicesPage />,
      },
      {
        path: 'news',
        children: [
          {
            index: true,
            element: <NewsPage />,
          },
          {
            path: ':id',
            element: <NewsDetailPage />,
          },
        ],
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
    ],
  },
]);


export default router;
