import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import apiInstance from "@/lib/axios";
import { Controller, useForm } from "react-hook-form";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

export default function TaskPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { id } = useParams();

  const navigate = useNavigate();

  const tasks = useLoaderData();

  const onSubmit = async (data) => {
    const res = await apiInstance.post(`/api/projects/${id}/tasks`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 201) {
      navigate(`/project/${id}`, { replace: true });
    }
  };

  const handleToDo = async (taskId) => {
    const res = await apiInstance.put(`/api/tasks/${taskId}`, {
      status: "To Do",
    });
    if (res.status === 200) {
      navigate(`/project/${id}`, { replace: true });
    }
  };
  const handleProgress = async (taskId) => {
    const res = await apiInstance.put(`/api/tasks/${taskId}`, {
      status: "In Progress",
    });
    if (res.status === 200) {
      navigate(`/project/${id}`, { replace: true });
    }
  };

  const handleComplete = async (taskId) => {
    const res = await apiInstance.put(`/api/tasks/${taskId}`, {
      status: "Completed",
    });
    if (res.status === 200) {
      navigate(`/project/${id}`, { replace: true });
    }
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full my-16">
          <CardHeader>
            <CardTitle className="flex justify-center">Add Task</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name Task</Label>
                <Input
                  id="name"
                  placeholder="Name of your project"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-sm text-red-600 ">{errors.name.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="status">Status</Label>
                <Controller
                  name="status"
                  control={control}
                  defaultValue="To Do"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="To Do">To Do</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Submit</Button>
          </CardFooter>
        </Card>
      </form>

      <Table className="mt-0 border">
        <TableHeader>
          <TableRow>
            <TableHead>Name Task</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task, i) => (
            <TableRow key={i}>
              <TableCell>{task.name}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>
                {task.status === "To Do" && (
                  <>
                    <Button
                      className="bg-blue-500"
                      onClick={() => handleProgress(task.id)}
                    >
                      Progress
                    </Button>
                    <Button
                      variant="outline"
                      className="ml-2 bg-green-500 text-white hover:text-black"
                      onClick={() => handleComplete(task.id)}
                    >
                      Done
                    </Button>
                  </>
                )}
                {task.status === "In Progress" && (
                  <>
                    <Button
                      variant="secondary"
                      className="bg-blue-500"
                      onClick={() => handleToDo(task.id)}
                    >
                      To Do
                    </Button>
                    <Button
                      variant="outline"
                      className="ml-2 bg-green-500 text-white hover:text-black"
                      onClick={() => handleComplete(task.id)}
                    >
                      Done
                    </Button>
                  </>
                )}
                {task.status === "Completed" && (
                  <Button
                    variant="outline"
                    className="ml-2 bg-green-500 text-white hover:text-black"
                    disabled
                  >
                    Done
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
