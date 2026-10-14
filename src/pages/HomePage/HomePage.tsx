import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/reduxHook";
import { loadingStories } from "../../redux/slices/storiesSlice";
import { Link } from "react-router-dom";

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadingStories());
  }, [dispatch]);
  return (
    <>
      <h1>HomePage</h1>
      <Link to={"/item/1"}>1</Link>
    </>
  );
};
