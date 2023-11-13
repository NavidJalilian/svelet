<script lang="ts">
import {
 selections
} from '$lib/store.ts';
import {
 tweened
} from 'svelte/motion';
import {
 quintOut
} from 'svelte/easing';
import {
 cn
} from "$lib/utils";
export let emoji: string;
export let id: string;
export let data: {
 emoji: string,
 id: string
} [];
export let isActive: boolean;
let toggle=false;
const rotation = tweened(0, {
 duration: 300,
 easing: quintOut,
});

const shake = tweened(0, {
 duration: 100,
 easing: quintOut,
});

// Reactive statement to trigger the shake animation
$: if (isActive) {
rotation.set(180)
 shake.set(10, {
  duration: 300
 }).then(() => shake.set(0, {
  duration: 300
 }));
}

function handler(id: string) {
 selections.update(obj => {
  if (!obj.first)
   obj.first = id
  else if (!obj.second)
   obj.second = id
  else if (obj.second && obj.first)
   obj = {
    first: id,
    second: ''
   }

  return obj
 })

}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<div  class="box bg-transparent perspective-10 shadow-sm p-4 text-4xl text-center bg-slate-50 flex justify-center items-center max-w-md group " on:click={()=>handler(id)} 
  on:mouseenter={()=>rotation.set(180)} on:mouseleave={()=>!isActive && rotation.set(0)}
  >
    <div  class={cn('relative inside transition-transform group-hover:outline outline-2 outline-offset-4   rounded outline-blue-500' )} style="transform: rotateY({$rotation}deg) translateX(calc({$shake} * 10px));">
        <div  class={"flip-box-front absolute bg-slate-200 rounded-md"}>
            <!-- Front content here -->
        </div>
        <div class={cn("flip-box-back bg-blue-400 rounded",)}>
            <h2 class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{emoji}</h2>
        </div>
    </div>
</div>

<style>
.inside {
 transform-style: preserve-3d;
 transform-origin: center;
 width: 100%;
 height: 100%;
}

.box {
 transform-style: preserve-3d;
}

.flip-box-front,
.flip-box-back {
 width: 100%;
 height: 100%;
 -webkit-backface-visibility: hidden;
 backface-visibility: hidden;
}

.flip-box-back {
 transform: rotateY(180deg);
}

.rotateY {
 transform: rotateY(180deg);

}
</style>
