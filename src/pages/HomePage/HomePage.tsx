import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import {
  loadingStories,
  selectStatus,
  selectStories,
} from "../../redux/slices/storiesSlice";
import { StoryList } from "../../components/StoryList/StoryList";
import { ReloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./HomePage.css";
export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const stories = useAppSelector(selectStories);
  const status = useAppSelector(selectStatus);
  const refreshStories = () => {
    dispatch(loadingStories({ isRefresh: true }));
  };
  useEffect(() => {
    dispatch(loadingStories());
  }, [dispatch]);
  return (
    <>
      <div className="home-toolbar">
        <div className="home-toolbar-descr">
          <h1 className="home-toolbar-title">Свежие новости</h1>
          <p className="home-toolbar-subtitle">100 последних, новые сверху</p>
        </div>
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={refreshStories}
          loading={status === "refresh"}
        >
          Обновить
        </Button>
      </div>
      <StoryList stories={stories} />
    </>
  );
};
