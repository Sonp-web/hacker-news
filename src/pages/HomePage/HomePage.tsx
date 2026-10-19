import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import {
  loadingStories,
  selectStatus,
  selectStories,
} from "../../redux/slices/storiesSlice";
import { StoryList } from "../../components/StoryList/StoryList";
import { ReloadOutlined } from "@ant-design/icons";
import { App, Button } from "antd";
import "./HomePage.css";
import { LoadingError } from "../../components/LoadingError/LoadingError";
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
  const tempFunc = () => dispatch(loadingStories());
  return (
    <>
      <LoadingError
        status={status}
        loading={tempFunc}
        stories={stories}
        component={
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
        }
      />
    </>
  );
};
