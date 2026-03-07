"use client";

import React from "react";
import Banner from "@/component/homepage/Banner";
import TopCategories from "@/component/homepage/TopCategories";
import TastyDigestiveSection from "@/component/homepage/TastyDigestiveSection";
import NamkeenSection from "@/component/homepage/NamkeenSection";
import FestiveComboSection from "@/component/homepage/FestiveComboSection";
import FreeShippingCombosSection from "@/component/homepage/FreeShippingCombosSection";
import SweetsSection from "@/component/homepage/SweetsSection";
import HomepageCategories from "@/component/homepage/HomepageCategories";

export default function Home() {

return (

<>

{/* Banner */} <Banner />

{/* Satmola Top Categories */} <TopCategories />
<HomepageCategories/>
{/* <TastyDigestiveSection/> */}
{/* <NamkeenSection/> */}
{/* <FestiveComboSection/> */}
{/* <FreeShippingCombosSection/> */}
{/* <SweetsSection/> */}
</>

);

}
