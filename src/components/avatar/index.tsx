import { ReactNode } from "react";
import s from "./style.module.scss";
import cx from "classnames";
import { IUser } from "@/store/types";

type AvatarProps = {
  user: IUser | null;
  showOnline?: boolean;
  wrapperClassName?: string;
};

const AvatarLayout = ({
  user,
  children,
  showOnline,
  className,
}: AvatarProps & {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cx(s.avatarParent, className)}>
      <div className={s.avatar}>{children}</div>
      {showOnline && (
        <div
          className={cx(s.online, user?.online ? s.onlineTrue : s.onlineFalse)}
        />
      )}
    </div>
  );
};

export const Avatar = ({
  user,
  showOnline = true,
  wrapperClassName,
}: AvatarProps) => {
  if (user?.avatar)
    return (
      <AvatarLayout
        user={user}
        showOnline={showOnline}
        className={wrapperClassName}
      >
        <img
          src={user?.avatar}
          alt={`Avatar ${user?.name}`}
          style={{ width: "100%", height: "100%" }}
        />
      </AvatarLayout>
    );

  return (
    <AvatarLayout
      user={user}
      showOnline={showOnline}
      className={wrapperClassName}
    >
      {user?.name?.slice(0, 2)}
    </AvatarLayout>
  );
};
