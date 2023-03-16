<script lang="ts">
  import Drawer, {
    AppContent,
    Content,
    Header,
    Scrim,
    Subtitle,
    Title as DrawerTitle,
  } from "@smui/drawer";
  import IconButton from "@smui/icon-button";
  import List, { Graphic, Item, Text } from "@smui/list";
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import "./global.scss";

  import { page } from "$app/stores";
  import { useDarkMode } from "$lib/stores";
  import { _ } from "svelte-i18n";
  import { onDestroy, onMount } from "svelte";

  $: routes = [
    {
      href: "/",
      name: $_("my_reports"),
      icon_name: "home",
    },
    {
      href: "/about",
      name: $_("about"),
      icon_name: "info",
    },
    {
      href: "/settings",
      name: $_("settings"),
      icon_name: "settings",
    },
  ];

  $: active = $page.route.id;

  let sidebarOpen = false;

  onMount(() => {
    const userDarkModePreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (localStorage.getItem("theme")) {
      useDarkMode.set(localStorage.getItem("theme") === "dark");
    } else if (userDarkModePreference) {
      useDarkMode.set(userDarkModePreference);
    }

    const unsubsribe = useDarkMode.subscribe((val) => {
      localStorage.setItem("theme", val ? "dark" : "light");
    });

    onDestroy(unsubsribe);
  });
</script>

<svelte:head>
  <title>{$_("page_title")}</title>

  {#if $useDarkMode}
    <link rel="stylesheet" href="/smui-dark.css" />
  {:else}
    <link rel="stylesheet" href="/smui.css" />
  {/if}
</svelte:head>

<Drawer variant="modal" bind:open={sidebarOpen}>
  <a href="/" on:click={() => (sidebarOpen = false)}>
    <img src="/logo.svg" alt="logo" class="logo" />
  </a>
  <Header>
    <DrawerTitle>{$_("page_title")}</DrawerTitle>
    <Subtitle>Awarie awaryjne</Subtitle>
  </Header>
  <Content>
    <List>
      {#each routes as { href, name, icon_name }}
        <Item
          {href}
          on:click={() => (sidebarOpen = false)}
          activated={active === href}
        >
          <Graphic class="material-symbols-outlined" aria-hidden="true">
            {icon_name}
          </Graphic>
          <Text>{name}</Text>
        </Item>
      {/each}
    </List>
  </Content>
</Drawer>
<Scrim />
<TopAppBar variant="static">
  <Row>
    <Section>
      <IconButton
        class="material-symbols-outlined"
        on:click={() => (sidebarOpen = !sidebarOpen)}
      >
        menu
      </IconButton>
      <Title>{$_("page_title")}</Title>
      {#if $page.route.id === "/"}
        <IconButton
          class="material-symbols-outlined"
          style="margin-left: auto;"
          on:click={() => window.location.reload()}
        >
          refresh
        </IconButton>
      {/if}
    </Section>
  </Row>
</TopAppBar>
<AppContent><slot /></AppContent>

<style>
  img.logo {
    display: block;
    padding: 1rem;
  }
</style>
