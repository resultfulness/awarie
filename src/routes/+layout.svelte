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
  import { _ } from "svelte-i18n";

  $: routes = [
    {
      href: "/",
      name: $_("reports"),
      iconName: "home",
    },
    {
      href: "/about",
      name: $_("about app"),
      iconName: "info",
    },
    {
      href: "/locations",
      name: $_("locations"),
      iconName: "location_on",
    },
    {
      href: "/me/locations",
      name: $_("my locations"),
      iconName: "person",
    },
  ];

  $: active = $page.route.id;

  let sidebarOpen = false;
</script>

<svelte:head>
  <title>Awarie | {$_("page title")}</title>
</svelte:head>

<Drawer variant="modal" bind:open={sidebarOpen}>
  <a href="/" on:click={() => (sidebarOpen = false)}>
    <img src="/logo.svg" alt="logo" class="logo" />
  </a>
  <Header>
    <DrawerTitle>{$_("page title")}</DrawerTitle>
    <Subtitle>{$_("app for emergency reports")}</Subtitle>
  </Header>
  <Content>
    <List>
      {#each routes as { href, name, iconName }}
        <Item
          {href}
          on:click={() => (sidebarOpen = false)}
          activated={active === href}
        >
          <Graphic class="material-symbols-outlined" aria-hidden="true">
            {iconName}
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
      <Title>{$_("page title")}</Title>
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
