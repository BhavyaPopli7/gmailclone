import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Inbox from './components/Inbox'
import Navbar from './components/Navbar'
import Mail from './components/Mail'
import Body from './components/Body'
import SendEmail from './components/SendEmail'
import Login from './components/Login'
import Signup from './components/Signup'


const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Body></Body>,
    children:[
      {
        path:"/",
        element:<Inbox></Inbox>
      },
      {
        path:"/mail/:id",
        element:<Mail></Mail>
      },
    ]
  },
  {
    path:"/login",
    element:<Login></Login>,
  },
  {
    path:"/signup",
    element:<Signup></Signup>,
  },

])

function App() {
  return (
  <div className='bg-[#F6F8FC] h-screen overflow-y-hidden'>
      <RouterProvider router={appRouter}></RouterProvider>
      <div className='absolute w-[30%] bottom-0 right-20 z-10'>
        <SendEmail></SendEmail>
      </div>
  </div>
  )
}

export default App
