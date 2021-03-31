import { useForm, FormProvider, useFormContext } from "react-hook-form";


type Inputs = {
  name: string;
  username: string;
}

const { register } = useForm<Inputs>({
  defaultValues: {
    name: userInfo?.name,
    username: userInfo?.username
  }
})
