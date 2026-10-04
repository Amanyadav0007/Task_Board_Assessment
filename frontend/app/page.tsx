"use client";

import { useEffect, useState } from "react";

type TaskStatus = "todo" | "in-progress" | "done";

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

const API_URL = "http://localhost:5000/api/tasks";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [loading, setLoading] = useState(true);

  // Fetch tasks
  useEffect(() => {
    fetch(API_URL)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API error ${res.status}: ${text}`);
        }

        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setTasks(data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch tasks:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Add new task
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          status,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error ${res.status}: ${text}`);
      }

      const data = await res.json();

      if (data.task) {
        setTasks((prev) => [data.task, ...prev]);
        setTitle("");
        setStatus("todo");
      }
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  // Update task status
  const handleUpdateStatus = async (
    id: number,
    newStatus: TaskStatus
  ) => {
    // Optimistically update UI
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: newStatus }
          : task
      )
    );

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error ${res.status}: ${text}`);
      }
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  // Delete task
  const handleDeleteTask = async (id: number) => {
    // Optimistically remove from UI
    setTasks((prev) => prev.filter((task) => task.id !== id));

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error ${res.status}: ${text}`);
      }
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="border-b border-neutral-200 pb-4 mb-6">
          <h1 className="text-2xl font-bold tracking-tight">
            Mini Task Board
          </h1>

          <p className="text-sm text-neutral-500 mt-1">
            Full Stack Developer Intern Task
          </p>
        </div>

        {/* Add Task Form */}
        <form
          onSubmit={handleAddTask}
          className="flex flex-col sm:flex-row gap-2 mb-8"
        >
          <input
            type="text"
            placeholder="New task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-3 py-2 border border-neutral-300 rounded-md text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as TaskStatus)
            }
            className="px-3 py-2 border border-neutral-300 rounded-md text-sm outline-none focus:border-black bg-white transition cursor-pointer"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <button
            type="submit"
            disabled={!title.trim()}
            className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-neutral-800 disabled:opacity-40 transition cursor-pointer"
          >
            Add Task
          </button>
        </form>

        {/* Task List */}
        <div className="space-y-2">
          {loading ? (
            <p className="text-sm text-neutral-500 text-center py-8">
              Loading tasks...
            </p>
          ) : tasks.length === 0 ? (
            <p className="text-sm text-neutral-500 text-center py-8">
              No tasks yet.
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3.5 border border-neutral-200 rounded-md bg-white hover:border-neutral-300 transition"
              >
                <span
                  className={`text-sm font-medium ${
                    task.status === "done"
                      ? "line-through text-neutral-400"
                      : "text-black"
                  }`}
                >
                  {task.title}
                </span>

                <div className="flex items-center gap-3">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleUpdateStatus(
                        task.id,
                        e.target.value as TaskStatus
                      )
                    }
                    className="text-xs px-2.5 py-1 border border-neutral-300 rounded-md bg-neutral-50 text-neutral-800 outline-none focus:border-black transition cursor-pointer"
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">
                      In Progress
                    </option>
                    <option value="done">Done</option>
                  </select>

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-xs text-neutral-400 hover:text-black transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}