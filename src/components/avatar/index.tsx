import { ReactNode } from "react";
import s from "./style.module.scss";

type AvatarProps = {
  firstName: string;
  lastName: string;
  avatar?: string;
};

const AvatarLayout = ({ children }: { children: ReactNode }) => {
  return <div className={s.avatar}>{children}</div>;
};

export const Avatar = ({ firstName, lastName, avatar }: AvatarProps) => {
  if (avatar)
    return (
      <AvatarLayout>
        <img src={avatar} alt={`Avatar ${avatar}`} />;
      </AvatarLayout>
    );

  const shortName = `${firstName.slice(0, 1)} ${lastName.slice(0, 1)}`;

  return <AvatarLayout>{shortName}</AvatarLayout>;
};
