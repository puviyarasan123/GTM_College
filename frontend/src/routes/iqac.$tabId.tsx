import { createFileRoute, useParams } from "@tanstack/react-router";
import { DynamicSectionPage } from "@/components/site/DynamicSectionPage";

export const Route = createFileRoute("/iqac/$tabId")({
  component: IqacPage,
});

function IqacPage() {
  const { tabId } = useParams({ from: "/iqac/$tabId" });
  return <DynamicSectionPage group="iqac" slug={tabId} eyebrow="Internal Quality Assurance Cell" />;
}
