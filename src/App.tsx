import { useUserData } from "@hooks/internal";

import AppMainPanel from "./AppMainPanel";
import AppLoginPanel from "./AppLoginPanel";

type Props = {};

export default function App({}: Props) {
  const user = useUserData();

  if (!user.isLoggedIn()) {
    return <AppLoginPanel />;
  }

  return <AppMainPanel />;
}
