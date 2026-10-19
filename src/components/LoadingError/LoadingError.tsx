import type { ReactElement } from "react";
import { Spin, Alert, Button } from "antd";
import type { Story } from "../../types";
import "./LoadingError.css";

type LoadingErrorProps = {
  status: "loading" | "error" | "fulfilled" | "refresh" | null;
  isActual?: boolean | null;
  stories?: Story[] | undefined;
  loading: () => void;
  component: ReactElement | null;
};
export const LoadingError: React.FC<LoadingErrorProps> = ({
  status,
  loading,
  component,
  stories,
  isActual,
}) => {
  return (
    <>
      {(isActual === undefined || (status !== "error" && isActual === null)) &&
      (stories === undefined || status === null || status === "loading") ? (
        <Spin description="Loading" size="small" className="spinner" />
      ) : status === "error" && (stories?.length == 0 || !stories) ? (
        <Alert
          className="loading-error-alert"
          title="Не удалось загрузить новости"
          showIcon
          description="Проверьте подключение и попробуйте ещё раз."
          type="error"
          action={<Button onClick={loading}>Повторить</Button>}
        ></Alert>
      ) : (
        component
      )}
    </>
  );
};
