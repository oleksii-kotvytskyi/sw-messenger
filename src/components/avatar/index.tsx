import { ReactNode } from "react";
import s from "./style.module.scss";

type AvatarProps = {
  name: string;
  avatar?: string;
};

const AvatarLayout = ({ children }: { children: ReactNode }) => {
  return <div className={s.avatar}>{children}</div>;
};

export const Avatar = ({ name, avatar }: AvatarProps) => {
  if (avatar)
    return (
      <AvatarLayout>
        <img src={avatar} alt={`Avatar ${avatar}`} />;
      </AvatarLayout>
    );

  return <AvatarLayout>{name?.slice(0, 2)}</AvatarLayout>;
};
