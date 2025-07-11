import Image from "next/image";
import type { Prisma } from "@prisma/client";
import Link from "next/link";
import { images } from "public/icons";
type ImageKeys = keyof typeof images;


type TodoWithUser = Prisma.TodoGetPayload<{
  include: {
    assignedUser: true;
  };
}>;

export default function TodoList({ todos }: { todos: TodoWithUser[] }) {
  if (todos.length === 0) {
    return (
      <div className="my-8 text-textBrand text-sm">
        No todos found 🙁
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {todos.map((todo) => (
        <Link key={todo.id} href={`/todos/${todo.id}`}>
          <div className="flex flex-col justify-between rounded-2xl border border-borderBrand bg-white p-6 shadow-sm hover:shadow-md transition h-full">
            <div className="flex items-center gap-4">
              <Image
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                src={images[todo.stage as ImageKeys]}
                alt={`${todo.stage} image`}
                width={48}
                height={48}
                className="rounded-full bg-gray-100"
              />
              <div className="flex flex-col">
                <h3 className="text-md font-semibold text-textBrand line-clamp-1">
                  {todo.title}
                </h3>
                <p className="text-sm text-accentBrand line-clamp-2">
                  {todo.content}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <p className="text-xs text-accentBrand">
                Completion Date:{" "}
                <span className="text-textBrand">
                  {todo.completionDate.toDateString()}
                </span>
              </p>
              {todo.assignedUser && (
                <p className="text-xs text-accentBrand">
                  Assigned to:{" "}
                  <span className="text-textBrand">
                    {todo.assignedUser.firstName} {todo.assignedUser.lastName}
                  </span>
                </p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
