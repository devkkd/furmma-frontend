"use client";

import React, { useState, useEffect } from "react";

/* =========================
   FILTER CONFIG
========================= */
const FILTER_GROUPS = [
  {
    id: "petType",
    title: "Pet Type",
    options: ["Dog", "Cat"],
  },
  {
    id: "category",
    title: "Category",
    options: ["Food", "Medicine", "Toys", "Accessories", "Grooming", "Supplements"],
  },
  {
    id: "age",
    title: "Age",
    options: ["Puppy", "Young", "Adult", "Senior"],
  },
  {
    id: "dogBreed",
    title: "Dog Breed",
    options: [
      "Labrador",
      "Golden Retriever",
      "German Shepherd",
      "Poodle",
      "French Bulldog",
    ],
  },
  {
    id: "catBreed",
    title: "Cat Breed",
    options: [
      "Persian",
      "Maine Coon",
      "Bengal",
      "Ragdoll",
      "Siamese",
    ],
  },
  {
    id: "size",
    title: "Size",
    options: ["Small", "Medium", "Large", "Extra Large"],
  },
  {
    id: "dietary",
    title: "Dietary Needs",
    options: ["Grain-Free", "High-Protein", "Weight Control", "Hypoallergenic"],
  },
  {
    id: "rating",
    title: "Rating",
    options: ["4★ & up", "3★ & up", "2★ & up", "1★ & up"],
  },
];

const INITIAL_STATE = {
  petType: [],
  category: [],
  age: [],
  dogBreed: [],
  catBreed: [],
  size: [],
  dietary: [],
  rating: [],
};

export default function FilterSidebar({ filters, onChange }) {
  const [selectedFilters, setSelectedFilters] = useState(INITIAL_STATE);

  /* =========================
     URL → SIDEBAR SYNC
  ========================= */
  useEffect(() => {
    if (!filters) return;

    const normalize = (val) =>
      val.split(",").map((v) => capitalize(v));

    setSelectedFilters({
      petType: filters.petType ? normalize(filters.petType) : [],
      category: filters.category ? normalize(filters.category) : [],
      age: filters.age ? normalize(filters.age) : [],
      dogBreed: filters.dogBreed
        ? filters.dogBreed.split(",").map(capitalize)
        : [],
      catBreed: filters.catBreed
        ? filters.catBreed.split(",").map(capitalize)
        : [],
      size: filters.size ? normalize(filters.size) : [],
      dietary: filters.dietary
        ? filters.dietary.split(",").map(capitalize)
        : [],
      rating: filters.rating
        ? filters.rating.split(",").map((r) => `${r}★ & up`)
        : [],
    });
  }, [filters]);

  /* =========================
     TOGGLE HANDLER
  ========================= */
  const handleToggle = (groupId, option) => {
    let nextState;
    setSelectedFilters((prev) => {
      const updatedGroup = prev[groupId].includes(option)
        ? prev[groupId].filter((i) => i !== option)
        : [...prev[groupId], option];

      const newState = { ...prev, [groupId]: updatedGroup };

      if (groupId === "petType") {
        if (!updatedGroup.includes("Dog")) newState.dogBreed = [];
        if (!updatedGroup.includes("Cat")) newState.catBreed = [];
      }

      nextState = newState;
      return newState;
    });

    // Build payload from nextState and call onChange after state update (not inside setState updater)
    const payload = {};
    Object.entries(nextState || {}).forEach(([key, value]) => {
      if (!value.length) payload[key] = null;
      else if (key === "rating")
        payload[key] = value.map((v) => v.charAt(0)).join(",");
      else payload[key] = value.map((v) => v.toLowerCase()).join(",");
    });
    onChange(payload);
  };

  /* =========================
     CLEAR ALL
  ========================= */
  const clearAll = () => {
    setSelectedFilters(INITIAL_STATE);
    onChange(
      Object.keys(INITIAL_STATE).reduce((acc, k) => {
        acc[k] = null;
        return acc;
      }, {})
    );
  };

  const petTypes = selectedFilters.petType;
  const showDogBreed = petTypes.includes("Dog");
  const showCatBreed = petTypes.includes("Cat");

  return (
    <aside className="w-full max-w-[280px] bg-white border border-[#D9DCE2] rounded-2xl flex flex-col text-black">
      {/* Header */}
      <div className="p-5 flex items-center justify-between border-b border-[#D9DCE2]">
        <h2 className="font-semibold text-lg">Filters</h2>
        <button
          onClick={clearAll}
          className="text-sm text-gray-500 hover:text-black transition"
        >
          Clear All
        </button>
      </div>

      {/* Filters */}
      <div className="flex-1">
        {FILTER_GROUPS.map((group) => {
          if (group.id === "dogBreed" && !showDogBreed) return null;
          if (group.id === "catBreed" && !showCatBreed) return null;

          return (
            <div
              key={group.id}
              className="px-5 py-4 border-b border-[#D9DCE2]"
            >
              <h3 className="text-[11px] font-semibold uppercase text-gray-600 mb-3 tracking-wide">
                {group.title}
              </h3>

              <div className="flex flex-col gap-3">
                {group.options.map((option) => {
                  const checked = selectedFilters[group.id].includes(option);

                  return (
                    <label
                      key={option}
                      className="flex items-center gap-3 cursor-pointer text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleToggle(group.id, option)}
                        className="
                          h-5 w-5
                          rounded-md
                          border border-[#D9DCE2]
                          accent-[#1F2E46]
                          cursor-pointer
                        "
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

/* =========================
   HELPER
========================= */
const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);
