"use client";

//import useMutation for doing things like creating or deleting. This useMutaion is use for
//modifying things in convex
//useQuery is used for fetching
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";

const Page = () => {
  const projects = useQuery(api.projects.get);

  const createProject = useMutation(api.projects.create);
  const deleteProject = useMutation(api.projects.deleteTask);
  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={() =>
          createProject({
            name: "New Project",
          })
        }
      >
        Add new
      </Button>
      {projects?.map((project) => (
        <div className="border rounded p-2 flex flex-col" key={project._id}>
          <p>{project.name}</p>
          <p>Owner Id:{`${project.ownerId}`}</p>
          <Button
            onClick={() => {
              deleteProject({
                id: project._id,
                ownerId: project.ownerId,
              });
            }}
          >
            Delete Project
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Page;
