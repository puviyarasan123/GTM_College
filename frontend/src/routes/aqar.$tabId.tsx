import { createFileRoute, useParams } from "@tanstack/react-router";
import { DynamicSectionPage } from "@/components/site/DynamicSectionPage";

export const Route = createFileRoute("/aqar/$tabId")({
  component: AqarPage,
});

function AqarPage() {
  const { tabId } = useParams({ from: "/aqar/$tabId" });
  return <DynamicSectionPage group="aqar" slug={tabId} eyebrow="Annual Quality Assurance Report" />;
}
