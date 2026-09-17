import { RouterProvider } from "react-router";
import router from "../routes/app.route";
import UserProvider from "../context/UserProvider";

const App = () => {
  return (
    <UserProvider>
      <div className="min-h-screen bg-black text-white p-5">
        <RouterProvider router={router} />
      </div>
    </UserProvider>
  );
};

export default App;
