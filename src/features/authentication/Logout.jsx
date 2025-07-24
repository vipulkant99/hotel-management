import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useAuth";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { mutate: logout, isPending } = useLogout();

  return (
    <ButtonIcon disabled={isPending} onClick={logout}>
      {isPending ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;
