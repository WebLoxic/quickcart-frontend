"use client";

export default function CollectionFilter({
    sortedProducts,
    sort,
    setSort,
    filterOpen,
    setFilterOpen,
    availabilityPage,
    setAvailabilityPage,
    pricePage,
    setPricePage,
    inStock,
    setInStock,
    priceFrom,
    setPriceFrom,
    priceTo,
    setPriceTo
}) {

    return (

        <>

            {/* MOBILE FILTER BAR */}

            <div className="flex justify-between items-center md:hidden border-y py-3 mb-6">

                <button
                    onClick={() => setFilterOpen(true)}
                    className="flex items-center gap-2 text-sm"

                >

                    Filter and sort </button>

                <span className="text-gray-500 text-sm">
                    {sortedProducts.length} products
                </span>

            </div>

            {/* DESKTOP SORT */}

            <div className="hidden md:flex justify-between items-center mb-8">

                <select
                    className="border px-3 py-2"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}

                >

                    <option value="default">Best selling</option>
                    <option value="price-low">Price low to high</option>
                    <option value="price-high">Price high to low</option>

                </select>

                <span className="text-gray-500">
                    {sortedProducts.length} products
                </span>

            </div>

            {/* FILTER DRAWER */}

            <div
                className={`fixed top-0 right-0 h-full w-full bg-white z-50 transform transition-transform duration-300 ${filterOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >

                {/* HEADER */}

                <div className="flex justify-between items-center p-5 border-b">

                    <div>
                        <h2 className="font-semibold">Filter and sort</h2>
                        <p className="text-sm text-gray-500">
                            {sortedProducts.length} products
                        </p>
                    </div>

                    <button onClick={() => setFilterOpen(false)}>✕</button>

                </div>

                {/* MAIN FILTER PAGE */}

                {!availabilityPage && !pricePage && (

                    <div className="p-5 space-y-6">

                        <div
                            onClick={() => setAvailabilityPage(true)}
                            className="flex justify-between items-center cursor-pointer"
                        >
                            <span>Availability</span>
                            →
                        </div>

                        <div
                            onClick={() => setPricePage(true)}
                            className="flex justify-between items-center cursor-pointer"
                        >
                            <span>Price</span>
                            →
                        </div>

                        <div className="flex justify-between items-center">

                            <span>Sort by:</span>

                            <select
                                className="border px-3 py-1"
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}

                            >

                                <option value="default">Featured</option>
                                <option value="price-low">Price, low to high</option>
                                <option value="price-high">Price, high to low</option>

                            </select>

                        </div>

                    </div>

                )}

                {/* AVAILABILITY PAGE */}

                {availabilityPage && (

                    <div>

                        <div className="flex items-center gap-4 p-5 border-b">
                            <button onClick={() => setAvailabilityPage(false)}>←</button>
                            <h2 className="font-semibold">Availability</h2>
                        </div>

                        <div className="p-5 space-y-4">

                            <label className="flex items-center gap-3">

                                <input
                                    type="checkbox"
                                    checked={inStock}
                                    onChange={() => setInStock(!inStock)}
                                />

                                In stock ({sortedProducts.length})

                            </label>

                        </div>

                    </div>

                )}

                {/* PRICE PAGE */}

                {pricePage && (

                    <div>

                        <div className="flex items-center gap-4 p-5 border-b">
                            <button onClick={() => setPricePage(false)}>←</button>
                            <h2 className="font-semibold">Price</h2>
                        </div>

                        <div className="p-5">

                            <p className="text-gray-500 mb-4">
                                The highest price is ₹399
                            </p>

                            <div className="flex gap-3">

                                <input
                                    type="number"
                                    placeholder="From"
                                    className="border px-3 py-2 w-full"
                                    value={priceFrom}
                                    onChange={(e) => setPriceFrom(e.target.value)}
                                />

                                <input
                                    type="number"
                                    placeholder="To"
                                    className="border px-3 py-2 w-full"
                                    value={priceTo}
                                    onChange={(e) => setPriceTo(e.target.value)}
                                />

                            </div>

                        </div>

                    </div>

                )}

                {/* FOOTER */}

                <div className="absolute bottom-0 left-0 w-full border-t p-4 flex justify-between">

                    <button
                        onClick={() => {
                            setPriceFrom("");
                            setPriceTo("");
                            setInStock(false);
                            setSort("default");
                        }}
                        className="underline text-sm"

                    >

                        Remove all

                    </button>

                    <button
                        onClick={() => setFilterOpen(false)}
                        className="bg-black text-white px-6 py-2"

                    >

                        Apply

                    </button>

                </div>

            </div>

            {/* OVERLAY */}

            {filterOpen && (

                <div
                    onClick={() => setFilterOpen(false)}
                    className="fixed inset-0 bg-black/30 z-40"
                />

            )}

        </>

    );

}
