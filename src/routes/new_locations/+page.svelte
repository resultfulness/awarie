<script lang="ts">
  import List, { Item, Meta, Label, Separator } from "@smui/list";
  import Checkbox from "@smui/checkbox";
  import Select, { Option } from "@smui/select";

  import { _ } from "svelte-i18n";
  import type { ActionData, PageData } from "./$types";
  import { userLocations } from "$lib/stores";
  import Button, { Icon } from "@smui/button";

  type Place = {
    id: number;
    type: string;
    name: string;
  };

  enum LocationType {
    City = "city",
    District = "district",
    Borough = "borough",
    Street = "street",
    Building = "building",
    Highway = "highway",
    Highway_section = "highway section",
  }

  let placesInCity: Place[];
  let currently_selected: Place;

  export let data: PageData;
  export let form: ActionData;

  if (form?.changed) {
    placesInCity = form.places;
    currently_selected = form.pressedPlace;
  } else {
    placesInCity = data.places;
    currently_selected = {
      id: 1,
      name: "Warszawa",
      type: LocationType.City,
    };
  }
</script>

<div>
  <List checkList>
    {#each placesInCity as place}
      <Item>
        <form method="post" action="?/changecurrent">
          <Button style="width:100%">
            <Label>{$_(place.type)}: {place.name}</Label>
            <input
              type="text"
              value={JSON.stringify(place)}
              style="display:none;"
              name="place"
            />
          </Button>
        </form>
      </Item>
      <Separator />
    {/each}
  </List>
</div>

<div class="bottom-actions">
  <Label>{$_(currently_selected.type)}: {currently_selected.name}</Label>
  <Button variant="raised">
    <Icon class="material-symbols-outlined">add</Icon>
    <Label>add</Label>
  </Button>
</div>

<style>
  .bottom-actions {
    background-color: #222;
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }
</style>
