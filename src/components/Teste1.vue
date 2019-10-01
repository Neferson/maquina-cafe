<template>
    <div>
        <h1>Teste 1</h1>
        <teste2 @reset-document="print" :message="message"></teste2>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: "Hello from component 1!"
        }
    },

    methods: {
        print(e) {
            console.log('Hello from child!');
            console.log(e);
        }
    }
}
</script>


<style lang="">
    
</style>