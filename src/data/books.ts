export interface Chapter {
  id: number;
  title: string;
  content: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  coverImage: string;
  genre: string;
  description: string;
  rating: number;
  pages: number;
  chapters: Chapter[];
}

export const books: Book[] = [
  {
    id: "the-art-of-war",
    title: "The Art of War",
    author: "Sun Tzu",
    cover: "📕",
    coverImage: "https://image.qwenlm.ai/generated-images/f86181c4-8ed9-415b-805a-a77fd4c5b405/_result.png",
    genre: "Philosophy",
    description: "An ancient Chinese military treatise dating from the Late Spring and Autumn Period. The work is composed of 13 chapters, each devoted to a different set of arguments relating to warfare.",
    rating: 4.8,
    pages: 273,
    chapters: [
      {
        id: 1,
        title: "Laying Plans",
        content: `Sun Tzu said: The art of war is of vital importance to the State.

It is a matter of life and death, a road either to safety or to ruin. Hence it is a subject of inquiry which can on no account be neglected.

The art of war, then, is governed by five constant factors, to be taken into account in one's deliberations, when seeking to determine the conditions obtaining in the field.

These are: (1) The Moral Law; (2) Heaven; (3) Earth; (4) The Commander; (5) Method and discipline.

The Moral Law causes the people to be in complete accord with their ruler, so that they will follow him regardless of their lives, undismayed by any danger.

Heaven signifies night and day, cold and heat, times and seasons.

Earth comprises distances, great and small; danger and security; open ground and narrow passes; the chances of life and death.

The Commander stands for the virtues of wisdom, sincerity, benevolence, courage and strictness.

By Method and discipline are to be understood the marshaling of the army in its proper subdivisions, the graduations of rank among the officers, the maintenance of roads by which supplies may reach the army, and the control of military expenditure.

These five heads should be familiar to every general: he who knows them will be victorious; he who knows them not will fail.

Therefore, in your deliberations, when seeking to determine the conditions, let them be made the basis of a comparison, in this sense:

(1) Which of the two sovereigns is imbued with the Moral Law?
(2) Which of the two generals has most ability?
(3) With whom lie the advantages derived from Heaven and Earth?
(4) On which side is discipline most rigorously enforced?
(5) Which army is stronger?
(6) On which side are officers and men more highly trained?
(7) In which army is there the greater constancy both in reward and punishment?

By means of these seven considerations I can forecast victory or defeat.

The general that listens to my counsel and acts upon it, will conquer: let such a one be retained in command! The general that rejects my counsel and acts upon it, will fail: let such a one be dismissed!

While heeding the profit of my counsel, avail yourself also of any helpful circumstances over and beyond the ordinary rules.

According as circumstances are favorable, one should modify one's plans.

All warfare is based on deception.

Hence, when able to attack, we must seem unable; when using our forces, we must seem inactive; when we are near, we must make the enemy believe we are far away; when far away, we must make him believe we are near.

Hold out baits to entice the enemy. Feign disorder, and crush him.

If he is secure at all points, be prepared for him. If he is in superior strength, evade him.

If your opponent is of choleric temper, seek to irritate him. Pretend to be weak, that he may grow arrogant.

If he is taking his ease, give him no rest. If his forces are united, separate them.

Attack him where he is unprepared, appear where you are not expected.

These military devices, leading to victory, must not be divulged beforehand.

Now the general who wins a battle makes many calculations in his temple ere the battle is fought. The general who loses a battle makes but few calculations beforehand. Thus do many calculations lead to victory, and few calculations to defeat: how much more no calculation at all! It is by attention to this point that I can foresee who is likely to win or lose.`
      },
      {
        id: 2,
        title: "Waging War",
        content: `Sun Tzu said: In the operations of war, where there are in the field a thousand swift chariots, as many heavy chariots, and a hundred thousand mail-clad soldiers, with provisions enough to carry them a thousand li, the expenditure at home and at the front, including entertainment of guests, small items such as glue and paint, and sums spent on chariots and armor, will reach the total of a thousand ounces of silver per day. Such is the cost of raising an army of 100,000 men.

When you engage in actual fighting, if victory is long in coming, then men's weapons will grow dull and their ardor will be damped. If you lay siege to a town, you will exhaust your strength.

Again, if the campaign is protracted, the resources of the State will not be equal to the strain.

Now, when your weapons are dulled, your ardor damped, your strength exhausted and your treasure spent, other chieftains will spring up to take advantage of your extremity. Then no man, however wise, will be able to avert the consequences that must ensue.

Thus, though we have heard of stupid haste in war, cleverness has never been seen associated with long delays.

There is no instance of a country having benefited from prolonged warfare.

It is only one who is thoroughly acquainted with the evils of war that can thoroughly understand the profitable way of carrying it on.

The skillful soldier does not raise a second levy, neither are his supply-wagons loaded more than twice.

Bring war material with you from home, but forage on the enemy. Thus the army will have food enough for its needs.

Poverty of the State exchequer causes an army to be maintained by contributions from a distance. Contributing to maintain an army at a distance causes the people to be impoverished.

On the other hand, the proximity of an army causes prices to go up; and high prices cause the people's substance to be drained away.

When their substance is drained away, the peasantry will be afflicted by heavy exactions.

With this loss of substance and exhaustion of strength, the homes of the people will be stripped bare, and three-tenths of their income will be dissipated; while government expenses for broken chariots, worn-out horses, breast-plates and helmets, bows and arrows, spears and shields, protective mantles, draught oxen and heavy wagons, will amount to four-tenths of its total revenue.

Hence a wise general makes a point of foraging on the enemy. One cartload of the enemy's provisions is equivalent to twenty of one's own, and likewise a single picul of his provender is equivalent to twenty from one's own store.

Now in order to kill the enemy, our men must be roused to anger; that there may be advantage from defeating the enemy, they must have their rewards.

Therefore in chariot fighting, when ten or more chariots have been taken, those should be rewarded who took the first. Our own flags should be substituted for those of the enemy, and the chariots mingled and used in conjunction with ours. The captured soldiers should be kindly treated and kept.

This is called, using the conquered foe to augment one's own strength.

In war, then, let your great object be victory, not lengthy campaigns.

Thus it may be known that the leader of armies is the arbiter of the people's fate; the man on whom it depends whether the nation shall be in peace or in peril.`
      },
      {
        id: 3,
        title: "Attack by Stratagem",
        content: `Sun Tzu said: In the practical art of war, the best thing of all is to take the enemy's country whole and intact; to shatter and destroy it is not so good. So, too, it is better to recapture an army entire than to destroy it, to capture a regiment, a detachment or a company entire than to destroy them.

Hence to fight and conquer in all your battles is not supreme excellence; supreme excellence consists in breaking the enemy's resistance without fighting.

Thus the highest form of generalship is to balk the enemy's plans; the next best is to prevent the junction of the enemy's forces; the next in order is to attack the enemy's army in the field; and the worst policy of all is to besiege walled cities.

The rule is, not to besiege walled cities if it can possibly be avoided. The preparation of mantlets, movable shelters, and various implements of war, will take up three whole months; and the piling up of mounds over against the walls will take three months more.

The general, unable to control his irritation, will launch his men to the assault like swarming ants, with the result that one-third of his men are slain, while the town still remains untaken. Such are the disastrous effects of a siege.

Therefore the skillful leader subdues the enemy's troops without any fighting; he captures their cities without laying siege to them; he overthrows their kingdom without lengthy operations in the field.

With his forces intact he will dispute the mastery of the Empire, and thus, without losing a man, his triumph will be complete. This is the method of attacking by stratagem.

It is the rule in war, if our forces are ten to the enemy's one, to surround him; if five to one, to attack him; if twice his strength, to divide our army into two.

If equally matched, we can offer battle; if slightly inferior in numbers, we can avoid the enemy; if quite unequal in every way, we can flee from him.

Hence, though an obstinate fight may be made by a small force, in the end it must be captured by the larger force.

Now the general is the bulwark of the State; if the bulwark is complete at all points, the State will be strong; if the bulwark is defective, the State will be weak.

There are three ways in which a ruler can bring misfortune upon his army:

(1) By commanding the army to advance or to retreat, being ignorant of the fact that it cannot obey. This is called hobbling the army.

(2) By attempting to govern an army in the same way as he administers a kingdom, being ignorant of the conditions which obtain in an army. This causes restlessness in the soldier's minds.

(3) By employing the officers of his army without discrimination, through ignorance of the military principle of adaptation to circumstances. This shakes the confidence of the soldiers.

But when the army is restless and distrustful, trouble is sure to come from the other feudal princes. This is simply bringing anarchy into the army, and flinging victory away.

Thus we may know that there are five essentials for victory:
(1) He will win who knows when to fight and when not to fight.
(2) He will win who knows how to handle both superior and inferior forces.
(3) He will win whose army is animated by the same spirit throughout all its ranks.
(4) He will win who, prepared himself, waits to take the enemy unprepared.
(5) He will win who has military capacity and is not interfered with by the sovereign.

Hence the saying: If you know the enemy and know yourself, you need not fear the result of a hundred battles. If you know yourself but not the enemy, for every victory gained you will also suffer a defeat. If you know neither the enemy nor yourself, you will succumb in every battle.`
      }
    ]
  },
  {
    id: "meditations",
    title: "Meditations",
    author: "Marcus Aurelius",
    cover: "📘",
    coverImage: "https://image.qwenlm.ai/generated-images/9d46058e-461f-4ef8-bd2f-26ced5a0aca4/_result.png",
    genre: "Philosophy",
    description: "Written in Greek by the Roman Emperor Marcus Aurelius between 161 and 180 AD, Meditations is a series of personal writings and notes to himself, setting forth his ideas on Stoic philosophy.",
    rating: 4.7,
    pages: 254,
    chapters: [
      {
        id: 1,
        title: "Book One - Debts and Lessons",
        content: `From my grandfather Verus I learned good morals and the government of my temper.

From the reputation and remembrance of my father, modesty and a manly character.

From my mother, piety and beneficence, and abstinence, not only from evil deeds, but even from evil thoughts; and further, simplicity in my way of living, far removed from the habits of the rich.

From my great-grandfather, not to have frequently attended lectures in public, and the feeling that on such occasions I have what I want, and that I do not wish to trouble my instructors.

From my governor, to be neither of the green nor of the blue party at the games in the Circus and the Arena, and to be able to endure labor and not to require many things; to serve myself without troubling others; not to intermeddle in affairs of others, and not easily to listen to slander against them.

From Diognetus, not to busy myself about trifling things, and not to give credit to what was said by miracle-workers and jugglers about incantations and the driving away of demons and such things; and not to breed quails or to be excited about such things; and to endure freedom of speech; and to have become intimate with philosophy; and to have been a hearer, first of Bacchius, then of Tandasis and Marcianus; and to have written dialogues in my youth; and to have desired a plank bed and skin, and whatever else of the kind belongs to the Grecian discipline.

From Rusticus I received the impression that my character required correction and cure; and from him I learned to be careful not to be led into a sophistic emulation, nor to writing on speculative matters, nor to delivering little hortatory orations, nor to showing myself off as a man who practices certain disciplines, exercises himself in virtue, or does any such thing; and to abstain from rhetoric, poetry, and fine writing; and not to walk about in the house in my outdoor dress, nor to do such things; and to write plainly; and to apply myself carefully to those who philosophized with me, both to understand what they said and to be an expert in the things themselves.

From Apollonius I learned true liberty and tenacity of purpose; and to regard nothing else, not even in a slight degree, except reason always; and to be always the same, in sharp pain, in the loss of a child, in long illness; and to see clearly in a living example that the same man can be both most decided and most gentle, and patient in the giving of instruction; and to have had little vexation when I met with an experienced teacher; and that I have not been led to pay court to any one of my pupils, nor to have been led to do this to any other person.

From Sextus, a benevolent disposition, and the example of a family governed in a fatherly manner, and the idea of living conformably to nature; and gravity without affectation, and to have carefully observed the dispositions of friends, and not to have been offended with ignorant persons, and not to have been satisfied with a superficial acquaintance with anything.

From Alexander the grammarian, to be free from fault-finding, and not in a reproachful way to point out those who use incorrect expressions, or drop an aspirate, or have a bad accent; but by the very manner of speech to show the right thing, or to confirm by an answer, or by adding the right word itself, or by some other such way.

From Fronto I learned to observe what envy, and duplicity, and hypocrisy are in a tyrant, and that generally those who are called patricians are rather deficient in paternal affection.

From Alexander the Platonic, not frequently nor without necessity to say to any one, or to write in a letter, "I have no leisure," nor continually to excuse the neglect of duties required by our relation to those with whom we live, by alleging urgent occupations.

From Catulus, not to be indifferent when a friend finds fault, even if he should find fault without reason, but to be ready to restore him to his usual disposition; and to be well disposed to teachers, as it is recorded of Domitius and Athenodotus; and to love my children truly.

From my brother Severus, to love my kin, and to love truth, and to love justice; and from him, above all things, I learned to have a kind of equal liberty, and to prefer the good of all men before any other thing; and from him too, an unshaken perseverance in the affection for philosophy; and a beneficent disposition and well-grounded hope; and a confidence that the thoughts of other men are visible to him; while he made no pretensions to superiority, but allowed me to imagine that I possessed this advantage.

From him too I learned a steady disposition in friendship, and not to be offended with those who are frank in their objections, and to be pleased at seeing clearly the character of one's friends.`
      },
      {
        id: 2,
        title: "Book Two - On the River Arno",
        content: `Begin the morning by saying to thyself, I shall meet with the busybody, the ungrateful, arrogant, deceitful, envious, unsocial. All these things happen to them by reason of their ignorance of what is good and evil. But I who have seen that the nature of good is beautiful, and the nature of evil is ugly, and the nature of him who does wrong is akin to me, not only of the same blood or seed, but that it participates in the same intelligence and the same portion of the divinity, I can neither be injured by any of them, for no one can fix on me what is ugly, nor can I be angry with my kinsman, nor hate him. For we are made for cooperation, like feet, like hands, like eyelids, like the rows of the upper and lower teeth. To act against one another then is contrary to nature; and it is acting against one another to be vexed and to turn away.

Remember that the universe is change, and life is opinion.

If it is not right, do not do it; if it is not true, do not say it.

Let it make no difference to thee whether thou art cold or warm, if thou art doing thy duty; and whether thou art drowsy or satisfied with sleep; and whether ill-spoken of or praised; and whether dying or doing something else. For it is one of the acts of life, this act by which we die; it is sufficient then in this act also to do well what we have in hand.

Waste no more time arguing about what a good man should be. Be one.

Think of yourself as dead. You have lived your life. Now, take what's left and live it properly.

The happiness of your life depends upon the quality of your thoughts.

The best revenge is to be unlike him who performed the injury.

Reject your sense of injury and the injury itself disappears.

When you arise in the morning, think of what a precious privilege it is to be alive - to breathe, to think, to enjoy, to love.

You have power over your mind - not outside events. Realize this, and you will find strength.

If someone is able to show me that what I think or do is not right, I will happily change, for I seek the truth, by which no one was ever truly harmed. Such is the person who is harmed by being deceived and ignorant.

The object of life is not to be on the side of the majority, but to escape finding oneself in the ranks of the insane.

Confine yourself to the present.

How much time he saves who does not look to see what his neighbor says or does or thinks.

The universe is change; our life is what our thoughts make it.

Accept the things to which fate binds you, and love the people with whom fate brings you together, but do so with all your heart.

Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.

Very little is needed to make a happy life; it is all within yourself, in your way of thinking.

When you are offended at any man's fault, turn to yourself and study your own failings. Then you will forget your anger.`
      }
    ]
  },
  {
    id: "alice-in-wonderland",
    title: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll",
    cover: "📗",
    coverImage: "https://image.qwenlm.ai/generated-images/f6010121-3e4b-4327-9816-d99043b99b0b/_result.png",
    genre: "Fiction",
    description: "Alice's Adventures in Wonderland is an 1865 English novel by Lewis Carroll. It details the story of a young girl named Alice, who falls through a rabbit hole into a subterranean fantasy world.",
    rating: 4.5,
    pages: 192,
    chapters: [
      {
        id: 1,
        title: "Down the Rabbit-Hole",
        content: `Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, 'and what is the use of a book,' thought Alice 'without pictures or conversations?'

So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.

There was nothing so VERY remarkable in that; nor did Alice think it so VERY much out of the way to hear the Rabbit say to itself, 'Oh dear! Oh dear! I shall be late!' (when she thought it over afterwards, it occurred to her that she ought to have wondered at this, but at the time it all seemed quite natural); but when the Rabbit actually TOOK A WATCH OUT OF ITS WAISTCOAT-POCKET, and looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it, and burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge.

In another moment down went Alice after it, never once considering how in the world she was to get out again.

The rabbit-hole went straight on like a tunnel for some way, and then dipped suddenly down, so suddenly that Alice had not a moment to think about stopping herself before she found herself falling down a very deep well.

Either the well was very deep, or she fell very slowly, for she had plenty of time as she went down to look about her and to wonder what was going to happen next. First, she tried to look down and make out what she was coming to, but it was too dark to see anything; then she looked at the sides of the well, and noticed that they were filled with cupboards and book-shelves; here and there she saw maps and pictures hung upon pegs. She took down a jar from one of the shelves as she passed; it was labelled 'ORANGE MARMALADE', but to her great disappointment it was empty: she did not like to drop the jar for fear of killing somebody, so managed to put it into one of the cupboards as she fell past it.

'Well!' thought Alice to herself, 'after a fall like this, I shall think nothing of tumbling down stairs! How brave they'll all think me at home! Why, I wouldn't say anything about it, even if I fell off the top of the house!' (Which was very likely true.)

Down, down, down. Would the fall NEVER come to an end! 'I wonder how many miles I've fallen by this time?' she said aloud. 'I must be getting somewhere near the centre of the earth. Let me see: that would be four thousand miles down, I think—' (for, you see, Alice had learnt several things of this sort in her lessons in the schoolroom, and though this was not a VERY good opportunity for showing off her knowledge, as there was no one to listen to her, still it was good practice to say it over) '—yes, that's about the right distance—but then I wonder what Latitude or Longitude I've got to?' (Alice had no idea what Latitude was, or Longitude either, but thought they were nice grand words to say.)

Presently she began again. 'I wonder if I shall fall right THROUGH the earth! How funny it'll seem to come out among the people that walk with their heads downward! The Antipathies, I think—' (she was rather glad there WAS no one listening, this time, as it didn't sound at all the right word) '—but I shall have to ask them what the name of the country is, you know. Please, Ma'am, is this New Zealand or Australia?' (and she tried to curtsey as she spoke—fancy CURTSEYING as you're falling through the air! Do you think you could manage it?) 'And what an ignorant little girl she'll think me for asking! No, it'll never do to ask: perhaps I shall see it written up somewhere.'

Down, down, down. There was nothing else to do, so Alice soon began talking again. 'Dinah'll miss me very much to-night, I should think!' (Dinah was the cat.) 'I hope they'll remember her saucer of milk at tea-time. Dinah my dear! I wish you were down here with me! There are no mice in the air, I'm afraid, but you might catch a bat, and that's very like a mouse, you know. But do cats eat bats, I wonder?' And here Alice began to get rather sleepy, and went on saying to herself, in a dreamy sort of way, 'Do cats eat bats? Do cats eat bats?' and sometimes, 'Do bats eat cats?' for, you see, as she couldn't answer either question, it didn't much matter which way she put it. She felt that she was dozing off, and had just begun to dream that she was walking hand in hand with Dinah, and saying to her very earnestly, 'Now, Dinah, tell me the truth: did you ever eat a bat?' when suddenly, thump! thump! down she came upon a heap of sticks and dry leaves, and the fall was over.`
      },
      {
        id: 2,
        title: "The Pool of Tears",
        content: `'Curiouser and curiouser!' cried Alice (she was so much surprised, that for the moment she quite forgot how to speak good English); 'now I'm opening out like the largest telescope that ever was! Good-bye, feet!' (for when she looked down at her feet, they seemed to be almost out of sight, they were getting so far off). 'Oh, my poor little feet, I wonder who will put on your shoes and stockings for you now, dears? I'm sure I shan't be able! I shall be a great deal too far off to trouble myself about you: you must manage the best way you can;—but I must be kind to them,' thought Alice, 'or perhaps they won't walk the way I want to go! Let me see: I'll give them a new pair of boots every Christmas.'

And she went on planning to herself how she would manage it. 'They must go by the carrier,' she thought; 'and how funny it'll seem, sending presents to one's own feet! And how odd the directions will look!

     Alice's Right Foot, Esq.
       Hearthrug,
         near The Fender,
           (with Alice's love).

Oh dear, what nonsense I'm talking!'

Just then her head struck against the roof of the hall: in fact she was now more than nine feet high, and she at once took up the little golden key and hurried off to the garden door.

Poor Alice! It was as much as she could do, lying down on one side, to look through into the garden with one eye; but to get through was more hopeless than ever: she sat down and began to cry again.

'You ought to be ashamed of yourself,' said Alice, 'a great girl like you,' (she might well say this), 'to go on crying in this way! Stop this moment, I tell you!' But she went on all the same, shedding gallons of tears, until there was a large pool all round her, about four inches deep and reaching half down the hall.

After a time she heard a little pattering of feet in the distance, and she hastily dried her eyes to see what was coming. It was the White Rabbit returning, splendidly dressed, with a pair of white kid gloves in one hand and a large fan in the other: he came trotting along in a great hurry, muttering to himself as he came, 'Oh! the Duchess, the Duchess! Oh! won't she be savage if I've kept her waiting!'

Alice felt so desperate that she was ready to ask help of any one; so, when the Rabbit was near her, she began, in a low, timid voice, 'If you please, sir—' The Rabbit started violently, dropped the white kid gloves and the fan, and skurried away into the darkness as hard as he could go.

Alice took up the fan and gloves, and, as the hall was very hot, she kept fanning herself all the time she went on talking: 'Dear, dear! How queer everything is to-day! And yesterday things went on just as usual. I wonder if I've been changed in the night? Let me think: was I the same when I got up this morning? I almost think I can remember feeling a little different. But if I'm not the same, the next question is, Who in the world am I? Ah, THAT'S the great puzzle!' And she began thinking over all the children she knew that were of the same age as herself, to see if she could have been changed for any of them.

'I'm sure I'm not Ada,' she said, 'for her hair goes in such long ringlets, and mine doesn't go in ringlets at all; and I'm sure I can't be Mabel, for I know all sorts of things, and she, oh! she knows such a very little! Besides, SHE'S she, and I'm I, and—oh dear, how puzzling it all is! I'll try if I know all the things I used to know. Let me see: four times five is twelve, and four times six is thirteen, and four times seven is—oh dear! I shall never get to twenty at that rate! However, the Multiplication Table doesn't signify: let's try Geography. London is the capital of Paris, and Paris is the capital of Rome, and Rome—no, THAT'S all wrong, I'm certain! I must have been changed for Mabel! I'll try and say "How doth the little—"' and she crossed her hands on her lap as if she were saying lessons, and began to repeat it, but her voice sounded hoarse and strange, and the words did not come the same as they used to do:—

     'How doth the little crocodile
      Improve his shining tail,
     And pour the waters of the Nile
      On every golden scale!

     'How cheerfully he seems to grin,
      How neatly spread his claws,
     And welcome little fishes in
      With gently smiling jaws!'

'I'm sure those are not the right words,' said poor Alice, and her eyes filled with tears again as she went on, 'I must be Mabel after all, and I shall have to go and live in that poky little house, and have next to no toys to play with, and oh! ever so many lessons to learn! No, I've made up my mind about it; if I'm Mabel, I'll stay down here! It'll be no use their putting their heads down and saying "Come up again, dear!" I shall only look up and say "Who am I then? Tell me that first, and then, if I like being that person, I'll come up: if not, I'll stay down here till I'm somebody else"—but, oh dear!' cried Alice, with a sudden burst of tears, 'I do wish they WOULD put their heads down! I am so VERY tired of being all alone here!'

As she said this she looked down at her hands, and was surprised to see that she had put on one of the Rabbit's little white kid gloves while she was talking. 'How CAN I have done that?' she thought. 'I must be growing small again.' She got up and went to the table to measure herself by it, and found that, as nearly as she could guess, she was now about two feet high, and was going on shrinking rapidly: she soon found out that the cause of this was the fan she was holding, and she dropped it hastily, just in time to avoid shrinking away altogether.`
      }
    ]
  },
  {
    id: "sherlock-holmes",
    title: "A Study in Scarlet",
    author: "Arthur Conan Doyle",
    cover: "📙",
    coverImage: "https://image.qwenlm.ai/generated-images/b55af155-1403-4423-b625-df3addb67844/_result.png",
    genre: "Mystery",
    description: "A Study in Scarlet is an 1887 detective novel by British writer Arthur Conan Doyle. The story marks the first appearance of Sherlock Holmes and his companion Dr. John Watson.",
    rating: 4.6,
    pages: 156,
    chapters: [
      {
        id: 1,
        title: "Mr. Sherlock Holmes",
        content: `In the year 1878 I took my degree of Doctor of Medicine of the University of London, and proceeded to Netley to go through the course prescribed for surgeons in the army. Having completed my studies there, I was duly attached to the Fifth Northumberland Fusiliers as Assistant Surgeon. The regiment was stationed in India at the time, and before I could join it, the second Afghan war had broken out. On landing at Bombay, I learned that my corps had advanced through the passes, and was already deep in the enemy's country. I followed, however, with many other officers who were in the same situation as myself, and succeeded in reaching Candahar safely, where I found my regiment, and at once entered upon my new duties.

The campaign brought honours and promotion to many, but for me it had nothing but misfortune and disaster. I was removed from my brigade and attached to the Berkshires, with whom I served at the fatal battle of Maiwand. There I was struck on the shoulder by a Jezail bullet, which shattered the bone and grazed the subclavian artery. I should have fallen into the hands of the murderous Ghazis had it not been for the devotion and courage shown by Murray, my orderly, who threw me across a pack-horse, and succeeded in bringing me safely to the British lines.

Worn with pain, and weakened by long illness, I was brought back, with a crowd of wounded, to the base hospital at Peshawar. Here I rallied, and was already so far improved as to be able to walk about the wards, and even to take a little exercise on the veranda, when I was struck down by enteric fever, that curse of our Indian possessions. For months my life was despaired of, and when at last I came to myself and became convalescent, I was so weak and emaciated that a medical board determined that not a day should be lost in sending me back to England. I was despatched, accordingly, in the troopship "Orontes," and landed a month later on Portsmouth jetty, with my health irretrievably ruined, but with permission from a paternal government to spend the next nine months in attempting to improve it.

I had neither kith nor kin in England, and was therefore as free as air—or rather, free to spend nine shillings and sixpence a day in the metropolis of Great Britain. Under such circumstances, I naturally gravitated to London, that great cesspool into which all the loungers and idlers of the Empire are irresistibly drained. There I stayed for some time at a private hotel in the Strand, leading a comfortless, meaningless existence, and spending such money as I had, considerably more than I ought. So alarming did the state of my finances become, that I soon realized that I must either leave the metropolis and rusticate somewhere in the country, or that I must make a complete alteration in my style of living. Choosing the latter alternative, I began by making up my mind to leave the hotel, and to take up some less pretentious and less expensive domicile.

On the very day that I had come to this conclusion, I was standing at the Criterion Bar, when some one tapped me on the shoulder, and turning round I recognized young Stamford, who had been a dresser under me at Bart's. The sight of a friendly face in the great wilderness of London is a pleasant thing indeed to a lonely man. In old days I had never been particularly intimate with him, but I now hailed him with enthusiasm. He, in his turn, seemed as delighted to see me. In the exuberance of my joy, I asked him to lunch with me at the Holborn, and we started off together in a hansom.

"Whatever have you been doing, Watson?" he asked in undisguised wonder, as we rattled through the crowded London streets. "You are as thin as a lath and as brown as a nut."

I gave him a short sketch of my adventures, and had concluded it by the time we arrived at our destination.

"Poor devil!" he said, commiserating me, after he had listened to my misfortunes. "What are you up to now?"

"Looking for lodgings," I answered. "Trying to solve the problem whether it is possible to get comfortable rooms at a reasonable price."

"That's a strange thing," remarked my companion; "you are the second man to-day that I have heard use the word in the same sense."

"Well, who is the other?" I asked.

"A fellow who is working at the chemical laboratory up at the hospital. He was bemoaning himself this morning because he could not get someone to go halves with him in some nice rooms which he had found, and which were too much for his purse."

"By Jove!" I cried; "if he really wants someone to share the rooms and the expense, I am the very man. I should prefer a partner to being alone."

Young Stamford looked rather strangely at me over his wine-glass. "You don't know Sherlock Holmes yet," he said; "perhaps you would not care for him as a constant companion."

"Why, what is there against him?"

"Oh, I didn't say there was anything against him. He is a little queer in his ideas—an enthusiast in some branches of science. As far as I know he is a decent fellow enough."

"A medical student, I suppose?" said I.

"No—I have no idea what he intends to go in for. I believe he is well up in anatomy, and he is a first-class chemist; but, as far as I know, he has never taken out any regular medical classes. His studies are very desultory and eccentric, but he has amassed a lot of out-of-the way knowledge which would astonish his professors."

"What brought him to London?" I asked.

"I found him in the laboratory; and since then I have never seen him. I should not be surprised if he were a man who had some secret reason for keeping himself dark."

I expressed my eagerness to meet him, and Stamford promised to introduce us.`
      }
    ]
  },
  {
    id: "pride-and-prejudice",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "📕",
    coverImage: "https://image.qwenlm.ai/generated-images/13ed3582-55fb-491e-a340-99174af67400/_result.png",
    genre: "Romance",
    description: "Pride and Prejudice is a romantic novel of manners written by Jane Austen in 1813. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist who learns about the repercussions of hasty judgments.",
    rating: 4.7,
    pages: 432,
    chapters: [
      {
        id: 1,
        title: "Chapter 1",
        content: `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.

However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered as the rightful property of some one or other of their daughters.

"My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?"

Mr. Bennet replied that he had not.

"But it is," returned she; "for Mrs. Long has just been here, and she told me all about it."

Mr. Bennet made no answer.

"Do not you want to know who has taken it?" cried his wife impatiently.

"You want to tell me, and I have no objection to hearing it."

This was invitation enough.

"Why, my dear, you must know, Mrs. Long says that Netherfield is taken by a young man of large fortune from the north of England; that he came down on Monday in a chaise and four to see the place, and was so much delighted with it that he agreed with Mr. Morris immediately; that he is to take possession before Michaelmas, and some of his servants are to be in the house by the end of next week."

"What is his name?"

"Bingley."

"Is he married or single?"

"Oh! single, my dear, to be sure! A single man of large fortune; four or five thousand a year. What a fine thing for our girls!"

"How so? how can it affect them?"

"My dear Mr. Bennet," replied his wife, "how can you be so tiresome! You must know that I am thinking of his marrying one of them."

"Is that his design in settling here?"

"Design! nonsense, how can you talk so! But it is very likely that he may fall in love with one of them, and therefore you must visit him as soon as he comes."

"I see no occasion for that. You and the girls may go—or you may send them by themselves, which perhaps will be still better; for as you are as handsome as any of them, Mr. Bingley might like you the best of the party."

"My dear, you flatter me. I certainly have had my share of beauty, but I do not pretend to be anything extraordinary now. When a woman has five grown-up daughters, she ought to give over thinking of her own beauty."

"In such cases, a woman has not often much beauty to think of."

"But, my dear, you must indeed go and see Mr. Bingley when he comes into the neighbourhood."

"It is more than I engage for, I assure you."

"But consider your daughters. Only think what an establishment it would be for one of them. Sir William and Lady Lucas are determined to go, merely on that account, for in general, you know, they visit no newcomers. Indeed you must go, for it will be impossible for us to visit him, if you do not."

"You are over-scrupulous, surely. I dare say Mr. Bingley will not mind it; and I am sure he is so very discreet, and so very agreeable, that I have no doubt he will put up with it. I shall go."

Mr. Bennet was so odd a mixture of quick parts, sarcastic humour, reserve, and caprice, that the experience of three-and-twenty years had been insufficient to make his wife understand his character. Her mind was less difficult to develop. She was a woman of mean understanding, little information, and uncertain temper. When she was discontented, she fancied herself nervous. The business of her life was to get her daughters married; its solace was visiting and news.`
      }
    ]
  },
  {
    id: "the-great-gatsby",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "📗",
    coverImage: "https://image.qwenlm.ai/generated-images/0d130ce7-3e16-4d74-9345-1faa96d26e05/_result.png",
    genre: "Fiction",
    description: "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby.",
    rating: 4.4,
    pages: 180,
    chapters: [
      {
        id: 1,
        title: "Chapter 1",
        content: `In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.

"Whenever you feel like criticizing anyone," he told me, "just remember that all the people in this world haven't had the advantages that you've had."

He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I'm inclined to reserve all judgments, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores. The abnormal mind is quick to detect and attach itself to this quality when it appears in a normal person, and so it came about that in college I was unjustly accused of being a politician, because I was privy to the secret griefs of wild, unknown men. Most of the confidences were unsought—frequently I have feigned sleep, preoccupation, or a hostile levity when I realized by some unmistakable sign that an intimate revelation was quivering on the horizon; for the intimate revelations of young men, or at least the terms in which they express them, are usually plagiaristic and marred by obvious suppressions. Reserving judgments is a matter of infinite hope. I am still a little afraid of missing something if I forget that, as my father snobbishly suggested, and I snobbishly repeat, a sense of the fundamental decencies is parcelled out unequally at birth.

And, after boasting this way of my tolerance, I come to the admission that it has a limit. Conduct may be founded on the hard rock or the wet marshes, but after a certain point I don't care what it's founded on. When I came back from the East last autumn I felt that I wanted the world to be in uniform and at a sort of moral attention forever; I wanted no more riotous excursions with privileged glimpses into the human heart. Only Gatsby, the man who gives his name to this book, was exempt from my reaction—Gatsby, who represented everything for which I have an unaffected scorn. If personality is an unbroken series of successful gestures, then there was something gorgeous about him, some heightened sensitivity to the promises of life, as if he were related to one of those intricate machines that register earthquakes ten thousand miles away. This responsiveness had nothing to do with that flabby impressionability which is dignified under the name of the "creative temperament"—it was an extraordinary gift for hope, a romantic readiness such as I have never found in any other person and which it is not likely I shall ever find again. No—Gatsby turned out all right at the end; it is what preyed on Gatsby, what foul dust floated in the wake of his dreams that temporarily closed out my interest in the abortive sorrows and short-winded elations of men.

My family have been prominent, well-to-do people in this Middle Western city for three generations. The Carraways are something of a clan, and we have a tradition that we're descended from the Dukes of Buccleuch, but the actual founder of my line was my grandfather's brother, who came here in fifty-one, sent a substitute to the Civil War, and started the wholesale hardware business that my father carries on today.

I never saw this great-uncle, but I'm supposed to look like him—with special reference to the rather hard-boiled painting that hangs in father's office. I graduated from New Haven in 1915, just a quarter of a century after my father, and a little later I participated in that delayed Teutonic migration known as the Great War. I enjoyed the counter-raid so thoroughly that I came back restless. Instead of being the warm centre of the world, the Middle West now seemed like the ragged edge of the universe—so I decided to go East and learn the bond business. Everybody I knew was in the bond business, so I supposed it could support one more single man. All my aunts and uncles talked it over as if they were choosing a prep school for me, and finally said, "Why—ye-es," with very grave, hesitant faces. Father agreed to finance me for a year, and after various delays I came East, permanently, I thought, in the spring of twenty-two.

The practical thing was to find rooms in the city, but it was a warm season, and I had just left a country of wide lawns and friendly trees, so when a young man at the office suggested that we take a house together in a commuting town, it sounded like a great idea. He found the house, a weather-beaten cardboard bungalow at eighty a month, but at the last minute the firm ordered him to Washington, and I went out to the country alone. I had a dog—at least I had him for a few days until he ran away—and an old Dodge and a Finnish woman, who made my bed and cooked breakfast and muttered Finnish advice to herself over the electric stove, and a day or two of twenty men invading the front lawn with traffic problems.

My next-door neighbour was a house belonging to some enormously wealthy young fellow who had just come to New York. There was a factual imitation of some Hôtel de Ville in Normandy, with a tower on one side, spanking new under a thin beard of raw ivy, and a marble swimming pool, and more than forty acres of lawn and garden. It was Gatsby's mansion. Or, rather, as I didn't know Mr. Gatsby, it was a mansion inhabited by a gentleman of that name. My own house was an eyesore, but it was a small eyesore, and it had been overlooked, so I had a view of the water, a partial view of my neighbour's lawn, and the consoling proximity of millionaires—all for eighty dollars a month.

Across the courtesy bay the white palaces of fashionable East Egg glittered along the water, and the history of the summer really begins on the evening I drove over there to have dinner with the Tom Buchanans. Daisy was my second cousin once removed, and I'd known Tom in college. And just after the war I spent two days with them in Chicago.

Her husband, among various physical accomplishments, had been one of the most powerful ends that ever played football at New Haven—a national figure in a way, one of those men who reach such an acute limited excellence at twenty-one that everything afterward savours of anticlimax. His family were enormously wealthy—even in college his freedom with money was a matter for reproach—but now he'd left Chicago and come East in a fashion that rather took your breath away: for instance, he'd brought down a string of polo ponies from Lake Forest. It was hard to realize that a man in my own generation was wealthy enough to do that.

Why they came East I don't know. They had spent a year in France for no particular reason, and then drifted here and there unrestfully wherever people played polo and were rich together. This was a permanent move, said Daisy over the telephone, but I didn't believe it—I had no sight into Daisy's heart, but I felt that Tom would drift on forever seeking, a little wistfully, for the dramatic turbulence of some irrecoverable football game.`
      }
    ]
  },
  {
    id: "don-quixote",
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    cover: "📙",
    coverImage: "https://image.qwenlm.ai/generated-images/bd1e4698-68c8-4c25-80f1-bf3fb772df4d/_result.png",
    genre: "Fiction",
    description: "Don Quixote is a Spanish novel by Miguel de Cervantes. It is regarded as the most influential work of literature from the Spanish Golden Age and the entire Spanish literary canon.",
    rating: 4.3,
    pages: 863,
    chapters: [
      {
        id: 1,
        title: "Chapter 1 - Which treats of the character and pursuits of the famous gentleman Don Quixote of La Mancha",
        content: `In a village of La Mancha, the name of which I have no desire to call to mind, there lived, not long since, one of those gentlemen that keep a lance in the lance-rack, an old buckler, a lean hack, and a greyhound for coursing. An olla of rather more beef than mutton, a salad on most nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra on Sundays, made away with three-quarters of his income. The rest of it went in a doublet of fine cloth and velvet breeches and shoes to match for holidays, while on week-days he made a brave figure in his best homespun. He had in his house a housekeeper past forty, a niece under twenty, and a lad for the field and market-place, who used to saddle the hack as well as handle the bill-hook. The above-mentioned age of our gentleman bordered upon fifty; he was of a hardy habit, spare, gaunt-featured, a very early riser and a great sportsman. They will have it his surname was Quixada or Quesada, for herein there is some difference of opinion among the authors who treat of the subject; although from very probable conjectures it may be gathered that he was called Quexana. This, however, is of but little importance to our tale; it will be enough not to stray a hair's breadth from the truth in the telling of it.

You must know, then, that the above-named gentleman whenever he was at leisure (which was mostly all the year round) gave himself up to reading books of chivalry with such ardour and avidity that he almost entirely neglected the pursuit of his field-sports, and even the management of his property; and to such a point did his eagerness and infatuation go that he sold many an acre of tillageland to buy books of chivalry to read, and brought home as many as he could get of them.

And of all of them none pleased him so much as those composed by the famous Feliciano de Silva, for the clearness of his prose and those intricate reasonings of his seemed to him pearls of price, especially when he came to read the challenges and letters of defiance, in which he found written: "The reason of the unreason that is done to my reason so weakens my reason that with reason I complain of your beauty."

Or again: "The high heavens that with your divinity divinely fortify you with the stars, make you meritorious of the merit your highness deserves."

The poor gentleman lost his wits over trying to understand them, and to extract the meaning from them that even Aristotle himself, if he came to life again for that special purpose, would not make out or comprehend. He was not very well satisfied with the wounds Don Belianis gave and received, because he thought that, however cleverly the surgeons might cure him, he would not escape being covered all over with scars and marks on his face and body; although, however, he praised the author for concluding his book with the promise of that interminable adventure, and more than once he was tempted to take up the pen and finish it himself, as is there proposed, and he would have certainly done so, and even carried it out, had he not been diverted from it by other and more important thoughts.

He had many a quarrel with the curate of his village (a learned man and a graduate of Siguenza) as to which was the better knight, Palmerin of England or Amadis of Gaul; but Master Nicholas, the barber of the same place, used to say that none came up to the Knight of Phoebus, and that if there was any one to compare with him it was Don Galaor, the brother of Amadis of Gaul, because he was a man for everything, not a dainty knight, or lachrymose like his brother, and in matters of valour no whit behind him.

In short, he became so absorbed in his books that he spent the night reading from dusk till dawn, and the day from dawn till dusk, until so little sleep and so much reading dried up his brain and caused him to lose his wits. His fancy became filled with all that he read in them, enchantments, quarrels, battles, challenges, wounds, wooings, loves, distresses, and absurdities of impossible sort; and the stuff he read got so deeply into his mind that he came to believe no story in the world so true as the most impossible inventions of those he read.

He used to say that the Cid Ruy Diaz was a very good knight, but that he was not to be compared with the Knight of the Burning Sword, who with a single back-stroke cut in half two fierce and monstrous giants. Better still did he agree with Bernardo del Carpio, because at Roncesvalles he slew the enchanted Roland, availing himself of the device of Hercules when he strangled Antaeus between his arms.

He used to praise highly the giant Morgante, because, although he was of the giant race and therefore arrogant, he was affable and well-bred. But above all he approved of Reinaldos of Montalban, and still more of his marvellous invention, the wooden horse that he used to carry about with him, and which carried him through the air as fast as any devil; and of the honey that he is said to have poured into the beard of Roland when he found him asleep, after having administered it to him from the helmet of gold.

He gave a quack for the traitor Ganelon; and he would have given his housekeeper, and his niece into the bargain, for a chance of kicking him well.

In short, his wits being quite gone, he hit upon the strangest notion that ever madman in this world hit upon, and that was that he fancied it was right and requisite, as well for the increase of his own honour as for the service of his country, to become a knight-errant, roaming the world over in full armour and on horseback in quest of adventures, and putting in practice himself all that he had read of as being the usual practices of knights-errant; righting every kind of wrong, and exposing himself to peril and danger from which, in the issue, he was to reap eternal renown and fame.

Already the poor man saw himself crowned by the might of his arm, at the very least, Emperor of Trebizond; so that, led away by these delightful fancies, he made haste to put his design into execution. The first thing he did was to clean up some old armour that had been left by his great-grandfather, which, eaten with rust and covered with mildew, had lain for ages forgotten in a corner. He cleaned and mended it as best he could, but he noticed that it had one great defect, that it had no closed helmet, but only a morion, or simple headpiece.

However, his ingenuity supplied this defect, for with some pasteboard he made a sort of half-helmet that fitted on to the morion and gave it the appearance of a closed helmet. Then, to try if it was strong enough and would stand the risk of a cut, he drew his sword and gave it a couple of slashes, and the first blow and the first thing he did was to undo what he had taken a week to do. The ease with which he had knocked it to pieces was not at all to his taste, and to guard against that danger he set to work again, putting bars of iron on the inside in such a way that he said he was satisfied with its strength; and without choosing to make any fresh experiments on it, he passed it and adopted it as a helmet of the most perfect construction.

He then went to look after his hack, and though the beast had more quarters than a real and the skin was more cracked than a coin, he thought neither Bucephalus of Alexander nor Babieca of the Cid could compare with him. Four days he spent in thinking what name to give him, because (as he said to himself) it was not fitting that a horse so famous belonging to a knight so famous should be without a distinguished name; and so he tried to adapt it to his new condition, thinking that as his master was going to be a wandering knight, it was only right that his horse should be a steed, as was the custom in olden times.

After many names he formed and erased, added to, removed, and changed from one to another in his memory and fancy, at last he decided to call him Rocinante, a name that seemed to him lofty, sonorous, and significant of his having been a hack before he became what he now was, the first and foremost of all the hacks in the world.

Having given his horse such a satisfactory name, he was anxious to give himself one no less so, and this took him eight days more, and at last he made up his mind to call himself Don Quixote; whence, as has been said, the authors of this veracious history have inferred that his name was no doubt Quixada, and not Quesada as others would have it.

But recollecting that the valiant Amadis, not content with calling himself Amadis simply, added to his name the name of his kingdom and country to make it famous, and called himself Amadis of Gaul, he, like a true knight, determined to add to his own the name of his country, and call himself Don Quixote of La Mancha, whereby, in his opinion, he fully set forth his lineage and country, and did honour to it by taking his surname from it.

So then, his armour being cleaned, his morion turned into a closed helmet, his hack named, and himself christened, he perceived that there was nothing wanting now but to look out for a lady to be in love with; for a knight-errant without love was like a tree without leaves or fruit, or a body without a soul.

He said to himself, "If, for my sins or for my good fortune, I meet some giant hereabouts on the road, which commonly happens to knights-errant, and I overthrow him in the encounter, or劈 him in halves, or in short vanquish and subdue him, will it not be well to have someone to send him to as a present, that he may come in and fall on his knees before my sweet lady, and say in a humble, submissive voice: 'I am the giant Caraculiambro, lord of the island of Malindrania, vanquished in single combat by the never sufficiently extolled knight Don Quixote of La Mancha, who has commanded me to present myself before your grace, that your greatness may dispose of me at your pleasure'?"

Oh, how our good gentleman enjoyed himself when he had said this, and still more when he had found out someone to call his lady! It happened that there was a very good-looking farm-girl in a village near his own, with whom he had been at one time in love, though, as is understood, she never knew it nor was ever told so. Her name was Aldonza Lorenzo, and her he thought it well to choose as the lady of his thoughts; and he sought a name for her that should not be far from a princess's or great lady's, and he called her Dulcinea del Toboso, for she was a native of El Toboso; a name that seemed to him musical, uncommon, and significant, like all the others he had given to himself and his belongings.`
      }
    ]
  }
];

export const genres = ["All", "Philosophy", "Fiction", "Mystery", "Romance"];
