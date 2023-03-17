import { writable } from "svelte/store";
import { browser } from "$app/environment";

let locations = [];

if (browser) {
  const savedLocations = localStorage.getItem("locations") as string;
  locations = JSON.parse(savedLocations);
}

export const userLocations = writable(locations);

userLocations.subscribe(
  (val) => browser && (localStorage.locations = JSON.stringify(val))
);
