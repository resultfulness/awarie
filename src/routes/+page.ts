import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

import { userLocations } from "$lib/stores";

export const load: PageLoad = async ({ fetch }) => {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  let userLocationsToFetch: number[] = [];

  userLocations.subscribe((val) => (userLocationsToFetch = val));

  const res = await fetch(proxyurl + "https://glitterworld.gq/get/reports/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      place_ids: userLocationsToFetch,
    }),
  });

  if (!res.ok) {
    throw error(500, {
      message: "internal server error",
    });
  }

  const items = await res.json();
  return {
    reports: items.reports,
  };
};
