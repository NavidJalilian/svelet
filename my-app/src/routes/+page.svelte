<script lang="ts">
	import { selections } from '$lib/store.ts';
import Button from '$lib/components/ui/button/button.svelte';
import Card from '$lib/components/ui/card/card.svelte';

console.log($selections)
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
function getRandomEmoji() {
 // Emoji Unicode ranges
 // Each range is an array where the first element is the start of the range and the second is the end.
 const ranges = [
  [0x1f601, 0x1f64f], // Emoticons
  [0x1f680, 0x1f6c0], // Transport & Map Symbols
  [0x1f300, 0x1f5ff] // Miscellaneous Symbols and Pictographs
  // ... add other ranges as needed
 ];

 // Select a random range
 const rangeIndex = Math.floor(Math.random() * ranges.length);
 const range = ranges[rangeIndex];

 // Select a random code point within the range
 const codePoint = Math.floor(Math.random() * (range[1] - range[0])) + range[0];

 // Convert the code point to an emoji
 return String.fromCodePoint(codePoint);
}

let data = Array.from({
 length: 10
}, getRandomEmoji).map((i) => ({
 emoji: i,
 id: crypto.randomUUID(),
	isActive:false,
}))
data=shuffle([...data,...data])
$:if ($selections.second === $selections.first){
  console.log('dude')
 data = data.map(item =>
    item.id === $selections.first ? {
     ...item,
     isActive: true
    } : item
   )
}
export const dataType=typeof data
</script>
<main class='h-full max-w-4xl m-auto'>

	<div class="grid grid-cols-3 sm:grid-cols-4 gap-2 h-full ">
		
		{#each data as item}
		<Card {...item}/>
		{/each}
	</div>
	
</main>

