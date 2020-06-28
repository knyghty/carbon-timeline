<template>
  <div class="container">
    <nuxt />
    <footer>
      <a href="https://carrick.eu">© Tom Carrick</a>
      <a href="https://github.com/knyghty/carbon-timeline">GitHub</a>
    </footer>
  </div>
</template>

<script></script>
<style>
* {
  box-sizing: border-box;
}

html {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  line-height: 1.5;
}

body {
  margin: 0;
  background: #eee;
}

main {
  background: #fff;
  padding: 0 20px;
  padding-bottom: 60px;
}

h1 {
  font-size: 1.75em;
  margin: 0;
  padding: 20px 0;
}

h2 {
  font-size: 1.5em;
}

footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #eee;
  position: sticky;
  bottom: 0;
  padding: 20px 40px;
}

footer a {
  color: black;
}
</style>
