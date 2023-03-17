import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  const res = await fetch(
    proxyurl + "https://glitterworld.gq/get/all-places/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        place_id: 1,
      }),
    }
  );

  if (!res.ok) {
    throw error(500, {
      message: "internal server error",
    });
  }

  const items = await res.json();
  return {
    places: items.places,
  };
};
