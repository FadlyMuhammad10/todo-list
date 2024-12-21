import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import apiInstance from "@/lib/axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function DialogAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { toast } = useToast();

  const onSubmit = async (data) => {
    const res = await apiInstance.post("/api/projects", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 201) {
      toast({
        title: "Success",
        description: "Project created successfully",
        variant: "default",
      });
      navigate("/");
    }
    if (res.status > 400) {
      toast({
        title: "Error",
        description: "Error creating project",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-600">New Project</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                className="col-span-3"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-sm text-red-600 ">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                className="col-span-3"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-sm text-red-600 ">
                  {errors.description.message}
                </p>
              )}
            </div>

            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
