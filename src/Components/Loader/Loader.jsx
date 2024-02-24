import { Triangle, Rings, Puff, Oval } from "react-loader-spinner";

export function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-30 bg-gray-200">
      <Oval color="black" />
    </div>
  );
}
