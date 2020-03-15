<template>
<div>
    <MaskDescription />
    <CurrentMap />
</div>
    
</template>

<script>
import MaskDescription from '@/components/MaskDescription'
import CurrentMap from '@/components/CurrentMap'

export default {
    name: 'CurrentPositionPage',

    components: {
        MaskDescription,
        CurrentMap
    }
}

</script>

<style>

</style>

