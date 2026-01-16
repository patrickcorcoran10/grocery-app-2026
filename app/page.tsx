import TodoList from '@/components/TodoList'
import TodosPage from '@/components/TodosPage'

export default function Home() {
  return (
    <div >
      <main className='flex flex-col items-center justify-center h-screen'>
        <h1 className="flex ">Groceries List</h1>
        <TodosPage/>
      </main>
    </div>
  );
}
