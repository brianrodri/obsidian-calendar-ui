<script lang="ts">
  import { getContext } from "svelte";

  import type { IDayMetadata } from "src/types";

  import Box from "./Box.svelte";
  import { IS_MOBILE } from "../../context";

  export let referenceElement: HTMLElement;
  export let metadata: IDayMetadata[];
  export let isVisible: boolean;

  const isMobile = getContext(IS_MOBILE);

  let menuItems: IDayMetadata[];
  $: menuItems = (metadata || [])
    .filter((meta) => ["menu", "calendar-and-menu"].includes(meta.display))
    .filter((meta) => meta.value !== undefined)
    .sort((a, b) => a.order - b.order);
</script>

{#if isMobile}
  <Box menuItems="{menuItems}" />
{/if}
