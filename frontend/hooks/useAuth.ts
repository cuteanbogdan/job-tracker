import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAppDispatch from "./useAppDispatch";
import { RootState } from "@/redux/store";
import { refreshToken } from "@/redux/slices/authSlice";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, accessToken, loading } = useSelector(
    (state: RootState) => state.auth
  );

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (!accessToken) {
        await dispatch(refreshToken()).unwrap();
      }
      setCheckingAuth(false);
    };

    verifyAuth();
  }, [dispatch, accessToken]);

  return { isAuthenticated, loading, checkingAuth };
};

export default useAuth;
