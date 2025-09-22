import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import Main from "../components/Main.jsx";
import FestivalList from "../components/festivals/FestivalList.jsx";
import FestivalShow from "../components/festivals/FestivalShow.jsx";
import StayList from "../components/stay/StayList.jsx";
import Menu from "../components/Menu.jsx";
import StayShow from "../components/stay/StayShow.jsx";


const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: 'menu',
        element: <Menu />
      },
      {
        path: '/',
        element: <Main />
      },
      {
        path: 'festivals',
        element: <FestivalList />
      },
      {
        path: '/festivals/:id',
        element: <FestivalShow />
      },
      {
        path: 'stay',
        element: <StayList />
      },
      {
        path: '/stay/:id',
        element: <StayShow />
      },
    ]
  }
]);

function Router() {
  return <RouterProvider router={router}/>
}

export default Router;