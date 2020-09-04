# typelonger

<strong>WORK IN PROGRESS</strong>

## Motivation
I like to read, and I also like to practice touch typing to improve my speed and accuracy. Unfortunately, no solution exists that lets you performs these two activities at the same time in a convenient way. 

One of the most popular (and my personal favorite) online typing platforms is [TypeRacer](https://play.typeracer.com/). It lets you practice and compete against other users in typing races: you and a couple other players are given a text or a quote, and whoever types it in the fastest wins. TypeRacer also keeps track of your results: all of your individual race performances are documented and displayed on a graph, and also can be played back. Additionally, the average typing speed from your last 10 races is shown to you at all times. 

This sort of gamification - if you can even call it that - can potentially further motivate players to "grind" and improve on their skills. Make the numbers go up, make the graph become steeper.

My main gripe with TypeRacer is that it doesn't handle dialogue and multi-paragraph text very well. All formatting is thrown out the window and everything is merged into one huge paragraph - sometimes so huge that the interface has trouble displaying it properly. The recommended maximum size for new TypeRacer text contributions is a measly 600 characters. The lack of formatting may also worsen reading comprehension, and make it very difficult to follow dialogues.

<code>typelonger</code> aims to tackle this issue of mine by formatting the text similarly to how the source material is formatted, and theoretically allowing for infinitely long texts by the use of scrolling - the rate of which is tailored to the user's typing speed. 

It will also attempt to expand on the previously mentioned gamification elements.

## Main features
 - provide support for very long quotes/text (multiple pages long)
 - format prose paragraphs and dialogues in a way that provides a good reading and typing experience ([concept](https://i.imgur.com/fgaeZU3.png))
 - a clean, modern and customizable user interface that performs well
 - real-time multiplayer and matchmaking
 - "player aliases" - allowing users to create separate contexts within one account
 	- the player statistics for each alias are tracked separately
	- discourages multiaccounting
	- example use case: different aliases for different keyboard layouts, e.g. QWERTY and Colemak
 - tracking player statistics in singleplayer mode for non-premium users
 - a ranking metric which aims to represent a player's skill by calculating a score, based on the difficulty and length of a quote/text, and the player's performance on that quote/text (inspired
   by the [osu!](https://osu.ppy.sh/help/wiki/FAQ) Performance Points system)

## Potential setbacks
 - copyright infringement - a lot of books and publications are subjects of copyright, which may have a severe impact on the amount and range of books <code>typelonger</code> can use as source material


