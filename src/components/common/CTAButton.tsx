// components/CTASection.tsx
import React from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import SectionTitle from "./SectionTitle";

interface IProps {
  label: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const CTASection = ({
  label,
  title,
  description,
  buttonText = "Contact Us",
  buttonLink = "/contact",
}: IProps) => {
  return (
    <section className="w-full relative sm:pt-14 pt-10">
      <div className="ct-container text-center">
        <SectionTitle
          subtitle={label}
          title={title}
          align="center"
          tagline={description}
          taglineClass="mt-4"
        />
        <Link href={buttonLink} className="inline-block mt-6">
          <Button>{buttonText}</Button>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
