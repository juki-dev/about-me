<template>
    <header class="ab-header flex-center">
      <figure class="ab-header_logo flex-center">
        <img
          class="ab-header_page-icon circle-border-wrapper"
          src="@/assets/img/avatar.png"
        />
        <figcaption class="ab-header_logo-text">
          <h2>Santas</h2>
          <h5>Dev</h5>
        </figcaption>
      </figure>
      <nav class="ab-header_navigation">
        <ul class="flex-center">
          <li class="ab-header_navigation-item">
            <a class="ab-header_navigation-link" href="#about-me"> about me </a>
          </li>
          <li class="ab-header_navigation-item">
            <a class="ab-header_navigation-link" href="#experiences">
              resume
            </a>
          </li>
          <li class="ab-header_navigation-item">
            <a class="ab-header_navigation-link" href="#events"> events </a>
          </li>
          <li class="ab-header_navigation-item">
            <a class="ab-header_navigation-link" href="#projects"> projects </a>
          </li>
          <li class="ab-header_navigation-item">
            <a class="ab-header_navigation-link" href="#contact"> contact </a>
          </li>
        </ul>
      </nav>
    </header>
</template>

<style scoped>

.ab-header {
  justify-content: space-between;
  padding: 8px;
  background-color: var(--main-color);
  position: fixed;
  height: 66px;
  width: 100%;
  z-index: 100;
}
.ab-title {
  margin: 0px auto 20px;
  text-align: center;
  font-size: 2.5rem;
  color: var(--main-color);
}
.ab-header_page-icon {
  width: 50px;
  height: 50px;
  overflow: hidden;
}
.ab-header_logo-text {
  color: white;
  margin-left: 8px;
  line-height: 16px;
}
.ab-header_navigation ul {
  list-style: none;
}
.ab-header_navigation-item {
  padding: 0px 8px;
}
.ab-header_navigation-link {
  font-weight: bold;
  color: white;
  text-decoration: none;
}
</style>