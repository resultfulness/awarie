import { previousLocations, userLocations } from "$lib/stores";
import { error } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  changecurrent: async ({ fetch, request }) => {
    const data = await request.formData();

    const pressedPlace = JSON.parse(data.get("place"));

    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const res = await fetch(
      proxyurl + "https://glitterworld.gq/get/all-places/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          place_id: pressedPlace.id,
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
      changed: true,
      places: items.places,
      pressedPlace: pressedPlace,
    };
  },
};
