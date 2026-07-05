import type { Metadata } from "next";
import ProjectsContent from "../components/sections/ProjectsContent";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore full-stack projects by Muhammad Hammad — e-commerce platforms, SaaS dashboards, CRM systems, AI applications, and more.",
};

export default function Projects() {
  return <ProjectsContent />;
}
