import { useMediaQuery } from "react-responsive";

export const useView = () => {
  const isMobile = useMediaQuery({
    query: `(max-width: 600px)`,
  });

  return { isMobile };
};
