import type { Metadata } from "next";
import AboutContent from "../components/sections/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Hammad Zahid — a Full Stack Developer with 2+ years of experience building scalable web applications with React, Next.js, and Node.js.",
};

export default function About() {
  return <AboutContent />;
}
