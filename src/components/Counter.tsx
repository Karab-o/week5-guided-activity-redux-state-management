import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);

  return (
    <div>
      <h2>Counter: {count}</h2>
    </div>
  );
};

export default Counter;
