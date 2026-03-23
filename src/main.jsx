import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './home'
import Contact from './contact'
import { ClerkProvider } from '@clerk/clerk-react'
import Profile from './profile'
import AddListing from './add-listing'
import { Toaster } from './components/ui/sonner'
import SearchByCategory from './search/[category]'
import SearchByOptions from './search'
import ListingDetail from './listing-details/[id]'
import AllBrands from './brands'
import SingleBrand from './brands/[brand]'
import Preowned from './preowned'
import AboutPage from './about'
import CareerPage from './careers'
import HistoryPage from './history'
import ServicePage from './service'
import ProjectPage from './projects'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },  
  {
    path: '/contact',
    element: <Contact/>
  },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: '/add-listing',
    element: <AddListing/>
  },
  {
    path: '/search/:category',
    element: <SearchByCategory/>
  },
  {
    path: '/search/',
    element: <SearchByOptions/>
  },
  {
    path: '/listing-details/:id',
    element: <ListingDetail/>
  },
    {
    path: '/brands',
    element: <AllBrands/>
  },
   {
    path: '/brands/:id',
    element: <SingleBrand/>
  },
   {
    path: '/preowned',
    element: <Preowned/>
  },
   {
    path: '/about',
    element: <AboutPage/>
  },
   {
    path: '/careers',
    element: <CareerPage/>
  },
   {
    path: '/history',
    element: <HistoryPage/>
  },
   {
    path: '/service',
    element: <ServicePage/>
  },
   {
    path: '/projects',
    element: <ProjectPage/>
  }
]);

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
      <Toaster />
    </ClerkProvider>
  </StrictMode>,
)
