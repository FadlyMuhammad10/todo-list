import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toaster } from "@/components/ui/toaster";
import { Link, useLoaderData } from "react-router-dom";
import DialogAdd from "../project/dialogAdd";

export default function Home() {
  const projects = useLoaderData();
  return (
    <>
      <div className="h-60 bg-blue-600 text-center flex justify-center items-center">
        <h1 className="text-3xl text-white font-semibold">
          Project Management
        </h1>
      </div>
      <div className="container mx-auto mt-10 ">
        <div className=" flex justify-end">
          <DialogAdd />
        </div>
        <Table className="mt-10 border">
          <TableHeader>
            <TableRow>
              <TableHead>Name Project</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project, i) => (
              <TableRow key={i}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>
                  <Button variant="outline">
                    <Link to={`/project/${project.id}`}>Manage</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Toaster />
    </>
  );
}
