
import React from 'react';
import { Star, Check } from 'lucide-react';
import { Youtube } from 'lucide-react';
import { Todo } from '../types';

interface TodaysFocusProps {
  todos: Todo[];
  focusedTasks: string[];
  setFocusedTasks: (tasks: string[]) => void;
}

const TodaysFocus = ({ todos, focusedTasks, setFocusedTasks }: TodaysFocusProps) => {
  const focusedTodos = todos.filter(todo => focusedTasks.includes(todo.id));
  
  const motivationalQuotes = [
    "Great things never come from comfort zones.",
    "Success is not final, failure is not fatal.",
    "The way to get started is to quit talking and begin doing.",
    "Don't watch the clock; do what it does. Keep going.",
    "The future depends on what you do today.",
    "Believe you can and you're halfway there.",
    "It does not matter how slowly you go as long as you do not stop.",
    "Everything you've ever wanted is on the other side of fear.",
    "Success is not how high you have climbed, but how you make a positive difference to the world.",
    "Don't be afraid to give yourself everything you've ever wanted in life.",
    "If you want to achieve greatness stop asking for permission.",
    "Things work out best for those who make the best of how things work out.",
    "To live a creative life, we must lose our fear of being wrong.",
    "If you are not willing to risk the usual you will have to settle for the ordinary.",
    "Trust because you are willing to accept the risk, not because it's safe or certain.",
    "Take up one idea. Make that one idea your life - think of it, dream of it, live on that idea.",
    "All our dreams can come true if we have the courage to pursue them.",
    "Good things happen to those who hustle.",
    "Great minds discuss ideas; average minds discuss events; small minds discuss people.",
    "I have not failed. I've just found 10,000 ways that won't work.",
    "If you don't value your time, neither will others.",
    "A person who never made a mistake never tried anything new.",
    "The person who says it cannot be done should not interrupt the person who is doing it.",
    "There are no traffic jams along the extra mile.",
    "It is never too late to be what you might have been.",
    "You become what you believe.",
    "I would rather die of passion than of boredom.",
    "A truly rich man is one whose children run into his arms when his hands are empty.",
    "It is not what you do for your children, but what you have taught them to do for themselves.",
    "The stock market is filled with individuals who know the price of everything, but the value of nothing.",
    "As we look ahead into the next century, leaders will be those who empower others.",
    "Before you are a leader, success is all about growing yourself. When you become a leader, success is all about growing others.",
    "A leader is one who knows the way, goes the way, and shows the way.",
    "Innovation distinguishes between a leader and a follower.",
    "Management is doing things right; leadership is doing the right things.",
    "The greatest leader is not necessarily the one who does the greatest things. He is the one that gets the people to do the greatest things.",
    "A leader is best when people barely know he exists, when his work is done, his aim fulfilled, they will say: we did it ourselves.",
    "If your actions inspire others to dream more, learn more, do more and become more, you are a leader.",
    "The challenge of leadership is to be strong, but not rude; be kind, but not weak; be bold, but not bully; be thoughtful, but not lazy; be humble, but not timid; be proud, but not arrogant; have humor, but without folly.",
    "Outstanding leaders go out of their way to boost the self-esteem of their personnel. If people believe in themselves, it's amazing what they can accomplish.",
    "The art of leadership is saying no, not saying yes. It is very easy to say yes.",
    "Leadership is not about being in charge. It is about taking care of those in your charge.",
    "The function of leadership is to produce more leaders, not more followers.",
    "A good leader takes a little more than his share of the blame, a little less than his share of the credit.",
    "Leadership is the capacity to translate vision into reality.",
    "The price of greatness is responsibility.",
    "Example is not the main thing in influencing others. It is the only thing.",
    "If you want to build a ship, don't drum up people to collect wood and don't assign them tasks and work, but rather teach them to long for the endless immensity of the sea.",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Whether you think you can or you think you can't, you're right.",
    "The two most important days in your life are the day you are born and the day you find out why.",
    "Life is what happens to you while you're busy making other plans.",
    "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    "The only impossible journey is the one you never begin.",
    "Life is really simple, but we insist on making it complicated.",
    "May you live all the days of your life.",
    "Life itself is the most wonderful fairy tale.",
    "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.",
    "In three words I can sum up everything I've learned about life: it goes on.",
    "To live is the rarest thing in the world. Most people just exist.",
    "Life is not measured by the number of breaths we take, but by the moments that take our breath away.",
    "Keep smiling, because life is a beautiful thing and there's so much to smile about.",
    "Life is a long lesson in humility.",
    "In the depth of winter, I finally learned that within me there lay an invincible summer.",
    "Turn your wounds into wisdom.",
    "The purpose of our lives is to be happy.",
    "Life is 10% what happens to you and 90% how you react to it.",
    "Life is trying things to see if they work.",
    "Many of life's failures are people who did not realize how close they were to success when they gave up.",
    "The secret of health for both mind and body is not to mourn for the past, nor to worry about the future, but to live the present moment wisely and earnestly.",
    "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    "Life is not about finding yourself. Life is about creating yourself.",
    "The biggest adventure you can take is to live the life of your dreams.",
    "Life is what we make it, always has been, always will be.",
    "Life isn't about waiting for the storm to pass but learning to dance in the rain.",
    "The good life is one inspired by love and guided by knowledge.",
    "Life is short, and it is up to you to make it sweet.",
    "Life is about making an impact, not making an income.",
    "Life is a series of natural and spontaneous changes. Don't resist them; that only creates sorrow. Let reality be reality. Let things flow naturally forward in whatever way they like.",
    "Be yourself; everyone else is already taken.",
    "Be the change that you wish to see in the world.",
    "A room without books is like a body without a soul.",
    "You only live once, but if you do it right, once is enough.",
    "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.",
    "We accept the love we think we deserve.",
    "Without music, life would be a mistake.",
    "I am enough of an artist to draw freely upon my imagination.",
    "If you tell the truth, you don't have to remember anything.",
    "A friend is someone who knows all about you and still loves you.",
    "Always forgive your enemies; nothing annoys them so much.",
    "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    "Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.",
    "We are all in the gutter, but some of us are looking at the stars.",
    "It is better to be hated for what you are than to be loved for what you are not.",
    "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.",
    "I have not failed. I've just found 10,000 ways that won't work.",
    "A woman is like a tea bag; you never know how strong it is until it's in hot water.",
    "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.",
    "It is during our darkest moments that we must focus to see the light.",
    "The only way to do great work is to love what you do.",
    "If life were predictable it would cease to be life, and be without flavor.",
    "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
    "When you reach the end of your rope, tie a knot in it and hang on.",
    "Always remember that you are absolutely unique. Just like everyone else.",
    "Don't judge each day by the harvest you reap but by the seeds that you plant.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    "It is better to fail in originality than to succeed in imitation.",
    "The question isn't who is going to let me; it's who is going to stop me.",
    "The only person you are destined to become is the person you decide to be.",
    "Go confidently in the direction of your dreams. Live the life you have imagined.",
    "Few things can help an individual more than to place responsibility on him, and to let him know that you trust him.",
    "Certain things catch your eye, but pursue only those that capture the heart.",
    "Believe that life is worth living and your belief will help create the fact."
  ];

  const todayQuote = motivationalQuotes[new Date().getDay() % motivationalQuotes.length];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-4 flex items-center space-x-2 text-gray-900 dark:text-gray-100">
          <Star size={20} style={{ color: '#F59E0B' }} />
          <span>Today's Focus</span>
        </h2>
        
        <div className="space-y-3">
          {focusedTodos.map((todo) => (
            <div
              key={todo.id}
              className={`p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg transition-all duration-300 ${
                todo.completed ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <button
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    todo.completed 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-yellow-400'
                  }`}
                >
                  {todo.completed && <Check size={12} className="text-white" />}
                </button>
                <span className={`text-sm font-medium ${
                  todo.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-gray-200'
                }`}>
                  {todo.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {focusedTodos.length === 0 && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
            <Star size={32} className="mx-auto mb-2 text-gray-300" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Select up to 3 important tasks to focus on today
            </p>
          </div>
        )}
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
        <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Quote of the Day</h3>
        <p className="text-sm text-blue-800 dark:text-blue-200 italic">"{todayQuote}"</p>
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="font-medium mb-3 text-gray-900 dark:text-gray-100">Quick Stats</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Total Tasks:</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{todos.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Completed:</span>
            <span className="font-medium text-green-600">
              {todos.filter(t => t.completed).length}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Pending:</span>
            <span className="font-medium text-orange-600">
              {todos.filter(t => !t.completed).length}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
        <h3 className="font-medium mb-3 text-gray-900 dark:text-gray-100">Connect with Us</h3>
        <a
          href="https://www.youtube.com/channel/UCi84fOMGApCB8xzbugtFElw?sub_confirmation=1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
        >
          <Youtube size={20} />
          <span>Subscribe to our Channel</span>
        </a>
      </div>
    </div>
  );
};

export default TodaysFocus;
