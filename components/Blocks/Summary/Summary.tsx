import React from "react";
import SummaryHeader from "../../Atoms/Summary/SummaryHeader";
import SummaryRow from "../../Atoms/Summary/SummaryRow";
import SummaryButton from "../../Atoms/Summary/SummaryButton";

type CompoundComposition = {
  Row: React.FC<{ title: string; value: string }>;
};

const Summary: React.FC<{
  children: React.ReactNode;
  label: string;
  header: string;
  disabled?: boolean;
  onClick: () => void;
}> &
  CompoundComposition = (props) => {
  return (
    <section className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
      <SummaryHeader header={props.header} />
      <dl className="mt-6 space-y-4">{props.children}</dl>
      <div className="mt-8">
        <SummaryButton
          label={props.label}
          disabled={props.disabled}
          onClick={props.onClick}
        />
      </div>
    </section>
  );
};

export default Summary;

Summary.Row = SummaryRow;
