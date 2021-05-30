import { Layout } from "src/components/separate/Layout";
import Typography from "@material-ui/core/Typography";
import TodoForm from "src/components/test/TodoForm";
import TodoList from "src/components/test/TodoList";
import useTodoState from "src/components/test/useTodoState";
import {  BiPlusCircle } from "react-icons/bi";
import { useRecoilState } from "recoil";
import { inputListState } from "src/store/inputListState";
import { useForm } from "react-hook-form";

const Add3 = () => {
  const {
   handleSubmit,
   register
  } = useForm();

  const [inputList, setInputList] = useRecoilState(inputListState);

  // const handleOnClickAdd = () => {
    // setInputList((prevInputList )=> [
      // const newInputList = [...prevInputList, ]
      // return newInputList;
  //   ])
  // }

  const onSubmit = (data) => console.log(data);


  return (
    <Layout sideMenu buttonNavigation title="add3">

      <form className="text-center"
      onSubmit={handleSubmit(onSubmit)}>

        <div className="flex justify-between ">
          <p className="text-sm text-gray-700 font-medium dark:text-white">
            体温
          </p>
          <button
            className="text-gray-600 dark:text-white"
            // onClick={handleOnClickAdd}
          >
            <BiPlusCircle />
          </button>
        </div>

        {/* <TodoList todos={todos} deleteTodo={deleteTodo} /> */}

        <input className="block w-full pl-2 bg-transparent dark:bg-gray-900 focus:outline-none border-b-2 focus:border-blue-400 mt-4"
        {...register("temperature")}
        />

        <button className="py-2  px-2 my-4 text-white rounded-3x1 shadow-md bg-blue-400 font-bold hover:bg-blue-300 duration-300 inline-flex items-center justify-center rounded-full" type="submit">体温を追加</button>


      </form>
    </Layout>
  );
};

export default Add3;
