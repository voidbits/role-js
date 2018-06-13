<template>
  <b-card>
    Welcome {{fullName}}
  </b-card>
</template>

<script>
export default {
    name: 'helloworld-card',
    data: () => {
        return {
            fullName: ''
        }
    },
    created() {
        // Register the event handler.
        this.$parent.$on('GREET_EVENT', this.handleGreetEvent)
    },
    methods: {
        handleGreetEvent(fullName) {
            this.fullName = fullName
        }
    }


}
</script>
