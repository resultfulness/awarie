<script lang="ts">
  import Button, { Label } from "@smui/button";
  import Dialog, { Actions, Content, Title } from "@smui/dialog";
  import IconButton from "@smui/icon-button";
  import List, { Item, Label as ListLabel } from "@smui/list";

  import ToLocations from "$lib/ToLocations.svelte";

  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";

  let open = false;
  let toRemove: number;
  let myPlaceIDs: number[] = [];

  onMount(() => {
    myPlaceIDs = (
      JSON.parse(localStorage.getItem("userLocationIDs") as string) || []
    ).sort();
  });

  function handleRemove() {
    myPlaceIDs = myPlaceIDs.filter((p) => p !== toRemove);
    localStorage.setItem("userLocationIDs", JSON.stringify(myPlaceIDs));
  }

  async function fetchPlaceInfo(placeId: number): Promise<[string, string]> {
    const res = await fetch("https://glitterworld.gq/get/place/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        place_id: placeId,
      }),
    });

    const item = await res.json();

    return [item.place.name, item.place.type];
  }
</script>

<header>
  <h2 class="mdc-typography--headline5">{$_("your report locations")}</h2>
</header>
<hr />
<List>
  {#if myPlaceIDs.length === 0}
    <ToLocations />
  {:else}
    {#each myPlaceIDs as placeId}
      <Item
        style="display: flex; justify-content: space-between; align-items: center;"
        on:click={() => {
          open = true;
          toRemove = placeId;
        }}
      >
        <ListLabel style="padding-left: 1rem;">
          {#await fetchPlaceInfo(placeId)}
            <p class="triple-dot-loading">
              {$_("fetching location of")} id
              {placeId}<span>...</span>
            </p>
          {:then place}
            {$_(place[1]).toUpperCase()}: {place[0]}
          {:catch}
            {$_("could not fetch info")}, id:
            {placeId}
          {/await}
        </ListLabel>
        <IconButton class="material-symbols-outlined" style="color: red;">
          close
        </IconButton>
      </Item>
    {/each}
  {/if}
</List>
<Dialog
  bind:open
  aria-labelledby="removal-info-title"
  aria-describedby="removal-info-desc"
>
  <Title id="removal-info-title">
    {$_("you are about to remove")}
    {toRemove}
  </Title>
  <Content id="removal-info-desc">{$_("are you sure")}?</Content>
  <Actions>
    <Button>
      <Label>{$_("no")}</Label>
    </Button>
    <Button on:click={handleRemove}>
      <Label>{$_("yes")}</Label>
    </Button>
  </Actions>
</Dialog>

<style>
  header {
    padding: 2rem;
  }

  .triple-dot-loading {
    font-family: monospace;
    clip-path: inset(0 3ch 0 0);
    animation: tripledotloading 1s steps(4) infinite;
  }

  @keyframes tripledotloading {
    to {
      clip-path: inset(0 -1ch 0 0);
    }
  }
</style>
