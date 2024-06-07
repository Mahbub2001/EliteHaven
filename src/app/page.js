"use client";
import DownloadApp from "@/components/DownloadApp/DownloadApp";
import Gallery from "@/components/Gallery/Gallery";
import MoreDestination from "@/components/MoreDestination/MoreDestination";
import Popular_Cities from "@/components/PopularCities/Popular_Cities";
import SearchBox from "@/components/SearchBox/SearchBox";
import Trending from "@/components/Trending/Trending";
import HeaderLanding from "@/components/header_landing/Header_landing";
import { Caveat } from "next/font/google";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="mb-5">
        <div className="relative h-screen">
          <HeaderLanding />
        </div>
        <SearchBox />
        <Popular_Cities />
        <Trending />
        {/* <MoreDestination /> */}
        <DownloadApp />
        <Gallery />
      </main>
    </>
  );
}
