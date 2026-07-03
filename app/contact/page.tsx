import type { Metadata } from "next";
import ContactContent from "../components/sections/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Hammad Zahid — Full Stack Developer available for freelance projects, contracts, and full-time roles.",
};

export default function Contact() {
  return <ContactContent />;
}
