<template>
     <section id="about-me" class="ab-about content-wrapper">
        <picture class="ab-about_picture">
          <source
            media="(min-width: 720px)"
            srcset="@/assets/img/img_santa_isabel-portrait.jpg"
          />
          <img
            src="@/assets/img/img_santa_isabel-landscape.jpg"
            alt="me in snowmontain"
          />
        </picture>
        <article class="ab-about_text">
          <h3 class="ab-about_title ab-title">About me</h3>
          <p class="ab-about_content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Scelerisque eu ultrices vitae auctor eu augue ut lectus. Vitae
            elementum curabitur vitae nunc sed velit dignissim sodales ut.
            Turpis egestas sed tempus urna. Nibh praesent tristique magna sit
            amet purus gravida quis. Etiam dignissim diam quis enim lobortis
            scelerisque. Nulla aliquet enim tortor at auctor urna nunc. At
            varius vel pharetra vel turpis nunc eget lorem. Tellus molestie nunc
            non blandit massa enim nec dui nunc. Sit amet purus gravida quis
            blandit turpis cursus in. In pellentesque massa placerat duis
            ultricies lacus sed. Sed risus ultricies tristique nulla aliquet.
            Arcu risus quis varius quam. Semper quis lectus nulla at volutpat.
            Urna porttitor rhoncus dolor purus non enim. Mattis rhoncus urna
            neque viverra justo nec ultrices. Lacinia at quis risus sed
            vulputate odio ut. Non diam phasellus vestibulum lorem sed.
          </p>
        </article>
      </section>
</template>

<style>

.ab-about {
  display: flex;
  flex-wrap: wrap;
}
.ab-about_picture {
  text-align: center;
  flex: 1;
  padding: 0px 10px;
}
.ab-about_text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  padding: 0px 10px;
}
.ab-about_title {
  margin: 20px 0px;
}
</style>