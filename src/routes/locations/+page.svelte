<script lang="ts">
  import Button, { Icon, Label } from "@smui/button";
  import Dialog, { Actions, Content, Title } from "@smui/dialog";
  import IconButton from "@smui/icon-button";
  import List, { Item, Separator } from "@smui/list";
  import Snackbar, {
    Actions as SnackbarActions,
    Label as SnackbarLabel,
  } from "@smui/snackbar";

  import Loading from "$lib/Loading.svelte";
  import { LocationTypes } from "$lib/types/LocationTypes";
  import type { Place } from "$lib/types/Place";

  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";

  let currentlySelectedLocationTypeSnackbar: Snackbar;
  let afterAddOpen = false;
  let makeSureOpen = false;
  let noChangeOcurred = false;

  const WARSAW: Place = {
    id: 1,
    name: "Warszawa",
    type: LocationTypes.City,
  };

  let places: Place[] = [];
  let currentlySelectedLocation: Place = WARSAW;
  let previouslySelectedLocationChain: Place[] = [];

  let isDataLoading = true;

  async function fetchLocationsUnderCurrentlySelected(): Promise<Place[]> {
    isDataLoading = true;
    const res = await fetch("https://glitterworld.gq/get/all-places/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        place_id: currentlySelectedLocation.id,
      }),
    });

    const items = await res.json();
    isDataLoading = false;

    return items.places;
  }

  onMount(async () => {
    places = await fetchLocationsUnderCurrentlySelected();
  });

  async function handleGoDown(pressedPlace: Place) {
    previouslySelectedLocationChain = [
      ...previouslySelectedLocationChain,
      currentlySelectedLocation,
    ];
    currentlySelectedLocation = pressedPlace;

    places = await fetchLocationsUnderCurrentlySelected();
  }

  async function handleBack() {
    currentlySelectedLocation = previouslySelectedLocationChain.pop() as Place; // won't ever be undefined because button disabled then
    previouslySelectedLocationChain = previouslySelectedLocationChain;

    places = await fetchLocationsUnderCurrentlySelected();
  }

  function handleAdd() {
    previouslySelectedLocationChain = [
      ...previouslySelectedLocationChain,
      currentlySelectedLocation,
    ];

    const currentUserLocationIDs = localStorage.getItem("userLocationIDs");

    if (currentUserLocationIDs === null) {
      localStorage.setItem(
        "userLocationIDs",
        JSON.stringify(previouslySelectedLocationChain.map((place) => place.id))
      );
    } else {
      localStorage.setItem(
        "userLocationIDs",
        JSON.stringify([
          ...new Set([
            ...JSON.parse(currentUserLocationIDs),
            ...previouslySelectedLocationChain.map((place) => place.id),
          ]),
        ])
      );
    }

    previouslySelectedLocationChain.pop();

    if (currentUserLocationIDs === localStorage.getItem("userLocationIDs")) {
      noChangeOcurred = true;
    }
    afterAddOpen = true;
  }

  async function handleReset() {
    previouslySelectedLocationChain = [];
    currentlySelectedLocation = WARSAW;

    places = await fetchLocationsUnderCurrentlySelected();

    noChangeOcurred = false;
  }
</script>

<div>
  {#if isDataLoading}
    <Loading />
  {:else}
    <List>
      {#each places as place}
        <Item>
          <Button style="width:100%" on:click={() => handleGoDown(place)}>
            <Label>{$_(place.type)}: {place.name}</Label>
          </Button>
        </Item>
        <Separator />
      {/each}
    </List>
  {/if}
</div>

<Dialog
  bind:open={makeSureOpen}
  aria-labelledby="make-sure-title"
  aria-describedby="make-sure-desc"
>
  <Title id="make-sure-title">
    {$_("add confirmation")}
  </Title>
  <Content id="make-sure-desc">
    <p>
      {$_("you are about to add")}
      {$_("a new location")}
    </p>
    <br />
    <p style="text-align: center;">
      {$_(currentlySelectedLocation.type).toUpperCase()}
      -
      {currentlySelectedLocation.name.toUpperCase()}
    </p>
    <br />
    {$_("are you sure")}?
  </Content>
  <Actions>
    <Button>
      <Label>{$_("no")}</Label>
    </Button>
    <Button on:click={handleAdd}>
      <Label>{$_("yes")}</Label>
    </Button>
  </Actions>
</Dialog>

<Dialog
  bind:open={afterAddOpen}
  aria-labelledby="adding-title"
  aria-describedby="adding-desc"
>
  <Title id="adding-title">
    {#if !noChangeOcurred}
      {$_("location saved")}: {currentlySelectedLocation.name}
    {:else}
      {$_("this location was already saved")}
    {/if}
  </Title>
  <Content id="adding-desc">{$_("what do you want to do now")}?</Content>
  <Actions>
    <Button href="/">
      <Label>{$_("show reports")}</Label>
    </Button>
    <Button on:click={handleReset}>
      <Label>{$_("add another location")}</Label>
    </Button>
  </Actions>
</Dialog>

<div class="bottom-actions">
  <Button
    variant="raised"
    on:click={handleBack}
    disabled={previouslySelectedLocationChain.length === 0}
  >
    <Icon class="material-symbols-outlined">undo</Icon>
    <Label>{$_("back")}</Label>
  </Button>
  <Button on:click={() => currentlySelectedLocationTypeSnackbar.open()}>
    {currentlySelectedLocation.name}
  </Button>
  <Button variant="raised" on:click={() => (makeSureOpen = true)}>
    <Icon class="material-symbols-outlined">add</Icon>
    <Label>{$_("save")}</Label>
  </Button>
</div>

<Snackbar
  bind:this={currentlySelectedLocationTypeSnackbar}
  labelText="{$_('the type of this place is')}: {$_(
    currentlySelectedLocation.type
  ).toUpperCase()}"
>
  <SnackbarLabel />
  <SnackbarActions>
    <IconButton class="material-symbols-outlined" title="Dismiss">
      close
    </IconButton>
  </SnackbarActions>
</Snackbar>

<style>
  .bottom-actions {
    width: 100%;
    position: fixed;
    bottom: 0;
    display: grid;
    grid-template-columns: 25% 50% 25%;
    padding: 1rem;
  }
</style>
