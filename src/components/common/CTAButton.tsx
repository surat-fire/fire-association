// components/CTASection.js
import React from "react";
import Link from "next/link";
import { Button } from "../ui/Button";

interface IProps {
  label: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const CTASection = ({
  buttonText = "Contact Us",
  buttonLink = "/contact",
}: IProps) => {
  return (
    <>
      <Link className="block" href={buttonLink}>
        <Button>{buttonText}</Button>
      </Link>
    </>
  );
};

export default CTASection;
