<template>
    <section class="ab-index color-inverted">
        <article class="flex-center content-wrapper">
          <figure class="ab-index_picture circle-border-wrapper">
            <img
              src="@/assets/img/img_ruiz.jpg"
              alt="Cristian Leandro Henao Santa"
            />
          </figure>
          <div class="ab-index_introduce">
            <h1>Cristian Leandro</h1>
            <h2>Henao Santa</h2>
            <span>Electronic Engineer & Front-end developer</span>
          </div>
        </article>
      </section>
</template>

<style scoped>
.ab-index .content-wrapper{
  flex-direction: column;
  height: calc(100vh - 66px);
  width: 100%;
}
.ab-index_picture {
  overflow: hidden;
  height: 200px;
  width: 200px;
}
.ab-index_picture > img:nth-child(1) {
  margin: auto;
  margin-left: -20px;
}
.ab-index_introduce {
  color: white;
  text-align: center;
}
.ab-index_introduce h1 {
  font-size: 4rem;
}
.ab-index_introduce h2 {
  font-size: 3rem;
}
</style>