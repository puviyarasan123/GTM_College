import { createFileRoute, useParams } from "@tanstack/react-router";
import { DynamicSectionPage } from "@/components/site/DynamicSectionPage";

export const Route = createFileRoute("/nirf/$tabId")({
  component: NirfPage,
});

function NirfPage() {
  const { tabId } = useParams({ from: "/nirf/$tabId" });
  return <DynamicSectionPage group="nirf" slug={tabId} eyebrow="National Institutional Ranking Framework" />;
}
