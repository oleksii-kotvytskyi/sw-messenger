import { ReactNode } from "react";
import s from "./style.module.scss";
import cx from "classnames";
import { IUser } from "@/store/types";

type AvatarProps = {
  user: IUser | null;
  showOnline?: boolean;
};

const AvatarLayout = ({
  user,
  children,
  showOnline,
}: AvatarProps & {
  children: ReactNode;
}) => {
  return (
    <div className={s.avatarParent}>
      <div className={s.avatar}>{children}</div>
      {showOnline && (
        <div
          className={cx(s.online, user?.online ? s.onlineTrue : s.onlineFalse)}
        />
      )}
    </div>
  );
};

export const Avatar = ({ user, showOnline = true }: AvatarProps) => {
  const value =
    "http://res.cloudinary.com/dujqsp4s5/image/upload/v1705258350/jjl6c33xyb5qunr7px7r.png";
  if (user?.avatar || value)
    return (
      <AvatarLayout user={user} showOnline={showOnline}>
        <img
          src={user?.avatar || value}
          alt={`Avatar ${user?.name}`}
          style={{ width: "100%", height: "100%" }}
        />
      </AvatarLayout>
    );

  return <AvatarLayout user={user}>{user?.name?.slice(0, 2)}</AvatarLayout>;
};
