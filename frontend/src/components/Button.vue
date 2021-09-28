<template>
  <div id="form-button">
    <button>{{ text }}</button>
  </div>
</template>

<script lang="js">
export default ({
  name: 'Button',
  props: ["text"]
});
</script>

<style scoped lang="scss">
div {
  padding: 0 6rem;
}

button {
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 3rem;
  color: #fff;
  width: 100%;
  background-color: #fd2d01;
  border: none;
  margin: 2rem 0 3rem 0;
  height: 2.7rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
}
</style>
