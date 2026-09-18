import { RouterProvider } from "react-router";
import router from "../routes/app.route";
import { AuthProvider } from "../modules/auth/context/useAuthContext";

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-black text-white p-5">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
};

export default App;
