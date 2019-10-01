<template>
  <div id="app">

    <router-view />   

  </div>
</template>

<style >
  body{
    overflow-x: hidden;
  }
#app {
  font-family:  Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}


#nav{
  width: 8%;
  margin-top:0;
  float: left;
  padding: 5px;
}


a {
    display: block;
    color: darkturquoise;
    padding: 10px 10px !important;
    border-radius: 5px;
    background-color: #eee;
    text-align: center;

  }

  a:hover {
    background: #2c3e50;
    color: #fff !important;
    text-decoration: none !important;
  }


</style>
