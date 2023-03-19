<script lang="ts">
  import Fab, { Icon, Label } from "@smui/fab";

  import Loading from "$lib/Loading.svelte";
  import ToLocations from "$lib/ToLocations.svelte";
  import type { Report } from "$lib/types/Report";
  import ReportComponent from "./ReportComponent.svelte";

  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";

  let reports: Report[] = [];

  let loading = true;

  onMount(async () => {
    const userLocationIDs = JSON.parse(
      localStorage.getItem("userLocationIDs") as string
    );
    if (userLocationIDs) {
      const res = await fetch("https://glitterworld.gq/get/reports/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          place_ids: userLocationIDs,
        }),
      });
      const items = await res.json();
      reports = items.reports;
    }

    loading = false;
  });

  function handleNew() {
    throw new Error("not implemented");
  }
</script>

<div class="fab">
  <Fab color="primary" extended on:click={handleNew}>
    <Icon class="material-symbols-outlined">add</Icon>
    <Label>{$_("new")}</Label>
  </Fab>
</div>

{#if loading}
  <Loading />
{:else}
  {#if reports.length === 0}
    <ToLocations />
  {/if}
  {#each reports as report}
    <ReportComponent {report} />
  {/each}
{/if}

<style>
  .fab {
    position: fixed;
    z-index: 9999;
    bottom: 0;
    right: 0;
    padding: 1rem;
  }
</style>
