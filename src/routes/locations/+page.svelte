<script lang="ts">
  import List, { Item, Meta, Label } from "@smui/list";
  import Checkbox from "@smui/checkbox";
  import Select, { Option } from "@smui/select";

  import { _ } from "svelte-i18n";
  import type { PageData } from "./$types";
  import { userLocations } from "$lib/stores";

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

  const placesInCity = data.places;

  let value: string = LocationType.District;
</script>

<Select bind:value name="location_types" label={$_("select location type")}>
  {#each Object.values(LocationType) as type}
    <Option value={type}>
      {$_(type)}
    </Option>
  {/each}
</Select>
<div>
  <List checkList>
    {#each placesInCity as place}
      {#if place.type === value}
        <Item>
          <Label>{place.name}</Label>
          <Meta>
            <Checkbox bind:group={$userLocations} value={place.id} />
          </Meta>
        </Item>
      {/if}
    {/each}
  </List>
</div>
