import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import {
  loadingStories,
  selectStatus,
  selectStories,
} from "../../redux/slices/storiesSlice";
import { StoryList } from "../../components/StoryList/StoryList";
import { ReloadOutlined } from "@ant-design/icons";
import { Alert, App, Button, Spin } from "antd";
import "./HomePage.css";
export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const stories = useAppSelector(selectStories);
  const status = useAppSelector(selectStatus);
  const message = App.useApp();
  const refreshStories = async () => {
    try {
      await dispatch(loadingStories({ isRefresh: true })).unwrap();
    } catch {
      message.message.error("Не удалось обновить");
    }
  };
  useEffect(() => {
    dispatch(loadingStories());
  }, [dispatch]);
  return (
    <>
      {status === null || status === "loading" ? (
        <Spin description="Loading" size="small" className="spinner" />
      ) : status === "error" && stories.length === 0 ? (
        <Alert
          title="Не удалось загрузить новости"
          showIcon
          description="Проверьте подключение и попробуйте ещё раз."
          type="error"
          action={
            <Button onClick={() => dispatch(loadingStories())}>
              Повторить
            </Button>
          }
        ></Alert>
      ) : (
        <>
          <div className="home-toolbar">
            <div className="home-toolbar-descr">
              <h1 className="home-toolbar-title">Свежие новости</h1>
              <p className="home-toolbar-subtitle">
                100 последних, новые сверху
              </p>
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
      )}
    </>
  );
};
