


import CreateQuote from './Component/CreateQuote';
import DuplicateProfile from './Component/DuplicateProfile';
import Home from './Component/Home';
import Login from './Component/Login';
import NotFound from './Component/NotFound';

import Profile from './Component/Profile';
import SignUp from './Component/SignUp';
export const routes=[

{path: "/",
element: <Home/>,},
{path: "/profile",
element: <Profile/>,},
{path: "/signup",
element: <SignUp/>,},

{path: "/login",
element: <Login/>,},
{path: "/create",
element: <CreateQuote/>,},

{path: "/profile/:user_id",
element: <DuplicateProfile/>,},
{path: "*",
element: <NotFound/>,}



]