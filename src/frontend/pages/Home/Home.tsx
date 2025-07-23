import { useAuth } from "@/frontend/auth/useAuth";
import Logged from "./Logged";

const Home = () => {
  const { isAuth, user } = useAuth();
  return isAuth && user ? <Logged user={user} /> : <div>Home</div>;
};

export default Home;
