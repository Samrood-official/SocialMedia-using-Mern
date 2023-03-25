import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        Children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    }
])

export default appRouter;