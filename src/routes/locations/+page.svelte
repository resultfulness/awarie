<script lang="ts">
  import List, { Item, Meta, Label, Separator } from "@smui/list";
  import Checkbox from "@smui/checkbox";
  import Select, { Option } from "@smui/select";

  import { _ } from "svelte-i18n";
  import type { PageData } from "./$types";
  import { userLocations } from "$lib/stores";
  import Button from "@smui/button";

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

  export let data: PageData;

  const placesInCity: Place[] = data.places;

  $: placesToShow = placesInCity.filter(
    (place) => place.type === currentLocationType
  );

  let currentLocationType: string = LocationType.District;
</script>

<div class="location-select">
  <Select
    bind:value={currentLocationType}
    name="location_types"
    label={$_("select location type")}
    style="width: 100%;"
    variant="filled"
  >
    {#each Object.values(LocationType) as type}
      <Option value={type}>
        {$_(type)}
      </Option>
    {/each}
  </Select>
</div>
<div>
  <List checkList>
    {#if placesToShow.length > 0}
      {#each placesToShow as place}
        <Item>
          <Label>{place.name}</Label>
          <Meta>
            <Checkbox bind:group={$userLocations} value={place.id} />
          </Meta>
        </Item>
        <Separator />
      {/each}
    {:else}
      <Item>
        <Label>{$_("no locations of this type")}</Label>
      </Item>
    {/if}
  </List>
</div>
<div class="fab">
  <Button variant="raised" style="width: 100%" href="/">
    <Label>{$_("save")}</Label>
  </Button>
</div>

<style>
  .location-select {
    display: flex;
    justify-content: center;
    padding: 1rem;
  }

  .fab {
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 1rem;
  }
</style>
