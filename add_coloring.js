import db from './src/db/models/index.js';

const coloringPages = [
  { id: 1, title: 'Happy Apple', image: '🍎' },
  { id: 2, title: 'Cozy House', image: '🏠' },
  { id: 3, title: 'Bright Sun', image: '☀️' },
  { id: 4, title: 'Green Tree', image: '🌳' },
  { id: 5, title: 'Sail Boat', image: '⛵' },
  { id: 6, title: 'Twinkle Star', image: '⭐' },
  { id: 7, title: 'Speedy Car', image: '🚗' },
  { id: 8, title: 'Ice Cream', image: '🍦' },
  { id: 9, title: 'Balloon', image: '🎈' },
  { id: 10, title: 'Pretty Flower', image: '🌸' },
  { id: 11, title: 'Butterfly', image: '🦋' },
  { id: 12, title: 'Moon & Stars', image: '🌙' },
  { id: 13, title: 'Happy Fish', image: '🐟' },
  { id: 14, title: 'Space Rocket', image: '🚀' },
  { id: 15, title: 'Teddy Bear', image: '🧸' }
];

async function run() {
  const levels = ['nursery', 'kg1', 'kg2'];
  for (const level of levels) {
    for (const page of coloringPages) {
      const [quiz] = await db.Quiz.findOrCreate({
        where: { title: `[Coloring] ${page.title} 🎨`, class_level: level },
        defaults: {
          description: 'Color the beautiful picture!',
          class_level: level,
          image_url: page.image
        }
      });
      console.log(`Created: ${quiz.title} for ${level}`);
    }
  }
  console.log('Done adding coloring quizzes!');
  process.exit(0);
}
run();
