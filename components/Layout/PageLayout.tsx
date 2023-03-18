import React from "react";
import Container from "../Atoms/Container/Container";
import SectionBackground from "../Atoms/Container/SectionBackground";
import Footer from "../Atoms/Footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <Container>
      <SectionBackground>{children}</SectionBackground>
      <Footer />
    </Container>
  );
};

export default PageLayout;
