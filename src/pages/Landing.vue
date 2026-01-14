<template>
    <div>
iam hom page 

<div class="box" v-for="n in 5">
    {{ n }}
</div>
<router-link to="/items">Items</router-link>
    </div>
</template>

<script>
    export default {
        name:"home"
    }
</script>

<style scoped>
.box{
    height: 400px;
    width: 400px;
}
</style>