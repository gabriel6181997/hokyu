import { Layout } from "src/components/separate/Layout";
import Typography from '@material-ui/core/Typography';
import TodoForm from 'src/components/test/TodoForm';
import TodoList from "src/components/test/TodoList";
import useTodoState from 'src/components/test/useTodoState';


const Add3 = () => {
  const { todos, addTodo, deleteTodo } = useTodoState([]);

  return (
    <Layout sideMenu buttonNavigation title="add3">
      <div className="text-center">
        <Typography component="h1" variant="h2">
          Todos
        </Typography>

        <TodoForm
          saveTodo={(todoText) => {
            const trimmedText = todoText.trim();

            if (trimmedText.length > 0) {
              addTodo(trimmedText);
            }
          }}
        />

        <TodoList todos={todos} deleteTodo={deleteTodo} />
      </div>
    </Layout>
  );
};

export default Add3;
