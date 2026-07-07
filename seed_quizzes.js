import dotenv from 'dotenv'
import db from './src/db/models/index.js'
dotenv.config()

async function seed () {
  try {
    console.log('Seeding Quizzes...')

    await db.ActivityResult.destroy({ where: {} })
    await db.Question.destroy({ where: {} })
    await db.Quiz.destroy({ where: {} })

    const quizzes = [
      // Nursery Quizzes (10 Quizzes)
      {
        title: 'Animal Friends 🐶',
        description: "Let's learn about our furry and feathery friends!",
        class_level: 'nursery',
        image_url: '🦁',
        questions: [
          { question_text: "Which animal says 'Meow'? 🐾", options: ['🐶 Dog', '🐱 Cat', '🐮 Cow', '🐸 Frog'], correct_answer_index: 1 },
          { question_text: 'Which animal is very tall? 🦒', options: ['🦒 Giraffe', '🐭 Mouse', '🐻 Bear', '🐒 Monkey'], correct_answer_index: 0 },
          { question_text: 'Who has a long trunk? 🐘', options: ['🦊 Fox', '🐘 Elephant', '🐯 Tiger', '🐰 Rabbit'], correct_answer_index: 1 },
          { question_text: 'Which animal hops and eats carrots? 🥕', options: ['🐰 Bunny', '🐢 Turtle', '🐍 Snake', '🐼 Panda'], correct_answer_index: 0 },
          { question_text: 'Which animal lives in the water? 💧', options: ['🐟 Fish', '🐦 Bird', '🐴 Horse', '🐔 Chicken'], correct_answer_index: 0 }
        ]
      },
      {
        title: 'Colors & Shapes 🔴',
        description: 'Discover beautiful colors and shapes all around us!',
        class_level: 'nursery',
        image_url: '🎨',
        questions: [
          { question_text: 'What color is the bright sun? ☀️', options: ['🔴 Red', '🔵 Blue', '🟡 Yellow', '🟢 Green'], correct_answer_index: 2 },
          { question_text: 'Which shape is perfectly round? ⭕', options: ['⬛ Square', '🔵 Circle', '🔺 Triangle', '⭐ Star'], correct_answer_index: 1 },
          { question_text: 'What color is a strawberry? 🍓', options: ['🔴 Red', '🟠 Orange', '🟣 Purple', '⚫ Black'], correct_answer_index: 0 },
          { question_text: 'Which shape has 3 sides? 🔺', options: ['⭐ Star', '⬛ Square', '🔺 Triangle', '❤️ Heart'], correct_answer_index: 2 },
          { question_text: 'What color are the leaves on trees? 🌳', options: ['⚪ White', '🟢 Green', '🟤 Brown', '🔵 Blue'], correct_answer_index: 1 }
        ]
      },
      {
        title: 'Yummy Fruits & Veggies 🍎',
        description: 'Healthy and delicious food fun!',
        class_level: 'nursery',
        image_url: '🍉',
        questions: [
          { question_text: 'Which fruit is yellow and curved? 🍌', options: ['🍎 Apple', '🍌 Banana', '🍇 Grapes', '🍒 Cherries'], correct_answer_index: 1 },
          { question_text: 'Which veggie is orange and crunchy? 🥕', options: ['🥦 Broccoli', '🍅 Tomato', '🥕 Carrot', '🧅 Onion'], correct_answer_index: 2 },
          { question_text: 'Which fruit is big, green outside, and red inside? 🍉', options: ['🍉 Watermelon', '🍍 Pineapple', '🥭 Mango', '🥥 Coconut'], correct_answer_index: 0 },
          { question_text: 'What do monkeys love to eat? 🐒', options: ['🍌 Banana', '🌽 Corn', '🥝 Kiwi', '🥑 Avocado'], correct_answer_index: 0 },
          { question_text: 'Which of these is a tiny red fruit? 🍓', options: ['🍈 Melon', '🍓 Strawberry', '🍋 Lemon', '🍐 Pear'], correct_answer_index: 1 }
        ]
      },
      {
        title: 'Vroom! Vehicles 🚗',
        description: "Zoom zoom! Let's learn about things that move!",
        class_level: 'nursery',
        image_url: '✈️',
        questions: [
          { question_text: 'What flies high up in the sky? ☁️', options: ['🚗 Car', '🚢 Ship', '✈️ Airplane', '🚲 Bicycle'], correct_answer_index: 2 },
          { question_text: 'Which vehicle has exactly 2 wheels? ✌️', options: ['🚌 Bus', '🚲 Bicycle', '🚗 Car', '🚂 Train'], correct_answer_index: 1 },
          { question_text: "What goes 'Choo Choo' on tracks? 🛤️", options: ['🚂 Train', '🚁 Helicopter', '🛶 Boat', '🚜 Tractor'], correct_answer_index: 0 },
          { question_text: 'Which vehicle floats on water? 🌊', options: ['🛵 Scooter', '🚢 Ship', '🚕 Taxi', '🛸 UFO'], correct_answer_index: 1 },
          { question_text: 'What takes lots of kids to school? 🎒', options: ['🚑 Ambulance', '🚌 Yellow Bus', '🚓 Police Car', '🚒 Fire Truck'], correct_answer_index: 1 }
        ]
      },
      {
        title: 'Magic Sounds 🎵',
        description: 'Listen closely! What makes that noise?',
        class_level: 'nursery',
        image_url: '🥁',
        questions: [
          { question_text: "What says 'Moo Moo'? 🐄", options: ['🐑 Sheep', '🐄 Cow', '🐖 Pig', '🐐 Goat'], correct_answer_index: 1 },
          { question_text: "What says 'Quack Quack'? 🦆", options: ['🦆 Duck', '🦉 Owl', '🐓 Rooster', '🦃 Turkey'], correct_answer_index: 0 },
          { question_text: 'What sound does a bee make? 🐝', options: ['Buzz 🐝', 'Roar 🦁', 'Chirp 🐦', 'Hiss 🐍'], correct_answer_index: 0 },
          { question_text: "What says 'Baa Baa'? 🐑", options: ['🐕 Dog', '🐈 Cat', '🐑 Sheep', '🐄 Cow'], correct_answer_index: 2 },
          { question_text: 'What sound does a clock make? ⏰', options: ['Ding Dong', 'Tick Tock', 'Vroom', 'Beep Beep'], correct_answer_index: 1 }
        ]
      },
      {
        title: 'Fun with Numbers 123 🔢',
        description: "Let's count our favorite things!",
        class_level: 'nursery',
        image_url: '3️⃣',
        questions: [
          { question_text: 'How many eyes do you have? 👀', options: ['1', '2', '3', '4'], correct_answer_index: 1 },
          { question_text: 'Count the stars! ⭐⭐', options: ['1', '2', '3', '4'], correct_answer_index: 1 },
          { question_text: 'How many fingers on one hand? 🖐️', options: ['3', '4', '5', '6'], correct_answer_index: 2 },
          { question_text: 'What comes after 1? 🥇', options: ['2', '3', '4', '0'], correct_answer_index: 0 },
          { question_text: 'Count the apples! 🍎🍎🍎', options: ['2', '3', '4', '5'], correct_answer_index: 1 }
        ]
      },
      {
        title: 'Alphabet Adventures 🔤',
        description: 'A is for Apple, B is for Balloon!',
        class_level: 'nursery',
        image_url: '🅰️',
        questions: [
          { question_text: 'What is the very first letter? 🥇', options: ['B', 'C', 'A', 'D'], correct_answer_index: 2 },
          { question_text: "'A' is for... 🍎", options: ['🍌 Banana', '🍎 Apple', '🍉 Melon', '🍇 Grape'], correct_answer_index: 1 },
          { question_text: 'What comes after A? 🥈', options: ['C', 'D', 'E', 'B'], correct_answer_index: 3 },
          { question_text: "'B' is for... 🎈", options: ['🎈 Balloon', '🐈 Cat', '🐕 Dog', '🐘 Elephant'], correct_answer_index: 0 },
          { question_text: 'Which letter looks like a snake? 🐍', options: ['O', 'S', 'T', 'H'], correct_answer_index: 1 }
        ]
      },
      {
        title: 'Emotions & Feelings 😃',
        description: 'How are you feeling today?',
        class_level: 'nursery',
        image_url: '💖',
        questions: [
          { question_text: 'Which face is very Happy? 😊', options: ['😢', '😠', '😊', '😴'], correct_answer_index: 2 },
          { question_text: 'Which face is Sad? 😢', options: ['😢', '😂', '😎', '🤩'], correct_answer_index: 0 },
          { question_text: 'What do you do when you are sleepy? 🥱', options: ['Run', 'Eat', 'Sleep', 'Jump'], correct_answer_index: 2 },
          { question_text: 'Which face is Angry? 😠', options: ['😇', '😠', '🥰', '🥳'], correct_answer_index: 1 },
          { question_text: 'When you get a gift, you feel... 🎁', options: ['Sad', 'Scared', 'Happy', 'Tired'], correct_answer_index: 2 }
        ]
      },
      {
        title: 'Daily Habits 🪥',
        description: 'Good habits make us strong and healthy!',
        class_level: 'nursery',
        image_url: '🧼',
        questions: [
          { question_text: 'What do we do in the morning? ☀️', options: ['Sleep', 'Brush Teeth 🪥', 'Look at Stars', 'Eat Dinner'], correct_answer_index: 1 },
          { question_text: 'Before eating, we must... 🍽️', options: ['Wash Hands 🧼', 'Play in Mud', 'Go to Sleep', 'Sing a Song'], correct_answer_index: 0 },
          { question_text: 'When we are thirsty, we drink... 🥛', options: ['Pizza', 'Bread', 'Water 💧', 'Sand'], correct_answer_index: 2 },
          { question_text: 'Where do we throw trash? 🗑️', options: ['On the floor', 'In the Bin 🗑️', 'Out the window', 'Under the bed'], correct_answer_index: 1 },
          { question_text: 'At night, we say... 🌙', options: ['Good Morning', 'Good Night 😴', 'Hello', 'Goodbye'], correct_answer_index: 1 }
        ]
      },
      {
        title: 'Nature Explorers 🌳',
        description: 'Discover the beautiful outdoors!',
        class_level: 'nursery',
        image_url: '🌻',
        questions: [
          { question_text: "What falls from the sky when it's cloudy? 🌧️", options: ['Toys', 'Rain 💧', 'Candy', 'Apples'], correct_answer_index: 1 },
          { question_text: 'Where do flowers grow? 🌷', options: ['In the sky', 'In the soil/dirt 🌱', 'On the moon', 'In the ocean'], correct_answer_index: 1 },
          { question_text: 'What shines bright at night? 🌙', options: ['The Sun', 'The Moon 🌕', 'A Lamp', 'A Fire'], correct_answer_index: 1 },
          { question_text: 'Which insect makes honey? 🍯', options: ['🦋 Butterfly', '🐞 Ladybug', '🐝 Bee', '🐜 Ant'], correct_answer_index: 2 },
          { question_text: 'What gives us light and warmth? ☀️', options: ['The Moon', 'The Stars', 'The Sun ☀️', 'The Clouds'], correct_answer_index: 2 }
        ]
      },

      // KG1 Quizzes
      {
        title: 'Counting Fun 🔢',
        description: "Let's count together!",
        class_level: 'kg1',
        image_url: '🍎',
        questions: [
          { question_text: 'How many apples are here? 🍎🍎🍎', options: ['1', '2', '3', '4'], correct_answer_index: 2 },
          { question_text: 'What comes after 4?', options: ['3', '5', '6', '2'], correct_answer_index: 1 }
        ]
      },
      {
        title: 'Magic Letters ✨',
        description: 'Find the starting letters!',
        class_level: 'kg1',
        image_url: '🔤',
        questions: [
          { question_text: 'A is for...', options: ['Bat', 'Cat', 'Apple', 'Dog'], correct_answer_index: 2 },
          { question_text: 'Which letter comes after B?', options: ['A', 'C', 'D', 'E'], correct_answer_index: 1 }
        ]
      },

      // KG2 Quizzes
      {
        title: 'Super Math ➕',
        description: 'You are a math superhero!',
        class_level: 'kg2',
        image_url: '🦸',
        questions: [
          { question_text: '2 + 2 = ?', options: ['3', '4', '5', '6'], correct_answer_index: 1 },
          { question_text: 'If you have 3 candies and get 1 more, how many do you have?', options: ['2', '3', '4', '5'], correct_answer_index: 2 }
        ]
      },
      {
        title: 'Word Wizard 🧙',
        description: 'Read simple words!',
        class_level: 'kg2',
        image_url: '📖',
        questions: [
          { question_text: "Which word says 'CAT'?", options: ['BAT', 'MAT', 'CAT', 'RAT'], correct_answer_index: 2 },
          { question_text: 'What does a dog do?', options: ['Meow', 'Moo', 'Bark', 'Oink'], correct_answer_index: 2 }
        ]
      },
      // Memory Games - Nursery
      { title: '[Memory] Animal Match 🐶', description: 'Find the cute animals!', class_level: 'nursery', image_url: '🐶', questions: [] },
      { title: '[Memory] Fruit Match 🍎', description: 'Find the yummy fruits!', class_level: 'nursery', image_url: '🍎', questions: [] },
      { title: '[Memory] Emotion Match 😃', description: 'Match the funny faces!', class_level: 'nursery', image_url: '😃', questions: [] },
      { title: '[Memory] Bug Match 🐛', description: 'Find the tiny bugs!', class_level: 'nursery', image_url: '🐛', questions: [] },

      // Memory Games - KG1
      { title: '[Memory] Shape Match 🔴', description: 'Find the matching shapes!', class_level: 'kg1', image_url: '🔴', questions: [] },
      { title: '[Memory] Vegetable Match 🥕', description: 'Find the healthy veggies!', class_level: 'kg1', image_url: '🥕', questions: [] },
      { title: '[Memory] Weather Match ☀️', description: 'Match the weather conditions!', class_level: 'kg1', image_url: '☀️', questions: [] },
      { title: '[Memory] Cloth Match 👕', description: 'Match the clothing items!', class_level: 'kg1', image_url: '👕', questions: [] },

      // Memory Games - KG2
      { title: '[Memory] Vehicle Match 🚗', description: 'Find the matching vehicles!', class_level: 'kg2', image_url: '🚗', questions: [] },
      { title: '[Memory] Space Match 🚀', description: 'Match the planets and stars!', class_level: 'kg2', image_url: '🚀', questions: [] },
      { title: '[Memory] Sport Match ⚽', description: 'Find the matching sports gear!', class_level: 'kg2', image_url: '⚽', questions: [] },
      { title: '[Memory] Music Match 🎵', description: 'Match the musical instruments!', class_level: 'kg2', image_url: '🎵', questions: [] },

      // Drag and Drop Games - Nursery
      { title: '[DragDrop] Color Match 🎨', description: 'Match the colors!', class_level: 'nursery', image_url: '🎨', questions: [] },
      { title: '[DragDrop] Animal Homes 🏠', description: 'Where do they live?', class_level: 'nursery', image_url: '🏠', questions: [] },
      { title: '[DragDrop] Number Match 🔢', description: 'Match numbers to outlines!', class_level: 'nursery', image_url: '🔢', questions: [] },
      { title: '[DragDrop] Shape Match 🟦', description: 'Match the shapes!', class_level: 'nursery', image_url: '🟦', questions: [] },

      // Drag and Drop Games - KG1
      { title: '[DragDrop] Alphabet Match 🔠', description: 'Match Uppercase to Lowercase!', class_level: 'kg1', image_url: '🔠', questions: [] },
      { title: '[DragDrop] Counting Match 🍎', description: 'Count the items!', class_level: 'kg1', image_url: '🍎', questions: [] },
      { title: '[DragDrop] Size Sort 📏', description: 'Big or small?', class_level: 'kg1', image_url: '📏', questions: [] },
      { title: '[DragDrop] Missing Number ❓', description: 'Find the missing number!', class_level: 'kg1', image_url: '❓', questions: [] },

      // Drag and Drop Games - KG2
      { title: '[DragDrop] Addition ➕', description: 'Solve the math problem!', class_level: 'kg2', image_url: '➕', questions: [] },
      { title: '[DragDrop] Word Match 📖', description: 'Match words to pictures!', class_level: 'kg2', image_url: '📖', questions: [] },
      { title: '[DragDrop] Vowel Match 🅰️', description: 'Fill in the missing vowel!', class_level: 'kg2', image_url: '🅰️', questions: [] },
      { title: '[DragDrop] Category Sort 🛒', description: 'Sort items into categories!', class_level: 'kg2', image_url: '🛒', questions: [] },

      // Jigsaw Puzzle Games - Nursery (2x2)
      { title: '[Puzzle] Solar System 🪐', description: 'Put the planets together!', class_level: 'nursery', image_url: '/images/puzzles/solar_system.png', questions: [] },
      { title: '[Puzzle] Farm Animals 🐄', description: 'Build the cute farm!', class_level: 'nursery', image_url: '/images/puzzles/farm_animals.png', questions: [] },
      { title: '[Puzzle] Fruit Basket 🍎', description: 'Put the yummy fruits together!', class_level: 'nursery', image_url: '/images/puzzles/fruit_basket.png', questions: [] },

      // Jigsaw Puzzle Games - KG1 (3x3)
      { title: '[Puzzle] World Map 🌍', description: 'Build the whole world!', class_level: 'kg1', image_url: '/images/puzzles/world_map.png', questions: [] },
      { title: '[Puzzle] Dinosaur 🦖', description: 'Piece together the T-Rex!', class_level: 'kg1', image_url: '/images/puzzles/dinosaur_scene.png', questions: [] },
      { title: '[Puzzle] Four Seasons 🍂', description: 'Build the tree of seasons!', class_level: 'kg1', image_url: '/images/puzzles/four_seasons.png', questions: [] },

      // Jigsaw Puzzle Games - KG2 (4x4)
      { title: '[Puzzle] Ocean Life 🐠', description: 'Dive deep into the puzzle!', class_level: 'kg2', image_url: '/images/puzzles/underwater_ocean.png', questions: [] },
      { title: '[Puzzle] Traffic Safety 🚦', description: 'Build the safe street!', class_level: 'kg2', image_url: '/images/puzzles/traffic_safety.png', questions: [] },
      { title: '[Puzzle] Musical Instruments 🎸', description: 'Put the band together!', class_level: 'kg2', image_url: '/images/puzzles/musical_instruments.png', questions: [] },
      { title: '[Puzzle] Human Senses 👀', description: 'Build the five senses!', class_level: 'kg2', image_url: '/images/puzzles/human_senses.png', questions: [] },

      // NEW GAMES EXPANSION PACK
      // Nursery
      { title: '[Rainbow] Colors', description: 'Sort the falling objects!', class_level: 'nursery', image_url: '🌈', questions: [] },
      { title: '[Shadow] Animals', description: 'Match the animal shadow!', class_level: 'nursery', image_url: '👥', questions: [] },
      { title: '[Fishing] Pond', description: 'Catch the numbered fish!', class_level: 'nursery', image_url: '🎣', questions: [] },

      // KG1
      { title: '[Rainbow] Objects', description: 'Sort everything by color!', class_level: 'kg1', image_url: '🌈', questions: [] },
      { title: '[Letter] LION', description: 'Build the letter L!', class_level: 'kg1', image_url: '🔠', questions: [] },
      { title: '[Shadow] Fruits', description: 'Match the fruit shadow!', class_level: 'kg1', image_url: '👥', questions: [] },
      { title: '[Fishing] Lake', description: 'Catch more numbered fish!', class_level: 'kg1', image_url: '🎣', questions: [] },

      // KG2
      { title: '[Letter] HIPPO', description: 'Build the letter H!', class_level: 'kg2', image_url: '🔠', questions: [] },
      { title: '[Story] CatMat', description: 'The Cat is on the Mat', class_level: 'kg2', image_url: '📖', questions: [] },
      { title: '[Story] DogHouse', description: 'The Dog is by the House', class_level: 'kg2', image_url: '📖', questions: [] },
      { title: '[Story] BirdTree', description: 'The Bird is in the Tree', class_level: 'kg2', image_url: '📖', questions: [] }
    ]

    for (const qData of quizzes) {
      const { questions, ...quizInfo } = qData
      const quiz = await db.Quiz.create(quizInfo)

      for (const qText of questions) {
        await db.Question.create({
          quiz_id: quiz.id,
          question_text: qText.question_text,
          options: qText.options,
          correct_answer_index: qText.correct_answer_index
        })
      }
    }

    console.log('Successfully seeded 14 highly interactive quizzes!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding quizzes:', error)
    process.exit(1)
  }
}

seed()
