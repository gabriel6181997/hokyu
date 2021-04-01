import { useForm } from "react-hook-form";
import { Input } from "../shared/Input";
import { PrimaryButton } from "../shared/PrimaryButton";

export const UserInfo = ({preloadedValues}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: preloadedValues
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <>
      <form className="text-center mx-auto pt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="py-6">
          <div className="w-72 mx-auto">
            <input
              ref={register}
              type="text"
              id="name"
              name="name"
              placeholder="名前"
              // variant="underlined"
            />
          </div>
        </div>
        <div className="mt-2">
          <div className="w-72 mx-auto">
            <input
              ref={register}
              type="text"
              id="username"
              name="username"
              placeholder="ユーザーネーム"
              // variant="underlined"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mt-6">
            <PrimaryButton
              button
              className="px-20 py-2 my-1 text-xl"
              variant="solid"
              // onClick={updateInfo}
            >
              更新
            </PrimaryButton>
          </div>
        </div>
      </form>
    </>
  );
};
