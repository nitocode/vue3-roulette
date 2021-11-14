<template>
  <div class="markdown-body text-left">
    <markdown-content />
  </div>
</template>

<script>
import { VueComponent } from "./../../README.md"
export default {
  name: "Docs",
  components: { MarkdownContent: VueComponent }
}
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.0.0/github-markdown-light.min.css");
</style>