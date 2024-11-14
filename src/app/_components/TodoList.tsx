import Image from "next/image";
import type { Prisma } from "@prisma/client";
type TodoWithUser = Prisma.TodoGetPayload<{
  include: {
    assignedUser: true;
  };
}>;
import { images } from "public/icons";
import Link from "next/link";
export default function TodoList({ todos }: { todos: TodoWithUser[] }) {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {todos.map((todo) => (
        <Link key={todo.id} href={`/todos/${todo.id}`}>
        <li  className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <Image
              alt={`${todo.stage} image`}
              width={48}
              height={48}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              src={images[todo.stage]}
              className="flex-none rounded-full bg-gray-50"
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">
                {todo.title}
              </p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">
                {todo.content}
              </p>
            </div>
          </div>
          <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm/6 text-gray-900">
              Estimated Completion Date: {todo.completionDate.toDateString()}
            </p>
            <p>
              Assigned to {todo.assignedUser?.firstName}{" "}
              {todo.assignedUser?.lastName}
            </p>
          </div>
        </li>
        </Link>
      ))}
    </ul>
  );
}
