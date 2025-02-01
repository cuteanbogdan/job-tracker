import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";

// Export a typed version of useDispatch for async thunks
const useAppDispatch = () => useDispatch<AppDispatch>();
export default useAppDispatch;
