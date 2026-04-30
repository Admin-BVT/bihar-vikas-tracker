"use client";

import ProjectListCard from "@/components/ProjectListCard";
import { BLOCKS_BY_DISTRICT } from "@/data/blocks";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import useSWR from "swr";

export default function BlockFilter({ projects }: { projects: any[] }) {
  const district = projects?.[0]?.district;
  const normalizedDistrict = district?.toLowerCase();
  const blocks = BLOCKS_BY_DISTRICT[normalizedDistrict || ""] || [];

  const searchParams = useSearchParams();
  const selectedBlock = searchParams.get("block") || "";
  const selectedCategory = searchParams.get("category") || "";

  const router = useRouter();

  const fetcher = (url: string) => fetch(url).then(res => res.json());

  const url = district
    ? `/api/projects?district=${district}${
        selectedBlock ? `&block=${selectedBlock}` : ""
      }${selectedCategory ? `&category=${selectedCategory}` : ""}`
    : null;

  const { data: swrData, isLoading } = useSWR(url, fetcher);

  return (
    <>
      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={(e) => {
          const value = e.target.value;
          const params = new URLSearchParams(searchParams.toString());

          if (value) {
            params.set("category", value);
          } else {
            params.delete("category");
          }

          router.replace(`?${params.toString()}`, { scroll: false });
        }}
        className="mb-4 px-3 py-2 bg-[#415A77] text-white rounded"
      >
        <option value="">All Categories</option>
        <option value="Water Supply">Water Supply</option>
        <option value="Rural Development">Rural Development</option>
        <option value="Infrastructure">Education</option>
        <option value="Social Welfare">Social Welfare</option>
      </select>

      {/* Block Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href={`?${selectedCategory ? `category=${selectedCategory}` : ""}`}
          scroll={false}
          className={`px-3 py-1 rounded ${
            selectedBlock === ""
              ? "bg-white text-black"
              : "bg-gray-700 text-white"
          }`}
        >
          All
        </Link>

        {blocks.map((b: string) => (
          <Link
            key={b}
            href={`?block=${b}${
              selectedCategory ? `&category=${selectedCategory}` : ""
            }`}
            scroll={false}
            className={`px-3 py-1 rounded ${
              selectedBlock === b
                ? "bg-white text-black"
                : "bg-[#415A77] text-white"
            }`}
          >
            {b}
          </Link>
        ))}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-700 rounded animate-pulse" />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && (swrData?.length ?? 0) === 0 && (
        <p className="text-gray-400">No projects found</p>
      )}

      {/* Projects */}
      <div className="grid grid-cols-1 gap-6 w-full">
        {(swrData || []).map((project: any) => (
          <ProjectListCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}